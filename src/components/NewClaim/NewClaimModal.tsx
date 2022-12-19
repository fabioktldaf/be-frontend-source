import React, { useEffect } from "react";
import { Modal } from "antd";
import useApplication from "../../hooks/useApplication";
import { RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import NewClaim from "./index";
import CheckSic from "./CheckSic";
import AdditionalInfo from "./AdditionalInfo";
import { NewClaimStateType } from "../../types/new-claim.types";
import { clear, setStatus } from "../../redux/features/newClaimSlice";

interface NewClaimModalProps {
  isOpen?: boolean;
  policyNumber?: string;
  onCancel: () => void;
  onSent: () => void;
}

const NewClaimModal = (props: NewClaimModalProps) => {
  const step = useSelector((state: RootState) => state.newClaim?.step);
  const dispatch = useDispatch();

  const app = useApplication();
  const { isOpen, policyNumber, onCancel } = props;

  useEffect(() => {
    if (policyNumber && policyNumber.length > 0) {
      app.startNewClaim(policyNumber);
    }
  }, [policyNumber]);

  const handleChangeStatus = (s: NewClaimStateType) => dispatch(setStatus(s));

  return (
    <Modal open={isOpen} footer={null} onCancel={onCancel} width="1000px">
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
        }}
      >
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
              props.onSent();
            }}
          />
        )}
      </div>
    </Modal>
  );
};

export default NewClaimModal;
