import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import styled from "styled-components";
import { useWindowSize } from "../hooks/useWindowSize";
import { transparentOrange } from "../styles/colors";

export const NavBar = () => {
  const { isMobile } = useWindowSize();

  return (
    <BarBase>
      <WalletMultiButton />
      <SolDenTitle>Upgrade Station</SolDenTitle>
      {!isMobile && <SolDenTitle>The Sol Den</SolDenTitle>}
    </BarBase>
  );
};

type TitleProps = {
  fontSizeOverride?: number;
};

export const SolDenTitle = styled.span<TitleProps>`
  color: white !important;
  font-size: ${({ fontSizeOverride: fontSize }) => fontSize ?? "36"}px;
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
  z-index: 1;
`;
