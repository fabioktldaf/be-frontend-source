import React from "react";
import { Tooltip } from "antd";
import styled from "styled-components";
import { SubjectData, SubjectGiuridicalPersonData, SubjectNaturalPersonData } from "../../types/uses-data.types";
import { IApplication } from "../../application";
import { TFunction } from "i18next";

interface SubjectDetailsAddressesProps {
  subject?: SubjectData;
  readOnly: boolean;
  app: IApplication;
  t: TFunction<"translation", undefined>;
  onChange: (value: any, field: string) => void;
}

const SubjectDetailsAddresses = (props: SubjectDetailsAddressesProps) => {
  const { subject, readOnly, app, t } = props;

  return <>indirizzi</>;
};

export default SubjectDetailsAddresses;
