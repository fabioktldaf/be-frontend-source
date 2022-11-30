import React, { useEffect, useState } from "react";
import { Steps, Space, Spin, Button, Tooltip } from "antd";
import styled from "styled-components";
import useApplication from "../../hooks/useApplication";
import useSelection from "antd/lib/table/hooks/useSelection";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { AllPartRoles } from "../../config/const";
import { DamagedPartType, PartDamagedDetailsVehicle } from "../../types/new-claim.types";
import { useTranslation } from "react-i18next";
import { MainForm } from "../Layout/Forms";
import { IoBodyOutline } from "react-icons/io5";
import { BsBox } from "react-icons/bs";
import { BiCar } from "react-icons/bi";

const DamagedPartsTable = styled.table`
  width: 90%;
  margin: 2em 5%;
`;

const DamagedPartResume = styled.tr`
  &:hover {
    background-color: #f5f5f5;
  }
`;

const DamagedPartResumeTd = styled.td`
  padding: 1em 1em;
`;

const DamangeIconStyled = styled.td`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4em;
  color: #888;

  span {
    margin-right: 0.5em;
  }
`;

const ButtonAddInfo = styled(Button)`
  margin-left: 2em;
  cursor: pointer;
`;

interface AdditionalDataProps {
  onSave: () => void;
}

const AdditionalData = (props: AdditionalDataProps) => {
  const { t } = useTranslation();
  const app = useApplication();
  const claimData = useSelector((state: RootState) => state.newClaim);
  const { damagedParts } = claimData;

  const renderDamagedPartResume = (p: DamagedPartType) => {
    let subjectDetails = "---";

    const managementType = t(`management_type_${claimData.responsability?.responsabilityType}`);
    const roleLabel = AllPartRoles.find((r) => r.value === p.roleType)?.label || "";
    let nominative = "";

    if (p.subject.natural_person) {
      const { name, lastname } = p.subject.natural_person;
      nominative = `${name} ${lastname}`;
    } else if (p.subject.giuridical_person) {
      nominative = p.subject.giuridical_person.business_name;
    }

    const hasVehicleDamage =
      (p.damages.find((d) => d.damageType === "Vehicle")?.details as PartDamagedDetailsVehicle)?.collisionPoints
        ?.length > 0;
    const hasPersonDamage = p.damages.find((d) => d.damageType === "Person") !== undefined;
    const howManyThingDamages = p.damages.filter((d) => d.damageType === "Thing").length;

    const tooltipDamagesVehicle = "danni al veicolo";
    const tooltipDamagesPerson = "danni alla persona";
    const tooltipDamagesThings = "danni alle cose";

    return (
      <DamagedPartResume>
        <DamagedPartResumeTd>{nominative}</DamagedPartResumeTd>
        <DamagedPartResumeTd>{roleLabel}</DamagedPartResumeTd>
        <DamagedPartResumeTd>{managementType}</DamagedPartResumeTd>

        <td>
          <Tooltip title={tooltipDamagesVehicle}>
            <DamangeIconStyled>{hasVehicleDamage && <BiCar />}</DamangeIconStyled>
          </Tooltip>
        </td>
        <td>
          <Tooltip title={tooltipDamagesPerson}>
            <DamangeIconStyled>{hasPersonDamage && <IoBodyOutline />}</DamangeIconStyled>
          </Tooltip>
        </td>
        <td>
          <Tooltip title={tooltipDamagesThings}>
            <DamangeIconStyled>
              {howManyThingDamages > 0 && (
                <>
                  <span style={{ fontSize: "0.6em" }}>{howManyThingDamages > 1 ? howManyThingDamages : ""}</span>
                  <BsBox />
                </>
              )}
            </DamangeIconStyled>
          </Tooltip>
        </td>
        <td>
          <Tooltip title="Aggiungi Informazioni">
            <ButtonAddInfo type="primary" shape="circle">
              +
            </ButtonAddInfo>
          </Tooltip>
        </td>
      </DamagedPartResume>
    );
  };

  return (
    <MainForm layout="vertical" title={<>Informazioni Addizionali</>} actions={[]}>
      <>
        <DamagedPartsTable>
          <tbody>{damagedParts.map((part) => renderDamagedPartResume(part))}</tbody>
        </DamagedPartsTable>
        <Button type="primary" onClick={() => props.onSave()}>
          Salva
        </Button>
      </>
    </MainForm>
  );
};

export default AdditionalData;
