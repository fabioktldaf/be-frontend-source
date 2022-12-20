import React, { useEffect } from "react";
import { Modal } from "antd";
import useApplication from "../../hooks/useApplication";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import SubjectDetails from "./SubjectDetails";

interface SubjectEditModalProps {
  isOpen?: boolean;
  id?: string;
  type?: string;
  onOk: () => void;
  onCancel: () => void;
}

const SubjectEditModal = (props: SubjectEditModalProps) => {
  const app = useApplication();
  const isLoading = useSelector((state: RootState) => state.subjects.editing.loading);

  const { id, type, isOpen, onOk, onCancel } = props;

  useEffect(() => {
    if (id && id.length > 0 && type && type.length > 0) {
      app._editSubject(id);
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
        {isLoading ? <div>loading...</div> : <SubjectDetails />}
      </div>
    </Modal>
  );
};

export default SubjectEditModal;
