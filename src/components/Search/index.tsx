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
import { InputTextStyled, SegmentedStyled, SelectStyled } from "../../style/Input";
import { SearchParams, SearchResultItem, SearchTypes } from "../../types/search.types";
import { PersonType } from "../../types/new-claim.types";
import { ButtonCancel, ButtonConfirm } from "../Layout/Buttons";
import { GrAddCircle } from "react-icons/gr";
import { IoMdAddCircleOutline } from "react-icons/io";
import SubjectEditModal from "../SubjectsData/SubjectEditModal";
import { AddNewClaimState, EditingSubjectState } from "../../types/uses-data.types";
import NewClaimModal from "../NewClaim/NewClaimModal";
import { GiConsoleController } from "react-icons/gi";
import { insuranceCodesWithCodes } from "../../config/const";

const SearchContainer = styled.div<{ isTypeAll: boolean }>`
  padding: ${(props) => (props.isTypeAll ? "2em 2em 0 0" : "2em 4em  0 4em")};
  min-height: 24em;
  display: flex;
  flex-direction: column;
`;

interface SearchProps {
  type: SearchTypes;
  onSelect?: (data: any) => void;
}

const Search = (props: SearchProps) => {
  const { t } = useTranslation();
  const app = useApplication();
  const [searchTitle, setSearchTitle] = useState("Ricerca Generica Fulltext");
  const isSearching = useSelector((state: RootState) => state.search.isSearching);
  const [searchParams, setSearchParams] = useState<SearchParams>({
    term: "",
    type: props.type,
  });
  const [subjectType, setSubjectType] = useState<PersonType>("Fisica");
  const [editingSubject, setEditingSubject] = useState<EditingSubjectState | undefined>();
  const [addNewClaim, setAddNewClaim] = useState<AddNewClaimState>({ modalOpen: false, policyNumber: "" });

  const handleChangeParams = (val: any, field: string) => {
    const updatedParams = JSON.parse(JSON.stringify(searchParams)) as SearchParams;

    switch (field) {
      case "subject-type":
        setSubjectType(val);
        break;
      case "term":
        updatedParams.term = val;
        break;
      case "vehicle-plate":
        updatedParams.byVehicle = Object.assign({}, updatedParams.byVehicle, { plate: val });
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
      type: props.type,
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

  const itemFullTextChildren = (
    <SearchContainer isTypeAll={props.type === "generic"}>
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
  );

  const itemSubjectChildren = (
    <SearchContainer isTypeAll={props.type === "generic"}>
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

      {renderSearchButtons()}
    </SearchContainer>
  );

  const itemVehicleChildren = (
    <SearchContainer isTypeAll={props.type === "generic"}>
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
  );

  const itemPolicyChildren = (
    <SearchContainer isTypeAll={props.type === "generic"}>
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
  );

  const itemClaimChildren = (
    <SearchContainer isTypeAll={props.type === "generic"}>
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
  );

  const itemInsuranceChildren = (
    <SearchContainer isTypeAll={props.type === "generic"}>
      <FormRow>
        <SelectStyled
          label="Compagnia Assicurativa"
          tooltip="Seleziona la compagnia assicurativa della controparte"
          defaultValue="---"
          showSearch
          filterOption={(input, option) => (option?.label.toLowerCase() ?? "").includes(input.toLocaleLowerCase())}
          onChange={(val) => handleChangeParams(val, "insurance-cCode")}
          options={insuranceCodesWithCodes}
        />
      </FormRow>
      {renderSearchButtons()}
    </SearchContainer>
  );

  const itemFullText = {
    label: "Fulltext",
    key: "1",
    children: itemFullTextChildren,
    type: "fulltext",
  };

  const itemSubject = {
    label: "Soggetto",
    key: "2",
    children: itemSubjectChildren,
    type: "subject",
  };

  const itemVehicle = {
    label: "Veicolo",
    key: "3",
    children: itemVehicleChildren,
    type: "vehicle",
  };

  const itemPolicy = {
    label: "Polizza",
    key: "4",
    children: itemPolicyChildren,
    type: "policy",
  };

  const itemClaim = {
    label: "Sinistro",
    key: "5",
    children: itemClaimChildren,
    type: "claim",
  };

  const itemInsurance = {
    label: "Assicurazione",
    key: "6",
    children: itemInsuranceChildren,
    type: "insurance",
  };

  const items = [itemFullText, itemSubject, itemVehicle, itemPolicy, itemClaim, itemInsurance];

  const handleChangeSearchType = (k: string) => {
    const searchType = items.find((i) => i.key === k)!.type;
    const newSearchingFor =
      searchType === "fulltext"
        ? "Ricerca Generica Fulltext"
        : searchType === "subject"
        ? "Cerca un Soggetto"
        : searchType === "vehicle"
        ? "Cerca per Veicolo"
        : searchType === "policy"
        ? "Cerca per Polizza"
        : searchType === "claim"
        ? "Cerca per Sinistro"
        : searchType === "insurance"
        ? "Cerca per Assicurazione"
        : "";

    setSearchTitle(newSearchingFor);
  };

  const handleEditSubject = (item: any, type: string) => {
    console.log("editing ", item);

    if (type === "new-subject") {
      const updatedEditingSubject = Object.assign({}, editingSubject);
      app._addNewSubject();
      updatedEditingSubject.id = undefined;
      updatedEditingSubject.type = "new-subject";
      updatedEditingSubject.modalOpen = true;
      setEditingSubject(updatedEditingSubject);
    } else if (type === "giuridical-person" || type === "natural-person") {
      const updatedEditingSubject = Object.assign({}, editingSubject);
      updatedEditingSubject.id = item.id;
      updatedEditingSubject.type = type;
      updatedEditingSubject.modalOpen = true;
      setEditingSubject(updatedEditingSubject);
    } else if (type === "new-claim") {
      const updatedAddNewClaim = Object.assign({}, addNewClaim);
      updatedAddNewClaim.modalOpen = true;
      updatedAddNewClaim.policyNumber = item;
      console.log("add new claim");
      setAddNewClaim(updatedAddNewClaim);
    }
  };

  const handleCloseEditingSubject = () => {
    const updatedEditingSubject = Object.assign({}, editingSubject);
    updatedEditingSubject.modalOpen = false;
    setEditingSubject(updatedEditingSubject);
  };

  const handleSelectSubject = (id: string, type: string) => {
    console.log("selected id", id);
    console.log("type", type);

    if (type === "subject-seleted" && props.onSelect) props.onSelect({ id });
  };

  const renderResultAll = () => (
    <>
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
          <ButtonConfirm onClick={() => handleEditSubject(undefined, "new-subject")}>nuovo soggetto</ButtonConfirm>
        </div>
        <Results onSelect={handleEditSubject} type={props.type} />
      </div>
      <SubjectEditModal
        isOpen={editingSubject?.modalOpen}
        id={editingSubject?.id}
        onOk={() => {}}
        onCancel={() => handleCloseEditingSubject()}
      />
      {console.log("addNewClaim ", addNewClaim)}
      <NewClaimModal
        isOpen={addNewClaim.modalOpen}
        policyNumber={addNewClaim.policyNumber}
        onCancel={() => {
          setAddNewClaim({ modalOpen: false, policyNumber: "" });
        }}
        onSent={() => {
          setAddNewClaim({ modalOpen: false, policyNumber: "" });
          handleResetSearch();
        }}
      />
    </>
  );

  const renderResultSubjects = () => (
    <>
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

          <div style={{ width: "1em" }}></div>
          <ButtonConfirm onClick={() => handleEditSubject(undefined, "new-subject")}>nuovo soggetto</ButtonConfirm>
        </div>
        <Results onSelect={(id, type) => handleSelectSubject(id, type)} type={props.type} />
      </div>
    </>
  );

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
        hideHeader={props.type !== "generic"}
      >
        {props.type === "generic" ? (
          <Tabs defaultActiveKey="1" tabPosition="left" onChange={(k) => handleChangeSearchType(k)} items={items} />
        ) : props.type === "subject" ? (
          itemSubjectChildren
        ) : props.type === "vehicle" ? (
          itemVehicleChildren
        ) : props.type === "policy" ? (
          itemPolicyChildren
        ) : props.type === "claim" ? (
          itemClaimChildren
        ) : props.type === "insurance" ? (
          itemInsuranceChildren
        ) : (
          <></>
        )}
      </MainForm>

      {props.type === "generic" ? renderResultAll() : props.type === "subject" ? renderResultSubjects() : <></>}
    </>
  );
};

export default Search;
