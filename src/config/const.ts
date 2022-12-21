import { NewClaimStepItem, ResponsabilitiesType, SelectPair } from "../types/new-claim.types";
import { insuranceCodes } from "./dummy-data";

export const backend = {
  envs: [
    {
      label: "localhost",
      server: "http://127.0.0.1:5001/be-api-514bf/us-central1",
    },
    {
      label: "firebase",
      server: "https://us-central1-be-api-514bf.cloudfunctions.net",
    },
  ],
  paths: {
    search: "search",
    subject: "subject",
    policy: "policy",
  },
};

export const defaultLanguage = "it";
export const languages = ["it", "en", "empty"];

export const Urls = {
  home: "/",
  policy_searchFulltext: "/policy-search-fulltext",
  policy_searchByfields: "/policy-search-byfields",
  policy_manualInsert: "/policy-manual-insert",
  new_claim: "/new-claim",
  subjects_data: "/subjects-data",
  subject_details: "/subject-details",
};

const _R = "R";
const _T = "T";
const _C = "C";
const NC = "NC";

const _barems: string[][] = [
  /* 17 */ [_T, _T, _C, _T, _C, _T, _T, _T, _C, _T, _T, _C, _T, _T, _C, _C, _T, _C],
  /* 16 */ [_R, _T, _R, NC, _R, _R, _R, _R, _R, NC, _R, _R, _R, _R, _R, _R, _C, _R],
  /* 15 */ [_T, _T, _T, _T, _T, _T, _T, _T, NC, _T, _T, _T, _T, _T, _C, _C, _T, _C],
  /* 14 */ [_T, _T, _T, _T, _C, _T, _T, _T, _T, _T, _C, _T, _T, _T, _C, _C, _T, _C],
  /* 13 */ [NC, _T, _R, _R, _R, NC, NC, _T, _R, _T, _R, _C, NC, _C, _R, _R, _T, _R],
  /* 12 */ [NC, _T, _R, _R, _R, _R, _T, _T, _R, _T, _R, _R, _C, NC, _R, _R, _T, _R],
  /* 11 */ [_T, _T, _R, NC, _R, NC, NC, _T, _R, _T, _R, _C, _T, _C, _R, _R, _T, _C],
  /* 10 */ [_T, _T, _R, NC, _R, NC, _T, _T, _C, _T, _C, _T, _T, _T, _C, _R, _T, _R],
  /*  9 */ [NC, _T, _R, NC, _R, _R, NC, _C, NC, _C, _R, _R, _R, _R, _R, _R, NC, _R],
  /*  8 */ [_T, _T, _C, _T, _C, _T, _T, _T, NC, NC, _C, _T, _T, _T, _R, NC, _T, _C],
  /*  7 */ [NC, _T, _T, _R, _R, _R, _R, _C, _R, _C, _R, _R, _R, _R, _R, _R, _T, _R],
  /*  6 */ [_T, _T, _T, _R, _R, _R, _C, _T, _R, NC, _R, NC, _R, NC, _R, _R, _T, _R],
  /*  5 */ [_T, _T, _C, _C, _C, _C, _T, _T, _R, _T, NC, NC, _T, NC, _R, _R, _T, _R],
  /*  4 */ [_T, _T, _C, _C, _C, _C, _T, _T, _C, _T, _T, _T, _T, _T, _C, _R, _T, _C],
  /*  3 */ [_T, _T, _C, _C, _C, _C, _T, _T, _R, NC, NC, NC, _T, _T, _R, _R, NC, _R],
  /*  2 */ [_T, _T, _C, _C, _C, _C, _R, _R, _C, _T, _T, _T, _T, _T, _R, _R, _T, _C],
  /*  1 */ [_R, NC, _R, _R, _R, _R, _R, _R, _R, _R, _R, _R, _R, _R, _R, _R, _R, _R],
  /*  0 */ [NC, _T, _R, _R, _R, _R, _R, NC, _R, NC, _R, _R, NC, NC, _R, _R, _T, _R],
];

export const BaremsToResponsability: any = {
  [_R]: "3",
  [_T]: "1",
  [_C]: "2",
  [NC]: "---",
};

export const BaremsToManagement: any = {
  ["3"]: "Gestionario",
  ["1"]: "Debitore",
  ["2"]: "Concorsuale",
  ["---"]: "---",
};

