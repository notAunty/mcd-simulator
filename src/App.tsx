import React from "react";
import styled from "styled-components";
import Tile from "./components/Tile";

function App() {
  return (
    <PageWrapper>
      <Tile height={1} width={4} title="Bots" backgroundColor="lavender"></Tile>

      <Tile
        height={3}
        width={2}
        title="Pending"
        backgroundColor="#FFEAC4"
      ></Tile>
      <Tile
        height={3}
        width={2}
        title="Completed"
        backgroundColor="#E0FFE0"
      ></Tile>

      <Tile height={1} width={1}>
        <Button style={{ "--bg-color": "#FFF0F5" } as any}>Bot -</Button>
      </Tile>
      <Tile height={1} width={1}>
        <Button style={{ "--bg-color": "#E6E6FF" } as any}>Bot +</Button>
      </Tile>

      <Tile height={1} width={1}>
        <Button style={{ "--bg-color": "#D0E0F0" } as any}>New<br/>Normal Order</Button>
      </Tile>
      <Tile height={1} width={1}>
        <Button style={{ "--bg-color": "#DFEFFF" } as any}>New<br/>VIP Order</Button>
      </Tile>
    </PageWrapper>
  );
}

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
