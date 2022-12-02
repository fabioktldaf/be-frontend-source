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

const NewClaimPage = () => {
  const step = useSelector((state: RootState) => state.newClaim?.step);
  const dispatch = useDispatch();

  const handleChangeStatus = (s: NewClaimStateType) => dispatch(setStatus(s));

  return (
    <Col>
      {step < 3 && <NewClaimsSteps />}

      {step === 0 && <NewClaim onForward={() => handleChangeStatus(NewClaimStateType.VerifingSic)} />}
      {step === 1 && (
        <CheckSic
          onForward={() => handleChangeStatus(NewClaimStateType.AdditionalData)}
          onBackward={() => handleChangeStatus(NewClaimStateType.MandatoryData)}
        />
      )}
      {step === 2 && <AdditionalData onSave={() => handleChangeStatus(NewClaimStateType.Resume)} />}
      {step === 3 && <Resume onBackward={() => handleChangeStatus(NewClaimStateType.AdditionalData)} />}
    </Col>
  );
};

export default NewClaimPage;
