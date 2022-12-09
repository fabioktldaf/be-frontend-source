import { store } from "../redux/store";
import {
  editingSubjectAddContact,
  editingSubjectRemoveContact,
  editingSubjectAddAddress,
  editingSubjectRemoveAddress,
  editingSubjectAddDocument,
  editingSubjectRemoveDocument,
} from "../redux/features/subjectsSlice";

export default {
  addContact: () => {
    store.dispatch(editingSubjectAddContact());
  },
  removeContact: (index: number) => {
    store.dispatch(editingSubjectRemoveContact(index));
  },
  addAddress: () => {
    store.dispatch(editingSubjectAddAddress());
  },
  removeAddress: (index: number) => {
    store.dispatch(editingSubjectRemoveAddress(index));
  },
  editingSubjectAddDocument: () => {
    store.dispatch(editingSubjectAddDocument());
  },
  editingSubjectRemoveDocument: (index: number) => {
    store.dispatch(editingSubjectRemoveDocument(index));
  },
};
