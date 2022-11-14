import React from "react";
import { Button, Checkbox, Form, Input, DatePicker, Select, Switch } from "antd";
import { Col, Row, RowSpacer, CenteredRow } from "../Containers";

import styled from "styled-components";

const FormInput = styled(Form.Item)`
  flex: 1;
`;

const FormDatePicker = styled(DatePicker)`
  flex: 1;
`;

const TabInsuredAsset = () => {
  return (
    <div>
      <Row>
        <FormInput
          label="Targa"
          name="targa"
          tooltip="Inserisci la targa..."
          rules={[{ required: true, message: "La targa è obbligatoria" }]}
        >
          <Input placeholder="targa ..." />
        </FormInput>
        <RowSpacer />

        <FormInput
          label="Anno di Immatricolazione"
          name="anno_immatricolazione"
          tooltip="Inserisci l'anno di immatricolazione"
          rules={[{ required: true, message: "L'anno di immatricolazione è obbligatorio" }]}
        >
          <Input placeholder="anno immatricolazione..." />
        </FormInput>
      </Row>

      <Row>
        <FormInput
          label="Classe Universale"
          name="class_universale"
          tooltip="Selezona la classe universale..."
          rules={[{ required: true, message: "La classe universale è obbligatoria" }]}
        >
          <Select
            defaultValue="---"
            options={[
              { value: "---", label: "---" },
              { value: "classe 1", label: "classe 1" },
              { value: "classe 2", label: "classe 2" },
              { value: "classe 3", label: "classe 3" },
            ]}
          />
        </FormInput>
        <RowSpacer />

        <FormInput
          label="Provincia di Circolazione"
          name="provincia_circolazione"
          tooltip="Selezona la provincia di circolazione..."
          rules={[{ required: true, message: "La provincia di circolazione è obbligatoria" }]}
        >
          <Select
            defaultValue="---"
            options={[
              { value: "---", label: "---" },
              { value: "provincia 1", label: "provincia 1" },
              { value: "provincia 2", label: "provincia 2" },
              { value: "provincia 3", label: "provincia 3" },
            ]}
          />
        </FormInput>
      </Row>
      <Row>
        <FormInput
          label="Codice Tipo Veicolo"
          name="cod_tipo_veicolo"
          tooltip="Selezona il codice del tipo veicolo..."
          rules={[{ required: true, message: "Il codice del tipo veicolo è obbligatorio" }]}
        >
          <Select
            defaultValue="---"
            options={[
              { value: "---", label: "---" },
              { value: "veicolo tipo 1", label: "veicolo tipo 1" },
              { value: "veicolo tipo 2", label: "veicolo tipo 2" },
              { value: "veicolo tipo 3", label: "veicolo tipo 3" },
            ]}
          />
        </FormInput>
        <RowSpacer />

        <FormInput
          label="Marca Veicolo"
          name="marca_veicolo"
          tooltip="Inserisci la marca del veicolo"
          rules={[{ required: true, message: "La marca del veicolo è obbligatoria" }]}
        >
          <Input placeholder="marca ..." />
        </FormInput>
      </Row>
      <Row>
        <FormInput
          label="Modello Veicolo"
          name="modello_veicolo"
          tooltip="Inserisci il modello del veicolo"
          rules={[{ required: true, message: "Il modello del veicolo è obbligatorio" }]}
        >
          <Input placeholder="modello ..." />
        </FormInput>
        <RowSpacer />
        <FormInput label="Codice Allestimento" name="cod_allestimento" tooltip="Selezona il codice allestimento...">
          <Select
            defaultValue="---"
            options={[
              { value: "---", label: "---" },
              { value: "allestimento 1", label: "alestimento tipo 1" },
              { value: "allestimento 2", label: "alestimento tipo 2" },
              { value: "allestimento 3", label: "alestimento tipo 3" },
            ]}
          />
        </FormInput>
      </Row>
      <Row>
        <FormInput
          label="Codice Alimentazione"
          name="cod_alimentazione"
          tooltip="Selezona il codice di alimentazione..."
        >
          <Select
            defaultValue="---"
            options={[
              { value: "---", label: "---" },
              { value: "alimentazione 1", label: "alimentazione tipo 1" },
              { value: "alimentazione 2", label: "alimentazione tipo 2" },
              { value: "alimentazione 3", label: "alimentazione tipo 3" },
            ]}
          />
        </FormInput>
        <RowSpacer />
        <FormInput
          label="Importo Valore Commerciale"
          name="importo_valore_commerciale"
          tooltip="Inserisci l'importo del valore commerciale"
        >
          <Input placeholder="importo valore commerciale ..." />
        </FormInput>
      </Row>

      <Row>
        <FormInput
          label="Data Immatricolazione"
          name="data_immatricolazione"
          tooltip="Inserisci la data di immatricolazione"
        >
          <DatePicker />
        </FormInput>
        <RowSpacer />
        <FormInput label="Data Acquisto" name="data_acquisto" tooltip="Inserisci la data di acquisto">
          <DatePicker />
        </FormInput>
      </Row>

      <Row>
        <FormInput
          label="Potenza KW"
          name="potenza_kw"
          tooltip="Inserisci la potenza in KW"
          rules={[{ pattern: new RegExp("^[0-9]*$"), message: "Solo numeri" }]}
        >
          <Input placeholder="potenza in Kw..." />
        </FormInput>
        <RowSpacer />
        <FormInput
          label="Peso"
          name="peso"
          tooltip="Inserisci il peso del veicolo in Kg"
          rules={[{ pattern: new RegExp("^[0-9]*$"), message: "Solo numeri" }]}
        >
          <Input placeholder="peso del veicolo..." />
        </FormInput>
      </Row>
      <Row>
        <FormInput label="Guida Esclusiva" name="guida_esclusiva" tooltip="La guida è escusiva?">
          <Switch checkedChildren={"si"} unCheckedChildren={"no"} />
        </FormInput>
        <RowSpacer />
      </Row>
    </div>
  );
};

export default TabInsuredAsset;
