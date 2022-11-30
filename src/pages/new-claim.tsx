import { Col, Button, Collapse } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { store, RootState } from "../redux/store";
import { setStatus } from "../redux/features/newClaimSlice";

import NewClaim from "../components/NewClaim";
import AdditionalData from "../components/NewClaim/AdditionalData";
import CheckSic from "../components/NewClaim/CheckSic";
import NewClaimsSteps from "../components/NewClaim/NewClaimSteps";
import Resume from "../components/NewClaim/Resume";
import useApplication from "../hooks/useApplication";
import { NewClaimStateType } from "../types/new-claim.types";

const DontTouchButtons = (app: any) => {
  return (
    <Collapse>
      <Collapse.Panel header="Don't Touch!" key="1">
        <Button type="primary" size="small" onClick={() => app.startNewClaim()}>
          Carica Dati Polizza
        </Button>
        &nbsp;
        <Button
          type="primary"
          size="small"
          onClick={() => {
            app.updatedStepperData(2, "vehicles_number");
            app.updatedStepperData("A", "vehicle_a_type");
            app.updatedStepperData("A", "vehicle_b_type");
            app.updatedStepperData(true, "collision");
            app.updatedStepperData(true, "inItaly");
            app.updateClaimData("01/10/2022", "receiptDate");
            app.updateClaimData("01/9/2022", "occurrenceDate");
            app.updateClaimData("10:00", "occurrenceTime");
            app.updateClaimData("li", "occurrencePlace");
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
  );
};

const NewClaimPage = () => {
  const step = useSelector((state: RootState) => state.newClaim?.step);
  const dispatch = useDispatch();
  const app = useApplication();

  const handleChangeStatus = (s: NewClaimStateType) => dispatch(setStatus(s));

  return (
    <Col>
      {DontTouchButtons(app)}
      <NewClaimsSteps />
      {step === 0 && <NewClaim onForward={() => handleChangeStatus(NewClaimStateType.VerifingSic)} />}
      {step === 1 && (
        <CheckSic
          onForward={() => handleChangeStatus(NewClaimStateType.AdditionalData)}
          onBackward={() => handleChangeStatus(NewClaimStateType.MandatoryData)}
        />
      )}
      {step === 2 && <AdditionalData onSave={() => handleChangeStatus(NewClaimStateType.Resume)} />}
      {step === 3 && <Resume />}
    </Col>
  );
};

export default NewClaimPage;
