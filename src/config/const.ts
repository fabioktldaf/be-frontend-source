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
