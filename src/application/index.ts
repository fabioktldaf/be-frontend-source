import { store } from "../redux/store";
import { setLanguage } from "../redux/features/userSlice";
import i18next from "i18next";
import NewClaim from "./newClaim";
import { SteppedChangeDataType, UpdateDataFieldsType } from "../types/new-claim.types";

export interface IApplication {
  init: () => void;
  changeLanguage: (lang: string) => void;
  startNewClaim: () => void;
  updatedStepperData: (val: any, field: SteppedChangeDataType) => void;
  updateClaimData: (val: any, field: UpdateDataFieldsType) => void;
}

export default (): IApplication => {
  return {
    init: () => {
      console.log("init");
    },
    changeLanguage: (lang: string) => {
      i18next.changeLanguage(lang);
      store.dispatch(setLanguage(lang));
    },
    startNewClaim: () => {
      NewClaim.startNewClaim();
    },
    updatedStepperData: (val: any, field: SteppedChangeDataType) => {
      NewClaim.updateStepperData(val, field);
    },
    updateClaimData: (val: any, field: UpdateDataFieldsType) => {
      NewClaim.updateClaimData(val, field);
    },
  };
};
