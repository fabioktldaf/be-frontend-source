import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SubjectData } from "../../types/uses-data.types";

export interface SubjectsState {
  search: {
    term: string;
    isSearching: boolean;
    results: SubjectData[];
  };
  editing: {
    subject: SubjectData | undefined;
    readOnly: boolean;
  };
}

const buildInitialState = () => {
  return {
    search: {
      term: "",
      isSearching: false,
      results: [],
    },
    editing: {
      subject: undefined,
      readOnly: false,
    },
  } as SubjectsState;
};

export const subjectsSlice = createSlice({
  name: "subjects",
  initialState: buildInitialState(),
  reducers: {
    clear(state) {
      state = buildInitialState();
    },
    searchSubject(state, action: PayloadAction<string>) {
      state.search = {
        term: action.payload,
        isSearching: true,
        results: [],
      };
    },
    searchSubjectResults(state, action: PayloadAction<SubjectData[]>) {
      state.search.isSearching = false;
      state.search.results = action.payload;
    },
    editSubject(state, action: PayloadAction<SubjectData>) {
      state.editing.subject = action.payload;
      state.editing.readOnly = false;
    },
    showSubject(state, action: PayloadAction<SubjectData>) {
      state.editing.subject = action.payload;
      state.editing.readOnly = true;
    },
    editingSubjectAddContact(state) {
      const updatedContacts = state.editing.subject?.contacts || [];
      updatedContacts.push({
        type: "",
      });
      state.editing.subject!.contacts = updatedContacts;
    },
    editingSubjectRemoveContact(state, action: PayloadAction<number>) {
      if (action.payload >= state.editing.subject!.contacts!.length) return;
      state.editing.subject!.contacts = state.editing.subject!.contacts?.filter((c, i) => i !== action.payload);
    },
  },
});

export const {
  clear,
  searchSubject,
  searchSubjectResults,
  editSubject,
  showSubject,
  editingSubjectAddContact,
  editingSubjectRemoveContact,
} = subjectsSlice.actions;
export default subjectsSlice.reducer;
