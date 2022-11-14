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

const TabSubject = () => {
  return (
    <div>
      <Row>
        <FormInput
          label="Tipo Ruolo"
          name="tipo_ruols"
          tooltip="Inserisci il tipo ruold"
          rules={[{ required: true, message: "Il tipo ruolo è obbligatorio" }]}
        >
          <Select
            defaultValue="---"
            options={[
              { value: "---", label: "---" },
              { value: "1", label: "Contraente" },
              { value: "2", label: "Assicurato" },
              { value: "3", label: "Proprietario" },
            ]}
          />
        </FormInput>
        <RowSpacer />

        {/* più i campi nella struttura anagrafica nel relativo documento*/}
      </Row>
    </div>
  );
};

export default TabSubject;
