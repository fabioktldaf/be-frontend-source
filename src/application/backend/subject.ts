import { store } from "../../redux/store";
import { clear, search, setResults } from "../../redux/features/searchSlice";
import { SearchParams } from "../../types/search.types";
import { backend } from "../../config/const";
import { setRetrievingSubject, editSubject } from "../../redux/features/subjectsSlice";

import { SubjectData } from "../../types/uses-data.types";
import axios from "axios";

export interface ISubject {
  retrieve: (subjectId: string, type: string) => void;
}

const Subject: ISubject = {
  retrieve: async (subjectId: string, type: string) => {
    store.dispatch(setRetrievingSubject(true));
    const environment = store.getState().user.environment;
    const server = backend.envs.find((env) => env.label === environment)?.server;

    try {
      const url = `${server}/${backend.paths.subject}`;
      const { data } = await axios.post(url, {
        subjectId,
      });

      if (!data || data?.error) {
        // to do
      } else if (data.result) {
        const subject = data.result as SubjectData;
        store.dispatch(editSubject(subject));
      }
    } catch (err) {
      console.log(err);
      store.dispatch(setRetrievingSubject(false));
    }
  },
};

export default Subject;
