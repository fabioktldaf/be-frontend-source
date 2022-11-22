import React, { useEffect, useState } from "react";
import { Steps, Space, Spin, Button } from "antd";
import styled from "styled-components";

const AdditionaDataContainer = styled.div`
  width: 60vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AdditionalDataMessage = styled.div`
  color: #333;
  margin: 3em 0;
`;

interface AdditionalDataProps {
  onSave: () => void;
}

const AdditionalData = (props: AdditionalDataProps) => {
  return (
    <AdditionaDataContainer>
      <AdditionalDataMessage>[[Ulteriori form dove inserire i dati facoltativi]]</AdditionalDataMessage>

      <Button type="primary" onClick={() => props.onSave()}>
        Salva
      </Button>
    </AdditionaDataContainer>
  );
};

export default AdditionalData;
