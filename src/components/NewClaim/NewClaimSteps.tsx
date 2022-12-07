import React from "react";
import { Steps } from "antd";
import { HiOutlineDocumentText } from "react-icons/hi";
import { CgFileDocument } from "react-icons/cg";
import { BiSend } from "react-icons/bi";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { NewClaimSteps } from "../../config/const";

const StepsContainer = styled.div`
  margin: 2em 0;
  display: flex;
  align-items: center;
  justify-content: center;

  .ant-steps-item {
    text-align: center;
    flex: 1;
  }
`;

const NewClaimsSteps = () => {
  const current = useSelector((state: RootState) => state.newClaim.step);

  const items = NewClaimSteps.map((s, i) => ({
    title: current < i ? s.waiting.title : current === i ? s.inProgress.title : s.done.title,
    description: current < i ? s.waiting.description : current === i ? s.inProgress.description : s.done.description,
  }));

  return (
    <StepsContainer>
      <Steps size="small" current={current} items={items} />
    </StepsContainer>
  );
};

export default NewClaimsSteps;
