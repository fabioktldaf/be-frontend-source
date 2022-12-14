import React from "react";
import styled from "styled-components";

export const Col = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
`;

export const RowSpacer = styled.div`
  display: block;
  height: 100%;
  width: 2em;
`;

export const CenteredRow = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
`;

export const Hr = styled.div`
  height: 1px;
  border-top: 1px solid #eee;
  width: 100%;
  margin: 1em 0;
`;

export const Hidden = styled.div`
  width: 0px;
  height: 0px;
  overflow: hidden;
`;
