import React, { useState } from "react";
import { Button, Checkbox, Form, Input, DatePicker, Select } from "antd";
import { Col, Row, RowSpacer, CenteredRow } from "../../style/containers";

import styled from "styled-components";

const FormInput = styled(Form.Item)`
  flex: 1;
`;

const FormDatePicker = styled(DatePicker)`
  flex: 1;
`;

const GaranteesContainer = styled.div``;

const GaranteeContainer = styled.div`
  border: 1px solid #eee;
  margin-bottom: 2em;
  padding: 1em 2em;
  background-color: #fafafa;
`;

type GaranteeType = {
  codice_garanzia: string;
  numero_sinistri_annui: string;
  data_inizio: string;
  data_fine: string;
  importo_massimale_persone: string;
  importo_massimale_cose: string;
  importo_massimale: string;
  importo_franchigia: string;
  percentuale_scoperto: string;
  importo_scoperto: string;
  tipo_tariffa: string;
};

type GaranteePropsType = {
  garantee: GaranteeType;
  index: number;
  onRemove: (index: number) => void;
};

const Garantee = (props: GaranteePropsType) => {
  const { garantee, index, onRemove } = props;

  return (
    <GaranteeContainer>
      <Row>
        <FormInput
          label="Codice Garanzia"
          name="codice_garanzia"
          tooltip="Seleziona il codice garanzia..."
          rules={[{ required: true }]}
        >
          <Select
            defaultValue="---"
            options={[
              { value: "---", label: "---" },
              { value: "codice garanzia 1", label: "codice garanzia 1" },
              { value: "codice garanzia 2", label: "codice garanzia 2" },
              { value: "codice garanzia 3", label: "codice garanzia 3" },
            ]}
          />
        </FormInput>
        <RowSpacer />

        <FormInput
          label="Numero di Sinistri Annuo"
          name="numero_sinistri_annuo"
          tooltip="Inserisci il numero di sinistri annuo"
          rules={[{ pattern: new RegExp("^[0-9]*$"), message: "Solo numeri" }]}
        >
          <Input placeholder="numero di sinistri annuo..." />
        </FormInput>
      </Row>

      <Row>
        <FormInput
          label="Data Inizio"
          name="data_inizio"
          tooltip="Inserisci la data di inizio"
          rules={[{ required: true, message: "La data inizio è obbligatoria" }]}
        >
          <DatePicker />
        </FormInput>
        <RowSpacer />

        <FormInput
          label="Data Fine"
          name="data_fine"
          tooltip="Inserisci la data di fine"
          rules={[{ required: true, message: "La data fine è obbligatoria" }]}
        >
          <DatePicker />
        </FormInput>
      </Row>

      <Row>
        <FormInput
          label="Import Massimale Persone"
          name="importo_massimale_persone"
          tooltip="Inserisci il massimale persone"
          rules={[{ pattern: new RegExp("^[0-9]*$"), message: "Solo numeri" }]}
        >
          <Input placeholder="massimale perosne..." />
        </FormInput>
        <RowSpacer />

        <FormInput
          label="Import Massimale Cose"
          name="importo_massimale_cose"
          tooltip="Inserisci il massimale  cose"
          rules={[{ pattern: new RegExp("^[0-9]*$"), message: "Solo numeri" }]}
        >
          <Input placeholder="massimale  cose..." />
        </FormInput>
      </Row>

      <Row>
        <FormInput
          label="Import Massimale"
          name="importo_massimale"
          tooltip="Inserisci il massimale"
          rules={[{ pattern: new RegExp("^[0-9]*$"), message: "Solo numeri" }]}
        >
          <Input placeholder="importo massimale..." />
        </FormInput>
        <RowSpacer />

        <FormInput
          label="Importo Franchigia"
          name="importo_franchigia"
          tooltip="Inserisci la franchigia"
          rules={[{ pattern: new RegExp("^[0-9]*$"), message: "Solo numeri" }]}
        >
          <Input placeholder="importo franchigia..." />
        </FormInput>
      </Row>

      <Row>
        <FormInput
          label="Percentuale Scoperto"
          name="percentuale_scoperto"
          tooltip="Inserisci la percentuale scoperto"
          rules={[{ pattern: new RegExp("^[0-9]*$"), message: "Solo numeri" }]}
        >
          <Input placeholder="percentuale scoperto..." />
        </FormInput>
        <RowSpacer />

        <FormInput
          label="Importo Scoperto"
          name="importo_scoperto"
          tooltip="Inserisci l'importo scoperto"
          rules={[{ pattern: new RegExp("^[0-9]*$"), message: "Solo numeri" }]}
        >
          <Input placeholder="importo scoperto..." />
        </FormInput>
      </Row>

      <Row>
        <FormInput
          label="Tipo Tariffa"
          name="tipo_tariffa"
          tooltip="Seleziona il tipo tariffa..."
          rules={[{ required: true }]}
        >
          <Select
            defaultValue="---"
            options={[
              { value: "---", label: "---" },
              { value: "tipo tariffa 1", label: "tipo tariffa 1" },
              { value: "tipo tariffa 2", label: "tipo tariffa 2" },
              { value: "tipo tariffa 3", label: "tipo tariffa 3" },
            ]}
          />
        </FormInput>
        <RowSpacer />
      </Row>
      <Button onClick={() => onRemove(index)}>Cancella</Button>
    </GaranteeContainer>
  );
};

const TabGarantees = () => {
  const [garantees, setGarantees] = useState<GaranteeType[]>([{} as GaranteeType]);

  const handleAddGarantee = () => {
    const newGarantees = [...garantees, {} as GaranteeType];
    setGarantees(newGarantees);
  };

  const handleRemoveGarantee = (index: number) => {
    const newGarantees = garantees.filter((g, i) => i !== index);
    setGarantees(newGarantees);
  };

  return (
    <GaranteesContainer>
      {garantees.map((garantee: GaranteeType, i: number) => (
        <Garantee garantee={garantee} index={i} onRemove={(index) => handleRemoveGarantee(index)} />
      ))}
      <Button type="primary" onClick={handleAddGarantee}>
        Add Garanzia
      </Button>
    </GaranteesContainer>
  );
};

export default TabGarantees;
