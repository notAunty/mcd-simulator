import React from "react";
import styled from "styled-components";

interface Props {
  title?: string;
  height: number;
  width: number;
  backgroundColor?: string;
  children?: React.ReactNode;
}

const Tile: React.FC<Props> = (props) => {
  return (
    <Wrapper
      style={
        {
          "--x-height": props.height,
          "--x-width": props.width,
          "--bg-color": props.backgroundColor ?? "#fff",
        } as any
      }
    >
      {props.title && <TileTitle>{props.title}</TileTitle>}
      {props.children}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: calc(var(--x-width) * 25% - 8px);
  height: calc(var(--x-height) * 20% - ((var(--x-height) - 1) * 8px));
  background-color: var(--bg-color);
  border-radius: 4px;
  border: 1.5px solid #333;
  overflow: hidden;
  box-shadow: rgba(0, 0, 0, 0.05) 1.95px 1.95px 2.6px; ;
  display: flex;
  flex-direction: column;
`;

const TileTitle = styled.h4`
  margin: 8px;
  font-weight: 500;
`;

export default Tile;