export const Barems = _barems.map((b, i) => _barems[_barems.length - i - 1]);

export const InjuryNatureNumber = 10;

export const InjuryLocationNumber = 77;

export const VehicleTypeOptions = [
  { value: "---", label: "---" },
  { value: "A", label: "AUTOVETTURA" },
  { value: "B", label: "AUTOBUS" },
  { value: "C", label: "AUTOCARRI" },
  { value: "M", label: "MOTOCICLI" },
  { value: "Q", label: "MOTOCARRI" },
  { value: "T", label: "MACCHINE OPERATRICI" },
  { value: "W", label: "CICLOMOTORI" },
  { value: "R", label: "RIMORCHI" },
  { value: "S", label: "MACCHINE AGRICOLE" },
];

export const PlateFormats = [
  { value: "---", label: "---" },
  {
    value: "T",
    label: "Targa Italia",
  },
  {
    value: "X",
    label: "Targg Prova",
  },
  {
    value: "Y",
    label: "Targg Provvisorie",
  },
  {
    value: "J",
    label: "Targa Filobus",
  },
];

export type ClaimType = "CARD" | "NO CARD";

export const CardVehicleTypes = ["A", "B", "C", "M", "Q", "T", "W"];

export const vehicleCollisionPoints = [
  {
    code: "11",
    label: "Anteriore",
    tooltipPlacement: "top",
    path: "M 20.00,23.50                            \
           C 26.50,33.50 97.50,140.50 97.50,140.50  \
             97.50,140.50 176.00,30.00 176.00,30.00 \
             176.00,30.00 151.50,10.50 151.50,10.50 \
             151.50,10.50 99.00,2.00 99.00,2.00     \
             99.00,2.00 43.50,10.00 43.50,10.00 Z",
  },
  {
    code: "12",
    label: "Anteriore Destro",
    tooltipPlacement: "right",
    path: "M 189.50,173.50                            \
           C 189.50,173.50 96.50,140.00 96.50,140.00  \
             96.50,140.00 176.00,30.50 176.00,30.50   \
             176.00,30.50 187.00,57.00 187.00,57.00 Z",
  },
  {
    code: "13",
    label: "Destro",
    tooltipPlacement: "right",
    path: "M 190.00,174.00                              \
           C 190.00,174.00 186.50,334.00 186.50,334.00  \
             186.50,334.00 100.50,357.00 100.50,357.00  \
             100.50,357.00 96.50,139.50 96.50,139.50 Z",
  },
  {
    code: "14",
    label: "Posteriore Destro",
    tooltipPlacement: "right",
    path: "M 171.00,464.50                            \
           C 171.00,464.50 99.00,356.50 99.00,356.50  \
             99.00,356.50 188.50,332.00 188.00,332.50  \
             187.50,333.00 187.50,407.50 187.50,407.50 Z",
  },
  {
    code: "15",
    label: "Posteriore",
    tooltipPlacement: "bottom",
    path: "M 22.50,464.00                               \
           C 22.50,464.00 98.50,356.00 98.50,356.00     \
             98.50,356.00 170.00,463.00 170.00,463.00   \
             170.00,463.00 143.50,476.00 143.50,476.00  \
             143.50,476.00 56.00,477.50 56.00,477.50 Z",
  },
  {
    code: "16",
    label: "Posteriore Sinistro",
    tooltipPlacement: "left",
    path: "M 22.00,465.00                             \
           C 22.00,465.00 98.50,356.50 98.50,356.50   \
             98.50,356.50 3.00,341.50 3.00,341.50     \
             3.00,341.50 4.00,408.00 4.00,408.00 Z",
  },
  {
    code: "17",
    label: "Sinistro",
    tooltipPlacement: "left",
    path: "M 1.00,341.00                              \
           C 1.00,341.00 3.50,167.50 3.50,167.50      \
             3.50,167.50 98.00,139.50 98.00,139.50    \
             98.00,139.50 99.00,356.50 99.00,356.50 Z",
  },
  {
    code: "18",
    label: "Anteriore Sinistro",
    tooltipPlacement: "left",
    path: "M 3.00,168.50                            \
           C 3.00,168.50 96.50,139.50 96.50,139.50  \
             96.50,139.50 21.00,27.00 21.00,27.00   \
             21.00,27.00 8.00,51.00 8.00,51.00 Z",
  },
];

