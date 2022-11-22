import React from "react";
import { Steps } from "antd";
import { HiOutlineDocumentText } from "react-icons/hi";
import { CgFileDocument } from "react-icons/cg";
import { BiSend } from "react-icons/bi";
import styled from "styled-components";

const StepsContainer = styled.div`
  margin: 2em 0;
`;

interface NewClaimsStepsProps {
  current: number;
}

const NewClaimsSteps = (props: NewClaimsStepsProps) => {
  const { current: cur } = props;

  return (
    <StepsContainer>
      <Steps
        size="small"
        current={props.current}
        items={[
          {
            title: cur === 0 ? "Inserisci" : "Dati Obbligatori",
            description: cur === 0 ? "Dati Obbligatori" : "Completato",
          },
          {
            title: "Verifica SIC",
            description: cur <= 1 ? "" : "Verificato",
          },
          {
            title: cur === 2 ? "Inserisci" : "Info Addizionali",
            description: cur === 2 ? "Ulteriori dati " : cur > 2 ? "Completato" : "",
          },
          {
            title: "Riepilogo",
            description: cur === 3 ? "Sinitro" : "",
          },
        ]}
      />
    </StepsContainer>
  );
};

export default NewClaimsSteps;
