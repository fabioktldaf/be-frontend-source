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
  return <LogoStyled>Frontend</LogoStyled>;
};

export default Logo;
