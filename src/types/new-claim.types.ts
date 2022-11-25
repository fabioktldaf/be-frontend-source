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

export type ClaimDataSubjetcPersonType = {
  id: number;
  name: string;
  lastname: string;
  fiscal_code: string;
  province_of_residence: string;
  city_of_residence: string;
};
export type ClaimDataSubjetcCompanyType = {
  id: number;
  business_name: string;
  iva: string;
  registered_office_province: string;
  registered_office_city: string;
};

export type ClaimDataSubjetcType = {
  natural_person?: ClaimDataSubjetcPersonType;
  giuridical_person?: ClaimDataSubjetcCompanyType;
};

export type NewClaimCardQuestion = {
  howManyVehicles: number;
  vehicleAType: string;
  vehicleBType: string;
  collision: boolean;
  inItaly: boolean;
};

export type ClaimDataType = {
  //cardQuestions: NewClaimCardQuestion;
  //isCard: boolean;
  registrationDate: string;
  receiptDate: string;
  occurrenceDate: string;
  occurrenceTime: string;
  occurrencePlace: string;
  policeIntervention: boolean;
  witnesses: boolean;
  note: string;
};

export type UpdateNewClaimDataFieldsType =
  | "receipt-date"
  | "occurrence-date"
  | "occurrence-time"
  | "occurrence-place"
  | "police-intervention"
  | "witnesses"
  | "note";

export type UpdateNewClaimResponsabilityDataFieldsType = "barems" | "forced-reason" | "signature-type";

export type PartChangeType = "damage-type" | "collision-point" | "person-damage" | "role-type" | "owner-vehicle-note";

export type PartChangeTypeType = "" | "Person" | "Thing" | "Vehicle" | "Location" | "Generic";

export type SubjectPersonalDataType = {
  id: number;
};

export type PartDamagedDetailsPerson = {
  personWoundedPoints: string[];
  personlData?: SubjectPersonalDataType;
  note: string;
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
  subject: any; // da anagrafica
  roleType: string;
  managementType: string;
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

export const DamageTypeCard = [
  { value: "---", label: "---" },
  { value: "Person", label: "Persone" },
  { value: "Thing", label: "Cose" },
  { value: "Vehicle", label: "Veicolo" },
];

export const DamageTypeNoCard = [
  { value: "---", label: "---" },
  { value: "Person", label: "Persone" },
  { value: "Thing", label: "Cose" },
  { value: "Vehicle", label: "Veicolo" },
  { value: "Location", label: "Ubicazione" },
  { value: "Generic", label: "Generico" },
];
