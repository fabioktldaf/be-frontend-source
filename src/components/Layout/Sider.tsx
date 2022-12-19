import React, { useState } from "react";
import { Layout, Button, Collapse } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import Logo from "./Logo";
import SideMenu from "./SideMenu";
import styled from "styled-components";
import useApplication from "../../hooks/useApplication";

import { defaultClaimPolicyData } from "../../config/dummy-data";
import LanguageSelect from "./LaguageSelect";
import { useDispatch, useSelector } from "react-redux";
import { SelectStyled, SwitchStyled } from "../../style/Input";
import { RootState } from "../../redux/store";
import { ___setIsPolicyCard } from "../../redux/features/newClaimSlice";
import { backend } from "../../config/const";
import { SelectPair } from "../../types/new-claim.types";
import { setEnvironment } from "../../redux/features/userSlice";

const SiderStyled = styled(Layout.Sider)`
  background-color: white;
  box-shadow: 0 0 5px #aaa;
  z-index: 1;
`;

const envOptions = backend.envs.map((env) => ({ label: env.label, value: env.label } as SelectPair));

const Sider = () => {
  const app = useApplication();
  const ___isPolicyCard = useSelector((state: RootState) => state.newClaim.claimData?.___isPolicyCard);
  const selectedEnv = useSelector((state: RootState) => state.user.environment);
  const dispatch = useDispatch();

  return (
    <SiderStyled trigger={null}>
      <Logo />

      <SideMenu />
      <br />
      <Collapse>
        {/* <Collapse.Panel header="Miscellaneous" key="1">
          <Button type="primary" size="small" onClick={() => app.startNewClaim()} style={{ marginBottom: "1em" }}>
            Dati Polizza
          </Button>
          <br />
          <Button
            type="primary"
            size="small"
            style={{ marginBottom: "1em" }}
            onClick={() => {
              app.updatedStepperData(2, "vehicles_number");
              app.updatedStepperData("A", "vehicle_a_type");
              app.updatedStepperData("A", "vehicle_b_type");
              app.updatedStepperData(true, "collision");
              app.updatedStepperData(true, "inItaly");
              app.updateClaimData("01/10/2022", "receiptDate");

              app.updateClaimData("01/10/2022", "dateOfReceiptCompany");
              app.updateClaimData("01/10/2022", "dateOfReceiptDekra");

              app.updateClaimData("01/9/2022", "occurrenceDate");
              app.updateClaimData("10:00", "occurrenceTime");
              app.updateClaimData("corso Italia 4", "occurrencePlace");
              app.updateClaimData(true, "policeIntervention");
              app.updateClaimData(true, "witnesses");
              app.updateClaimData(defaultClaimPolicyData.claimNote, "note");
            }}
          >
            Sinistro
          </Button>
          <br />
          <Button
            type="primary"
            size="small"
            style={{ marginBottom: "1em" }}
            onClick={() => {
              app.updateCounterpartData(true, "isOwnerNaturalPerson");
              app.updateCounterpartData("Mario2", "ownerName");
              app.updateCounterpartData("Rossi2", "ownerLastname");
              app.updateCounterpartData("AB789ZY", "plate");
              app.updateCounterpartData("667", "insuranceCode");
            }}
          >
            Controparte
          </Button>
          <br />
          <Button
            type="primary"
            size="small"
            style={{ marginBottom: "1em" }}
            onClick={() => {
              app.updateResponsabilityData(
                {
                  vehicleA: 16,
                  vehicleB: 14,
                  result: "3",
                },
                "barems"
              );
              app.updateResponsabilityData("1", "signature-type");
            }}
          >
            Responsabilità
          </Button>
          <br />
          <Button
            type="primary"
            size="small"
            style={{ marginBottom: "1em" }}
            onClick={() => {
              defaultClaimPolicyData.damagedParts.forEach((dp, i) => app.updateDamagedPart(dp, i));
            }}
          >
            Partite di Danno
          </Button>
          <br />
          <Button
            type="primary"
            size="small"
            style={{ marginBottom: "1em" }}
            onClick={() => {
              defaultClaimPolicyData.additionalInfo.forEach((ai, i) => app.setAdditionalInfo(ai, i));
            }}
          >
            Info Add
          </Button>
          <LanguageSelect />
          <SwitchStyled
            label="Polizza CARD"
            checkedChildren="SI"
            unCheckedChildren="NO"
            checked={___isPolicyCard}
            onChange={(val) => dispatch(___setIsPolicyCard(val))}
          />
        </Collapse.Panel> */}
        <Collapse.Panel header="Setting..." key="2">
          <LanguageSelect />
          <br />
          <SelectStyled options={envOptions} value={selectedEnv} onChange={(env) => dispatch(setEnvironment(env))} />
          <br />
          <SwitchStyled
            label="Polizza CARD"
            checkedChildren="SI"
            unCheckedChildren="NO"
            checked={___isPolicyCard}
            onChange={(val) => dispatch(___setIsPolicyCard(val))}
          />
        </Collapse.Panel>
      </Collapse>
    </SiderStyled>
  );
};

export default Sider;
