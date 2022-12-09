import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: block;
  position: relative;
  width: 100%;
  height: 2em;
  border-bottom: 3px double #eee;
  margin-bottom: 2em;
  text-align: center;
`;

const Text = styled.div`
  position: relative;
  background-color: #fafafa;
  top: 1.25em;
  display: inline-block;
  padding: 0 1em;
  text-transform: uppercase;
  font-size: 0.9em;
  letter-spacing: 1px;
`;

interface TitleProps {
  text: string;
  containerStyle?: any;
  textStyle?: any;
}

export const TitleHr = (props: TitleProps) => (
  <Container style={props.containerStyle}>
    <Text style={props.textStyle}>{props.text}</Text>
  </Container>
);
