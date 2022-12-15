import React, { useState } from "react";
import { Input, Spin, Tabs } from "antd";
import { Col, RowSpacer } from "../../style/containers";
import styled from "styled-components";
import { MainForm } from "../Layout/Forms";
import { IconSearch, IconUser } from "../../config/icons";
import { useTranslation } from "react-i18next";
import useApplication from "../../hooks/useApplication";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import Results from "./Results";
import { FormRow } from "../../style/form";
import { InputTextStyled, SegmentedStyled } from "../../style/Input";
import { SearchParams } from "../../types/search.types";
import { PersonType } from "../../types/new-claim.types";
import { ButtonCancel, ButtonConfirm } from "../Layout/Buttons";
import { GrAddCircle } from "react-icons/gr";
import { IoMdAddCircleOutline } from "react-icons/io";

const SearchContainer = styled.div`
  padding: 2em 2em 0 0;
  min-height: 30em;
  display: flex;
  flex-direction: column;
`;

const Search = () => {
  const { t } = useTranslation();
  const app = useApplication();
  const [searchTitle, setSearchTitle] = useState("Ricerca Generica Fulltext");
  const isSearching = useSelector((state: RootState) => state.search.isSearching);
  const [searchParams, setSearchParams] = useState<SearchParams>({
    term: "",
    type: "generic",
  });
  const [subjectType, setSubjectType] = useState<PersonType>("Fisica");

  const handleChangeParams = (val: any, field: string) => {
    const updatedParams = JSON.parse(JSON.stringify(searchParams)) as SearchParams;

    switch (field) {
      case "subject-type":
        setSubjectType(val);
        break;
      case "term":
        updatedParams.term = val;
        updatedParams.type = "generic";
        break;
      case "vehicle-plate":
        updatedParams.byVehicle = Object.assign({}, updatedParams.byVehicle, { plate: val });
        updatedParams.type = "vehicle";
        break;
      case "nominative":
        updatedParams.bySubject = Object.assign({}, updatedParams.bySubject, { nominative: val });
        break;
      case "fiscal-code":
        updatedParams.bySubject = Object.assign({}, updatedParams.bySubject, { fiscalCode: val });
        break;
      case "business-name":
        updatedParams.bySubject = Object.assign({}, updatedParams.bySubject, { businessName: val });
        break;
      case "p-iva":
        updatedParams.bySubject = Object.assign({}, updatedParams.bySubject, { pIva: val });
        break;
      case "doc-number":
        updatedParams.bySubject = Object.assign({}, updatedParams.bySubject, { documentNumber: val });
        break;
      case "phone":
        updatedParams.bySubject = Object.assign({}, updatedParams.bySubject, { phone: val });
        break;
      case "email":
        updatedParams.bySubject = Object.assign({}, updatedParams.bySubject, { email: val });
        break;
      case "policy-number":
        updatedParams.byPolicy = Object.assign({}, updatedParams.byPolicy, { policyNumber: val });
        break;
      case "claim-number":
        updatedParams.byClaim = Object.assign({}, updatedParams.byClaim, { claimNumber: val });
        break;
    }

    setSearchParams(updatedParams);
  };

  const handleResetSearch = () => {
    app.search.clear();
    setSearchParams({
      term: "",
      type: "generic",
    });
  };

  const renderSearchButtons = () => (
    <>
      <div style={{ flex: 1 }}></div>
      <FormRow style={{ justifyContent: "center", padding: "1em 0" }}>
        {isSearching ? (
          <Spin />
        ) : (
          <>
            <ButtonConfirm children={t("search") || ""} onClick={() => app.search.search(searchParams)} />
            <div style={{ width: "1em", height: "1em" }}></div>
            <ButtonCancel children={"Reset"} onClick={() => handleResetSearch()} />
          </>
        )}
      </FormRow>
    </>
  );

  const items = [
    {
      label: "Fulltext",
      key: "1",
      children: (
        <SearchContainer>
          <FormRow>
            <InputTextStyled
              label="Ricerca Generica"
              tooltip="Ricerca per qualsiasi campo"
              placeholder="inserisci dati generici..."
              onChange={(term) => handleChangeParams(term, "tem")}
            />
          </FormRow>

          {renderSearchButtons()}
        </SearchContainer>
      ),
      type: "fulltext",
    },
    {
      label: "Veicolo",
      key: "2",
      children: (
        <SearchContainer>
          <FormRow>
            <InputTextStyled
              label="Targa"
              tooltip="Ricerca per targa"
              placeholder="inserisci la targa..."
              onChange={(plate) => handleChangeParams(plate, "vehicle-plate")}
            />
          </FormRow>

          {renderSearchButtons()}
        </SearchContainer>
      ),
      type: "vehicle",
    },
    {
      label: "Soggetto",
      key: "3",
      children: (
        <SearchContainer>
          <FormRow>
            <SegmentedStyled
              label="Tipo Soggetto"
              tooltip="Seleziona il tipo di soggetto"
              options={["Fisica", "Giuridica"]}
              value={subjectType}
              onChange={(val) => handleChangeParams(val, "subject-type")}
            />
          </FormRow>
          {subjectType === "Fisica" && (
            <>
              <FormRow>
                <InputTextStyled
                  label="Nome Cognome"
                  onChange={(val) => handleChangeParams(val, "nominative")}
                  tooltip={"Cerca per nome cognome"}
                  placeholder="nome / cognome..."
                />
                <RowSpacer />
                <InputTextStyled
                  label="Codice Fiscale"
                  onChange={(val) => handleChangeParams(val, "fiscal-code")}
                  tooltip={"Cerca per codice fiscale"}
                  placeholder="codice fiscale..."
                />
              </FormRow>
            </>
          )}
          {subjectType === "Giuridica" && (
            <>
              <FormRow>
                <InputTextStyled
                  label="Ragione Sociale"
                  onChange={(val) => handleChangeParams(val, "business-name")}
                  tooltip={"Cerca per ragione sociale"}
                  placeholder="ragione sociale..."
                />
                <RowSpacer />
                <InputTextStyled
                  label="Partita Iva"
                  onChange={(val) => handleChangeParams(val, "p-iva")}
                  tooltip={"Cerca per partita iva"}
                  placeholder="partita iva..."
                />
              </FormRow>
            </>
          )}

          <>
            <FormRow>
              <InputTextStyled
                label="Telefono"
                onChange={(val) => handleChangeParams(val, "phone")}
                tooltip={"Cerca per numero di telefono"}
                placeholder="numero di telefono..."
              />
              <RowSpacer />
              <InputTextStyled
                label="Email"
                onChange={(val) => handleChangeParams(val, "email")}
                tooltip={"Cerca per email"}
                placeholder="email..."
              />
            </FormRow>
          </>

          {subjectType === "Fisica" && (
            <>
              <FormRow>
                <InputTextStyled
                  label="Numero Documento"
                  onChange={(num) => handleChangeParams(num, "doc-number")}
                  tooltip={"Cerca per numero documento"}
                  placeholder="numero documento..."
                />
                <RowSpacer />
                <div style={{ flex: 1 }}></div>
              </FormRow>
            </>
          )}
          {renderSearchButtons()}
        </SearchContainer>
      ),
      type: "subject",
    },
    {
      label: "Polizza",
      key: "4",
      children: (
        <SearchContainer>
          <FormRow>
            <InputTextStyled
              label="Numero Polizza"
              tooltip="Ricerca per numero polizza"
              placeholder="inserisci il numero polizza..."
              onChange={(num) => handleChangeParams(num, "policy-number")}
            />
          </FormRow>

          {renderSearchButtons()}
        </SearchContainer>
      ),
      type: "policy",
    },
    {
      label: "Sinistro",
      key: "5",
      children: (
        <SearchContainer>
          <FormRow>
            <InputTextStyled
              label="Numero SInistro"
              tooltip="Ricerca per numero sinistro"
              placeholder="inserisci il numero sinistro..."
              onChange={(num) => handleChangeParams(num, "claim-number")}
            />
          </FormRow>
          {renderSearchButtons()}
        </SearchContainer>
      ),
      type: "claim",
    },
  ];

  const handleChangeSearchType = (k: string) => {
    const searchType = items.find((i) => i.key === k)!.type;
    const newSearchingFor =
      searchType === "fulltext"
        ? "Ricerca Generica Fulltext"
        : searchType === "subject"
        ? "Cerca un Soggetto"
        : searchType === "vehicle"
        ? "Cerca un Veicolo"
        : searchType === "policy"
        ? "Cerca una Polizza"
        : searchType === "claim"
        ? "Cerca un Sinistro"
        : "";

    setSearchTitle(newSearchingFor);
  };

  return (
    <>
      <MainForm
        layout="vertical"
        title={
          <>
            <IconSearch /> {searchTitle}
          </>
        }
        actions={[]}
      >
        <Tabs defaultActiveKey="1" tabPosition="left" onChange={(k) => handleChangeSearchType(k)} items={items} />
      </MainForm>

      <div style={{ borderRadius: "3px", boxShadow: "0 0 5px #aaa", margin: "2em 0 0 0", width: "100%" }}>
        <div
          style={{
            backgroundColor: "#fff",
            textAlign: "center",
            textTransform: "uppercase",
            padding: "2em 2em 1em 0",
            display: "flex",
          }}
        >
          <div style={{ fontSize: "1.2em", margin: "0 2em", flex: 1, textAlign: "left" }}>Risultati</div>

          <ButtonConfirm onClick={() => {}}>nuova polizza</ButtonConfirm>
          <div style={{ width: "1em" }}></div>
          <ButtonConfirm onClick={() => {}}>nuovo soggetto</ButtonConfirm>
        </div>
        <Results onSelect={() => {}} />
      </div>
    </>
  );
};

export default Search;
