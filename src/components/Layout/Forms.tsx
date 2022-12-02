import React from "react";
import { FormContainer, FormTitle, FormActions, FormActionButton, FormContent } from "../../style/form";

import styled from "styled-components";
import { FormLayout } from "antd/es/form/Form";

export type FormActionType = {
  label: string;
  icon: JSX.Element;
  execute: () => void;
};

interface FormProps {
  layout?: FormLayout;
  title?: JSX.Element;
  actions?: FormActionType[];
  children?: JSX.Element;
}

export const MainForm = ({ layout, title, actions, children }: FormProps) => {
  return (
    <FormContainer layout={layout}>
      <FormTitle>
        {title}
        <FormActions>
          {actions?.map((action, i) => (
            <FormActionButton key={i} icon={action.icon} size="small" onClick={() => action.execute()}>
              {action.label}
            </FormActionButton>
          ))}
        </FormActions>
      </FormTitle>
      <FormContent>{children}</FormContent>
    </FormContainer>
  );
};
