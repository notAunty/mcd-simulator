import { OrderType } from "../enum";

export const orderTypeSecRequires: { [type: string]: number } = {
  [OrderType.VIP]: 5,
  [OrderType.NORMAL]: 10,
};
