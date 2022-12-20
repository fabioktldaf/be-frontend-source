import React from "react";
import { Button, Tabs, Tooltip } from "antd";
import { HiOutlineSave } from "react-icons/hi";
import { VscCopy } from "react-icons/vsc";
import { AiOutlineCheck } from "react-icons/ai";
import { FormActionType, MainForm } from "../Layout/Forms";
import Responsability from "./Responsability";
import ClaimData from "./ClaimData";
import DamagedParts from "./DamagedParts";
import styled from "styled-components";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import CounterpartData from "./CounterpartData";
import useApplication from "../../hooks/useApplication";
import { defaultClaimPolicyData } from "../../config/dummy-data";

export const TabContentStyled = styled.div`
  display: flex;
  flex-direction: column;
  padding: 3em 2em 3em 0;
`;

const PolicyNumberStyled = styled.div`
  display: flex;
  align-items: center;
  margin-left: 1em;
`;

const CheckedIcon = styled(AiOutlineCheck)`
  color: green;
  margin-right: 0.5em;
`;

const TabItemLabelContainer = styled.div`
  display: flex;
  align-items: center;
`;

interface NewClaimProps {
  onForward: () => void;
}

const NewClaim = (props: NewClaimProps) => {
  const app = useApplication();
  const {
    policyData,
    stepperData,
    claimDataCompleted,
    responsabilityDataCompleted,
    damagedPartsDataCompleted,
    counterpartDataCompleted,
  } = useSelector((state: RootState) => state.newClaim);

  const policyNumber = policyData?.policy_number || "";
  const isCard = stepperData.tipoSinistro === "CARD";

  const renderTitle = (
    <>
      Apertura Sinistro
      <PolicyNumberStyled>
        N° {policyNumber}
        <Tooltip title={"Clicca per copiare il numero di polizza"}>
          <VscCopy
            onClick={() => navigator.clipboard.writeText(policyNumber)}
            style={{ cursor: "pointer", marginLeft: "0.5em" }}
          />
        </Tooltip>
      </PolicyNumberStyled>
    </>
  );

  const actions: FormActionType[] = [
    {
      label: "Fill Dati",
      execute: () => {
        app.updatedStepperData(2, "vehicles_number");
        app.updatedStepperData("A", "vehicle_a_type");
        app.updatedStepperData("A", "vehicle_b_type");
        app.updatedStepperData(true, "collision");
        app.updatedStepperData(true, "inItaly");

        app.updateClaimData("01/10/2022", "dateOfReceiptCompany");
        app.updateClaimData("01/10/2022", "dateOfReceiptDekra");

        app.updateClaimData("01/9/2022", "occurrenceDate");
        app.updateClaimData("10:00", "occurrenceTime");
        app.updateClaimData("corso Italia 4", "occurrencePlace");
        app.updateClaimData(true, "policeIntervention");
        app.updateClaimData(true, "witnesses");
        app.updateClaimData(defaultClaimPolicyData.claimNote, "note");

        app.updateCounterpartData(true, "isOwnerNaturalPerson");
        app.updateCounterpartData("Mario2", "ownerName");
        app.updateCounterpartData("Rossi2", "ownerLastname");
        app.updateCounterpartData("AB789ZY", "plate");
        app.updateCounterpartData("667", "insuranceCode");

        app.updateResponsabilityData(
          {
            vehicleA: 16,
            vehicleB: 14,
            result: "3",
          },
          "barems"
        );
        app.updateResponsabilityData("1", "signature-type");

        defaultClaimPolicyData.damagedParts.forEach((dp, i) => app.updateDamagedPart(dp, i));
        defaultClaimPolicyData.additionalInfo.forEach((ai, i) => app.setAdditionalInfo(ai, i));
      },
    },
    {
      label: "Salva",
      execute: () => {
        console.log("saving new claim data");
      },
    },
    {
      label: "Avanti",
      disabled: !claimDataCompleted || !responsabilityDataCompleted || !damagedPartsDataCompleted,
      execute: () => props.onForward(),
    },
  ];

  const buildTabs = () => {
    const items = [
      {
        label: (
          <TabItemLabelContainer>
            {claimDataCompleted && <CheckedIcon />}
            {"Dati Sinistro"}
          </TabItemLabelContainer>
        ),
        key: "1",
        children: <ClaimData />,
      },
    ];

    if (isCard) {
      items.push({
        label: (
          <TabItemLabelContainer>
            {counterpartDataCompleted && <CheckedIcon />}
            {"Controparte"}
          </TabItemLabelContainer>
        ),
        key: "2",
        children: <CounterpartData />,
      });

      items.push({
        label: (
          <TabItemLabelContainer>
            {responsabilityDataCompleted && <CheckedIcon />}
            {"Responsabilità"}
          </TabItemLabelContainer>
        ),
        key: (items.length + 1).toString(),
        children: <Responsability isCard={true} />,
      });

      items.push({
        label: (
          <TabItemLabelContainer>
            {damagedPartsDataCompleted && <CheckedIcon />}
            {"Partite Danno"}
          </TabItemLabelContainer>
        ),
        key: (items.length + 1).toString(),
        children: <DamagedParts />,
      });
    }

    return items;
  };

  return (
    <MainForm layout="vertical" title={renderTitle} actions={actions}>
      <Tabs defaultActiveKey="1" tabPosition="left" items={buildTabs()} />
    </MainForm>
  );
};

export default NewClaim;
