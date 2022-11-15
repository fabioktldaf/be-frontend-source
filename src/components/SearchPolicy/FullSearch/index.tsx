import React from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { Col, Row, RowSpacer } from "../../../style/containers";

import styled from "styled-components";

const FormFullSearch = styled(Form)`
  padding-top: 2em;
  flex: 1;
`;

const FormInput = styled(Form.Item)`
  flex: 1;
`;

const FullSearch = () => {
  return (
    <FormFullSearch>
      <Row>
        <FormInput name="text-query" rules={[{ pattern: new RegExp("^[a-zA-Z0-9_ ]*$"), message: "No special chars" }]}>
          <Input placeholder="type..." />
        </FormInput>
        <RowSpacer />
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Search
          </Button>
        </Form.Item>
      </Row>
    </FormFullSearch>
  );
};

export default FullSearch;
