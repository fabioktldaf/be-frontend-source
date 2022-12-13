import React from "react";
import { Input, Spin } from "antd";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import useApplication from "../../hooks/useApplication";
import { SubjectData, SubjectGiuridicalPersonData, SubjectNaturalPersonData } from "../../types/uses-data.types";

const ResultsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: white;
  padding: 1em 2em;
`;

const SubjectItem = styled.div`
  display: flex;
  margin: 0.5em;
  padding: 0 1em;

  &:hover {
    cursor: pointer;
    background-color: #eee;
  }
`;

const SubjectItemField = styled.div`
  margin-right: 1em;
`;

interface ResultsProps {
  onSelect: (subject: SubjectData) => void;
}

const Results = (props: ResultsProps) => {
  const { t } = useTranslation();
  const app = useApplication();
  const { isSearching, results } = useSelector((state: RootState) => state.search);

  const renderNaturalPerson = (person: SubjectNaturalPersonData) => {
    const { name, lastname, fiscalCode } = person;
    return (
      <>
        <SubjectItemField>{name}</SubjectItemField>
        <SubjectItemField>{lastname}</SubjectItemField>
        <SubjectItemField>{fiscalCode}</SubjectItemField>
      </>
    );
  };

  const renderGiuridicalPerson = (person: SubjectGiuridicalPersonData) => {
    const { business_name, type, p_iva } = person;
    return (
      <>
        <SubjectItemField>{business_name}</SubjectItemField>
        <SubjectItemField>{type}</SubjectItemField>
        <SubjectItemField>{p_iva}</SubjectItemField>
      </>
    );
  };

  const renderSubject = (subject: SubjectData, key: any) => {
    const naturalPerson = subject.person as SubjectNaturalPersonData;
    const giuridicalPerson = subject.person as SubjectGiuridicalPersonData;

    const isNaturalPerson = naturalPerson?.name?.length > 0 || naturalPerson?.lastname?.length > 0;

    return (
      <SubjectItem key={key} onClick={() => props.onSelect(subject)}>
        {isNaturalPerson ? renderNaturalPerson(naturalPerson) : renderGiuridicalPerson(giuridicalPerson)}
      </SubjectItem>
    );
  };

  return isSearching ? (
    <></>
  ) : (
    <ResultsContainer>{results.map((subject, i) => renderSubject(subject, i))}</ResultsContainer>
  );
};

export default Results;
