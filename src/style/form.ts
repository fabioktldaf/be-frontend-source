import React from "react";
import styled from "styled-components";
import { Form, DatePicker, Button, Input } from "antd";

export const FormContainer = styled(Form)`
  width: 100%;
  background-color: white;
  border-radius: 3px;
  box-shadow: 0 0 5px #aaa;
  overflow: hidden;
  padding-bottom: 2em;
`;

export const FormTitle = styled.div`
  background-color: cornflowerblue;
  color: white;
  font-size: 1.4em;
  text-transform: uppercase;
  padding: 0.5em 2em;
  display: flex;
`;

export const FormActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex: 1;
`;

export const FormActionButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 1em;
`;

export const FormAction = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const FormSubTitle = styled.div`
  background-color: #eee;
  text-align: center;
  color: #888;
  margin-bottom: 1em;
  padding: 0.25em 0;
  text-transform: uppercase;
`;

export const FormContent = styled.div`
  padding: 1em;
`;

export const FormInput = styled(Form.Item)`
  flex: 1;
`;

export const FormTextArea = styled(Input.TextArea)``;

export const FormDatePicker = styled(DatePicker)`
  flex: 1;
`;

export const FormSendButton = styled(Button)`
  text-transform: uppercase;
`;
