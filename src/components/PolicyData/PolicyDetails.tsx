import React from "react";
import { Button, Tabs, Tooltip } from "antd";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import useApplication from "../../hooks/useApplication";
import { MainForm } from "../Layout/Forms";
import { IconDocument } from "../../config/icons";
import PolicyData from "./PolicyData";
import PolicyGoodInsured from "./PolicyGoodInsured";
import PolicyGuarantees from "./PolicyGuarantees";
import PolicySubject from "./PolicySubject";
import { Col } from "../../style/containers";

const PolicyDetails = () => {
  const { t } = useTranslation();
  const app = useApplication();
  const { policy, readOnly } = useSelector((state: RootState) => state.policies.editing);

  const handleOnChange = (value: any, field: string) => {
    //
  };

  const title = `Edit polizza N° ${policy?.policyData?.number}`;

  return (
    <Col>
      <MainForm
        icon={<IconDocument />}
        title={title}
        actions={[{ label: "salva", execute: () => console.log("saving policy") }]}
      >
        <Tabs
          defaultActiveKey="1"
          tabPosition="left"
          items={[
            {
              label: <>Dati Polizza</>,
              key: "1",
              children: <PolicyData policy={policy} app={app} readOnly={readOnly} t={t} onChange={handleOnChange} />,
            },
            {
              label: <>Beni Assicurati</>,
              key: "2",
              children: (
                <PolicyGoodInsured policy={policy} app={app} readOnly={readOnly} t={t} onChange={handleOnChange} />
              ),
            },
            {
              label: <>Garanzie</>,
              key: "3",
              children: (
                <PolicyGuarantees policy={policy} app={app} readOnly={readOnly} t={t} onChange={handleOnChange} />
              ),
            },
            {
              label: <>Soggetti</>,
              key: "4",
              children: <PolicySubject policy={policy} app={app} readOnly={readOnly} t={t} onChange={handleOnChange} />,
            },
          ]}
        />
      </MainForm>
    </Col>
  );
};

export default PolicyDetails;
