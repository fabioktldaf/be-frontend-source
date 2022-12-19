export type SearchTypes = "generic" | "vehicle" | "subject" | "policy" | "claim";

export type SearchFilterSubject = {
  nominative?: string;
  businessName?: string;
  fiscalCode?: string;
  pIva?: string;
  phone?: string;
  email?: string;
  documentNumber?: string;
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
  name: string;
  lastname: string;
  fiscalCode: string;
};

export type SearchResultItemSubjectGiuridicaPerson = {
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
