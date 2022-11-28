import React, { useEffect, useState } from "react";
import { Steps, Space, Spin, Button } from "antd";
import styled from "styled-components";

interface AdditionalDataProps {}

const Resume = (props: AdditionalDataProps) => {
  return (
    <div style={{ display: "flex", alignItems: "center", flexDirection: "column", padding: "2em 0" }}>
      <div>[[riepilogo del sinistro]]</div>
      <br />
      <div>Scarica un PDF</div>
    </div>
  );
};

export default Resume;
