import React, { useState } from "react";
import styled from "styled-components";
import carImage from "../../images/car.png";
import { Tooltip } from "antd";
import { vehicleCollisionPoints } from "../../config/const";
import { TooltipPlacement } from "antd/es/tooltip";

const CarContainer = styled.div`
  position: relative;
  z-index: 1;
  width: 150px;
  height: 360px;
`;

const CarStyled = styled.img`
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100%;
`;

const SvgStyled = styled.svg`
  position: absolute;
  z-index: 2;
`;

const PathStyled = styled.path<{ selected?: boolean }>`
  cursor: pointer;
  position: absolute;
  z-index: 2;
  &:hover {
    fill: ${(props) => (props.selected ? "#ff000085" : "#ffff005e")};
  }
`;

interface CarImpactSelectorProps {
  areas?: string[];
  onChange: (areas: string[]) => void;
}

const CarImpactSelector = (props: CarImpactSelectorProps) => {
  const [areas, setAreas] = useState<string[]>(props.areas || []);

  const handleChangeSelection = (code: string) => {
    const toggle = areas.indexOf(code) !== -1;
    const newAreas = toggle ? areas.filter((a) => a !== code) : [...areas, code];
    setAreas(newAreas);
    props.onChange(newAreas);
  };

  return (
    <CarContainer>
      <CarStyled src={carImage} />
      <SvgStyled xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 202 484">
        {vehicleCollisionPoints.map((path) => (
          <Tooltip title={`${path.code} - ${path.label}`} placement={path.tooltipPlacement as TooltipPlacement}>
            <PathStyled
              fill={areas.indexOf(path.code) === -1 ? "#00000001" : "#ff000085"}
              selected={areas.indexOf(path.code) >= 0}
              onClick={() => handleChangeSelection(path.code)}
              d={path.path}
            />
          </Tooltip>
        ))}
      </SvgStyled>
    </CarContainer>
  );
};

export default CarImpactSelector;
