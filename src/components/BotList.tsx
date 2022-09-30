import React from "react";
import styled from "styled-components";
import { observer } from "mobx-react-lite";
import { MdSmartToy } from 'react-icons/md';
import { useStoreContext } from "../store/StoreContext";

const BotList: React.FC = observer(() => {
  const store = useStoreContext();

  return (
    <OuterWrapper id={"bot-list"}>
      {store.bots.map((bot, idx) => (
        <InnerWrapper key={idx} id={`bot-${idx+1}`}>
          <div style={{display: "flex", gap: 8}}>
            <MdSmartToy />
            <span>#{idx+1}</span>
          </div>
          {bot.orderId && <p>Ord#{bot.orderId}</p>}
        </InnerWrapper>
      ))}
    </OuterWrapper>
  );
});

const InnerWrapper = styled.div`
  width: 10%;
  aspect-ratio: 1;
  display: flex;
  flex-direction: column;
`;

const OuterWrapper = styled.div`
  overflow-x: auto;
  flex: 1;
  display: flex;
  gap: 8px;
  padding: 8px;
`;

export default BotList;

