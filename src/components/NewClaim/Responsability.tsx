import React from "react";
import styled from "styled-components";
import { Form, Input, Button, DatePicker, Select } from "antd";
import { Row, RowSpacer } from "../../style/containers";
import { FormSubTitle, FormDatePicker, FormInput } from "../../style/form";

const ResponsabilityStyled = styled.div``;

const Responsability = () => {
  return (
    <ResponsabilityStyled>
      <FormSubTitle>Responsabilità</FormSubTitle>
      <Row>
        <FormInput
          label="Ruolo Responsabilità"
          name="ruolo_responsabilità"
          tooltip="inserisci il ruolo della responsabilità"
          rules={[{ required: true, message: "Il ruolo della responsabilità è obbligatorio" }]}
        >
          <Select
            defaultValue="---"
            options={[
              { value: "---", label: "---" },
              { value: "1", label: "Nostra" },
              { value: "2", label: "Controparte" },
            ]}
          />
        </FormInput>
        <RowSpacer />
        <FormInput
          label="Stato Responsabilità"
          name="stato_responsabilità"
          tooltip="Seleziona lo stato di responsabilità"
          rules={[{ required: true, message: "Lo stato della responsabilità è obbligatorio" }]}
        >
          <Select
            defaultValue="---"
            options={[
              { value: "---", label: "---" },
              { value: "1", label: "Definito" },
              { value: "2", label: "Non Definito" },
            ]}
          />
        </FormInput>
      </Row>
      <Row>
        <FormInput
          label="Percentuale Responsabilità"
          name="percentuale_responsabilità"
          tooltip="inserisci la percentual di responsabilità"
        >
          <Select
            defaultValue="---"
            options={[
              { value: "---", label: "---" },
              { value: "0%", label: "0% - Gestionario" },
              { value: "50%", label: "50% - Concorsuale" },
              { value: "100%", label: "100% - Debitore" },
              { value: "n%", label: "n% - Casi eccezionali" },
            ]}
          />
        </FormInput>
        <RowSpacer />
        <FormInput
          label="Tipo Responsabilità"
          name="tipo_responsabilità"
          tooltip="Seleziona il tip di responsabilità"
          rules={[{ required: true, message: "Il tipo di responsabilità è obbligatorio" }]}
        >
          <Select
            defaultValue="---"
            options={[
              { value: "---", label: "---" },
              { value: "1", label: "Definito" },
              { value: "2", label: "Concorsuale" },
              { value: "3", label: "Gestionario" },
              { value: "4", label: "Passivo" },
              { value: "5", label: "Attivo" },
            ]}
          />
        </FormInput>
      </Row>
    </ResponsabilityStyled>
  );
};

export default Responsability;
