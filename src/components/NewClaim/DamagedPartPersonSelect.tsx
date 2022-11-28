import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

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

import rear_unselected from "../../images/body/rear-unselected.png";
import rear_head_hover from "../../images/body/rear-head-hover.png";
import rear_head_selected from "../../images/body/rear-head-selected.png";
import rear_arm_left_hover from "../../images/body/rear-arm-left-hover.png";
import rear_arm_left_selected from "../../images/body/rear-arm-left-selected.png";
import rear_arm_right_hover from "../../images/body/rear-arm-right-hover.png";
import rear_arm_right_selected from "../../images/body/rear-arm-right-selected.png";
import rear_trunc_hover from "../../images/body/rear-trunc-hover.png";
import rear_trunc_selected from "../../images/body/rear-trunc-selected.png";
import rear_leg_left_hover from "../../images/body/rear-leg-left-hover.png";
import rear_leg_left_selected from "../../images/body/rear-leg-left-selected.png";
import rear_leg_right_hover from "../../images/body/rear-leg-right-hover.png";
import rear_leg_right_selected from "../../images/body/rear-leg-right-selected.png";

import { Tooltip } from "antd";
import { PartDamagedDetailsPerson } from "../../types/new-claim.types";

const DamagedPartPersonStyled = styled.div`
  display: flex;
  flex: 1;
  transform: scale(0.6);
`;

const PersonContainer = styled.div`
  flex: 1;
  position: relative;
  z-index: 1;
  width: 256px;
  height: 589px;
`;

const PersonBackground = styled.img`
  position: absolute;
  z-index: 1;
  width: 256px;
  height: 589px;
`;

const BaseImageStyled = styled.div<{ selected: boolean }>`
  cursor: pointer;
  position: absolute;
  z-index: 2;
  background-repeat: no-repeat;
`;

const FrontHeadStyled = styled(BaseImageStyled)`
  width: 71px;
  height: 91px;
  left: 90px;
  top: 21px;
  ${(props) =>
    props.selected
      ? "background-image:  url(" + front_head_selected + ");"
      : " &:hover { \
          background-image: url(" + front_head_hover + "); \
        }"}
`;

const FrontTruncStyled = styled(BaseImageStyled)`
  width: 118px;
  height: 220px;
  left: 67px;
  top: 101px;
  ${(props) =>
    props.selected
      ? "background-image:  url(" + front_trunc_selected + ");"
      : " &:hover { \
          background-image: url(" + front_trunc_hover + "); \
        }"}
`;

const FrontArmLeftStyled = styled(BaseImageStyled)`
  width: 68px;
  height: 234px;
  left: 6px;
  top: 130px;
  ${(props) =>
    props.selected
      ? "background-image:  url(" + front_arm_left_selected + ");"
      : " &:hover { \
          background-image: url(" + front_arm_left_hover + "); \
        }"}
`;

const FrontArmRightStyled = styled(BaseImageStyled)`
  width: 71px;
  height: 233px;
  left: 175px;
  top: 132px;
  ${(props) =>
    props.selected
      ? "background-image:  url(" + front_arm_right_selected + ");"
      : " &:hover { \
          background-image: url(" + front_arm_right_hover + "); \
        }"}
`;

const FrontLegLeftStyled = styled(BaseImageStyled)`
  width: 52px;
  height: 277px;
  left: 74px;
  top: 308px;
  ${(props) =>
    props.selected
      ? "background-image:  url(" + front_leg_left_selected + ");"
      : " &:hover { \
          background-image: url(" + front_leg_left_hover + "); \
        }"}
`;

const FrontLegRightStyled = styled(BaseImageStyled)`
  width: 53px;
  height: 281px;
  left: 124px;
  top: 300px;

  ${(props) =>
    props.selected
      ? "background-image:  url(" + front_leg_right_selected + ");"
      : " &:hover { \
          background-image: url(" + front_leg_right_hover + "); \
        }"}
`;

const RearHeadStyled = styled(BaseImageStyled)`
  width: 71px;
  height: 91px;
  left: 92px;
  top: 16px;
  ${(props) =>
    props.selected
      ? "background-image:  url(" + rear_head_selected + ");"
      : " &:hover { \
          background-image: url(" + rear_head_hover + "); \
        }"}
`;

const RearTruncStyled = styled(BaseImageStyled)`
  width: 118px;
  height: 220px;
  left: 77px;
  top: 114px;
  ${(props) =>
    props.selected
      ? "background-image:  url(" + rear_trunc_selected + ");"
      : " &:hover { \
          background-image: url(" + rear_trunc_hover + "); \
        }"}
`;

