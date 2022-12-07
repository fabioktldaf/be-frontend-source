import { store } from "../redux/store";
import { clear, searchSubject, searchSubjectResults } from "../redux/features/subjectsSlice";
import { Subjects } from "../config/dummy-data";

export default {
  clear: () => {
    store.dispatch(clear());
  },
  startSearch: (term: string) => {
    store.dispatch(searchSubject(term));

    setTimeout(() => {
      store.dispatch(searchSubjectResults(Subjects));
    }, 2000);
  },
};
