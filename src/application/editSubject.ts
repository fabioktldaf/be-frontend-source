import { store } from "../redux/store";
import {
  editingSubjectAddContact,
  editingSubjectRemoveContact,
  editingSubjectAddAddress,
  editingSubjectRemoveAddress,
  editingSubjectAddDocument,
  editingSubjectRemoveDocument,
  editingSubjectAddPayment,
  editingSubjectRemovePayment,
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
  editingSubjectAddPayment: () => {
    store.dispatch(editingSubjectAddPayment());
  },
  editingSubjectRemovePayment: (index: number) => {
    store.dispatch(editingSubjectRemovePayment(index));
  },
};
