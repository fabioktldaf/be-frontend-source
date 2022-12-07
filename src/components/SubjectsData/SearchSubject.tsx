import React from "react";
import { Input, Spin } from "antd";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import useApplication from "../../hooks/useApplication";

const SearchButton = styled.div`
  button {
    width: 100px;

    .ant-spin {
      margin-top: 9px;
    }
  }
`;

const SearchSubject = () => {
  const { t } = useTranslation();
  const app = useApplication();
  const isSearching = useSelector((state: RootState) => state.subjects.search.isSearching);

  return (
    <SearchButton>
      <Input.Search
        placeholder={t("search-subject-btn-placeholder") as string}
        allowClear
        enterButton={isSearching ? <Spin /> : t("search")}
        size="large"
        onSearch={(term) => app.searchSubject(term)}
        disabled={isSearching}
      />
    </SearchButton>
  );
};

export default SearchSubject;
