import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  SearchFilterClaim,
  SearchFilterPolicy,
  SearchFilterSubject,
  SearchParams,
  SearchTypes,
} from "../../types/search.types";

export interface SearchState {
  term: string;
  type: SearchTypes;
  isSearching: boolean;
  bySubject?: SearchFilterSubject;
  byPolicy?: SearchFilterPolicy;
  byClaim?: SearchFilterClaim;
  results: any[];
}

const buildInitialState = () => {
  return {
    term: "",
    type: "generic",
    isSearching: false,
    bySubject: undefined,
    byPolicy: undefined,
    byClaim: undefined,
    results: [],
  } as SearchState;
};

export const searchSlice = createSlice({
  name: "search",
  initialState: buildInitialState(),
  reducers: {
    clear(state) {
      const { term, type, bySubject, byPolicy, byClaim, isSearching, results } = buildInitialState();
      state.term = term;
      state.type = type;
      state.bySubject = bySubject;
      state.byPolicy = byPolicy;
      state.byClaim = byClaim;
      state.isSearching = isSearching;
      state.results = results;
    },
    search(state, action: PayloadAction<SearchParams>) {
      const { term, type, bySubject, byPolicy, byClaim } = action.payload;
      state.term = term;
      state.type = type;
      state.bySubject = bySubject;
      state.byPolicy = byPolicy;
      state.byClaim = byClaim;
      state.isSearching = true;
      state.results = [];
    },
    setResults(state, action: PayloadAction<any[]>) {
      state.isSearching = false;
      state.results = action.payload;
    },
  },
});

export const { clear, search, setResults } = searchSlice.actions;
export default searchSlice.reducer;
