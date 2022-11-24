import React, { useEffect, useState } from "react";
import { Steps, Space, Spin, Button } from "antd";
import styled from "styled-components";

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

interface CheckSendingANIAProps {
  onForward: () => void;
  onBackward: () => void;
}

const CheckSendingANIA = (props: CheckSendingANIAProps) => {
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setVerified(true);
    }, 3000);
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
          <div>[[Messaggio/Risposta da SIC]]</div>
          <br />
          <div>
            I dati inseriti risultano corretti{" "}
            <Button type="primary" onClick={() => props.onForward()}>
              Avanti
            </Button>
          </div>
          <br />
          <div>
            Torna indietro e correggi i dati{" "}
            <Button type="primary" onClick={() => props.onBackward()}>
              Indietro
            </Button>
          </div>
        </ResultANIA>
      )}
    </CheckSendingANIAContainer>
  );
};

export default CheckSendingANIA;