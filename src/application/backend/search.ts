import { store } from "../../redux/store";
import { clear, search, setResults } from "../../redux/features/searchSlice";
import { SearchParams } from "../../types/search.types";
import { backend } from "../../config/const";
import axios from "axios";

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
      const { data } = await axios.post(url, params);

      if (!data || data.error) {
        // to do
      } else if (data.result) {
        store.dispatch(setResults(data.result));
      }
    } catch (err) {
      console.log(err);
      store.dispatch(setResults([]));
    }
  },
};

export default Search;
