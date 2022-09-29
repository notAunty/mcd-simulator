import React from "react";
import styled from "styled-components";
import { observer } from "mobx-react-lite";

import { useStoreContext } from "./store/StoreContext";
import BotList from "./components/BotList";
import Tile from "./components/Tile";
import { OrderType } from "./enum";
import OrderList from "./components/OrderList";

const App: React.FC = observer(() => {
  const store = useStoreContext();

  return (
    <PageWrapper>
      <Tile height={1} width={4} title="Bots" backgroundColor="lavender">
        <BotList />
      </Tile>

      <Tile height={3} width={2} title="Pending" backgroundColor="#FFEAC4">
        <OrderList id={"pending-area"} types={[OrderType.VIP, OrderType.NORMAL]} />
      </Tile>
      <Tile height={3} width={2} backgroundColor="#E0FFE0">
        <OrderList id={"completed-area"} types={[OrderType.COMPLETED]} />
      </Tile>

      <Tile height={1} width={1}>
        <Button
          id={"bot-destroy"}
          style={{ "--bg-color": "#FFF0F5" } as any}
          onClick={() => store.destroyBot()}
        >
          Bot -
        </Button>
      </Tile>
      <Tile height={1} width={1}>
        <Button
          id={"bot-create"}
          style={{ "--bg-color": "#E6E6FF" } as any}
          onClick={() => store.createBot()}
        >
          Bot +
        </Button>
      </Tile>

      <Tile height={1} width={1}>
        <Button
          id={"normal-order"}
          style={{ "--bg-color": "#D0E0F0" } as any}
          onClick={() => store.createOrder(OrderType.NORMAL)}
        >
          New
          <br />
          Normal Order
        </Button>
      </Tile>
      <Tile height={1} width={1}>
        <Button
          id={"vip-order"}
          style={{ "--bg-color": "#DFEFFF" } as any}
          onClick={() => store.createOrder(OrderType.VIP)}
        >
          New
          <br />
          VIP Order
        </Button>
      </Tile>
    </PageWrapper>
  );
});

const PageWrapper = styled.div`
  height: 100%;
  padding: 16px 8px 24px 16px;
  background-color: #f0f0f0;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 8px;
`;

const Button = styled.button`
  width: 100%;
  height: 100%;
  border: none;
  box-shadow: none;
  appearance: none;
  background-color: var(--bg-color);

  :hover {
    opacity: 0.7;
    cursor: pointer;
  }
`;

export default App;
