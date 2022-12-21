import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import moment from "moment";
import { type } from "os";
import { PolicyDataType, UpdatePolicySubjectParams } from "../../types/policy.types";
import { SubjectGiuridicalPersonData, SubjectNaturalPersonData } from "../../types/uses-data.types";

export interface SubjectsState {
  search: {
    number: string;
    isSearching: boolean;
    results: PolicyDataType[];
  };
  editing: {
    policy: PolicyDataType | undefined;
    readOnly: boolean;
    loading: boolean;
  };
}

const buildInitialState = () => {
  return {
    search: {
      number: "",
      isSearching: false,
      results: [],
    },
    editing: {
      policy: {
        id: "",
        policyData: {},
        goodInsured: {},
        guarantees: {},
        subject: {},
      },
      readOnly: false,
      loading: false,
    },
  } as SubjectsState;
};

export const policySlice = createSlice({
  name: "policies",
  initialState: buildInitialState(),
  reducers: {
    clear(state) {
      const { search, editing } = buildInitialState();
      state.search = search;
      state.editing = editing;
    },
    searchPolicy(state, action: PayloadAction<string>) {
      state.search = {
        number: action.payload,
        isSearching: true,
        results: [],
      };
    },
    searchPolicyResults(state, action: PayloadAction<PolicyDataType[]>) {
      state.search.isSearching = false;
      state.search.results = action.payload;
    },
    editPolicy(state, action: PayloadAction<PolicyDataType>) {
      state.editing.policy = action.payload;
      state.editing.readOnly = false;
    },
    setRetrievingPolicy(state, action: PayloadAction<boolean>) {
      state.editing.loading = action.payload;
    },
    showPolicy(state, action: PayloadAction<PolicyDataType>) {
      state.editing.policy = action.payload;
      state.editing.readOnly = true;
    },
    updatePolicySubject(state, action: PayloadAction<UpdatePolicySubjectParams>) {
      const { type, subject } = action.payload;

      if (state.editing.policy)
        switch (type) {
          case "beneficiary":
            state.editing.policy.subject!.beneficiary = subject;
            break;
          case "contractor":
            state.editing.policy.subject!.contractor = subject;
            break;
          case "driver":
            state.editing.policy.subject!.driver = subject as SubjectNaturalPersonData;
            break;
          case "owner":
            state.editing.policy.subject!.owner = subject;
            break;
          case "insured":
            state.editing.policy.subject!.insured = subject;
            break;
        }
    },
  },
});

export const {
  clear,
  searchPolicy,
  searchPolicyResults,
  editPolicy,
  setRetrievingPolicy,
  showPolicy,
  updatePolicySubject,
} = policySlice.actions;
export default policySlice.reducer;
