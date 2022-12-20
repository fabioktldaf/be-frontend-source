import React from "react";
import { FormContainer, FormTitle, FormActions, FormContent, FormHeader } from "../../style/form";

import styled from "styled-components";
import { FormLayout } from "antd/es/form/Form";
import { Button } from "antd";
import { ButtonConfirm } from "./Buttons";

export type FormActionType = {
  label: string;
  icon?: JSX.Element;
  disabled?: boolean;
  execute: () => void;
};

interface FormProps {
  layout?: FormLayout;
  icon?: JSX.Element;
  title?: JSX.Element | string;
  actions?: FormActionType[];
  middleArea?: JSX.Element;
  children?: JSX.Element;
  hideHeader?: boolean;
}

export const MainForm = ({ layout, title, icon, actions, middleArea, children, hideHeader }: FormProps) => {
  return (
    <FormContainer layout={layout}>
      {!hideHeader && (
        <FormHeader>
          <FormTitle>
            {icon}
            {title}
          </FormTitle>
          <FormActions>
            {actions?.map((action, i) => (
              <ButtonConfirm
                key={i}
                onClick={() => action.execute()}
                children={action.label}
                disabled={action.disabled}
              />
            ))}
          </FormActions>
        </FormHeader>
      )}
      <>{middleArea}</>
      <FormContent>{children}</FormContent>
    </FormContainer>
  );
};
