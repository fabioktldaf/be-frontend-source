import { store } from "../../redux/store";
import { backend } from "../../config/const";

import axios from "axios";
import { setRetrievingPolicy, editPolicy } from "../../redux/features/policySlice";
import { ClaimDataPolicyDataType } from "../../types/new-claim.types";
import { PolicyDataType } from "../../types/policy.types";

export interface IPolicy {
  retrieve: (policyId: string) => Promise<PolicyDataType | undefined>;
}

const Subject: IPolicy = {
  retrieve: async (policyId: string) => {
    store.dispatch(setRetrievingPolicy(true));

    const environment = store.getState().user.environment;
    const server = backend.envs.find((env) => env.label === environment)?.server;

    try {
      const url = `${server}/${backend.paths.policy}`;
      const { data } = await axios.post(url, {
        id: policyId,
      });

      if (!data || data?.error) {
        // to do
      } else if (data.result) {
        return data.result as PolicyDataType;
      }
    } catch (err) {
      console.log(err);
    }

    store.dispatch(setRetrievingPolicy(false));
  },
};

export default Subject;
