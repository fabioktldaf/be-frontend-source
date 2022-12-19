import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Select, Button, Popconfirm, Modal } from "antd";
import { Col, Hidden, Row, RowSpacer } from "../../style/containers";
import { FormSubTitle, FormInput, FormRow } from "../../style/form";
import { RiDeleteBinFill } from "react-icons/ri";

import DamagedPartPersonSelect from "./DamagedPartPersonSelect";
import DamagedPartVehicle from "./DamagedPartVehicle";
import { HrStyled } from "./ClaimData";
import CarImpactSelector from "./CarImpactSelect";
import { useTranslation } from "react-i18next";

import {
  DamagedPartType,
  PartChangeType,
  PartDamagedDetailsVehicle,
  PartDamagedDetailsPerson,
  DamagedType,
} from "../../types/new-claim.types";
import useApplication from "../../hooks/useApplication";
import { PartRoleCP, PartRoleNP, Responsabilities } from "../../config/const";
import { InputTextStyled, SelectStyled } from "../../style/Input";
import SubjectDetails from "../SubjectsData/SubjectDetails";
import {
  EditingSubjectState,
  SubjectData,
  SubjectGiuridicalPersonData,
  SubjectNaturalPersonData,
} from "../../types/uses-data.types";
import { ButtonConfirm, ButtonDelete } from "../Layout/Buttons";
import SearchSubject from "../SubjectsData/SearchSubject";
import Results from "../Search/Results";
import SubjectEditModal from "../SubjectsData/SubjectEditModal";

const PersonDamageList = styled(Col)`
  width: 25em;
`;

const PersonDamageListTitle = styled.div`
  text-transform: uppercase;
  margin-top: 5em;
  font-size: 0.9em;
`;

const PersonDamageListSubtitle = styled.div`
  text-transform: uppercase;
  margin-left: 1em;
  margin-top: 0.5em;
  font-size: 0.9em;
`;

const PersonDamageListItem = styled.div`
  margin-left: 2em;
`;

const ButtonDeleteOtherDamage = styled(Button)`
  font-size: 1.2em;
  margin-bottom: 24px;
  margin-left: 1em;
`;

interface DamagedPartModalContentProps {
  part: DamagedPartType;
  managementType: string;
  partIndex: number;
  onCancel: () => void;
  onOk: () => void;
}

