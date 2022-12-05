import { store } from "../redux/store";
import { setLanguage } from "../redux/features/userSlice";
import i18next from "i18next";
import NewClaim from "./newClaim";
import {
  AdditionalInfoDataType,
  DamagedPartType,
  SteppedChangeDataType,
  UpdateNewClaimDataFieldsType,
  UpdateNewClaimResponsabilityDataFieldsType,
} from "../types/new-claim.types";

export interface IApplication {
  init: () => void;
  changeLanguage: (lang: string) => void;
  startNewClaim: () => void;
  clearLocalStorage: () => void;
  updatedStepperData: (val: any, field: SteppedChangeDataType) => void;
  updateClaimData: (val: any, field: UpdateNewClaimDataFieldsType) => void;
  updateCounterpartData: (val: any, field: UpdateNewClaimDataFieldsType) => void;
  updateResponsabilityData: (val: any, fieldName: UpdateNewClaimResponsabilityDataFieldsType) => void;
  getDamageAvailableRoleTypes: (damagedPartIndex: number) => any[];
  updateDamagedPart: (damagedPart: DamagedPartType, index: number) => void;
  removeDamagedPart: (index: number) => void;
  addDamagedPart: () => void;
  getAvailableDamageTypes: (index: number, part: DamagedPartType) => any[];
  damagedPartsRemoveOtherDrivers: () => void;
  setAdditionalInfo: (additionalInfo: AdditionalInfoDataType, index: number) => void;
  removeAdditionalInfo: (id: number) => void;
}

export default (): IApplication => {
  return {
    init: () => {
      console.log("init");
      NewClaim.checkDataEntryInterruption();
    },
    changeLanguage: (lang: string) => {
      i18next.changeLanguage(lang);
      store.dispatch(setLanguage(lang));
    },
    startNewClaim: () => {
      NewClaim.startNewClaim();
    },
    clearLocalStorage: () => {
      NewClaim.clearLocalStorage();
    },
    updatedStepperData: (val: any, field: SteppedChangeDataType) => {
      NewClaim.updateStepperData(val, field);
    },
    updateClaimData: (val: any, field: UpdateNewClaimDataFieldsType) => {
      NewClaim.updateClaimData(val, field);
    },
    updateCounterpartData: (val: any, field: UpdateNewClaimDataFieldsType) => {
      NewClaim.updateCounterpartData(val, field);
    },
    updateResponsabilityData: (val: any, field: UpdateNewClaimResponsabilityDataFieldsType) => {
      NewClaim.updateResponsabilityData(val, field);
    },
    getDamageAvailableRoleTypes: (damagedPartIndex: number) => {
      return NewClaim.getDamageAvailableRoleTypes(damagedPartIndex);
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
    getAvailableDamageTypes: (index: number, part: DamagedPartType) => {
      return NewClaim.getAvailableDamageTypes(index, part);
    },
    damagedPartsRemoveOtherDrivers: () => {
      NewClaim.damagedPartsRemoveOtherDrivers();
    },
    setAdditionalInfo: (additionalInfo: AdditionalInfoDataType, index: number) => {
      NewClaim.setAdditionalInfo(additionalInfo, index);
    },
    removeAdditionalInfo: (id: number) => {
      NewClaim.removeAdditionalInfo(id);
    },
  };
};
