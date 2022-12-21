import React, { useEffect } from "react";
import { Modal } from "antd";
import useApplication from "../../hooks/useApplication";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import PolicyDetails from "./PolicyDetails";
import { editPolicy } from "../../redux/features/policySlice";

interface PolicyEditModalProps {
  isOpen?: boolean;
  id?: string;
  onOk: () => void;
  onCancel: () => void;
}

const PolicyEditModal = (props: PolicyEditModalProps) => {
  const app = useApplication();
  const isLoading = useSelector((state: RootState) => state.policies.editing.loading);

  const { id, isOpen, onOk, onCancel } = props;

  useEffect(() => {
    if (id && id.length > 0) {
      app.editPolicy(id);
    }
  }, [id]);

  return (
    <Modal open={isOpen} footer={null} onCancel={onCancel} width="1000px">
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
        }}
      >
        {isLoading ? <div>loading...</div> : <PolicyDetails />}
      </div>
    </Modal>
  );
};

export default PolicyEditModal;
