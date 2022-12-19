import { SubjectGiuridicalPersonData, SubjectNaturalPersonData } from "./uses-data.types";

export type ClaimDataOwnerVehiclePlateType = {
  number: string;
  format: string;
};

export type ClaimDataOwnerVehicleType = {
  type: string;
  plate: ClaimDataOwnerVehiclePlateType;
};

export type ClaimDataPolicyDataType = {
  policy_number: string;
  effect_date: string;
  expiration_date: string;
  owner: ClaimDataSubjetcType;
  contractor: ClaimDataSubjetcType;
  ownerVehicle: ClaimDataOwnerVehicleType;
};

export type SubjetcPersonType = {
  id: number;
  name: string;
  lastname: string;
  fiscal_code: string;
  province_of_residence: string;
  city_of_residence: string;
};
export type SubjetcCompanyType = {
  id: number;
  business_name: string;
  pIva: string;
  registered_office_province: string;
  registered_office_city: string;
};

export type ClaimDataSubjetcType = {
  natural_person?: SubjetcPersonType;
  giuridical_person?: SubjetcCompanyType;
};

export type NewClaimCardQuestion = {
  howManyVehicles: number;
  vehicleAType: string;
  vehicleBType: string;
  collision: boolean;
  inItaly: boolean;
};

export type ClaimDataType = {
  number: string;
  registrationDate: string;
  receiptDate: string;
  dateOfReceiptCompany: string;
  dateOfReceiptDekra: string;
  occurrenceDate: string;
  occurrenceTime: string;
  occurrencePlace: string;
  policeIntervention: boolean;
  witnesses: boolean;
  note: string;
  ___isPolicyCard?: boolean;
};

export type PersonType = "Fisica" | "Giuridica";

export type UpdateNewClaimDataFieldsType =
  | "receiptDate"
  | "dateOfReceiptCompany"
  | "dateOfReceiptDekra"
  | "occurrenceDate"
  | "occurrenceTime"
  | "occurrencePlace"
  | "policeIntervention"
  | "witnesses"
  | "note"
  | "isOwnerNaturalPerson"
  | "ownerName"
  | "ownerLastname"
  | "ownerBusinessName"
  | "driverName"
  | "driverLastname"
  | "plate"
  | "insuranceCode";

export type UpdateNewClaimResponsabilityDataFieldsType = "barems" | "forced-reason" | "signature-type";

export type PartChangeType =
  | "damage-type"
  | "collision-point"
  | "person-damage"
  | "role-type"
  | "subject"
  | "owner-vehicle-note"
  | "person-note"
  | "thing-note"
  | "management-type";

export type PartChangeTypeType = "" | "Person" | "Thing" | "Vehicle" | "Location" | "Generic";

export type SubjectPersonalDataType = {
  id: number;
};

export type PartDamagedDetailsPerson = {
  personWoundedPoints: string[];
  personlData?: SubjectPersonalDataType;
  note?: string;
};

export type PartDamagedDetailsVehicle = {
  plate: string;
  format: string;
  type: string;
  collisionPoints: string[];
  note: string;
};

export type PartDamagedDetailsThing = {
  note: string;
};

export type DamagedType = {
  damageType: PartChangeTypeType;
  details: PartDamagedDetailsPerson | PartDamagedDetailsVehicle | PartDamagedDetailsThing;
};

export type DamagedPartType = {
  pdNumber: string;
  subject?: SubjectNaturalPersonData | SubjectGiuridicalPersonData;
  roleType: string;
  damages: DamagedType[];
};

export type DamagedPartPair = {
  damagedPart: DamagedPartType;
  index: number;
};

export type NewClaimStepTextType = {
  title: string;
  description: string;
};

export type NewClaimStepItem = {
  number: number;
  waiting: NewClaimStepTextType;
  inProgress: NewClaimStepTextType;
  done: NewClaimStepTextType;
};

export type ResponsabilityTypes = "1" | "2" | "3" | "4" | "5" | "---";
export type ResponsabilitiesType = {
  card: SelectPair[];
  noCard: SelectPair[];
};

export type SteppedChangeDataType = "vehicles_number" | "vehicle_a_type" | "vehicle_b_type" | "collision" | "inItaly";

export type VehicoleTypeType = "A" | "B" | "C" | "M" | "Q" | "T" | "W" | "R" | "S" | "---";

export type ClaimType = "CARD" | "NO CARD" | "---";

export type StepperDataType = {
  numeroVeicoliCoinvolti: number;
  veicoloAVisibile: boolean;
  tipoVeicoloA: VehicoleTypeType;
  veicoloBVisibile: boolean;
  tipoVeicoloB: VehicoleTypeType;
  collisioneVisibile: boolean;
  collisione: boolean;
  inItaliaVisibile: boolean;
  inItalia: boolean;
  tipoSinistro: ClaimType;
};

export enum NewClaimStateType {
  Unknown,
  MandatoryData,
  CheckingData,
  VerifingSic,
  SicCorrect,
  SicError,
  AdditionalData,
  Resume,
}

export type BaremsResultType = {
  vehicleA: number;
  vehicleB: number;
  result: string;
};

export type ResponsabilityDataType = {
  barems: BaremsResultType;
  forcedReason: string;
  responsabilityType: string;
  responsabilityPercentage: string;
  responsabilityPercentageFixed: boolean;
  signatureType: string;
};

export type ClaimDataCounterpartDataType = {
  isOwnerNaturalPerson: boolean;
  ownerName: string;
  ownerLastname: string;
  ownerBusinessName: string;
  driverName: string;
  driverLastname: string;
  plate: string;
  insuranceCode: string;
};

export type SelectPair = {
  value: any;
  label: string;
};

export type AdditionaInfoTypes = "subject" | "document" | "payment" | "contact";
export type AdditionalInfoSubjectRoleTypes = "---" | "coachbuilder" | "expert" | "lawyer";

export type AdditionalInfoSubjectType = {
  role: AdditionalInfoSubjectRoleTypes;
  personalData: any;
};

export type AdditionalInfoDocumentTypes = "---" | "id-card" | "passport" | "expertise" | "police-report";

export type AdditionalInfoDocumentType = {
  type: AdditionalInfoDocumentTypes;
  filename: string[];
};

export type AdditionalInfoPaymentTypes = "---" | "transfer" | "check";

export type AdditionalInfoPaymentType = {
  type: AdditionalInfoPaymentTypes;
  iban?: string;
};

export type AdditionalInfoContactType = {
  shippingAddress?: string;
  email?: string;
  phone?: string;
};

export type AdditionalInfoDataType = {
  id: number;
  type: AdditionaInfoTypes;
  damagedPartNumber: string;
  details:
    | AdditionalInfoSubjectType
    | AdditionalInfoDocumentType
    | AdditionalInfoPaymentType
    | AdditionalInfoContactType;
};

export type AdditionalInfoPair = {
  additionalInfo: AdditionalInfoDataType;
  index: number;
};
