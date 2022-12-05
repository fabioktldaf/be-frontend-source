import React, { useState } from "react";
import styled from "styled-components";
import { Button, Modal } from "antd";
import { CenteredRow } from "../../style/containers";
import { FormSubTitle } from "../../style/form";
import { RiDeleteBinFill } from "react-icons/ri";
import { IoBodyOutline } from "react-icons/io5";
import { BsBox } from "react-icons/bs";
import { BiCar } from "react-icons/bi";
import { useTranslation } from "react-i18next";

import DamagedPartModalContent from "./DamagedPartModalContent";
import { DamagedPartType, PartDamagedDetailsVehicle } from "../../types/new-claim.types";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import useApplication from "../../hooks/useApplication";
import { AllPartRoles } from "../../config/const";

const DamagedPartStyled = styled.div`
  margin-bottom: 2em;
`;

const TableDamagedParts = styled.table`
  width: 100%;
  margin-bottom: 2em;
`;

const TableDamagedPartsRow = styled.tr`
  cursor: pointer;
  &:hover {
    background-color: #f5ffd5;
  }

  td {
    padding: 0.5em 0;
    text-align: center;

    &:first-child {
      padding: 1em 0;
    }
  }
`;

const DamangeIconStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4em;
  color: #888;

  span {
    margin-right: 0.5em;
  }
`;

const TableDamagedHeader = styled.tr`
  text-transform: uppercase;
  border-bottom: 1px solid #aaa;

  td {
    text-align: center;
  }
`;

export type PartModalType = {
  isOpen: boolean;
  part?: DamagedPartType;
  index: number;
};

const DamagedParts = () => {
  const { t } = useTranslation();
  const app = useApplication();
  const { damagedParts, responsability } = useSelector((state: RootState) => state.newClaim);

  const [partModal, setPartModal] = useState<PartModalType>({
    isOpen: false,
    part: undefined,
    index: -1,
  });

  const handlePartModalOk = () => {
    setPartModal({ part: undefined, index: -1, isOpen: false });
  };

  const showPartModal = (index: number) => {
    setPartModal({
      isOpen: true,
      part: Object.assign({}, damagedParts[index]),
      index,
    });
  };

  const handlePartModalCancel = () => {
    setPartModal({ part: undefined, index: -1, isOpen: false });
  };

  const renderDamagePartRow = (p: DamagedPartType, i: number, managementType?: string) => {
    let subjectDetails = "---";
    const roleLabel = AllPartRoles.find((r) => r.value === p.roleType)?.label || "";
    if (p.subject.natural_person) {
      const { name, lastname } = p.subject.natural_person;
      subjectDetails = `${name} ${lastname}`;
    } else if (p.subject.giuridical_person) {
      subjectDetails = `${p.subject.giuridical_person.business_name}`;
    }

    const hasVehicleDamage =
      (p.damages.find((d) => d.damageType === "Vehicle")?.details as PartDamagedDetailsVehicle)?.collisionPoints
        ?.length > 0;
    const hasPersonDamage = p.damages.find((d) => d.damageType === "Person") !== undefined;
    const howManyThingDamages = p.damages.filter((d) => d.damageType === "Thing").length;

    return (
      <TableDamagedPartsRow key={i}>
        <td onClick={() => showPartModal(i)}>{subjectDetails}</td>
        <td onClick={() => showPartModal(i)} style={{ fontSize: "0.9em" }}>
          {roleLabel}
        </td>
        <td onClick={() => showPartModal(i)}>{t(`management_type_${managementType}`)}</td>
        <td>
          <DamangeIconStyled>{hasVehicleDamage && <BiCar />}</DamangeIconStyled>
        </td>
        <td>
          <DamangeIconStyled>{hasPersonDamage && <IoBodyOutline />}</DamangeIconStyled>
        </td>
        <td>
          <DamangeIconStyled>
            {howManyThingDamages > 0 && (
              <>
                <span style={{ fontSize: "0.6em" }}>{howManyThingDamages > 1 ? howManyThingDamages : ""}</span>
                <BsBox />
              </>
            )}
          </DamangeIconStyled>
        </td>
        <td style={{ paddingLeft: "1em" }}>
          {i > 0 && (
            <Button onClick={() => app.removeDamagedPart(i)} icon={<RiDeleteBinFill />} shape="circle" type="primary" />
          )}
        </td>
      </TableDamagedPartsRow>
    );
  };

  const managementType = responsability?.responsabilityType || "";

  return (
    <>
      <DamagedPartStyled>
        <FormSubTitle>Parite Danno</FormSubTitle>
        <TableDamagedParts>
          <thead>
            <TableDamagedHeader>
              <td>Nominativo</td>
              <td>Tipo Ruolo</td>
              <td>Gestione</td>
              <td colSpan={3}>Danni</td>
            </TableDamagedHeader>
          </thead>
          <tbody>
            {damagedParts.map((p: DamagedPartType, i: number) => renderDamagePartRow(p, i, managementType))}
          </tbody>
        </TableDamagedParts>
        <CenteredRow>
          <Button type="primary" size="small" onClick={() => app.addDamagedPart()}>
            add partita danno
          </Button>
        </CenteredRow>
      </DamagedPartStyled>
      <Modal
        title={`Configura Partita Danno n° ${partModal.part?.pdNumber}`}
        open={partModal.index >= 0}
        width={900}
        footer={null}
      >
        {partModal.part && (
          <DamagedPartModalContent
            part={partModal.part}
            managementType={managementType}
            partIndex={partModal.index}
            onCancel={handlePartModalCancel}
            onOk={handlePartModalOk}
          />
        )}
      </Modal>
    </>
  );
};

export default DamagedParts;
