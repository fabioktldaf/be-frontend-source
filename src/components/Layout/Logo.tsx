import moment from "moment";
import React, { useState } from "react";

import styled from "styled-components";

const LogoStyled = styled.div`
  font-weight: bold;
  font-size: 1.6em;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 3em;
`;

type Props = {};

const Logo: React.FC<Props> = (props: Props) => {
  return (
    <LogoStyled>
      Frontend
      <span style={{ fontSize: "12px", margin: "0.8em 1em 0 1em", fontWeight: "100" }}>0.1.6</span>
    </LogoStyled>
  );
};

export default Logo;
