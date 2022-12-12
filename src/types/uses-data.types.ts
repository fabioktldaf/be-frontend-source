export type SubjectType = "natural" | "business" | "proprietorship";

export type NaturalPersonBirth = {
  date: string;
  city: string;
  province: string;
  country: string;
};

export type GenderType = "" | "male" | "female";

export type SubjectNaturalPersonData = {
  name: string;
  lastname: string;
  gender: GenderType;
  fiscalCode: string;
  birth: NaturalPersonBirth;
};

export type GiuridicalPersonType = "srl" | "spa" | "proprietorship";
export type SubjectGiuridicalPersonData = {
  isProprietorship: boolean;
  business_name: string;
  type: GiuridicalPersonType;
  p_iva: string;
  proprietorship?: SubjectNaturalPersonData;
  birth?: NaturalPersonBirth;
};

export type SubjectContactDataType = "" | "pec" | "phone" | "email" | "mobile";
export type SubjectContactData = {
  type: SubjectContactDataType;
  value?: string;
  description?: string;
  useCase?: string;
  preferred?: boolean;
};

export type SubjectAddressDataType =
  | ""
  | "domicile"
  | "residence"
  | "shipping"
  | "registered-office"
  | "operating-office";
export type SubjectAddressData = {
  type: SubjectAddressDataType;
  street?: string;
  civic?: string;
  cap?: string;
  city?: string;
  province?: string;
  country?: string;
  preferred?: boolean;
};

export type SubjectDocumentDataType = "" | "card-id" | "passport" | "driving-license" | "fiscal-code";
export type SubjectDocumentData = {
  type: SubjectDocumentDataType;
  number: string;
  issuingDate: string;
  expirationDate: string;
  issuingInstitution: string;
};

export type SubjectData = {
  person?: SubjectNaturalPersonData | SubjectGiuridicalPersonData;
  contacts?: SubjectContactData[];
  addresses?: SubjectAddressData[];
  documents?: SubjectDocumentData[];
};
