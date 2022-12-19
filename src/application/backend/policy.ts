import { store } from "../../redux/store";
import { backend } from "../../config/const";

import axios from "axios";
import { setLoadingPolicyStatus, setPolicyData } from "../../redux/features/newClaimSlice";
import { ClaimDataPolicyDataType } from "../../types/new-claim.types";

export interface IPolicy {
  retrieve: (policyNumber: string) => void;
}

const Subject: IPolicy = {
  retrieve: async (policyNumber: string) => {
    store.dispatch(setLoadingPolicyStatus(true));

    const environment = store.getState().user.environment;
    const server = backend.envs.find((env) => env.label === environment)?.server;

    try {
      const url = `${server}/${backend.paths.policy}`;
      const { data } = await axios.post(url, {
        policyNumber,
      });

      if (!data || data?.error) {
        // to do
      } else if (data.result) {
        const policyData = data.result as ClaimDataPolicyDataType;
        store.dispatch(setPolicyData(policyData));
      }
    } catch (err) {
      console.log(err);
    }

    store.dispatch(setLoadingPolicyStatus(false));
  },
};

export default Subject;
