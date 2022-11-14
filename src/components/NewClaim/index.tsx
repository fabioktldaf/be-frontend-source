import React from "react";
import styled from "styled-components";
import { Form, Input, Button, DatePicker } from "antd";
import { Row, RowSpacer } from "../Containers";

const FormAddSinistro = styled(Form)`
  padding: 2em 4em;
  margin: 2em;
  box-shadow: 0 0 5px #aaa;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const FormInput = styled(Form.Item)`
  flex: 1;
`;

const FormDatePicker = styled(DatePicker)`
  flex: 1;
`;

const NewClaim = () => {
  return (
    <FormAddSinistro layout="vertical">
      <h2>Apertura Sinistro</h2>
      <Row>
        <FormInput
          label="Targa"
          name="targa"
          tooltip="Inserisci la targa"
          rules={[{ pattern: new RegExp("^[a-zA-Z0-9]*$"), message: "Solo alfanumerici" }]}
        >
          <Input placeholder="targa..." />
        </FormInput>
        <RowSpacer />
        <FormInput
          label="Nome"
          name="nome"
          tooltip="Inserisci nome e cognome o la ragione sociale"
          rules={[{ pattern: new RegExp("^[a-zA-Z0-9]*$"), message: "Solo alfanumerici" }]}
        >
          <Input placeholder="nome e cognome o ragione sociale..." />
        </FormInput>
      </Row>
      <Row>
        <FormInput
          label="Numero Polizza"
          name="numero_polizza"
          tooltip="Inserisci il numero di polizza"
          rules={[{ pattern: new RegExp("^[a-zA-Z0-9]*$"), message: "Solo alfanumerici" }]}
        >
          <Input placeholder="numero di polizza..." />
        </FormInput>
        <RowSpacer />
        <FormInput label="Data e Ora del Sinistro" name="data_sinistro" tooltip="Data e ora del sinistro">
          <FormDatePicker showTime />
        </FormInput>
      </Row>
    </FormAddSinistro>
  );
};

/**
 * Targa  

Cognome e Nome  

Numero polizza 

Codice Fiscale  

Targa controparte 

Data Accadimento sinistro 

Numero sinistro  

Cinquina 
 * 
 */

export default NewClaim;
