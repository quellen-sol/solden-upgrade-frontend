import { Spin } from "antd";
import { FC } from "react";
import styled from "styled-components";
import { orange } from "../styles/colors";

type ProcessingModalProps = {
  visible: boolean;
  text?: string;
};

export const ProcessingModal: FC<ProcessingModalProps> = ({ visible, text }) => {
  return visible ? (
    <Overlay>
      <Spin tip={text ?? "Processing Transaction"} style={{ color: orange }} size="large" />
    </Overlay>
  ) : null;
};

const Overlay = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 3;
  .ant-spin i {
    background-color: ${orange};
  }
  .ant-spin-text {
    font-size: 48px;
  }
`;
