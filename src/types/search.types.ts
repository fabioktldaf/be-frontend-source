export type SearchTypes = "generic" | "vehicle" | "subject" | "policy" | "claim" | "insurance";
export type SearchResultOnSelectTypes =
  | ""
  | "subject-selected"
  | "policy-selected"
  | "new-subject"
  | "new-policy"
  | "new-claim";

export type SearchFilterSubject = {
  nominative?: string;
  businessName?: string;
  fiscalCode?: string;
  pIva?: string;
  phone?: string;
  email?: string;
};

export type SearchFilterVehicle = {
  plate: string;
};

export type SearchFilterPolicy = {
  policyNumber?: string;
};

export type SearchFilterClaim = {
  claimNumber?: string;
};

export type SearchParams = {
  term: string;
  type: SearchTypes;
  bySubject?: SearchFilterSubject;
  byVehicle?: SearchFilterVehicle;
  byPolicy?: SearchFilterPolicy;
  byClaim?: SearchFilterClaim;
};

export type SearchResultItemSubjectNaturalPerson = {
  id: string;
  name: string;
  lastname: string;
  fiscalCode: string;
};

export type SearchResultItemSubjectGiuridicaPerson = {
  id: string;
  business_name: string;
  type?: string;
  pIva: string;
  proprietorship?: SearchResultItemSubjectNaturalPerson;
};

export type SearchResultItemClaimCreated = {
  number: string;
  occurrenceDate: string;
  occurrenceTime: string;
};

export type SearchResultItemClaimReceived = {
  number: string;
  occurrenceDate: string;
  occurrenceTime: string;
};

export type SearchResultItemClaim = {
  created: SearchResultItemClaimCreated;
  received: SearchResultItemClaimReceived;
};

export type SearchResultItemVehiclePlate = {
  number: string;
  format: string;
};

export type SearchResultItemVehicle = {
  type: string;
  plate: SearchResultItemVehiclePlate;
};

export type SearchResultItemPolicy = {
  id: string;
  policy_number: string;
  effect_date: string;
  expiration_date: string;
  claims?: SearchResultItemClaim[];
  vehicle?: SearchResultItemVehicle;
};

export type SearchResultItem = {
  subject: SearchResultItemSubjectNaturalPerson | SearchResultItemSubjectGiuridicaPerson;
  policies: SearchResultItemPolicy[];
};
