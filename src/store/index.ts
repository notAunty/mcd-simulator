import { action, makeAutoObservable } from "mobx";
import { OrderType } from "../enum";

export default class Store {
  constructor() {
    makeAutoObservable(this, {
      createBot: action,
      destroyBot: action,
      createOrder: action,
      matchBotOrder: action,
      orderComplete: action,
    });
  }

  lastOrderId: number = 0;
  bots: Array<{
    orderId: number | null;
    timer: NodeJS.Timer | null;
    intervalTimer?: any;
    secondsLeft?: number;
  }> = [];

  orders: {
    [id: number]: {
      type: string;
      botId: number | null;
    };
  } = {};
  ordersType: { [type: string]: Array<number> } = {
    VIP: [],
    Normal: [],
    Completed: [],
  };
  unhandledOrders: { [type: string]: Array<number> } = {
    VIP: [],
    Normal: [],
  };

  get botCount() {
    return this.bots.length;
  }

  createBot() {
    this.bots = [...this.bots, { orderId: null, timer: null }];

    this.matchBotOrder();
  }

  destroyBot() {
    const botToBeRemoved = this.bots.pop();
    if (botToBeRemoved?.timer) clearTimeout(botToBeRemoved.timer);
    if (botToBeRemoved?.intervalTimer) clearInterval(botToBeRemoved.intervalTimer);
    if (botToBeRemoved?.orderId) {
      const id = botToBeRemoved.orderId;
      this.orders[id].botId = null;
      this.unhandledOrders[this.orders[id].type].unshift(id);
    }

    // Possibility where a bot is doing nothing when latest bot is destroyed
    this.matchBotOrder();
  }

  createOrder(type: OrderType) {
    if (!["Normal", "VIP"].includes(type))
      throw Error('`type` must be either "Normal" | "VIP"');

    const currentOrderID = ++this.lastOrderId;
    this.orders[currentOrderID] = { type, botId: null };
    this.ordersType[type] = [...this.ordersType[type], currentOrderID];
    this.unhandledOrders[type] = [
      ...this.unhandledOrders[type],
      currentOrderID,
    ];

    this.matchBotOrder();
  }

  matchBotOrder() {
    const bots = this.bots.map((val, idx) => ({ idx, val }));
    for (const { val: bot, idx: botIdx } of bots) {
      // If bot is occupied, check next bot
      if (bot.orderId !== null) continue;

      // Find the next to-be-handled order
      const nextOrderId: number | undefined =
        this.unhandledOrders[OrderType.VIP].shift()! ||
        this.unhandledOrders[OrderType.NORMAL].shift()!;
      // for (const type of [OrderType.VIP, OrderType.NORMAL]) { for (const orderId of this.ordersType[type]){ if (this.orders[orderId].botId === null) { nextOrderId = orderId; break; } } }

      // If no order needs to be handled, return from this func
      if (nextOrderId === undefined) return;

      // Set orderId -> botIndex
      this.orders[nextOrderId].botId = botIdx;
      // Set botIndex -> orderId
      this.bots[botIdx].orderId = nextOrderId;

      // Set a timer to handle completion
      this.bots[botIdx].timer = setTimeout(
        () => this.orderComplete(nextOrderId),
        10 * 1000
      );

      this.bots[botIdx].intervalTimer = setInterval(() => {
        const sec = this.bots[botIdx].secondsLeft;
        if (sec !== undefined) this.bots[botIdx].secondsLeft = sec - 1;
        else this.bots[botIdx].secondsLeft = 9;
      }, 1000);
    }
  }

  orderComplete(orderId: number) {
    // Search for bot that are handling this order
    const botHandlingThisOrder = this.orders[orderId].botId;
    if (botHandlingThisOrder === null) return;

    // Move this order to `completed`
    const orderType = this.orders[orderId].type;
    this.ordersType[orderType] = this.ordersType[orderType].filter(
      (id) => id !== orderId
    );
    this.ordersType[OrderType.COMPLETED] = [
      orderId,
      ...this.ordersType[OrderType.COMPLETED],
    ];

    // Update `this.orders`
    this.orders[orderId] = {
      botId: null,
      type: OrderType.COMPLETED,
    };

    // Update `this.bots`
    clearInterval(this.bots[botHandlingThisOrder].intervalTimer);
    this.bots[botHandlingThisOrder] = Store.newBot();

    // Call matchBotOrder to start a new cycle
    this.matchBotOrder();
  }
  static newBot() {
    return { orderId: null, timer: null, intervalTimer: null, secondsLeft: undefined };
  }
}
