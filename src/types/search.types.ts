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
