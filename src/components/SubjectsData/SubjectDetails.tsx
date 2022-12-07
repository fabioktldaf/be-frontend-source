import React from "react";
import { Tabs, Tooltip } from "antd";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import useApplication from "../../hooks/useApplication";
import { MainForm } from "../Layout/Forms";
import { SubjectGiuridicalPersonData, SubjectNaturalPersonData } from "../../types/uses-data.types";
import SubjectDetailsSubject from "./SubjectDetailsSubject";
import SubjectDetailsDocuments from "./SubjectDetailsDocuments";
import SubjectDetailsAddresses from "./SubjectDetailsAddresses";
import SubjectDetailsContacts from "./SubjectDetailsContacts";

type subectType = "natural" | "business" | "proprietorship";

const SubjectDetails = () => {
  const { t } = useTranslation();
  const app = useApplication();
  const { subject, readOnly } = useSelector((state: RootState) => state.subjects.editing);

  const handleOnChange = (value: any, field: string) => {
    //
  };

  const title = <> {readOnly ? "Dati in sola lettura" : "Dati modificabili"}</>;
  const actions = [
    {
      label: "Salva",
      icon: <></>,
      execute: () => {
        console.log("salva");
      },
    },
  ];

  return (
    <MainForm title={title} actions={actions}>
      <Tabs
        defaultActiveKey="1"
        tabPosition="left"
        items={[
          {
            label: <>Soggetto</>,
            key: "1",
            children: (
              <SubjectDetailsSubject subject={subject} app={app} readOnly={readOnly} t={t} onChange={handleOnChange} />
            ),
          },
          {
            label: <>Contatti</>,
            key: "2",
            children: (
              <SubjectDetailsContacts subject={subject} app={app} readOnly={readOnly} t={t} onChange={handleOnChange} />
            ),
          },
          {
            label: <>Indirizzi</>,
            key: "3",
            children: (
              <SubjectDetailsAddresses
                subject={subject}
                app={app}
                readOnly={readOnly}
                t={t}
                onChange={handleOnChange}
              />
            ),
          },
          {
            label: <>Documenti</>,
            key: "4",
            children: (
              <SubjectDetailsDocuments
                subject={subject}
                app={app}
                readOnly={readOnly}
                t={t}
                onChange={handleOnChange}
              />
            ),
          },
        ]}
      />
    </MainForm>
  );
};

export default SubjectDetails;
