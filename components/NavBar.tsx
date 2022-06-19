import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import styled from "styled-components";
import { transparentOrange } from "../styles/colors";

export const NavBar = () => {
  return (
    <BarBase>
      <WalletMultiButton />
      <SolDenTitle>The Sol Den</SolDenTitle>
    </BarBase>
  );
};

export const SolDenTitle = styled.span`
  color: white !important;
  font-size: 36px;
  font-family: CaptureIt;
  white-space: nowrap;
  font-weight: 300;
`;

const BarBase = styled.div`
  position: sticky;
  top: 0;
  width: 100%;
  padding: 5px;
  border-bottom: 2px ${transparentOrange} solid;
  box-shadow: ${transparentOrange} 0px 0px 2px;
  background-color: black;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
