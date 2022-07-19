import { notification } from "antd";
import { CSSProperties, ReactNode } from "react";
import { orange } from "../styles/colors";

const style: CSSProperties = {
  backgroundColor: "black",
  color: "white !important",
  border: `2px ${orange} solid`,
  fontWeight: 600,
};

const duration = 10;

export const infoNotify = (message: string, description: ReactNode) => {
  notification.info({ message, description, style, duration, placement: "bottomLeft" });
};

export const errorNotify = (message: string, description: ReactNode) => {
  notification.error({ message, description, style, duration, placement: "bottomLeft" });
};

export const successNotify = (message: string, description: ReactNode) => {
  notification.success({ message, description, style, duration, placement: "bottomLeft" });
};
