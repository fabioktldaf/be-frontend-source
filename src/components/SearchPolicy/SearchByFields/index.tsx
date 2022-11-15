import React from "react";
import { Button, Checkbox, Form, Input, DatePicker } from "antd";
import { Col, Row, RowSpacer, CenteredRow } from "../../../style/containers";

import styled from "styled-components";

const FormSearchByFields = styled(Form)`
  flex: 1;
  padding-top: 2em;
`;

const FormInput = styled(Form.Item)`
  flex: 1;
`;

const FormDatePicker = styled(DatePicker)`
  flex: 1;
`;

const SearchByFields = () => {
  return (
    <FormSearchByFields layout="vertical">
      <Row>
        <FormInput
          label="Soggetto"
          name="sogetto"
          tooltip="Cerca per nome, cognome, ragione sociale..."
          rules={[{ pattern: new RegExp("^[a-zA-Z0-9 ]*$"), message: "No special chars" }]}
        >
          <Input placeholder="nome, cognome, ..." />
        </FormInput>
        <RowSpacer />

        <FormInput
          label="Cod. Fiscale / P.IVA"
          name="name"
          tooltip="Cerca per codice fiscale o numero partita iva"
          rules={[{ pattern: new RegExp("^[a-zA-Z0-9 ]*$"), message: "No special chars" }]}
        >
          <Input placeholder="codice fiscale o partita iva..." />
        </FormInput>
      </Row>
      <Row>
        <FormInput
          label="Targa"
          name="targa"
          tooltip="Cerca per targa..."
          rules={[{ pattern: new RegExp("^[a-zA-Z0-9]*$"), message: "Solo alfanumerici" }]}
        >
          <Input placeholder="targa..." />
        </FormInput>
        <RowSpacer />
        <FormInput label="Data e Ora del Sinistro" name="data_sinistro" tooltip="Cerca per data e ora del sinistro">
          <FormDatePicker showTime />
        </FormInput>
      </Row>
      <Row>
        <FormInput
          label="Numero Polizza"
          name="numero_polizza"
          tooltip="Cerca per numero della polizza"
          rules={[{ pattern: new RegExp("^[a-zA-Z0-9-_]*$"), message: "No special chars" }]}
        >
          <Input placeholder="numero della polizza..." />
        </FormInput>
        <RowSpacer />
        <FormInput
          label="Numero Sinistro"
          name="numero_snistro"
          tooltip="Cerca per numero sinistro"
          rules={[{ pattern: new RegExp("^[a-zA-Z0-9-_]*$"), message: "No special chars" }]}
        >
          <Input placeholder="numero del sinistro..." />
        </FormInput>
      </Row>
      <Form.Item>
        <CenteredRow>
          <Button type="primary" htmlType="submit">
            Search
          </Button>
        </CenteredRow>
      </Form.Item>
    </FormSearchByFields>
  );
};

export default SearchByFields;
