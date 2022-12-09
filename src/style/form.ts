import React from "react";
import styled from "styled-components";
import { Form, DatePicker, Button, Input, TimePicker } from "antd";
import { Row } from "./containers";

export const FormContainer = styled(Form)`
  width: 900px;
`;

export const FormHeader = styled.div`
  display: flex;
  align-items: center;
  background-color: #fff;
  border-radius: 3px;
  box-shadow: 0 0 5px #aaa;
  margin-bottom: 2em;
  padding: 1em 2em;
`;

export const FormTitle = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.2em;
  text-transform: uppercase;
  letter-spacing: 1px;

  svg {
    font-size: 1.4em;
    margin-right: 0.5em;
  }
`;

export const FormActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex: 1;

  button {
    margin-left: 1em;
    text-transform: uppercase;
  }
`;

// export const FormActionButton = styled(Button)`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   margin-left: 1em;
//   text-transform: uppercase;
// `;

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
  background-color: white;
  border-radius: 3px;
  box-shadow: 0 0 5px #aaa;
  overflow: hidden;

  .ant-tabs-nav {
    margin: 2em 0;
  }

  .ant-tabs-content-holder {
    background-color: #fafafa;
  }

  label {
    text-transform: uppercase;
    font-size: 0.9em;
    letter-spacing: 1px;
  }

  input {
    font-weight: 200;
  }
`;

export const FormContentTab = styled.div`
  padding: 3em 4em 3em 2em;
`;

export const FormRow = styled(Row)`
  margin-bottom: 1em;

  .ant-form-item-row {
    flex-direction: column;

    .ant-form-item-label {
      text-align: left;
    }
  }
`;

export const FormInput = styled(Form.Item)`
  flex: 1;
`;

export const FormTextArea = styled(Input.TextArea)``;

export const FormDatePicker = styled(DatePicker)`
  flex: 1;
`;

export const FormTimePicker = styled(TimePicker)`
  flex: 1;
`;

export const FormSendButton = styled(Button)`
  text-transform: uppercase;
`;
