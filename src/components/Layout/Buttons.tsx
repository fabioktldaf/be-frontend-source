import React from "react";
import { Button } from "antd";

interface ButtonProps {
  children: string | JSX.Element;
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
    {props.children}
  </Button>
);

export const ButtonCancel = (props: ButtonProps) => (
  <Button
    type="default"
    size="middle"
    disabled={props.disabled}
    style={Object.assign({}, props.style, { textTransform: "uppercase" })}
    onClick={props.onClick}
    icon={props.icon}
  >
    {props.children}
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
    {props.children}
  </Button>
);