const RearArmLeftStyled = styled(BaseImageStyled)`
  width: 68px;
  height: 234px;
  left: 9px;
  top: 127px;
  ${(props) =>
    props.selected
      ? "background-image:  url(" + rear_arm_left_selected + ");"
      : " &:hover { \
          background-image: url(" + front_arm_left_hover + "); \
        }"}
`;

const RearArmRightStyled = styled(BaseImageStyled)`
  width: 71px;
  height: 233px;
  left: 178px;
  top: 128px;
  ${(props) =>
    props.selected
      ? "background-image:  url(" + rear_arm_right_selected + ");"
      : " &:hover { \
          background-image: url(" + rear_arm_right_hover + "); \
        }"}
`;

const RearLegLeftStyled = styled(BaseImageStyled)`
  width: 52px;
  height: 277px;
  left: 75px;
  top: 327px;
  ${(props) =>
    props.selected
      ? "background-image:  url(" + rear_leg_left_selected + ");"
      : " &:hover { \
          background-image: url(" + rear_leg_left_hover + "); \
        }"}
`;

const RearLegRightStyled = styled(BaseImageStyled)`
  width: 53px;
  height: 281px;
  left: 127px;
  top: 327px;

  ${(props) =>
    props.selected
      ? "background-image:  url(" + rear_leg_right_selected + ");"
      : " &:hover { \
          background-image: url(" + rear_leg_right_hover + "); \
        }"}
`;

export type PersonDamagesSelection = {
  front_head: boolean;
  front_trunc: boolean;
  front_arm_right: boolean;
  front_arm_left: boolean;
  front_leg_right: boolean;
  front_leg_left: boolean;
  rear_head: boolean;
  rear_trunc: boolean;
  rear_arm_right: boolean;
  rear_arm_left: boolean;
  rear_leg_right: boolean;
  rear_leg_left: boolean;
};

interface DamagedPartPersonProps {
  details?: PartDamagedDetailsPerson;
  onChange: (localizations: string[]) => void;
}