export const NewClaimSteps: NewClaimStepItem[] = [
  {
    number: 1,
    waiting: {
      title: "---",
      description: "---",
    },
    inProgress: {
      title: "Inserisci",
      description: "Dati Obbligatori",
    },
    done: {
      title: "Dati Obbligatori",
      description: "Completato",
    },
  },
  {
    number: 2,
    waiting: {
      title: "Verifica SIC",
      description: "",
    },
    inProgress: {
      title: "Verifica SIC",
      description: "",
    },
    done: {
      title: "Verifica SIC",
      description: "Verificato",
    },
  },
  {
    number: 3,
    waiting: {
      title: "Info Addizionali",
      description: "",
    },
    inProgress: {
      title: "Inserisci",
      description: "Ulteriori Dati",
    },
    done: {
      title: "Info Addizionali",
      description: "Completato",
    },
  },
  {
    number: 4,
    waiting: {
      title: "Conferma e Invio",
      description: "",
    },
    inProgress: {
      title: "Conferma e Invio",
      description: "al Liquidatore",
    },
    done: {
      title: "---",
      description: "---",
    },
  },
];

export const Responsabilities: ResponsabilitiesType = {
  noCard: [
    { value: "---", label: "---" },
    { value: "4", label: "Passivo" },
    { value: "5", label: "Attivo" },
  ],
  card: [
    { value: "---", label: "---" },
    { value: "1", label: "Debitore" },
    { value: "2", label: "Concorsuale" },
    { value: "3", label: "Gestionario" },
  ],
};

export const PartRoleEmpty: SelectPair = { value: "", label: "---" };
export const PartRoleCP: SelectPair = { value: "CP", label: "Conducente proprietario" };
export const PartRoleTP: SelectPair = { value: "TP", label: "Trasportato proprietario" };
export const PartRoleNP: SelectPair = { value: "NP", label: "Proprietario non presente sul veicolo" };
export const PartRoleCN: SelectPair = { value: "CN", label: "Conducente non proprietario" };
export const PartRoleTN: SelectPair = { value: "TN", label: "Trasportato non proprietario" };
export const PartRoleCPC: SelectPair = { value: "CPC", label: "Conducente proprietario controparte" };
export const PartRoleCNC: SelectPair = { value: "CNC", label: "Conducente non proprietario controparte" };
export const PartRoleTPC: SelectPair = { value: "TPC", label: "Trasportato proprietario controparte" };
export const PartRoleTNC: SelectPair = { value: "TNC", label: "Trasportato non proprietario controparte" };
export const PartRoleNPC: SelectPair = {
  value: "NPC",
  label: "NPC - Proprietario non presente sul veicolo controparte",
};
export const PartRoleTS: SelectPair = { value: "TS", label: "Terzo passante" };
export const PartRoleTD: SelectPair = { value: "TD", label: "Terzo Danneggiato" };

export const OwnerRolesType = [PartRoleEmpty, PartRoleCP, PartRoleTP, PartRoleNP];

export const AllPartRoles = [
  PartRoleEmpty,
  PartRoleCP,
  PartRoleTP,
  PartRoleNP,
  PartRoleCN,
  PartRoleTN,
  PartRoleCPC,
  PartRoleCNC,
  PartRoleTPC,
  PartRoleTNC,
  PartRoleNPC,
  PartRoleTS,
  PartRoleTD,
];

export const DamageTypeEmpty: SelectPair = { value: "---", label: "---" };
export const DamageTypeThing: SelectPair = { value: "Thing", label: "Cose" };
export const DamageTypePerson: SelectPair = { value: "Person", label: "Persone" };
export const DamageTypeVehicle: SelectPair = { value: "Vehicle", label: "Veicolo" };
export const DamageTypeLocation: SelectPair = { value: "Location", label: "Ubicazione" };
export const DamageTypeGeneric: SelectPair = { value: "Generic", label: "Generico" };

