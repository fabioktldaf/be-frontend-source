import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import moment from "moment";
import { type } from "os";
import { SubjectData, SubjectDocumentData } from "../../types/uses-data.types";

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
      const { search, editing } = buildInitialState();
      state.search = search;
      state.editing = editing;
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
      const updatedContacts = state.editing.subject!.contacts || [];
      updatedContacts.push({
        type: "",
      });
      state.editing.subject!.contacts = updatedContacts;
    },
    editingSubjectRemoveContact(state, action: PayloadAction<number>) {
      if (action.payload >= state.editing.subject!.contacts!.length) return;
      state.editing.subject!.contacts = state.editing.subject!.contacts?.filter((c, i) => i !== action.payload);
    },
    editingSubjectAddAddress(state) {
      const updatedAddresses = state.editing.subject!.addresses || [];
      updatedAddresses.push({ type: "" });
      state.editing.subject!.addresses = updatedAddresses;
    },
    editingSubjectRemoveAddress(state, action: PayloadAction<number>) {
      if (action.payload >= state.editing.subject!.addresses!.length) return;
      state.editing.subject!.addresses = state.editing.subject?.addresses?.filter((a, i) => i !== action.payload);
    },
    editingSubjectAddDocument(state) {
      const updatedDocuments = state.editing.subject!.documents || [];
      updatedDocuments.push({
        type: "",
        issuingDate: moment().format("DD/MM/YYYY"),
        expirationDate: moment().format("DD/MM/YYYY"),
      } as SubjectDocumentData);
      state.editing.subject!.documents = updatedDocuments;
    },
    editingSubjectRemoveDocument(state, action: PayloadAction<number>) {
      if (action.payload >= state.editing.subject!.documents!.length) return;
      state.editing.subject!.documents = state.editing.subject?.documents?.filter((d, i) => i !== action.payload);
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
  editingSubjectAddAddress,
  editingSubjectRemoveAddress,
  editingSubjectAddDocument,
  editingSubjectRemoveDocument,
} = subjectsSlice.actions;
export default subjectsSlice.reducer;
