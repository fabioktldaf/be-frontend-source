import { NewClaimStepItem } from "../types/new-claim.types";

export const defaultLanguage = "it";
export const languages = ["it", "en", "empty"];

export const Urls = {
  home: "/",
  policy_searchFulltext: "/policy-search-fulltext",
  policy_searchByfields: "/policy-search-byfields",
  policy_manualInsert: "/policy-manual-insert",
  new_claim: "new-claim",
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
      title: "Riepilogo",
      description: "",
    },
    inProgress: {
      title: "Riepilogo",
      description: "Sinistro",
    },
    done: {
      title: "---",
      description: "---",
    },
  },
];
