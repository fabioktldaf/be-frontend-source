import { SubjectGiuridicalPersonData, SubjectNaturalPersonData } from "./uses-data.types";

export type PolicySubjectTypes = "" | "beneficiary" | "contractor" | "driver" | "insured" | "owner";

export type PolicyDataPolicy = {
  companyCode?: string;
  branch?: string;
  number?: string;
  effectDate?: string;
  expiringDate?: string;
};

export type PolicyDataGoodInsured = {
  brand?: string;
  model?: string;
  vehicleType?: string;
  plate?: string;
  plateType?: string;
  isSpecial?: boolean;
};

export type PolicyDataGuarantees = {
  code?: string;
  effectDate?: string;
  expiringDate?: string;
};

export type PolicyDataSubject = {
  contractor?: SubjectNaturalPersonData | SubjectGiuridicalPersonData;
  insured?: SubjectNaturalPersonData | SubjectGiuridicalPersonData;
  owner?: SubjectNaturalPersonData | SubjectGiuridicalPersonData;
  beneficiary?: SubjectNaturalPersonData | SubjectGiuridicalPersonData;
  driver?: SubjectNaturalPersonData;
};

export type PolicyDataType = {
  id: string;
  policyData: PolicyDataPolicy;
  goodInsured: PolicyDataGoodInsured;
  guarantees: PolicyDataGuarantees;
  subject: PolicyDataSubject;
};

export type UpdatePolicySubjectParams = {
  subject: undefined | SubjectNaturalPersonData | SubjectGiuridicalPersonData;
  type: PolicySubjectTypes;
};

export type EditingPolicySubjectState = {
  modalOpen: boolean;
  id?: string;
  type: PolicySubjectTypes;
};