const DamagedPartPersonSelect = (props: DamagedPartPersonProps) => {
  const { details } = props;
  const { t } = useTranslation();

  const personWoundedPoints = details?.personWoundedPoints || [];
  const hasWound = (wound: string) => personWoundedPoints.indexOf(wound) >= 0 || false;

  // const [selection, setSelection] = useState<PersonDamagesSelection>({
  //   front_head: hasWound("front_head"),
  //   front_trunc: hasWound("front_trunc"),
  //   front_arm_right: hasWound("front_arm_right"),
  //   front_arm_left: hasWound("front_arm_left"),
  //   front_leg_right: hasWound("front_leg_right"),
  //   front_leg_left: hasWound("front_leg_left"),
  //   rear_head: hasWound("rear_head"),
  //   rear_trunc: hasWound("rear_trunc"),
  //   rear_arm_right: hasWound("rear_arm_right"),
  //   rear_arm_left: hasWound("rear_arm_left"),
  //   rear_leg_right: hasWound("rear_leg_right"),
  //   rear_leg_left: hasWound("rear_leg_left"),
  // });

  // useEffect(() => {
  //   setSelection({
  //     front_head: hasWound("front_head"),
  //     front_trunc: hasWound("front_trunc"),
  //     front_arm_right: hasWound("front_arm_right"),
  //     front_arm_left: hasWound("front_arm_left"),
  //     front_leg_right: hasWound("front_leg_right"),
  //     front_leg_left: hasWound("front_leg_left"),
  //     rear_head: hasWound("rear_head"),
  //     rear_trunc: hasWound("rear_trunc"),
  //     rear_arm_right: hasWound("rear_arm_right"),
  //     rear_arm_left: hasWound("rear_arm_left"),
  //     rear_leg_right: hasWound("rear_leg_right"),
  //     rear_leg_left: hasWound("rear_leg_left"),
  //   });
  // }, [personWoundedPoints]);

  const handleToggleSelection = (localization: string) => {
    let newSelection: string[] = [...(props.details?.personWoundedPoints || [])];
    if (newSelection.find((s) => s === localization)) {
      newSelection = newSelection.filter((s) => s !== localization);
    } else newSelection.push(localization);

    // newSelection[localization] = !newSelection[localization];
    // //setSelection(newSelection);
    // const localizationsLabel: string[] = [];

    // if (newSelection.front_head) localizationsLabel.push("front_head");
    // if (newSelection.front_trunc) localizationsLabel.push("front_trunc");
    // if (newSelection.front_arm_right) localizationsLabel.push("front_arm_right");
    // if (newSelection.front_arm_left) localizationsLabel.push("front_arm_left");
    // if (newSelection.front_leg_right) localizationsLabel.push("front_leg_righ");
    // if (newSelection.front_leg_left) localizationsLabel.push("front_leg_left");
    // if (newSelection.rear_head) localizationsLabel.push("rear_head");
    // if (newSelection.rear_trunc) localizationsLabel.push("rear_trunc");
    // if (newSelection.rear_arm_right) localizationsLabel.push("rear_arm_right");
    // if (newSelection.rear_arm_left) localizationsLabel.push("rear_arm_left");
    // if (newSelection.rear_leg_right) localizationsLabel.push("rear_leg_right");
    // if (newSelection.rear_leg_left) localizationsLabel.push("rear_leg_left");

    console.log("newSelection ", newSelection);
    props.onChange(newSelection);
  };

  return (
    <DamagedPartPersonStyled>
      <PersonContainer>
        <PersonBackground src={front_unselected} />
        <Tooltip title="Testa Frontale" placement="top" mouseLeaveDelay={0}>
          <FrontHeadStyled selected={hasWound("front_head")} onClick={() => handleToggleSelection("front_head")} />
        </Tooltip>
        <Tooltip title="Busto Frontale" placement="top" mouseLeaveDelay={0}>
          <FrontTruncStyled selected={hasWound("front_trunc")} onClick={() => handleToggleSelection("front_trunc")} />
        </Tooltip>
        <Tooltip title="Braccio Sinistro Frontale" placement="left" mouseLeaveDelay={0}>
          <FrontArmLeftStyled
            selected={hasWound("front_arm_left")}
            onClick={() => handleToggleSelection("front_arm_left")}
          />
        </Tooltip>
        <Tooltip title="Braccio Destro Frontale" placement="right" mouseLeaveDelay={0}>
          <FrontArmRightStyled
            selected={hasWound("front_arm_right")}
            onClick={() => handleToggleSelection("front_arm_right")}
          />
        </Tooltip>
        <Tooltip title="Gamba Sinistra Frontale" placement="left" mouseLeaveDelay={0}>
          <FrontLegLeftStyled
            selected={hasWound("front_leg_left")}
            onClick={() => handleToggleSelection("front_leg_left")}
          />
        </Tooltip>
        <Tooltip title="Gamba Destra Frontale" placement="right" mouseLeaveDelay={0}>
          <FrontLegRightStyled
            selected={hasWound("front_leg_right")}
            onClick={() => handleToggleSelection("front_leg_right")}
          />
        </Tooltip>
      </PersonContainer>
      <PersonContainer>
        <PersonBackground src={rear_unselected} />
        <Tooltip title="Testa Posteriore" placement="top" mouseLeaveDelay={0}>
          <RearHeadStyled selected={hasWound("rear_head")} onClick={() => handleToggleSelection("rear_head")} />
        </Tooltip>
        <Tooltip title="Schiena" placement="top" mouseLeaveDelay={0}>
          <RearTruncStyled selected={hasWound("rear_trunc")} onClick={() => handleToggleSelection("rear_trunc")} />
        </Tooltip>
        <Tooltip title="Braccio Sinistro Posteriore" placement="left" mouseLeaveDelay={0}>
          <RearArmLeftStyled
            selected={hasWound("rear_arm_left")}
            onClick={() => handleToggleSelection("rear_arm_left")}
          />
        </Tooltip>
        <Tooltip title="Braccio Destro Posteriore" placement="right" mouseLeaveDelay={0}>
          <RearArmRightStyled
            selected={hasWound("rear_arm_right")}
            onClick={() => handleToggleSelection("rear_arm_right")}
          />
        </Tooltip>
        <Tooltip title="Gamba Sinistra Posteriore" placement="left" mouseLeaveDelay={0}>
          <RearLegLeftStyled
            selected={hasWound("rear_leg_left")}
            onClick={() => handleToggleSelection("rear_leg_left")}
          />
        </Tooltip>
        <Tooltip title="Gamba Destra Posteriore" placement="right" mouseLeaveDelay={0}>
          <RearLegRightStyled
            selected={hasWound("rear_leg_right")}
            onClick={() => handleToggleSelection("rear_leg_right")}
          />
        </Tooltip>
      </PersonContainer>
    </DamagedPartPersonStyled>
  );
};

export default DamagedPartPersonSelect;
