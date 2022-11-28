import React, { useState } from "react";
import styled from "styled-components";
import { Button, Modal } from "antd";
import { CenteredRow } from "../../style/containers";
import { FormSubTitle } from "../../style/form";
import { RiDeleteBinFill } from "react-icons/ri";
import { useTranslation } from "react-i18next";

import DamagedPartModalContent from "./DamagedPartModalContent";
import { DamagedPartType } from "../../types/new-claim.types";
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
`;

const TableDamagedPartsNumber = styled.td`
  font-size: 0.8em;
  padding: 1em 0;
`;

export type PartModalType = {
  isOpen: boolean;
  part?: DamagedPartType;
  index: number;
};

const DamagedParts = () => {
  const { t } = useTranslation();
  const app = useApplication();
  const damagedParts = useSelector((state: RootState) => state.newClaim.damagedParts);

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

  const renderDamagePartRow = (p: DamagedPartType, i: number) => {
    let subjectDetails = "---";
    const roleLabel = AllPartRoles.find((r) => r.value === p.roleType)?.label || "";
    if (p.subject.natural_person) {
      const { name, lastname } = p.subject.natural_person;
      subjectDetails = `${name} ${lastname}`;
    } else if (p.subject.giuridical_person) {
      subjectDetails = `${p.subject.giuridical_person.business_name}`;
    }

    return (
      <TableDamagedPartsRow key={i}>
        <td onClick={() => showPartModal(i)}>{subjectDetails}</td>
        <td onClick={() => showPartModal(i)}>{roleLabel}</td>
        <TableDamagedPartsNumber onClick={() => showPartModal(i)}>n° {p.pdNumber}</TableDamagedPartsNumber>
        <td>
          {i > 0 && (
            <Button onClick={() => app.removeDamagedPart(i)} icon={<RiDeleteBinFill />} shape="circle" type="primary" />
          )}
        </td>
      </TableDamagedPartsRow>
    );
  };

  return (
    <>
      <DamagedPartStyled>
        <FormSubTitle>Parite Danno</FormSubTitle>
        <TableDamagedParts>
          {damagedParts.map((p: DamagedPartType, i: number) => renderDamagePartRow(p, i))}
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
            managementType={damagedParts[0].managementType}
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