const DamagedPartModalContent = (props: DamagedPartModalContentProps) => {
  const [editingSubject, setEditingSubject] = useState<EditingSubjectState | undefined>();
  const [isOpenSearchSubjectModal, setIsOpenSearchSubjectModal] = useState(false);

  const app = useApplication();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [part, setPart] = useState<DamagedPartType>(props.part);

  console.log("Modal Contente Part ", props.part);
  console.log("Modal Contente Part ", part);

  useEffect(() => {
    setPart(Object.assign({}, props.part));
  }, [props.part]);

  if (props.part.pdNumber !== part.pdNumber) return <></>; // part & props.part non sono sempre sincronizzate

  const isOwner = () => props.partIndex === 0;

  const responsabiityType = Responsabilities.card.find((r) => r.value === props.managementType);
  const managementTypeText = `${props.managementType} - ${responsabiityType?.label}`;

  const handleEditSubject = (subjectId: string, type: string) => {
    const updatedEditingSubject = Object.assign({}, editingSubject);
    updatedEditingSubject.subjectId = subjectId;
    updatedEditingSubject.type = type;
    updatedEditingSubject.modalOpen = true;
    setEditingSubject(updatedEditingSubject);
  };

  const handleCloseEditingSubject = () => {
    const updatedEditingSubject = Object.assign({}, editingSubject);
    updatedEditingSubject.modalOpen = false;
    setEditingSubject(updatedEditingSubject);
  };

  const handleOnOk = () => {
    app.updateDamagedPart(Object.assign({}, part), props.partIndex);
    props.onOk();
  };

  // const handleEditSubject = (person: SubjectNaturalPersonData | SubjectGiuridicalPersonData) => {
  //   console.log("person ", person);
  //   app.editSubject({ person: Object.assign({}, person) }, navigate);
  //   setIsOpenSubjectModal(true);
  // };

  const handleSearchSubject = () => {
    app.clearSearchSubject();
    setIsOpenSearchSubjectModal(true);
  };

  const handleSelectSubject = (subject: any) => {
    handleModalPartChange("subject", subject.person);
    setIsOpenSearchSubjectModal(false);
  };

  const handleModalPartChange = (type: PartChangeType, val: any) => {
    const updatedPart = JSON.parse(JSON.stringify(part)) as DamagedPartType;

    switch (type) {
      case "damage-type":
        updatedPart.damages[val.index].damageType = val.value;
        break;
      case "collision-point":
        (updatedPart.damages[val.index].details as PartDamagedDetailsVehicle).collisionPoints = val.value.sort(
          (a: string, b: string) => (a > b ? 1 : -1)
        );
        break;
      case "person-damage":
        (updatedPart.damages[val.index].details as PartDamagedDetailsPerson).personWoundedPoints = val.value;
        break;
      case "role-type":
        updatedPart.roleType = val;

        if (val === PartRoleNP.value)
          updatedPart.damages = [...updatedPart.damages.filter((d) => d.damageType !== "Person")];

        if (val === PartRoleCP.value) app.damagedPartsRemoveOtherDrivers();

        break;

      case "owner-vehicle-note":
        updatedPart.damages[0].details.note = val;
        break;

      case "person-note":
        updatedPart.damages[val.index].details.note = val.value;
        break;

      case "thing-note":
        updatedPart.damages[val.index].details.note = val.value;
        break;

      case "subject":
        if (!val) {
          updatedPart.subject = undefined;
        } else {
          const naturalPerson = val as SubjectNaturalPersonData;
          const giuridicalPerson = val as SubjectGiuridicalPersonData;
          if (naturalPerson.fiscalCode?.length > 0) updatedPart.subject = val;
          else if (giuridicalPerson.pIva?.length > 0) updatedPart.subject = val;
        }
        break;
    }

    setPart(updatedPart);
  };

  const handleAddDamageType = () => {
    const updatedPart = Object.assign({}, part);
    updatedPart.damages = [
      ...(part.damages || []),
      {
        damageType: "",
        details: {},
      } as DamagedType,
    ];

    setPart(updatedPart);
  };

  const handleDeleteDamageType = (index: number) => {
    const updatedPart = Object.assign({}, part);
    updatedPart.damages = part.damages!.filter((d, i) => i !== index) || [];
    setPart(updatedPart);
  };

  const renderDamageOwner = () => {
    const availableDamageTypes = app.getAvailableDamageTypes(0, part);

    const subjectNaturalPerson = part.subject as SubjectNaturalPersonData;
    const subjectGiuridicalPerson = part.subject as SubjectGiuridicalPersonData;
    const isSubjectNaturalPerson = !!subjectNaturalPerson.fiscalCode;
    const isSubjectGiuridicalPerson = !!subjectGiuridicalPerson.pIva;

    let ownerDetails = "";
    if (isSubjectNaturalPerson) {
      const { name, lastname } = subjectNaturalPerson;
      ownerDetails = `${name} ${lastname}`;
    } else if (isSubjectGiuridicalPerson) {
      ownerDetails = subjectGiuridicalPerson.business_name;
    }

    return (
      <>
        <FormSubTitle>PARTITA DI DANNO PROPRIETARIO</FormSubTitle>
        <FormRow>
          <SelectStyled
            label="Compagnia Assicurativa"
            tooltip="Seleziona la compagnia assicurativa della controparte"
            defaultValue="---"
            options={app.getDamageAvailableRoleTypes(props.partIndex)}
            onChange={(val: string) => handleModalPartChange("role-type", val)}
            value={part.roleType}
          />

          <RowSpacer />

          <FormInput label="Proprietario" tooltip="Seleziona l'anagrafica">
            <Link
              to={"#"}
              onClick={() =>
                handleEditSubject(
                  isSubjectNaturalPerson ? subjectNaturalPerson.fiscalCode : subjectGiuridicalPerson.pIva,
                  isSubjectNaturalPerson ? "natural-person" : "giuridical-person"
                )
              }
            >
              {ownerDetails}
            </Link>
          </FormInput>
        </FormRow>
        <FormRow>
          <FormInput label="Tipo Gestione" tooltip="Tipo Gestione">
            {managementTypeText}
          </FormInput>
          <RowSpacer />
          <FormInput label="Tipo Danno" tooltip="Seleziona il tipo danno">
            {"Veicolo"}
          </FormInput>
          <RowSpacer />
        </FormRow>
        <FormRow>
          <Col>
            <DamagedPartVehicle readOnly={true} details={part.damages![0].details! as PartDamagedDetailsVehicle} />
          </Col>
          <Col style={{ flex: 1, alignItems: "center", display: "flex", padding: "2em 0" }}>
            <CarImpactSelector
              areas={(part.damages[0].details as PartDamagedDetailsVehicle).collisionPoints}
              onChange={(areas) => handleModalPartChange("collision-point", { value: areas, index: 0 })}
            />
          </Col>
        </FormRow>
        <FormRow>
          <InputTextStyled
            label="Note veicolo"
            tooltip="Note"
            placeholder="note veicolo ..."
            onChange={(val: string) => handleModalPartChange("owner-vehicle-note", val)}
            value={part.damages[0].details.note}
          />
        </FormRow>
        {part.damages.map((damage, i) => {
          if (i === 0) {
            return <></>;
          } else if (damage.damageType === "Person") {
            const details = part.damages[i].details as PartDamagedDetailsPerson;
            console.log("details ", details);

            const frontWounds = details.personWoundedPoints?.filter((l) => l.indexOf("front") !== -1) || [];
            const rearWounds = details.personWoundedPoints?.filter((l) => l.indexOf("rear") !== -1) || [];

            return (
              <>
                <br />
                <FormSubTitle>Danni alla Persona</FormSubTitle>
                <ButtonDeleteOtherDamage
                  type="primary"
                  shape="circle"
                  onClick={() => handleDeleteDamageType(i)}
                  style={{ float: "right" }}
                >
                  <RiDeleteBinFill />
                </ButtonDeleteOtherDamage>
                <FormRow style={{ height: "450px" }}>
                  <PersonDamageList>
                    <PersonDamageListTitle>Parti del Corpo Lesionate </PersonDamageListTitle>

                    <PersonDamageListSubtitle>Davanti </PersonDamageListSubtitle>
                    {frontWounds.map((l, i2) => (
                      <PersonDamageListItem key={i2}>• {t(`person_injury_${l}`)}</PersonDamageListItem>
                    ))}

                    <PersonDamageListSubtitle>Dietro </PersonDamageListSubtitle>
                    {rearWounds.map((l, i2) => (
                      <PersonDamageListItem key={i2}>• {t(`person_injury_${l}`)}</PersonDamageListItem>
                    ))}
                  </PersonDamageList>

                  <DamagedPartPersonSelect
                    details={damage.details as PartDamagedDetailsPerson}
                    onChange={(localizations: string[]) =>
                      handleModalPartChange("person-damage", { value: localizations, index: i })
                    }
                  />
                </FormRow>
                <FormRow>
                  <InputTextStyled
                    label="Note Persona"
                    tooltip="Note relative al danno"
                    placeholder="note persona"
                    onChange={(val) => handleModalPartChange("person-note", { index: i, value: val })}
                    value={damage.details.note}
                  />
                </FormRow>
              </>
            );
          } else if (damage.damageType === "Thing") {
            return (
              <>
                <br />
                <FormSubTitle>Danni All'Oggetto</FormSubTitle>
                <FormRow>
                  <InputTextStyled
                    label="Note Oggetto"
                    tooltip="Note relative al danno"
                    placeholder="note oggetto"
                    value={damage.details.note}
                    onChange={(val) => handleModalPartChange("thing-note", { index: i, value: val })}
                  />

                  <ButtonDeleteOtherDamage type="primary" shape="circle" onClick={() => handleDeleteDamageType(i)}>
                    <RiDeleteBinFill />
                  </ButtonDeleteOtherDamage>
                </FormRow>
              </>
            );
          } else {
            return (
              <>
                <br />
                <FormSubTitle>Seleziona il tipo di danno</FormSubTitle>
                <FormRow>
                  <SelectStyled
                    label="Tipo Danno"
                    tooltip="Seleziona il tipo danno"
                    onChange={(val) => handleModalPartChange("damage-type", { value: val, index: i })}
                    options={availableDamageTypes}
                  />

                  <RowSpacer />

                  <ButtonDeleteOtherDamage type="primary" shape="circle" onClick={() => handleDeleteDamageType(i)}>
                    <RiDeleteBinFill />
                  </ButtonDeleteOtherDamage>
                </FormRow>
              </>
            );
          }
        })}

        <Button type="primary" size="small" onClick={handleAddDamageType}>
          add danno
        </Button>
        <HrStyled />
        <FormRow>
          <Popconfirm
            title="Confermi di voler cancellare i dati inseriti?"
            onConfirm={props.onCancel}
            okText="Si"
            cancelText="No"
          >
            <Button>Cancella</Button>
          </Popconfirm>
          <Button type="primary" onClick={handleOnOk}>
            Salva
          </Button>
        </FormRow>
      </>
    );
  };

  const renderDamageOther = () => {
    const availableDamageTypes = app.getAvailableDamageTypes(0, part);

    let subjectDetails = "";

    const subjectNaturalPerson = part.subject as SubjectNaturalPersonData;
    const subjectGiuridicalPerson = part.subject as SubjectGiuridicalPersonData;
    const isSubjectNaturalPerson = !!subjectNaturalPerson?.fiscalCode;
    const isSubjectGiuridicalPerson = !!subjectGiuridicalPerson?.pIva;

    if (isSubjectNaturalPerson) {
      const { name, lastname } = subjectNaturalPerson;
      subjectDetails = `${name} ${lastname}`;
    } else if (isSubjectGiuridicalPerson) {
      subjectDetails = subjectGiuridicalPerson.business_name;
    }

    console.log("part ", part);

    return (
      <>
        <FormSubTitle>ALTRA PARTITA DI DANNO</FormSubTitle>
        <FormRow>
          <SelectStyled
            label="Tipo Ruolo"
            tooltip="Seleziona il tipo ruolo"
            defaultValue="---"
            options={app.getDamageAvailableRoleTypes(props.partIndex)}
            onChange={(value) => handleModalPartChange("role-type", value)}
            value={part.roleType}
          />

          <RowSpacer />
          <FormInput label="Anagrafica" name={`anagrafica_other_${part.pdNumber}`} tooltip="Seleziona l'anagrafica">
            {subjectDetails !== "" && (
              <>
                <Link
                  to={"#"}
                  onClick={() =>
                    handleEditSubject(
                      isSubjectNaturalPerson ? subjectNaturalPerson.fiscalCode : subjectGiuridicalPerson.pIva,
                      isSubjectNaturalPerson ? "natural-person" : "giuridical-person"
                    )
                  }
                >
                  {subjectDetails}
                </Link>
                <ButtonDelete children={"elimina"} onClick={() => handleModalPartChange("subject", null)} />
              </>
            )}
            {subjectDetails === "" && <ButtonConfirm children={"Seleziona"} onClick={handleSearchSubject} />}
          </FormInput>
        </FormRow>
        <FormRow>
          <FormInput label="Tipo Gestione" name="tipo_gestione" tooltip="Tipo Gestione">
            {managementTypeText}
          </FormInput>
        </FormRow>
        <HrStyled />
        {part.damages.map((damage, i) => {
          if (damage.damageType === "Person") {
            const details = part.damages[i].details as PartDamagedDetailsPerson;
            console.log("details ", details);

            const frontWounds = details.personWoundedPoints?.filter((l) => l.indexOf("front") !== -1) || [];
            const rearWounds = details.personWoundedPoints?.filter((l) => l.indexOf("rear") !== -1) || [];

            return (
              <>
                <FormSubTitle>Danni alla Persona</FormSubTitle>
                <ButtonDeleteOtherDamage
                  type="primary"
                  shape="circle"
                  onClick={() => handleDeleteDamageType(i)}
                  style={{ float: "right" }}
                >
                  <RiDeleteBinFill />
                </ButtonDeleteOtherDamage>
                <FormRow style={{ height: "450px" }}>
                  <PersonDamageList>
                    <PersonDamageListTitle>Parti del Corpo Lesionate </PersonDamageListTitle>

                    <PersonDamageListSubtitle>Davanti </PersonDamageListSubtitle>
                    {frontWounds.map((l) => (
                      <PersonDamageListItem>• {t(`person_injury_${l}`)}</PersonDamageListItem>
                    ))}

                    <PersonDamageListSubtitle>Dietro </PersonDamageListSubtitle>
                    {rearWounds.map((l) => (
                      <PersonDamageListItem>• {t(`person_injury_${l}`)}</PersonDamageListItem>
                    ))}
                  </PersonDamageList>

                  <DamagedPartPersonSelect
                    details={damage.details as PartDamagedDetailsPerson}
                    onChange={(localizations: string[]) =>
                      handleModalPartChange("person-damage", { value: localizations, index: i })
                    }
                  />
                </FormRow>
                <FormRow>
                  <InputTextStyled
                    label="Note Persona"
                    tooltip="Note relative al danno"
                    onChange={(val) => handleModalPartChange("person-note", { index: i, value: val })}
                    value={damage.details.note}
                  />
                </FormRow>
              </>
            );
          } else if (damage.damageType === "Thing") {
            return (
              <>
                <FormSubTitle>Danni All'Oggetto</FormSubTitle>
                <FormRow>
                  <InputTextStyled
                    label="Note oggetto"
                    tooltip="Inserisci una descrizione per il danno"
                    placeholder="descrizione del danno"
                    onChange={(val) => handleModalPartChange("thing-note", { value: val, index: i })}
                    value={damage.details.note}
                  />

                  <ButtonDeleteOtherDamage type="primary" shape="circle" onClick={() => handleDeleteDamageType(i)}>
                    <RiDeleteBinFill />
                  </ButtonDeleteOtherDamage>
                </FormRow>
              </>
            );
          } else {
            return (
              <>
                <FormSubTitle>Seleziona il tipo di danno</FormSubTitle>
                <FormRow>
                  <FormInput label="Tipo Danno" name={`tipo_danno_${i}`} tooltip="Seleziona il tipo danno">
                    <Select
                      onChange={(val) => handleModalPartChange("damage-type", { value: val, index: i })}
                      options={availableDamageTypes}
                      value={damage.damageType}
                    />
                    <Hidden>{damage.damageType}</Hidden>
                  </FormInput>
                  <RowSpacer />

                  <ButtonDeleteOtherDamage type="primary" shape="circle" onClick={() => handleDeleteDamageType(i)}>
                    <RiDeleteBinFill />
                  </ButtonDeleteOtherDamage>
                </FormRow>
              </>
            );
          }
        })}

        <Button type="primary" size="small" onClick={handleAddDamageType}>
          add danno
        </Button>
        <HrStyled />
        <Row>
          {/* <Popconfirm
            title="Confermi di voler cancellare i dati inseriti?"
            onConfirm={props.onCancel}
            okText="Si"
            cancelText="No"
          > */}
          <Button>Cancella</Button>
          {/* </Popconfirm> */}
          <Button type="primary" onClick={handleOnOk}>
            Salva
          </Button>
        </Row>
      </>
    );
  };

  console.log("editingSubject ", editingSubject);
  return (
    <>
      {isOwner() ? renderDamageOwner() : renderDamageOther()}

      {/* <Modal open={isOpenSubjectModal} onCancel={() => setIsOpenSubjectModal(false)} width="1000px" footer={null}>
        <div style={{ padding: "3em 2em 2em 2em" }}>
          <SubjectDetails />
        </div>
      </Modal> */}
      <SubjectEditModal
        isOpen={editingSubject?.modalOpen}
        subjectId={editingSubject?.subjectId}
        type={editingSubject?.type}
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
          <SearchSubject />
          <Results onSelect={(item) => handleSelectSubject(item)} />
        </div>
      </Modal>
    </>
  );
};

export default DamagedPartModalContent;