export const AdditionalInfoEmpty: SelectPair = { value: "", label: "---" };
export const AdditionalInfoSubject: SelectPair = { value: "subject", label: "Soggetto" };
export const AdditionalInfoDoc: SelectPair = { value: "document", label: "Documento" };
export const AdditionalInfoPayment: SelectPair = { value: "payment", label: "Info Pagamento" };
export const AdditionalInfoContact: SelectPair = { value: "contact", label: "Info Contatto" };

export const AdditionalInfoTypes = [
  AdditionalInfoEmpty,
  AdditionalInfoSubject,
  AdditionalInfoDoc,
  AdditionalInfoPayment,
  AdditionalInfoContact,
];

export const AdditionalInfoSubjectRoleEmpty: SelectPair = { value: "", label: "---" };
export const AdditionalInfoSubjectRoleCoachbuilder: SelectPair = { value: "coachbuilder", label: "Carrozziere" };
export const AdditionalInfoSubjectRoleExpert: SelectPair = { value: "expert", label: "Perito" };
export const AdditionalInfoSubjectRoleLawyer: SelectPair = { value: "lawyer", label: "Avvocato" };
export const AdditionalInfoSubjectRoleWitness: SelectPair = { value: "witness", label: "Testimone" };

export const AdditionalInfoSubjectRoles = [
  AdditionalInfoSubjectRoleEmpty,
  AdditionalInfoSubjectRoleCoachbuilder,
  AdditionalInfoSubjectRoleExpert,
  AdditionalInfoSubjectRoleLawyer,
  AdditionalInfoSubjectRoleWitness,
];

export const AdditionalInfoDocTypeEmpty: SelectPair = { value: "", label: "---" };
export const AdditionalInfoDocTypeIdCard: SelectPair = { value: "id-card", label: "Carta d'identità" };
export const AdditionalInfoDocTypePassport: SelectPair = { value: "passport", label: "Passaporto" };
export const AdditionalInfoDocTypeExpertise: SelectPair = { value: "expertise", label: "Perizia" };
export const AdditionalInfoDocTypePoliceReport: SelectPair = { value: "police-report", label: "Verbale polizia" };

export const AdditionalInfoDocTypes = [
  AdditionalInfoDocTypeEmpty,
  AdditionalInfoDocTypeIdCard,
  AdditionalInfoDocTypePassport,
  AdditionalInfoDocTypeExpertise,
  AdditionalInfoDocTypePoliceReport,
];

export const UploadDocumentsAction = "localhost";

export const AdditionalInfoPaymentEmpty: SelectPair = { value: "", label: "---" };
export const AdditionalInfoPaymentTransfer: SelectPair = { value: "transfer", label: "Bonifico" };
export const AdditionalInfoPaymentCheck: SelectPair = { value: "check", label: "Assegno" };

export const AdditionalInfoPaymentTypes = [
  AdditionalInfoPaymentEmpty,
  AdditionalInfoPaymentTransfer,
  AdditionalInfoPaymentCheck,
];

export const ForceReasonEmpty: SelectPair = { value: "", label: "---" };
export const ForceReasonSpeedLimit: SelectPair = { value: "1", label: "Mancato rispetto limiti velocità" };
export const ForceReasonSpeedTurn: SelectPair = {
  value: "2",
  label: "Mancato rispetto norme regola strada per svolte sx dx",
};

export const ForceReasons = [ForceReasonEmpty, ForceReasonSpeedLimit, ForceReasonSpeedTurn];

export const SignatureTypeEmpty: SelectPair = { value: "", label: "---" };
export const SignatureTypeSingle: SelectPair = { value: "1", label: "Monofirma" };
export const SignatureTypeDouble: SelectPair = {
  value: "2",
  label: "Doppia Firma",
};

export const SignatureTypes = [SignatureTypeEmpty, SignatureTypeSingle, SignatureTypeDouble];

export const LocalStorageKeys = {
  newClaim: {
    status: "new-claim.status",
    step: "new-claim.step",
    stepperData: "new-claim.stepperData",
    policyData: "new-claim.policyData",
    claimData: "new-claim.claimData",
    responsability: "new-claim.responsability",
    damagedParts: "new-claim.damagedParts",
    counterpartData: "new-claim.counterpartData",
    additionalInfo: "new-claim.additionalInfo",
  },
};

export const insuranceCodesWithCodes = insuranceCodes.map((ic) => ({
  value: ic.value,
  label: `${ic.value.padStart(3, "0")} - ${ic.label}`,
}));

