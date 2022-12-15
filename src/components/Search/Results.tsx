import React from "react";
import { Button, Input, Spin } from "antd";
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
import { IconBetween, IconBusiness, IconCar, IconDocument, IconFlash, IconUser } from "../../config/icons";
import { ButtonConfirm } from "../Layout/Buttons";
import { GrAddCircle } from "react-icons/gr";
import { IoMdAddCircleOutline } from "react-icons/io";

const ResultsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: white;
  padding: 1em 2em;
  font-weight: 200;
`;

const ResultItem = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1em;
  padding: 1em;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const ResultItemSubject = styled.div`
  display: flex;
  align-items: center;
`;

const ResultItemPolicies = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 5em;
  border-left: 5px solid #eee;
  margin-left: 7px;
  border-bottom: 5px solid #eee;
  border-bottom-left-radius: 1em;
`;

const ResultItemPolicy = styled.div`
  margin-top: 1em;
  padding-bottom: 1em;
  border-bottom: 1px solid #eee;

  &:last-child {
    border: none;
  }
`;

const ResultItemClaims = styled.div`
  padding: 0.5em 0 0 5em;
`;

const ResultItemClaim = styled.div``;

const ResultItemClaimItem = styled.div`
  display: flex;
  align-items: center;
`;

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
            <IconFlash style={{ fontSize: "1.4em" }} />
            <span>sinistro n° {created.number}</span>
            <span style={{ marginLeft: "2em" }}>
              accaduto il {created.occurrenceDate} - {created.occurrenceTime}
            </span>
          </ResultItemClaimItem>
        )}
        {/* {received && (
          <ResultItemClaimItem>
            <span>{received.number}</span>
            <span>{received.occurrenceDate}</span>
            <span>{received.occurrenceTime}</span>
          </ResultItemClaimItem>
        )} */}
      </ResultItemClaim>
    ));
  };

  const renderPolicies = (policies: SearchResultItemPolicy[]) => {
    return policies?.map((policy, i) => {
      return (
        <ResultItemPolicy key={i}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <IconDocument style={{ color: "#aaa", fontSize: "1.4em", margin: "-5px 0.5em 0 0 " }} />

            <span style={{ marginRight: "2em", width: "12em" }}>N° {policy.policy_number}</span>
            <span>{policy.effect_date}</span>
            <IconBetween style={{ color: "#aaa", fontSize: "1.4em", margin: "0 0.25em" }} />
            <span>{policy.expiration_date}</span>
            <div
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                paddingRight: "1em",
              }}
            >
              {policy.vehicle?.plate.number && (
                <>
                  <IconCar style={{ color: "#aaa", fontSize: "1.2em", margin: "-3px 0.5em 0 2em" }} />
                  <span>{policy.vehicle?.plate.number}</span>
                </>
              )}
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
              <ButtonConfirm size="small" onClick={() => {}} style={{ fontSize: "0.8em" }}>
                <div style={{ display: "flex", width: "7em", justifyContent: "center" }}>
                  <IoMdAddCircleOutline style={{ fontSize: "1.4em", marginRight: "0.25em" }} /> Sinistro
                </div>
              </ButtonConfirm>
            </div>
          </div>
          <ResultItemClaims>{renderClaims(policy.claims || [])}</ResultItemClaims>
        </ResultItemPolicy>
      );
    });
  };

  const renderNaturalPerson = (person: SearchResultItemSubjectNaturalPerson) => {
    const { name, lastname, fiscalCode } = person;
    return (
      <>
        <div
          style={{
            backgroundColor: "#ddd",
            borderRadius: "10em",
            width: "36px",
            height: "36px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginLeft: "-8px",
            paddingLeft: "8px",
            marginRight: "1em",
          }}
        >
          <IconUser
            style={{
              color: "#fff",
              fontSize: "1.4em",
              marginRight: "0.5em",
            }}
          />
        </div>
        <span>
          {name} {lastname}
        </span>
        <span style={{ marginLeft: "2em" }}>{fiscalCode}</span>
        <div style={{ display: "flex", flex: 1, alignItems: "center", justifyContent: "flex-end" }}>
          <ButtonConfirm size="small" onClick={() => {}} style={{ fontSize: "0.8em" }}>
            <div style={{ display: "flex", width: "7em", justifyContent: "center" }}>
              <IoMdAddCircleOutline style={{ fontSize: "1.4em", marginRight: "0.25em" }} /> Polizza
            </div>
          </ButtonConfirm>
        </div>
      </>
    );
  };

  const renderGiuridicalPerson = (person: SearchResultItemSubjectGiuridicaPerson) => {
    const { business_name, type, p_iva } = person;
    return (
      <>
        <div
          style={{
            backgroundColor: "#ddd",
            borderRadius: "10em",
            width: "36px",
            height: "36px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginLeft: "-8px",
            paddingLeft: "8px",
            marginRight: "1em",
          }}
        >
          <IconBusiness
            style={{
              color: "#fff",
              fontSize: "1.4em",
              marginRight: "0.5em",
            }}
          />
        </div>
        <span>
          {business_name} {type}
        </span>
        <span style={{ marginLeft: "2em" }}>{p_iva}</span>
        <div style={{ display: "flex", flex: 1, alignItems: "center", justifyContent: "flex-end" }}>
          <ButtonConfirm size="small" onClick={() => {}} style={{ fontSize: "0.8em" }}>
            <div style={{ display: "flex", width: "7em", justifyContent: "center" }}>
              <IoMdAddCircleOutline style={{ fontSize: "1.4em", marginRight: "0.25em" }} /> Polizza
            </div>
          </ButtonConfirm>
        </div>
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
