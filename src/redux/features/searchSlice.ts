import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import moment from "moment";
import {
  SearchFilterClaim,
  SearchFilterPolicy,
  SearchFilterSubject,
  SearchParams,
  SearchTypes,
  SearchResultItemPolicy,
} from "../../types/search.types";

export interface SearchState {
  term: string;
  type: SearchTypes;
  isSearching: boolean;
  bySubject?: SearchFilterSubject;
  byPolicy?: SearchFilterPolicy;
  byClaim?: SearchFilterClaim;
  resultsGeneric: any[];
  resultsSubject: any[];
}

const buildInitialState = () => {
  return {
    term: "",
    type: "generic",
    isSearching: false,
    bySubject: undefined,
    byPolicy: undefined,
    byClaim: undefined,
    resultsGeneric: [],
    resultsSubject: [],
  } as SearchState;
};

export const searchSlice = createSlice({
  name: "search",
  initialState: buildInitialState(),
  reducers: {
    clear(state) {
      const { term, type, bySubject, byPolicy, byClaim, isSearching, resultsGeneric, resultsSubject } =
        buildInitialState();
      state.term = term;
      state.type = type;
      state.bySubject = bySubject;
      state.byPolicy = byPolicy;
      state.byClaim = byClaim;
      state.isSearching = isSearching;
      state.resultsGeneric = resultsGeneric;
      state.resultsSubject = resultsSubject;
    },
    search(state, action: PayloadAction<SearchParams>) {
      const { term, type, bySubject, byPolicy, byClaim } = action.payload;
      state.term = term;
      state.type = type;
      state.bySubject = bySubject;
      state.byPolicy = byPolicy;
      state.byClaim = byClaim;
      state.isSearching = true;

      if (type === "generic") state.resultsGeneric = [];
      if (type === "subject") state.resultsSubject = [];
    },
    setResults(state, action: PayloadAction<any[]>) {
      state.isSearching = false;

      if (state.type === "generic") state.resultsGeneric = action.payload;
      if (state.type === "subject") state.resultsSubject = action.payload;
    },
    addNewPolicy(state, action: PayloadAction<string>) {
      state.resultsGeneric = state.resultsGeneric.map((r) => {
        if (r.subject.id === action.payload) {
          const today = moment().format("DD/MM/YYYY");

          r.policies.push({
            id: "",
            policy_number: "---",
            effect_date: today,
            expiration_date: today,
            claims: [],
          } as SearchResultItemPolicy);
        }

        return r;
      });
    },
  },
});

export const { clear, search, setResults, addNewPolicy } = searchSlice.actions;
export default searchSlice.reducer;
