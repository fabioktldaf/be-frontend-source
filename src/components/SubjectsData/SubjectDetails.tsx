import React from "react";
import { Button, Tabs, Tooltip } from "antd";
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
import { Col } from "../../style/containers";
import { IconUsers } from "../../config/icons";

const SubjectDetails = () => {
  const { t } = useTranslation();
  const app = useApplication();
  const { subject, readOnly } = useSelector((state: RootState) => state.subjects.editing);

  const handleOnChange = (value: any, field: string) => {
    //
  };

  const naturalPerson = subject?.person as SubjectNaturalPersonData;
  const giuridicalPerson = subject?.person as SubjectGiuridicalPersonData;

  let title = "Anagrafica - ";
  if (naturalPerson?.name?.length > 0) title += "persona fisica";
  if (giuridicalPerson?.business_name?.length > 0) title += "persona giuridica";
  if (giuridicalPerson?.isProprietorship) title += " (ditta individuale)";

  return (
    <Col>
      <MainForm
        icon={<IconUsers />}
        title={title}
        actions={[{ label: "salva", execute: () => console.log("saving natural person") }]}
      >
        <Tabs
          defaultActiveKey="1"
          tabPosition="left"
          items={[
            {
              label: <>Soggetto</>,
              key: "1",
              children: (
                <SubjectDetailsSubject
                  subject={subject}
                  app={app}
                  readOnly={readOnly}
                  t={t}
                  onChange={handleOnChange}
                />
              ),
            },
            {
              label: <>Contatti</>,
              key: "2",
              children: (
                <SubjectDetailsContacts
                  subject={subject}
                  app={app}
                  readOnly={readOnly}
                  t={t}
                  onChange={handleOnChange}
                />
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
    </Col>
  );
};

export default SubjectDetails;
