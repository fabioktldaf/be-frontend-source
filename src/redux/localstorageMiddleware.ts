import { GrActions } from "react-icons/gr";
import { LocalStorageKeys } from "../config/const";
import { AdditionalInfoDataType, DamagedPartType, NewClaimStateType } from "../types/new-claim.types";
import {
  clearLocalStorage,
  clear,
  setStatus,
  setPolicyData,
  updateStepperData,
  updateClaimData,
  updateCounterpartData,
  updateTabsCompletedState,
  setResponsabilityData,
  setDamagedPart,
  removeDamagedPart,
  addDamagedPart,
  setAdditionalInfo,
  removeAdditionalInfo,
} from "./features/newClaimSlice";

export const localstorageMiddleware = (store: any) => (next: any) => (action: any) => {
  // CLEAR
  if (clear.match(action) || clearLocalStorage.match(action)) {
    localStorage.removeItem(LocalStorageKeys.newClaim.status);
    localStorage.removeItem(LocalStorageKeys.newClaim.step);
    localStorage.removeItem(LocalStorageKeys.newClaim.stepperData);
    localStorage.removeItem(LocalStorageKeys.newClaim.policyData);
    localStorage.removeItem(LocalStorageKeys.newClaim.claimData);
    localStorage.removeItem(LocalStorageKeys.newClaim.responsability);
    localStorage.removeItem(LocalStorageKeys.newClaim.damagedParts);
    localStorage.removeItem(LocalStorageKeys.newClaim.counterpartData);
    localStorage.removeItem(LocalStorageKeys.newClaim.additionalInfo);
  } // SET STATUS
  else if (setStatus.match(action)) {
    // resume status should not be cleared
    if (action.payload !== NewClaimStateType.Resume)
      localStorage.setItem(LocalStorageKeys.newClaim.status, JSON.stringify(action.payload));
  } // SET POLICY DATA
  else if (setPolicyData.match(action)) {
    localStorage.setItem(LocalStorageKeys.newClaim.policyData, JSON.stringify(action.payload));
  } // UPDATE STEPPER DATA
  else if (updateStepperData.match(action)) {
    localStorage.setItem(LocalStorageKeys.newClaim.stepperData, JSON.stringify(action.payload));
  } // UPDATE CLAIM DATA
  else if (updateClaimData.match(action)) {
    localStorage.setItem(LocalStorageKeys.newClaim.claimData, JSON.stringify(action.payload));
  } // UPDATE COUNTER PART DATA
  else if (updateCounterpartData.match(action)) {
    localStorage.setItem(LocalStorageKeys.newClaim.counterpartData, JSON.stringify(action.payload));
  } // SET RESPONSABIITY DATA
  else if (setResponsabilityData.match(action)) {
    localStorage.setItem(LocalStorageKeys.newClaim.responsability, JSON.stringify(action.payload));
  } // SET DAMAGED PART
  else if (setDamagedPart.match(action)) {
    const damagedPartsTxt = localStorage.getItem(LocalStorageKeys.newClaim.damagedParts);
    let damagedParts: DamagedPartType[] = [];
    if (damagedPartsTxt?.length && damagedPartsTxt.length > 0) {
      damagedParts = JSON.parse(damagedPartsTxt) as DamagedPartType[];
    }

    if (damagedParts?.length === 0 && action.payload.index === 0) {
      damagedParts = [action.payload.damagedPart];
    } else if (action.payload.index >= damagedParts?.length) {
      damagedParts = [...damagedParts, action.payload.damagedPart];
    } else {
      damagedParts[action.payload.index] = action.payload.damagedPart;
    }

    localStorage.setItem(LocalStorageKeys.newClaim.damagedParts, JSON.stringify(damagedParts));
  } // REMOVE DAMAGED PART
  else if (removeDamagedPart.match(action)) {
    const damagedPartsTxt = localStorage.getItem(LocalStorageKeys.newClaim.damagedParts);
    let damagedParts: DamagedPartType[] = [];
    if (damagedPartsTxt?.length && damagedPartsTxt.length > 0) {
      damagedParts = JSON.parse(damagedPartsTxt) as DamagedPartType[];
    }
    const udpatedDamagedParts = damagedParts.filter((dp, i) => i !== action.payload);

    localStorage.setItem(LocalStorageKeys.newClaim.damagedParts, JSON.stringify(udpatedDamagedParts));
  } // ADD DAMAGED PART
  else if (addDamagedPart.match(action)) {
    const damagedPartsTxt = localStorage.getItem(LocalStorageKeys.newClaim.damagedParts);
    let damagedParts: DamagedPartType[] = [];
    if (damagedPartsTxt?.length && damagedPartsTxt.length > 0) {
      damagedParts = JSON.parse(damagedPartsTxt) as DamagedPartType[];
    }

    localStorage.setItem(LocalStorageKeys.newClaim.damagedParts, JSON.stringify([...damagedParts, action.payload]));
  } // SET ADDITIONAL INFO
  else if (setAdditionalInfo.match(action)) {
    const additionalInfoTxt = localStorage.getItem(LocalStorageKeys.newClaim.additionalInfo);
    let additionalInfo: AdditionalInfoDataType[] = [];
    if (additionalInfoTxt?.length && additionalInfoTxt.length > 0) {
      additionalInfo = JSON.parse(additionalInfoTxt);
    }
    if (action.payload.index === -1) {
      additionalInfo.push(action.payload.additionalInfo);
    } else {
      additionalInfo[action.payload.index] = action.payload.additionalInfo;
    }
    localStorage.setItem(LocalStorageKeys.newClaim.additionalInfo, JSON.stringify(additionalInfo));
  } // REMOVE ADDITIONAL INFO
  else if (removeAdditionalInfo.match(action)) {
    const additionalInfoTxt = localStorage.getItem(LocalStorageKeys.newClaim.additionalInfo);
    let additionalInfo: AdditionalInfoDataType[] = [];
    if (additionalInfoTxt?.length && additionalInfoTxt.length > 0) {
      additionalInfo = JSON.parse(additionalInfoTxt);
      additionalInfo = additionalInfo.filter((ai, i) => i !== action.payload);
    }

    localStorage.setItem(LocalStorageKeys.newClaim.additionalInfo, JSON.stringify(additionalInfo));
  }

  return next(action);
};
