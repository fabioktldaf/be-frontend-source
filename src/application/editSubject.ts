import { store } from "../redux/store";
import { editingSubjectAddContact, editingSubjectRemoveContact } from "../redux/features/subjectsSlice";

export default {
  addContact: () => {
    store.dispatch(editingSubjectAddContact());
  },
  removeContact: (index: number) => {
    store.dispatch(editingSubjectRemoveContact(index));
  },
};
