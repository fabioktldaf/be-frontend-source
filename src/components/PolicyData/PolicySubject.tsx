import { Modal } from "antd";
import { TFunction } from "i18next";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { IApplication } from "../../application";
import useApplication from "../../hooks/useApplication";
import { FormContentTab, FormInput, FormRow } from "../../style/form";
import { EditingPolicySubjectState, PolicyDataType, PolicySubjectTypes } from "../../types/policy.types";
import {
  EditingSubjectState,
  SubjectGiuridicalPersonData,
  SubjectNaturalPersonData,
} from "../../types/uses-data.types";
import { ButtonConfirm, ButtonDelete } from "../Layout/Buttons";
import Search from "../Search";
import SubjectEditModal from "../SubjectsData/SubjectEditModal";

const SubjectItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  margin-bottom: 1em;
  label {
    margin-right: 2em;
    width: 10em;
  }
`;

interface PolicySubjectProps {
  policy?: PolicyDataType;
  app: IApplication;
  readOnly?: boolean;
  t: TFunction<"translation", undefined>;
  onChange: (value: any, field: string) => void;
}

const PolicySubject = (props: PolicySubjectProps) => {
  const { policy } = props;
  const beneficiary = policy?.subject?.beneficiary;
  const contractor = policy?.subject.contractor;
  const driver = policy?.subject.driver;
  const insured = policy?.subject.insured;
  const owner = policy?.subject.owner;

  const app = useApplication();
  const [editingSubject, setEditingSubject] = useState<EditingPolicySubjectState | undefined>();
  const [isOpenSearchSubjectModal, setIsOpenSearchSubjectModal] = useState(false);

  const handleChangeData = (value: any, field: string) => {
    //
    console.log("updateing ", field);
    console.log("value ", value);
  };

  const handleEditSubject = (id: string) => {
    console.log("editing subject id ", id);
    const updatedEditingSubject = Object.assign({}, editingSubject);
    updatedEditingSubject.id = id;
    updatedEditingSubject.type = "";
    updatedEditingSubject.modalOpen = true;
    setEditingSubject(updatedEditingSubject);
  };

  const handleCloseEditingSubject = () => {
    const updatedEditingSubject = Object.assign({}, editingSubject);
    updatedEditingSubject.modalOpen = false;
    setEditingSubject(updatedEditingSubject);
  };

  const handleChangeSubject = (
    subject: undefined | SubjectNaturalPersonData | SubjectGiuridicalPersonData,
    type: PolicySubjectTypes
  ) => {
    console.log("subject ", subject);
    console.log("type ", type);

    app.updatePolicySubject(subject, type);
  };

  const handleSearchSubject = (type: PolicySubjectTypes) => {
    const updatedEditingSubject = Object.assign({}, editingSubject);
    updatedEditingSubject.type = type;
    setEditingSubject(updatedEditingSubject);

    app.clearSearchSubject();
    setIsOpenSearchSubjectModal(true);
  };

  const handleSelectSubject = async (data: any) => {
    if (!data || !data.id || data.length < 1) return;

    const subjectData = await app.retrieveSubject(data.id);
    let subject: undefined | SubjectNaturalPersonData | SubjectGiuridicalPersonData;

    const subjectNaturalPerson = subjectData as SubjectNaturalPersonData;
    const subjectGiuridicalPerson = subjectData as SubjectGiuridicalPersonData;

    if (subjectNaturalPerson.fiscalCode) {
      subject = subjectNaturalPerson;
    } else if (subjectGiuridicalPerson.pIva) {
      subject = subjectGiuridicalPerson;
    }

    handleChangeSubject(subject, editingSubject?.type || "");
    setIsOpenSearchSubjectModal(false);
  };

  const getSubjectDetails = (subject: undefined | SubjectNaturalPersonData | SubjectGiuridicalPersonData) => {
    let details = "";
    const naturalPerson = subject as SubjectNaturalPersonData;
    const giuridicalPerson = subject as SubjectGiuridicalPersonData;

    if (naturalPerson?.fiscalCode) {
      details = `${naturalPerson.name} ${naturalPerson.lastname} ${naturalPerson.fiscalCode}`;
    } else if (giuridicalPerson?.pIva) {
      details = `${giuridicalPerson.business_name} ${giuridicalPerson.pIva}`;
    }

    return details;
  };

  const renderSubject = (
    label: string,
    subject: undefined | SubjectNaturalPersonData | SubjectGiuridicalPersonData,
    type: PolicySubjectTypes
  ) => {
    const details = getSubjectDetails(subject);
    return (
      <SubjectItem>
        <label>{label}: </label>

        {!!subject && (
          <>
            <Link to={"#"} onClick={() => handleEditSubject(subject.id)} style={{ flex: 1 }}>
              {details}
            </Link>
            <ButtonDelete children={"elimina"} onClick={() => handleChangeSubject(undefined, type)} />
          </>
        )}
        {!details && <ButtonConfirm children={"Seleziona"} onClick={() => handleSearchSubject(type)} />}
      </SubjectItem>
    );
  };

  return (
    <>
      <FormContentTab>
        {renderSubject("Contraente", contractor, "contractor")}
        {renderSubject("Assicurato", insured, "insured")}
        {renderSubject("Proprietario", owner, "owner")}
        {renderSubject("Beneficiario", beneficiary, "beneficiary")}
        {renderSubject("Conducente", driver, "driver")}
      </FormContentTab>

      <SubjectEditModal
        isOpen={editingSubject?.modalOpen}
        id={editingSubject?.id}
        onOk={() => {}}
        onCancel={() => handleCloseEditingSubject()}
      />

      <Modal
        open={isOpenSearchSubjectModal}
        onCancel={() => setIsOpenSearchSubjectModal(false)}
        width="1000px"
        footer={null}
      >
        <div style={{ padding: "3em 2em 2em 2em" }}>
          <Search
            type="subject"
            onSelect={(data) => {
              handleSelectSubject(data);
            }}
          />
        </div>
      </Modal>
    </>
  );
};

export default PolicySubject;
