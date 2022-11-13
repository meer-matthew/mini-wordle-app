import styled from "styled-components";

export const Main = styled.main`
  font-family: "Clear Sans", "Helvetica Neue", Arial, sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
`;

export const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  width: 100%;
  margin: 20px;

  font-weight: 700;
  font-size: 3.6rem;
  letter-spacing: 0.2rem;
  text-transform: uppercase;
`;

export const GameSection = styled.section`
  margin: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
`;

export const TileContainer = styled.div`
  display: grid;
  grid-template-rows: repeat(6, 1fr);
  grid-gap: 5px;
  height: 420px;
  width: 350px;
`;

export const TileRow = styled.div`
  width: 100%;

  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 5px;
`;

export const Tile = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;

  border: 2px solid #3a3a3c;
  font-size: 3.2rem;
  font-weight: bold;
  line-height: 3.2rem;
  text-transform: uppercase;

  ${({ hint }) => {
    if (hint === "green") {
      return `background-color: #6aaa64;`;
    }
    if (hint === "yellow") {
      return `background-color: #b59f3b;`;
    }
    if (hint === "grey") {
      return `background-color: #c1c1c1;`;
    }
  }}

  user-select: none;
`;

export const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  margin: 0 6px 0 0;
  height: 58px;
  flex: 1;

  border: 0;
  border-radius: 4px;
  background-color: #818384;
  font-weight: bold;
  text-transform: uppercase;
  color: #d7dadc;

  cursor: pointer;
  user-select: none;

  &:last-of-type {
    margin: 0;
  }
`;

export const ShareModal = styled.div`
  font-family: "Clear Sans", "Helvetica Neue", Arial, sans-serif;
`;

export const ShareButton = styled.button`
  font-size: 18px;
  padding: 8px 16px;
  border-radius: 4px;
  border: 2px solid #3a3a3c;
  transition: background-color 0.2s ease-in;
  &:hover {
    background-color: #818384;
  }
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 16px auto;
`;

export const Heading = styled.h2`
  border-bottom: 1px solid #3a3a3c;
  padding-bottom: 8px;
  font-weight: 700;
  font-size: 3.6rem;
  letter-spacing: 0.2rem;
  text-transform: uppercase;
`;