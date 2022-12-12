import React from "react";
import { Button } from "antd";

interface ButtonProps {
  text: string;
  icon?: JSX.Element;
  style?: any;
  disabled?: boolean;
  onClick: (val: any) => void;
}

export const ButtonConfirm = (props: ButtonProps) => (
  <Button
    type="primary"
    size="middle"
    disabled={props.disabled}
    style={Object.assign({}, props.style, { textTransform: "uppercase" })}
    onClick={props.onClick}
    icon={props.icon}
  >
    {props.text}
  </Button>
);

export const ButtonDelete = (props: ButtonProps) => (
  <Button
    type="primary"
    danger
    size="small"
    style={Object.assign({}, props.style, { fontSize: "0.9em", textTransform: "uppercase" })}
    onClick={props.onClick}
    icon={props.icon}
  >
    {props.text}
  </Button>
);
