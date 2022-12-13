import { store } from "../redux/store";
import { clear, search, setResults } from "../redux/features/searchSlice";
import { SearchParams } from "../types/search.types";
import { Subjects } from "../config/dummy-data";

export interface ISearch {
  clear: () => void;
  search: (params: SearchParams) => void;
}

export default {
  clear: () => {
    store.dispatch(clear());
  },
  search: (params: SearchParams) => {
    store.dispatch(search(params));

    setTimeout(() => {
      store.dispatch(setResults(Subjects));
    }, 2000);
  },
};
