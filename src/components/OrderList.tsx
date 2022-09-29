import React from "react";
import styled from "styled-components";
import { observer } from "mobx-react-lite";
import { useStoreContext } from "../store/StoreContext";

interface Props {
  id: string;
  types: string[];
}

const OrderList: React.FC<Props> = observer((props) => {
  const store = useStoreContext();

  return (
    <Wrapper id={props.id}>
      {props.types.map((type) => (
        <TypeList key={type} id={`${type}-list`}>
          <p>{type}</p>
          {store.ordersType[type].map((orderId) => (
            <OrderItem key={orderId}>
              {orderId} - Bot # {store.orders[orderId].botId}
            </OrderItem>
          ))}
        </TypeList>
      ))}
    </Wrapper>
  );
});

const OrderItem = styled.div`
  white-space: nowrap;
`;

const TypeList = styled.div`
  margin: 8px 8px 16px;
`;

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  overflow-y: auto;
`;

export default OrderList;
