import React from "react";
import { Button, Checkbox, Form, Input, DatePicker, Tabs } from "antd";
import { Col, Row, RowSpacer, CenteredRow } from "../Containers";
import TabPolicy from "./TabPolicy";
import TabInsuredAsset from "./TabInsuredAsset";
import TabGarantees from "./TabGarantees";
import TabSubject from "./TabSubject";

import styled from "styled-components";

const FormInsertPolicy = styled(Form)`
  flex: 1;
  padding-top: 2em;
`;

const FormInput = styled(Form.Item)`
  flex: 1;
`;

const FormDatePicker = styled(DatePicker)`
  flex: 1;
`;

const PolicyManualInsert = () => {
  return (
    <FormInsertPolicy layout="vertical">
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="Polizza" key="1">
          <TabPolicy />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Bene Assicurato" key="2">
          <TabInsuredAsset />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Garanzie" key="3">
          <TabGarantees />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Soggetto" key="4">
          <TabSubject />
        </Tabs.TabPane>
      </Tabs>

      <Button type="primary">Save</Button>
    </FormInsertPolicy>
  );
};

export default PolicyManualInsert;
