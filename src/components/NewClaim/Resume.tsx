import React, { useEffect, useState } from "react";
import { Steps, Space, Spin, Button } from "antd";
import styled from "styled-components";

interface AdditionalDataProps {}

const Resume = (props: AdditionalDataProps) => {
  return (
    <div style={{ display: "flex", alignItems: "center", flexDirection: "column", padding: "2em 0" }}>
      <div>Good Job!</div>
      <br />
      <div>[[eventuali dati di riepilogo del sinistro]]</div>
      <br />
      <div>Vuoi inviare un riepilogo del sinistro via email?</div>
    </div>
  );
};

export default Resume;
