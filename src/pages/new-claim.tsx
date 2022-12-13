import { Col, Button, Collapse } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { store, RootState } from "../redux/store";
import { clear, setStatus } from "../redux/features/newClaimSlice";

import NewClaim from "../components/NewClaim";
import AdditionalInfo from "../components/NewClaim/AdditionalInfo";
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
      {/* <NewClaimsSteps /> */}

      {step === 0 && <NewClaim onForward={() => handleChangeStatus(NewClaimStateType.CheckingData)} />}
      {step === 1 && (
        <CheckSic
          onForward={() => handleChangeStatus(NewClaimStateType.AdditionalData)}
          onBackward={() => handleChangeStatus(NewClaimStateType.MandatoryData)}
        />
      )}
      {step === 2 && (
        <AdditionalInfo
          onSend={() => {
            dispatch(clear());
            handleChangeStatus(NewClaimStateType.Unknown);
          }}
        />
      )}
    </Col>
  );
};

export default NewClaimPage;
