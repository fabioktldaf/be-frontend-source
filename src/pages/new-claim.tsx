import { Col, Button } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { store, RootState } from "../redux/store";
import { setStatus } from "../redux/features/newClaimSlice";

import NewClaim from "../components/NewClaim";
import AdditionalData from "../components/NewClaim/AdditionalData";
import CheckSendingANIA from "../components/NewClaim/CheckSendingANIA";
import NewClaimsSteps from "../components/NewClaim/NewClaimSteps";
import Resume from "../components/NewClaim/Resume";
import { defaultClaimPolicyData } from "../config/dummy-data";
import useApplication from "../hooks/useApplication";
import { NewClaimStateType } from "../types/new-claim.types";

const NewClaimPage = () => {
  const step = useSelector((state: RootState) => state.newClaim?.step);
  const dispatch = useDispatch();
  const app = useApplication();

  const handleChangeStatus = (s: NewClaimStateType) => dispatch(setStatus(s));

  return (
    <Col>
      <Button type="primary" size="small" onClick={() => app.startNewClaim()}>
        Carica Dati Polizza
      </Button>
      <NewClaimsSteps />
      {step === 0 && <NewClaim />}
      {step === 1 && (
        <CheckSendingANIA
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
