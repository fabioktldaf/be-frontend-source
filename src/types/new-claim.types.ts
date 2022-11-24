export type ClaimDataPolicyDataType = {
  policy_number: string;
  effect_date: string;
  expiration_date: string;
  owner: ClaimDataSubjetcType;
  contractor: ClaimDataSubjetcType;
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

export type UpdateDataFieldsType =
  | "receipt-date"
  | "occurrence-date"
  | "occurrence-time"
  | "occurrence-place"
  | "police-intervention"
  | "witnesses"
  | "note";

export type PartChangeType = "damage_type" | "collision_point" | "person_damage" | "role_type";

export type PartChangeTypeType = "" | "Person" | "Thing" | "Vehicle" | "Location" | "Generic";

export type SubjectPersonalDataType = {
  id: number;
};

export type PartDamagedDetailsPerson = {
  personWoundedPoints: string[];
  personlData?: SubjectPersonalDataType;
};

export type PartDamagedDetailsVehicle = {
  plate: string;
  format: string;
  type: string;
  collisionPoints: string[];
};

export type PartDamagedDetailsThing = {};

export type DamagedType = {
  tipo_ruolo: string;
  tipo_danno: PartChangeTypeType;
  details: PartDamagedDetailsPerson | PartDamagedDetailsVehicle | PartDamagedDetailsThing;
  note: string;
};

export type PartType = {
  subject: any;
  numero_pd: string;
  danni: DamagedType[];
  data_pd: string;
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
