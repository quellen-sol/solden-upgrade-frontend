import { notification } from "antd";
import { CSSProperties } from "react";
import { orange } from "../styles/colors";

const style: CSSProperties = {
  backgroundColor: "black",
  color: "white !important",
  border: `2px ${orange} solid`,
  fontWeight: 600,
};

const duration = 3;

export const infoNotify = (message: string, description: string) => {
  notification.info({ message, description, style, duration, placement: "bottomLeft" });
};

export const errorNotify = (message: string, description: string) => {
  notification.error({ message, description, style, duration, placement: "bottomLeft" });
};

export const successNotify = (message: string, description: string) => {
  notification.success({ message, description, style, duration, placement: "bottomLeft" });
};
