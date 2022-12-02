import React, { useState } from "react";
import { Layout, Button, Collapse } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import Logo from "./Logo";
import SideMenu from "./SideMenu";

import styled from "styled-components";
import useApplication from "../../hooks/useApplication";

const SiderStyled = styled(Layout.Sider)`
  background-color: white;
  box-shadow: 0 0 5px #aaa;
  z-index: 1;
`;

const CollapseStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 0 0 1em 1.6em;
  cursor: pointer;
`;

const Sider = () => {
  const [collapsed, setCollapsed] = useState(false);
  const app = useApplication();

  return (
    <SiderStyled trigger={null} collapsible collapsed={collapsed}>
      <Logo />
      <CollapseStyled onClick={() => setCollapsed(!collapsed)}>
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </CollapseStyled>
      <SideMenu />

      <Collapse>
        <Collapse.Panel header="Don't Touch!" key="1">
          <Button type="primary" size="small" onClick={() => app.startNewClaim()} style={{ marginBottom: "1em" }}>
            Carica Dati Polizza
          </Button>
          &nbsp;
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
              app.updateClaimData("01/9/2022", "occurrenceDate");
              app.updateClaimData("10:00", "occurrenceTime");
              app.updateClaimData("corso Italia 4", "occurrencePlace");
              app.updateClaimData(true, "policeIntervention");
              app.updateClaimData(true, "witnesses");
            }}
          >
            Fill "Sinistro"
          </Button>
          &nbsp;
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
            Fill "Controparte"
          </Button>
          &nbsp;
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
            Fill "Responsabilità"
          </Button>
          &nbsp;
          <Button
            type="primary"
            size="small"
            style={{ marginBottom: "1em" }}
            onClick={() => {
              app.updateDamagedPart(
                {
                  pdNumber: "1669798161516",
                  subject: {
                    natural_person: {
                      id: 1,
                      name: "Mario",
                      lastname: "Rossi",
                      fiscal_code: "RSSMRA73L09Z103F",
                      province_of_residence: "Milano",
                      city_of_residence: "Rho",
                    },
                  },
                  roleType: "CP",
                  damages: [
                    {
                      damageType: "Vehicle",
                      details: {
                        plate: "AB123CD",
                        format: "Targa Italiana",
                        type: "A",
                        collisionPoints: ["11"],
                        note: "",
                      },
                    },
                    {
                      damageType: "Person",
                      details: {
                        personWoundedPoints: ["front_trunc", "rear_trunc"],
                      },
                    },
                    {
                      damageType: "Thing",
                      details: {
                        note: "gameboy",
                      },
                    },
                  ],
                },
                0
              );
            }}
          >
            Fill "PD Owner"
          </Button>
        </Collapse.Panel>
      </Collapse>
    </SiderStyled>
  );
};

export default Sider;
