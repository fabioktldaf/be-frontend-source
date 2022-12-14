import React from "react";
import { Input, Spin } from "antd";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import useApplication from "../../hooks/useApplication";
import { SubjectData, SubjectGiuridicalPersonData, SubjectNaturalPersonData } from "../../types/uses-data.types";
import {
  SearchResultItem,
  SearchResultItemClaim,
  SearchResultItemPolicy,
  SearchResultItemSubjectGiuridicaPerson,
  SearchResultItemSubjectNaturalPerson,
} from "../../types/search.types";

const ResultsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: white;
  padding: 1em 2em;
`;

const ResultItem = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0.5em;
  padding: 0 1em;
`;

const ResultItemSubject = styled.div`
  display: flex;

  span {
    margin-right: 1em;
  }
`;

const ResultItemPolicies = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 10em;
`;

const ResultItemPolicy = styled.div`
  span {
    padding: 0 1em;
  }
`;

const ResultItemClaims = styled.div`
  padding-left: 10em;
`;

const ResultItemClaim = styled.div``;

const ResultItemClaimItem = styled.div``;

interface ResultsProps {
  onSelect: (item: SearchResultItem) => void;
}

const Results = (props: ResultsProps) => {
  const { t } = useTranslation();
  const app = useApplication();
  const { isSearching, results } = useSelector((state: RootState) => state.search);

  const renderClaims = (claims: SearchResultItemClaim[]) => {
    return claims.map(({ created, received }, i) => (
      <ResultItemClaim key={i}>
        {created && (
          <ResultItemClaimItem>
            <span>{created.number}</span>
            <span>{created.occurrenceDate}</span>
            <span>{created.occurrenceTime}</span>
          </ResultItemClaimItem>
        )}
        {received && (
          <ResultItemClaimItem>
            <span>{received.number}</span>
            <span>{received.occurrenceDate}</span>
            <span>{received.occurrenceTime}</span>
          </ResultItemClaimItem>
        )}
      </ResultItemClaim>
    ));
  };

  const renderPolicies = (policies: SearchResultItemPolicy[]) => {
    return policies?.map((policy, i) => {
      return (
        <ResultItemPolicy key={i}>
          <span>{policy.policy_number}</span>
          <span>{policy.effect_date}</span>
          <span>{policy.expiration_date}</span>
          <ResultItemClaims>{renderClaims(policy.claims || [])}</ResultItemClaims>
        </ResultItemPolicy>
      );
    });
  };

  const renderNaturalPerson = (person: SearchResultItemSubjectNaturalPerson) => {
    const { name, lastname, fiscalCode } = person;
    return (
      <>
        <span>{name}</span>
        <span>{lastname}</span>
        <span>{fiscalCode}</span>
      </>
    );
  };

  const renderGiuridicalPerson = (person: SearchResultItemSubjectGiuridicaPerson) => {
    const { business_name, type, p_iva } = person;
    return (
      <>
        <span>{business_name}</span>
        <span>{type}</span>
        <span>{p_iva}</span>
      </>
    );
  };

  const renderItem = (item: SearchResultItem, key: any) => {
    const naturalPerson = item.subject as SearchResultItemSubjectNaturalPerson;
    const giuridicalPerson = item.subject as SearchResultItemSubjectGiuridicaPerson;

    const isNaturalPerson = naturalPerson?.name?.length > 0 || naturalPerson?.lastname?.length > 0;

    return (
      <ResultItem key={key} onClick={() => props.onSelect(item)}>
        <ResultItemSubject>
          {isNaturalPerson ? renderNaturalPerson(naturalPerson) : renderGiuridicalPerson(giuridicalPerson)}
        </ResultItemSubject>
        <ResultItemPolicies>{item.policies?.length > 0 && renderPolicies(item.policies)}</ResultItemPolicies>
      </ResultItem>
    );
  };

  return isSearching ? <></> : <ResultsContainer>{results.map((item, i) => renderItem(item, i))}</ResultsContainer>;
};

export default Results;
