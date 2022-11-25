import { store } from "../redux/store";
import { setLanguage } from "../redux/features/userSlice";
import i18next from "i18next";
import NewClaim from "./newClaim";
import {
  DamagedPartType,
  SteppedChangeDataType,
  UpdateNewClaimDataFieldsType,
  UpdateNewClaimResponsabilityDataFieldsType,
} from "../types/new-claim.types";

export interface IApplication {
  init: () => void;
  changeLanguage: (lang: string) => void;
  startNewClaim: () => void;
  updatedStepperData: (val: any, field: SteppedChangeDataType) => void;
  updateClaimData: (val: any, field: UpdateNewClaimDataFieldsType) => void;
  updateResponsabilityData: (val: any, fieldName: UpdateNewClaimResponsabilityDataFieldsType) => void;
  getRoleTypes: (damagedPartIndex: number) => any[];
  updateDamagedPart: (damagedPart: DamagedPartType, index: number) => void;
  removeDamagedPart: (index: number) => void;
  addDamagedPart: () => void;
  getAvailableDamageTypes: (index: number, roleType: string) => any[];
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
    updateClaimData: (val: any, field: UpdateNewClaimDataFieldsType) => {
      NewClaim.updateClaimData(val, field);
    },
    updateResponsabilityData: (val: any, field: UpdateNewClaimResponsabilityDataFieldsType) => {
      NewClaim.updateResponsabilityData(val, field);
    },
    getRoleTypes: (damagedPartIndex: number) => {
      return NewClaim.getRoleTypes(damagedPartIndex);
    },
    updateDamagedPart: (damagedPart: DamagedPartType, index: number) => {
      NewClaim.updateDamagedPart(damagedPart, index);
    },
    removeDamagedPart: (index: number) => {
      NewClaim.removeDamagedPart(index);
    },
    addDamagedPart: () => {
      NewClaim.addDamagedPart();
    },
    getAvailableDamageTypes: (index: number, roleType: string) => {
      return NewClaim.getAvailableDamageTypes(index, roleType);
    },
  };
};
