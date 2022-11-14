import React from "react";
import { Select } from "antd";
import { languages, defaultLanguage } from "../../config/const";
import useApplication from "../../hooks/useApplication";
import styled from "styled-components";

const LanguageSelector = styled.div``;

const LanguageSelect = () => {
  const options = languages.map((lang) => ({ value: lang, label: lang }));

  const application = useApplication();

  return (
    <LanguageSelector>
      <Select size="small" defaultValue={defaultLanguage} options={options} onChange={application.changeLanguage} />
    </LanguageSelector>
  );
};

export default LanguageSelect;
