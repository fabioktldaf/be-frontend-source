import React from "react";
import { Button, Checkbox, Form, Input, Tabs } from "antd";
import FullSearch from "./FullSearch";
import SearchByFields from "./SearchByFields";
import PolicyManualInsert from "../PolicyManualInsert";

import styled from "styled-components";

const SearchPolicyContainer = styled.div`
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

const SearchPolicy = () => {
  return (
    <SearchPolicyContainer>
      <h2>Get a Policy by</h2>
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="Full Text" key="1">
          <FullSearch />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Fields" key="2">
          <SearchByFields />
        </Tabs.TabPane>
        <Tabs.TabPane tab="SITA" key="3">
          Coming Soon...
        </Tabs.TabPane>
        <Tabs.TabPane tab="Manual Insert" key="4">
          <PolicyManualInsert />
        </Tabs.TabPane>
      </Tabs>
    </SearchPolicyContainer>
  );
};

export default SearchPolicy;
