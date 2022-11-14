import React from "react";
import { Button, Checkbox, Form, Input, DatePicker, Select } from "antd";
import { Col, Row, RowSpacer, CenteredRow } from "../Containers";

import styled from "styled-components";

const FormInput = styled(Form.Item)`
  flex: 1;
`;

const FormDatePicker = styled(DatePicker)`
  flex: 1;
`;

const TabPolicy = () => {
  return (
    <div>
      <Row>
        <FormInput
          label="Codice Compagnia"
          name="codice_compagnia"
          tooltip="Inserisci il codice della compagnia..."
          rules={[{ required: true, message: "Il codice compagnia è obbligatorio" }]}
        >
          <Input placeholder="codice compagnia ..." />
        </FormInput>
        <RowSpacer />

        <FormInput
          label="Ramo Polizza"
          name="ramo_polizza"
          tooltip="Inserisci il ramo della polizza"
          rules={[{ required: true, message: "Il ramo della polizza è obbligatorio" }]}
        >
          <Select
            defaultValue="---"
            options={[
              { value: "---", label: "---" },
              { value: "ramo 1", label: "ramo 1" },
              { value: "ramo 2", label: "ramo 2" },
              { value: "ramo 3", label: "ramo 3" },
            ]}
          />
        </FormInput>
      </Row>

      <Row>
        <FormInput
          label="Numero Polizza"
          name="numero_polizza"
          tooltip="Inserisci il numero della polizza..."
          rules={[{ required: true, message: "Il codice polizza è obbligatorio" }]}
        >
          <Input placeholder="numero polizza..." />
        </FormInput>
        <RowSpacer />

        <FormInput label="Codice Prodotto" name="codice_prodotto" tooltip="Inserisci il codice prodotto">
          <Input placeholder="codice prodott..." />
        </FormInput>
      </Row>

      <Row>
        <FormInput
          label="Data Emissione"
          name="data_emissione"
          tooltip="Inserisci la data di emissione"
          rules={[{ required: true, message: "La data emissione è obbligatoria" }]}
        >
          <DatePicker />
        </FormInput>
        <RowSpacer />

        <FormInput
          label="Data Effetto"
          name="data_effetto"
          tooltip="Inserisci la data di effetto"
          rules={[{ required: true, message: "La data effetto è obbligatoria" }]}
        >
          <DatePicker />
        </FormInput>
      </Row>

      <Row>
        <FormInput
          label="Data Scadenza"
          name="data_scadenza"
          tooltip="Inserisci la data di scadenza"
          rules={[{ required: true, message: "La data scadenza è obbligatoria" }]}
        >
          <DatePicker />
        </FormInput>
        <RowSpacer />

        <FormInput
          label="Data Annullamento"
          name="data_annullamento"
          tooltip="Inserisci la data di annullamento"
          rules={[{ required: true, message: "La data di annullamento è obbligatoria" }]}
        >
          <DatePicker />
        </FormInput>
      </Row>

      <Row>
        <FormInput label="Motivo Annullamento" name="motivo_annullamento" tooltip="Motivo di annullamento...">
          <Input placeholder="motivo di annullamento..." />
        </FormInput>
        <RowSpacer />
      </Row>

      <Row>
        <FormInput label="Data Sospensione" name="data_sospensione" tooltip="Inserisci la data di sospensione">
          <DatePicker />
        </FormInput>
        <RowSpacer />

        <FormInput label="Data Riattivazione" name="data_riattivazione" tooltip="Inserisci la data di riattivazione">
          <DatePicker />
        </FormInput>
      </Row>
    </div>
  );
};

export default TabPolicy;
