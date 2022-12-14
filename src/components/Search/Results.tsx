import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import {
  SearchResultItem,
  SearchResultItemClaim,
  SearchResultItemPolicy,
  SearchResultItemSubjectGiuridicaPerson,
  SearchResultItemSubjectNaturalPerson,
  SearchResultOnSelectTypes,
  SearchTypes,
} from "../../types/search.types";
import { IconBetween, IconBusiness, IconCar, IconDocument, IconFlash, IconUser } from "../../config/icons";
import { ButtonConfirm } from "../Layout/Buttons";
import { IoMdAddCircleOutline } from "react-icons/io";
import SubjectEditModal from "../SubjectsData/SubjectEditModal";
import { EditingSubjectState } from "../../types/uses-data.types";
import useApplication from "../../hooks/useApplication";

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
  onSelect: (value: any, type: SearchResultOnSelectTypes) => void;
  type: SearchTypes;
}

const Results = (props: ResultsProps) => {
  //const app = useApplication();
  const { t } = useTranslation();
  const { isSearching, resultsGeneric: results } = useSelector((state: RootState) => state.search);

  const renderClaims = (claims: SearchResultItemClaim[]) => {
    return claims.map(({ created, received }, i) => (
      <ResultItemClaim key={i}>
        {created && (
          <ResultItemClaimItem>
            <IconFlash style={{ fontSize: "1.4em" }} />
            sinistro n??
            <span style={{ margin: "0 0 0 0.25em", cursor: "pointer", textDecoration: "underline" }}>
              {created.number}
            </span>
            <span style={{ marginLeft: "2em" }}>
              accaduto il {created.occurrenceDate} - {created.occurrenceTime}
            </span>
          </ResultItemClaimItem>
        )}
      </ResultItemClaim>
    ));
  };

  const renderPolicies = (policies: SearchResultItemPolicy[]) => {
    return policies?.map((policy, i) => {
      return (
        <ResultItemPolicy key={i}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <IconDocument style={{ color: "#aaa", fontSize: "1.4em", margin: "-5px 0.25em 0 0 " }} />
            n??
            <span
              style={{ margin: "0 2em 0 0.5em", width: "12em", cursor: "pointer", textDecoration: "underline" }}
              onClick={() => props.onSelect(policy.id, "policy-selected")}
            >
              {policy.policy_number}
            </span>
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
              <ButtonConfirm
                size="small"
                onClick={() => {
                  props.onSelect(policy.id, "new-claim");
                }}
                style={{ fontSize: "0.8em" }}
              >
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

  const renderItemGeneric = (item: SearchResultItem, key: any) => {
    const naturalPerson = item.subject as SearchResultItemSubjectNaturalPerson;
    const giuridicalPerson = item.subject as SearchResultItemSubjectGiuridicaPerson;

    const isNaturalPerson = naturalPerson?.fiscalCode;
    const isGiuridicalPerson = giuridicalPerson?.pIva;

    const { name, lastname, fiscalCode } = naturalPerson;
    const { business_name, type, pIva } = giuridicalPerson;

    return (
      <ResultItem key={key}>
        <ResultItemSubject>
          {isNaturalPerson && (
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
              <span
                style={{ fontSize: "1.2em", fontWeight: "400", cursor: "pointer", textDecoration: "underline" }}
                onClick={() => props.onSelect(item.subject, "subject-selected")}
              >
                {name} {lastname}
              </span>
              <span style={{ marginLeft: "2em", fontSize: "1.2em", fontWeight: "400" }}>{fiscalCode}</span>
            </>
          )}

          {isGiuridicalPerson && (
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
              <span
                style={{ fontSize: "1.2em", fontWeight: "400", cursor: "pointer", textDecoration: "underline" }}
                onClick={() => props.onSelect(item.subject, "subject-selected")}
              >
                {business_name} {type}
              </span>
              <span style={{ marginLeft: "2em", fontSize: "1.2em", fontWeight: "400" }}>{pIva}</span>
            </>
          )}
          <div style={{ display: "flex", flex: 1, alignItems: "center", justifyContent: "flex-end" }}>
            <ButtonConfirm
              size="small"
              onClick={() => {
                props.onSelect(item.subject.id, "new-policy");
              }}
              style={{ fontSize: "0.8em" }}
            >
              <div style={{ display: "flex", width: "7em", justifyContent: "center" }}>
                <IoMdAddCircleOutline style={{ fontSize: "1.4em", marginRight: "0.25em" }} /> Polizza
              </div>
            </ButtonConfirm>
          </div>
        </ResultItemSubject>
        <ResultItemPolicies>{item.policies?.length > 0 && renderPolicies(item.policies)}</ResultItemPolicies>
      </ResultItem>
    );
  };

  const renderItemSubject = (item: SearchResultItem, key: any) => {
    const naturalPerson = item.subject as SearchResultItemSubjectNaturalPerson;
    const giuridicalPerson = item.subject as SearchResultItemSubjectGiuridicaPerson;

    const isNaturalPerson = naturalPerson?.fiscalCode;
    const isGiuridicalPerson = giuridicalPerson?.pIva;

    const { name, lastname, fiscalCode } = naturalPerson;
    const { business_name, type, pIva } = giuridicalPerson;

    return (
      <ResultItem
        key={key}
        style={{ cursor: "pointer" }}
        onClick={() => props.onSelect(item.subject.id, "subject-selected")}
      >
        <ResultItemSubject>
          {isNaturalPerson && (
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
              <span style={{ fontSize: "1.2em", fontWeight: "400" }}>
                {name} {lastname}
              </span>
              <span style={{ marginLeft: "2em", fontSize: "1.2em", fontWeight: "400" }}>{fiscalCode}</span>
            </>
          )}

          {isGiuridicalPerson && (
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
              <span style={{ fontSize: "1.2em", fontWeight: "400" }}>
                {business_name} {type}
              </span>
              <span style={{ marginLeft: "2em", fontSize: "1.2em", fontWeight: "400" }}>{pIva}</span>
            </>
          )}
        </ResultItemSubject>
      </ResultItem>
    );
  };

  return (
    <>
      {/* <SubjectEditModal
        isOpen={editingSubject?.modalOpen}
        subjectId={editingSubject?.subjectId}
        type={editingSubject?.type}
        onOk={() => {}}
        onCancel={() => handleCloseEditingSubject()}
      /> */}
      {isSearching ? (
        <></>
      ) : (
        <ResultsContainer>
          {results?.map((item, i) => {
            return props.type === "generic" ? (
              renderItemGeneric(item, i)
            ) : props.type === "subject" ? (
              renderItemSubject(item, i)
            ) : (
              <></>
            );
          })}
        </ResultsContainer>
      )}
    </>
  );
};

export default Results;
