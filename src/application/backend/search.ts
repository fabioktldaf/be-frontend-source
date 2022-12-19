import { store } from "../../redux/store";
import { clear, search, setResults } from "../../redux/features/searchSlice";
import { SearchParams } from "../../types/search.types";
import { backend } from "../../config/const";

export interface ISearch {
  clear: () => void;
  search: (params: SearchParams) => void;
}

const Search: ISearch = {
  clear: () => {
    store.dispatch(clear());
  },
  search: async (params: SearchParams) => {
    store.dispatch(search(params));
    const environment = store.getState().user.environment;
    const server = backend.envs.find((env) => env.label === environment)?.server;

    try {
      const url = `${server}/${backend.paths.search}`;
      const response = await fetch(url);
      const result = await response.json();

      if (result.error) {
        store.dispatch(setResults([]));
      } else if (result.result) {
        store.dispatch(setResults(result.result));
      }
    } catch (err) {
      console.log(err);
      store.dispatch(setResults([]));
    }
  },
};

export default Search;
