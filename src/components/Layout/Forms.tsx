import React from "react";
import { FormContainer, FormTitle, FormActions, FormContent, FormHeader } from "../../style/form";

import styled from "styled-components";
import { FormLayout } from "antd/es/form/Form";
import { Button } from "antd";
import { ButtonConfirm } from "./Buttons";

export type FormActionType = {
  label: string;
  execute: () => void;
};

interface FormProps {
  layout?: FormLayout;
  icon?: JSX.Element;
  title?: JSX.Element | string;
  actions?: FormActionType[];
  children?: JSX.Element;
}

export const MainForm = ({ layout, title, icon, actions, children }: FormProps) => {
  return (
    <FormContainer layout={layout}>
      <FormHeader>
        <FormTitle>
          {icon}
          {title}
        </FormTitle>
        <FormActions>
          {actions?.map((action, i) => (
            <ButtonConfirm key={i} onClick={() => action.execute()} text={action.label} />
          ))}
        </FormActions>
      </FormHeader>
      <FormContent>{children}</FormContent>
    </FormContainer>
  );
};
