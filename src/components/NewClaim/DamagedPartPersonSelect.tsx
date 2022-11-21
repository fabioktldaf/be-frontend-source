import React, { useState } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { PartDamagedDetailsPerson } from "./DamagedPart";

import front_unselected from "../../images/body/front-unselected.png";
import front_head_hover from "../../images/body/front-head-hover.png";
import front_head_selected from "../../images/body/front-head-selected.png";
import front_arm_left_hover from "../../images/body/front-arm-left-hover.png";
import front_arm_left_selected from "../../images/body/front-arm-left-selected.png";
import front_arm_right_hover from "../../images/body/front-arm-right-hover.png";
import front_arm_right_selected from "../../images/body/front-arm-right-selected.png";
import front_trunc_hover from "../../images/body/front-trunc-hover.png";
import front_trunc_selected from "../../images/body/front-trunc-selected.png";
import front_leg_left_hover from "../../images/body/front-leg-left-hover.png";
import front_leg_left_selected from "../../images/body/front-leg-left-selected.png";
import front_leg_right_hover from "../../images/body/front-leg-right-hover.png";
import front_leg_right_selected from "../../images/body/front-leg-right-selected.png";
import { Tooltip } from "antd";

const DamagedPartPersonStyled = styled.div``;

const PersonContainer = styled.div`
  position: relative;
  z-index: 1;
  width: 256px;
  height: 589px;
  margin-left: 10em;
`;

const PersonFront = styled.img`
  position: absolute;
  z-index: 1;
  width: 256px;
  height: 589px;
`;

const HeadStyled = styled.div<{ selected: boolean }>`
  width: 71px;
  height: 91px;
  cursor: pointer;
  position: absolute;
  left: 90px;
  top: 21px;
  z-index: 2;
  ${(props) =>
    props.selected
      ? "background-image:  url(" + front_head_selected + ");"
      : " &:hover { \
          background-image: url(" + front_head_hover + "); \
        }"}
`;

const TruncStyled = styled.div<{ selected: boolean }>`
  width: 118px;
  height: 220px;
  cursor: pointer;
  position: absolute;
  left: 67px;
  top: 101px;
  z-index: 2;
  ${(props) =>
    props.selected
      ? "background-image:  url(" + front_trunc_selected + ");"
      : " &:hover { \
          background-image: url(" + front_trunc_hover + "); \
        }"}
`;

const ArmLeftStyled = styled.div<{ selected: boolean }>`
  width: 69px;
  height: 240px;
  cursor: pointer;
  position: absolute;
  left: 6px;
  top: 130px;
  z-index: 2;
  ${(props) =>
    props.selected
      ? "background-image:  url(" + front_arm_left_selected + ");"
      : " &:hover { \
          background-image: url(" + front_arm_left_hover + "); \
        }"}
`;

const ArmRightStyled = styled.div<{ selected: boolean }>`
  width: 71px;
  height: 233px;
  cursor: pointer;
  position: absolute;
  left: 175px;
  top: 132px;
  z-index: 2;
  ${(props) =>
    props.selected
      ? "background-image:  url(" + front_arm_right_selected + ");"
      : " &:hover { \
          background-image: url(" + front_arm_right_hover + "); \
        }"}
`;

const LegLeftStyled = styled.div<{ selected: boolean }>`
  width: 52px;
  height: 277px;
  cursor: pointer;
  position: absolute;
  left: 74px;
  top: 308px;
  z-index: 2;
  ${(props) =>
    props.selected
      ? "background-image:  url(" + front_leg_left_selected + ");"
      : " &:hover { \
          background-image: url(" + front_leg_left_hover + "); \
        }"}
`;

const LegRightStyled = styled.div<{ selected: boolean }>`
  width: 53px;
  height: 281px;
  cursor: pointer;
  position: absolute;
  left: 124px;
  top: 300px;
  z-index: 2;

  ${(props) =>
    props.selected
      ? "background-image:  url(" + front_leg_right_selected + ");"
      : " &:hover { \
          background-image: url(" + front_leg_right_hover + "); \
        }"}
`;

export type PersonDamagesSelection = {
  front_head: boolean;
  front_trunc: boolean;
  front_arm_right: boolean;
  front_arm_left: boolean;
  front_leg_right: boolean;
  front_leg_left: boolean;
};

interface DamagedPartPersonProps {
  details?: PartDamagedDetailsPerson;
  onChange: (localizations: string[]) => void;
}

const DamagedPartPersonSelect = (props: DamagedPartPersonProps) => {
  const { t } = useTranslation();
  const [selection, setSelection] = useState<PersonDamagesSelection>({
    front_head: false,
    front_trunc: false,
    front_arm_right: false,
    front_arm_left: false,
    front_leg_right: false,
    front_leg_left: false,
  });

  const handleToggleSelection = (localization: string) => {
    const newSelection: any = Object.assign({}, selection);
    newSelection[localization] = !newSelection[localization];
    setSelection(newSelection);
  };

  return (
    <DamagedPartPersonStyled>
      <PersonContainer>
        <PersonFront src={front_unselected} />
        <Tooltip title="Testa Frontale" placement="top">
          <HeadStyled selected={selection.front_head} onClick={() => handleToggleSelection("front_head")} />
        </Tooltip>
        <Tooltip title="Busto Frontale" placement="top">
          <TruncStyled selected={selection.front_trunc} onClick={() => handleToggleSelection("front_trunc")} />
        </Tooltip>
        <Tooltip title="Braccio Sinistro Frontale" placement="left">
          <ArmLeftStyled selected={selection.front_arm_left} onClick={() => handleToggleSelection("front_arm_left")} />
        </Tooltip>
        <Tooltip title="Braccio Destro Frontale" placement="right">
          <ArmRightStyled
            selected={selection.front_arm_right}
            onClick={() => handleToggleSelection("front_arm_right")}
          />
        </Tooltip>
        <Tooltip title="Gamba Sinistra Frontale" placement="left">
          <LegLeftStyled selected={selection.front_leg_left} onClick={() => handleToggleSelection("front_leg_left")} />
        </Tooltip>
        <Tooltip title="Gamba Destra Frontale" placement="right">
          <LegRightStyled
            selected={selection.front_leg_right}
            onClick={() => handleToggleSelection("front_leg_right")}
          />
        </Tooltip>
      </PersonContainer>
    </DamagedPartPersonStyled>
  );
};

export default DamagedPartPersonSelect;
