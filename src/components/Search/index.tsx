import { Tabs } from "antd";
import React from "react";
import { Col } from "../../style/containers";
import styled from "styled-components";

const SearchContainer = styled.div`
  width: 900px;
  background-color: white;

  .ant-tabs-nav-wrap {
    justify-content: center;
  }
`;

const Search = () => {
  return (
    <SearchContainer>
      <Tabs
        defaultActiveKey="1"
        tabPosition="top"
        items={[
          {
            label: "Fulltext",
            key: "1",
            children: <>fulltext</>,
          },
          { label: "Filtri", key: "2", children: <>per campi</> },
        ]}
      />
    </SearchContainer>
  );
};

export default Search;
