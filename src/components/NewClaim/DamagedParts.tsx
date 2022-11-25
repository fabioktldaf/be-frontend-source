import React, { useState } from "react";
import styled from "styled-components";
import { Form, Input, Select, Button, DatePicker, Modal, Popconfirm } from "antd";
import { CenteredRow, Col, Hidden, Row, RowSpacer } from "../../style/containers";
import { FormSubTitle, FormInput } from "../../style/form";
import { RiDeleteBinFill } from "react-icons/ri";
import { useTranslation } from "react-i18next";

import DamagedPartModalContent from "./DamagedPartModalContent";
import {
  PartChangeType,
  PartDamagedDetailsPerson,
  PartDamagedDetailsVehicle,
  DamagedPartType,
} from "../../types/new-claim.types";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import useApplication from "../../hooks/useApplication";

const DamagedPartStyled = styled.div`
  margin-bottom: 2em;
`;

const PartStyled = styled.div`
  display: flex;
  margin-bottom: 1em;
`;

const PartResumeStyled = styled.div`
  cursor: pointer;
`;

const PartSpacer = styled.div`
  flex: 1;
`;

const PartDeleteButton = styled(Button)``;

export type PartModalType = {
  isOpen: boolean;
  part?: DamagedPartType;
  index: number;
};

//const getNewDamagedPartNumber = () => Date.now().toString();

const DamagedParts = () => {
  const { t } = useTranslation();
  const app = useApplication();
  //const policyData = useSelector((state: RootState) => state.newClaim.policyData);
  const damagedParts = useSelector((state: RootState) => state.newClaim.damagedParts);

  // const [parts, setParts] = useState<DamagedPartType[]>([
  //   {
  //     pdNumber: getNewDamagedPartNumber(),
  //     subject: {},
  //     roleType: "",
  //     managementType: "",
  //     danni: [
  //       {
  //         damageType: "Vehicle",
  //         details: {
  //           plate: policyData?.ownerVehicle.plate.number,
  //           format: policyData?.ownerVehicle.plate.format,
  //           type: policyData?.ownerVehicle.type,
  //           collisionPoints: [],
  //           note: "",
  //         } as PartDamagedDetailsVehicle,
  //       },
  //     ],
  //   },
  // ]);

  const [partModal, setPartModal] = useState<PartModalType>({
    isOpen: false,
    part: undefined,
    index: -1,
  });

  const handlePartModalOk = () => {
    //const updatedPart = Object.assign({}, partModal) as PartModalType;

    setPartModal({ part: undefined, index: -1, isOpen: false });

    //app.updateDamagedPart(updatedPart.part!, updatedPart.index);

    // const updatedParts = parts.map(
    //   (p: DamagedPartType, i: number) => (i === partModal.index ? updatedPart.part : p) as DamagedPartType
    // );

    //setParts(updatedParts);
  };

  const handleAddDamagedPart = () => {
    app.addDamagedPart();

    // const updatedParts = [
    //   ...parts,
    //   {
    //     subject: {},
    //     numero_pd: getNewDamagedPartNumber(),
    //     data_pd: "",
    //     danni: [],
    //   },
    // ];
    // setParts(updatedParts);
  };

  const handleRemoveDamagedPart = (index: number) => {
    // setParts((prev) => prev.filter((p, i) => i !== index));
    app.removeDamagedPart(index);
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

  // const handleModalPartChange = (type: PartChangeType, val: any) => {
  //   const updatedPart: DamagedPartType = Object.assign({}, partModal.part);

  //   if (type === "damage_type") {
  //     updatedPart.danni[val.index].damageType = val.value;
  //   }

  //   if (type === "collision_point") {
  //     (updatedPart!.danni[val.index].details as PartDamagedDetailsVehicle).collisionPoints = val.value.sort(
  //       (a: string, b: string) => (a > b ? 1 : -1)
  //     );
  //   }

  //   if (type === "person_damage") {
  //     (updatedPart!.danni[val.index].details as PartDamagedDetailsPerson).personWoundedPoints = val;
  //   }

  //   if (type === "role_type") {
  //     updatedPart.danni![val.index].tipo_ruolo = val.value;
  //   }

  //   console.log("updatedPart ", updatedPart);

  //   setPartModal({
  //     isOpen: partModal.isOpen,
  //     index: partModal.index,
  //     part: updatedPart,
  //   } as PartModalType);
  // };

  const renderDamagedPartResume = (p: DamagedPartType) => {
    return `N° ${p.pdNumber}`;
  };

  return (
    <>
      <DamagedPartStyled>
        <FormSubTitle>Parite Danno</FormSubTitle>
        {damagedParts.map((p: DamagedPartType, i: number) => (
          <PartStyled key={i}>
            <PartResumeStyled onClick={() => showPartModal(i)}>{renderDamagedPartResume(p)}</PartResumeStyled>
            <PartSpacer />
            {i > 0 && (
              <PartDeleteButton
                onClick={() => handleRemoveDamagedPart(i)}
                icon={<RiDeleteBinFill />}
                shape="circle"
                type="primary"
              />
            )}
          </PartStyled>
        ))}

        <CenteredRow>
          <Button type="primary" size="small" onClick={handleAddDamagedPart}>
            add partita danno
          </Button>
        </CenteredRow>
      </DamagedPartStyled>
      <Modal
        title={`Configura Partita Danno n° ${partModal.part?.pdNumber}`}
        open={partModal.index >= 0}
        width={900}
        footer={null}
        // footer={
        //   <>
        //     <Popconfirm
        //       title="Confermi di voler cancellare i dati inseriti?"
        //       onConfirm={cancelPartModal}
        //       okText="Si"
        //       cancelText="No"
        //     >
        //       <Button>Cancella</Button>
        //     </Popconfirm>
        //     <Button type="primary" onClick={handlePartModalOk}>
        //       Salva
        //     </Button>
        //   </>
        // }
      >
        {partModal.part && (
          <DamagedPartModalContent
            part={partModal.part}
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
