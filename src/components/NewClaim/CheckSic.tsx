import React, { useEffect, useState } from "react";
import { Steps, Space, Spin, Button } from "antd";
import styled from "styled-components";

import cnApproved from "../../images/cn-approved.jpg";

const CheckSendingANIAContainer = styled.div`
  width: 60vw;
  display: flex;
  flex-align: column;
  justify-content: center;
`;

const LoaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 5em;
`;

const LoaderMessage = styled.div`
  color: #333;
  margin-left: 2em;
`;

const ResultANIA = styled.div`
  margin-top: 3em;
`;

interface CheckSicProps {
  onForward: () => void;
  onBackward: () => void;
}

const CheckSic = (props: CheckSicProps) => {
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setVerified(true);
    }, 2000);
  });

  return (
    <CheckSendingANIAContainer>
      {!verified && (
        <LoaderContainer>
          <Spin size="large" />
          <LoaderMessage> Verifica della correttezza dei dati in corso...</LoaderMessage>
        </LoaderContainer>
      )}
      {verified && (
        <ResultANIA>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ textAlign: "center", marginBottom: "1em" }}>I DATI DELLA CINQUINA SONO CORRETTI</div>
            <img src={cnApproved} />
            <br />
            <Button type="primary" onClick={() => props.onForward()}>
              Avanti
            </Button>
            <br />
            <Button type="primary" onClick={() => props.onBackward()}>
              Indietro
            </Button>
          </div>
        </ResultANIA>
      )}
    </CheckSendingANIAContainer>
  );
};

export default CheckSic;
