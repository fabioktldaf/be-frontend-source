import React from "react";
import { Tabs, Tooltip } from "antd";
import { HiOutlineSave } from "react-icons/hi";
import { VscCopy } from "react-icons/vsc";
import { AiOutlineCheck } from "react-icons/ai";
import { MainForm } from "../Layout/Forms";
import Responsability from "./Responsability";
import ClaimData from "./ClaimData";
import DamagedParts from "./DamagedParts";
import styled from "styled-components";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";

const SaveIconStyled = styled(HiOutlineSave)`
  font-size: 1.2em;
  color: #555;
  margin: -3px 0.25em 0 0;
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

const NewClaim = () => {
  const policyNumber = useSelector((state: RootState) => state.newClaim.policyData?.policy_number)!;
  const claimDataCompleted = useSelector((state: RootState) => state.newClaim.claimDataCompleted);
  const responsabilityDataCompleted = useSelector((state: RootState) => state.newClaim.responsabilityDataCompleted);
  const damagedPartsDataCompleted = useSelector((state: RootState) => state.newClaim.damagedPartsDataCompleted);

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

  const actions = [
    {
      label: "Salva",
      icon: <SaveIconStyled />,
      execute: () => {
        console.log("saving new claim data");
      },
    },
  ];

  return (
    <MainForm layout="vertical" title={renderTitle} actions={actions}>
      <Tabs
        defaultActiveKey="1"
        tabPosition="left"
        items={[
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
          {
            label: (
              <TabItemLabelContainer>
                {responsabilityDataCompleted && <CheckedIcon />}
                {"Responsabilità"}
              </TabItemLabelContainer>
            ),
            key: "2",
            children: <Responsability isCard={true} />,
          },
          {
            label: (
              <TabItemLabelContainer>
                {damagedPartsDataCompleted && <CheckedIcon />}
                {"Partite Danno"}
              </TabItemLabelContainer>
            ),
            key: "3",
            children: <DamagedParts />,
          },
        ]}
      />
    </MainForm>
  );
};

export default NewClaim;
