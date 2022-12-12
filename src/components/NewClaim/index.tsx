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
      label: "Salva",
      execute: () => {
        console.log("saving new claim data");
      },
    },
    {
      label: "Verifica SIC",
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