export const GenderTypeEmpty: SelectPair = { value: "", label: "---" };
export const GenderTypeMale: SelectPair = { value: "male", label: "Uomo" };
export const GenderTypeFemale: SelectPair = {
  value: "female",
  label: "Female",
};

export const GenderTypes = [GenderTypeEmpty, GenderTypeMale, GenderTypeFemale];

export const GiuridicalPersonTypeEmpty: SelectPair = { value: "", label: "---" };
export const GiuridicalPersonTypeSrl: SelectPair = { value: "spa", label: "S.p.A." };
export const GiuridicalPersonTypeSpa: SelectPair = {
  value: "srl",
  label: "S.r.l",
};
export const GiuridicalPersonTypeIndividual: SelectPair = { value: "proprietorship", label: "Ditta Individuale" };

export const GiuridicalPersonTypes = [
  GiuridicalPersonTypeEmpty,
  GiuridicalPersonTypeSrl,
  GiuridicalPersonTypeSpa,
  GiuridicalPersonTypeIndividual,
];

export const ContactTypeEmpty: SelectPair = { value: "", label: "---" };
export const ContactTypePec: SelectPair = { value: "pec", label: "PEC" };
export const ContactTypeEmail: SelectPair = { value: "email", label: "Email" };
export const ContactTypePhone: SelectPair = { value: "phone", label: "Telefono" };
export const ContactTypeMobile: SelectPair = { value: "mobile", label: "Cellulare" };

export const ContactTypes = [ContactTypeEmpty, ContactTypePec, ContactTypeEmail, ContactTypePhone, ContactTypeMobile];

export const ContactUseCaseTypeEmpty: SelectPair = { value: "", label: "---" };
export const ContactUseCaseTypeCommunications: SelectPair = { value: "communications", label: "Invio Comunicazioni" };
export const ContactUseCaseTypeContactMode: SelectPair = { value: "contact-mode", label: "Modalità Contatto" };
export const ContactUseCaseTypeSendInformations: SelectPair = {
  value: "send-informations",
  label: "Invio Informazioni",
};

export const ContactUseCaseTypes = [
  ContactUseCaseTypeEmpty,
  ContactUseCaseTypeCommunications,
  ContactUseCaseTypeContactMode,
  ContactUseCaseTypeSendInformations,
];

export const AddressTypeEmpty: SelectPair = { value: "", label: "---" };
export const AddressTypeDomicile: SelectPair = { value: "domicile", label: "Domicilio" };
export const AddressTypeResidential: SelectPair = { value: "residential", label: "Residenza" };
export const AddressTypeShipping: SelectPair = { value: "shipping", label: "Spedizione" };
export const AddressTypeRegisteredOffice: SelectPair = { value: "registered-office", label: "Sede Legale" };
export const AddressTypeOperaingOffice: SelectPair = { value: "operating-office", label: "Sede Operativa" };

export const AddressTypes = [
  AddressTypeEmpty,
  AddressTypeDomicile,
  AddressTypeResidential,
  AddressTypeShipping,
  AddressTypeRegisteredOffice,
  AddressTypeOperaingOffice,
];

export const DocumentTypeEmpty: SelectPair = { value: "", label: "---" };
export const DocumentTypeCardId: SelectPair = { value: "card-id", label: "Carta d'Identità" };
export const DocumentTypeDrivingLicense: SelectPair = { value: "driving-license", label: "Patente" };
export const DocumentTypePassport: SelectPair = { value: "passport", label: "Passaporto" };
export const DocumentTypeFiscalCode: SelectPair = { value: "fiscal-code", label: "Codice Fiscale" };

export const DocumentTypes = [
  DocumentTypeEmpty,
  DocumentTypeCardId,
  DocumentTypeDrivingLicense,
  DocumentTypePassport,
  DocumentTypeFiscalCode,
];

export const PaymentTypeEmpty: SelectPair = { value: "", label: "---" };
export const PaymentTypeTransfer: SelectPair = { value: "transfer", label: "Bonifico" };
export const PaymentTypeCheck: SelectPair = { value: "check", label: "Assegno" };

export const PaymentsTypes = [PaymentTypeEmpty, PaymentTypeTransfer, PaymentTypeCheck];
