import { store } from "../redux/store";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { setLanguage } from "../redux/features/userSlice";
import i18next from "i18next";
import NewClaim from "./newClaim";
import SearchSubject from "./searchSubject";
import EditSubject from "./editSubject";
import NewSubject, { INewSubject } from "./newSubject";

import {
  AdditionalInfoDataType,
  DamagedPartType,
  SteppedChangeDataType,
  UpdateNewClaimDataFieldsType,
  UpdateNewClaimResponsabilityDataFieldsType,
} from "../types/new-claim.types";
import { SubjectData } from "../types/uses-data.types";
import { editingSubjectAddAddress, editSubject, showSubject } from "../redux/features/subjectsSlice";
import { Urls } from "../config/const";

export interface IApplication {
  init: () => void;
  changeLanguage: (lang: string) => void;

  // NEW CLAIM
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

  // SUBJECTS DATA
  clearSearchSubject: () => void;
  searchSubject: (term: string) => void;
  editSubject: (subject: SubjectData, navigate: NavigateFunction) => void;
  showSubject: (subject: SubjectData, navigate: NavigateFunction) => void;
  editingSubjectAddContact: () => void;
  editingSubjectRemoveContact: (index: number) => void;
  editingSubjectAddAddress: () => void;
  editingSubjectRemoveAddress: (index: number) => void;
  editingSubjectAddDocument: () => void;
  editingSubjectRemoveDocument: (index: number) => void;

  addNewSubject: (navigate: NavigateFunction) => void;

  newSubject: INewSubject;
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
    clearSearchSubject: () => {
      SearchSubject.clear();
    },
    searchSubject: (term: string) => {
      SearchSubject.startSearch(term);
    },
    editSubject: (subject: SubjectData, navigate: NavigateFunction) => {
      store.dispatch(editSubject(subject));
      navigate(Urls.subject_details);
    },
    showSubject: (subject: SubjectData, navigate: NavigateFunction) => {
      store.dispatch(showSubject(subject));
      navigate(Urls.subject_details);
    },
    editingSubjectAddContact: () => {
      EditSubject.addContact();
    },
    editingSubjectRemoveContact: (index: number) => {
      EditSubject.removeContact(index);
    },
    editingSubjectAddAddress: () => {
      EditSubject.addAddress();
    },
    editingSubjectRemoveAddress: (index: number) => {
      EditSubject.removeAddress(index);
    },
    editingSubjectAddDocument: () => {
      EditSubject.editingSubjectAddDocument();
    },
    editingSubjectRemoveDocument: (index: number) => {
      EditSubject.editingSubjectRemoveDocument(index);
    },
    addNewSubject: (navigate: NavigateFunction) => {
      store.dispatch(editSubject({}));
      navigate(Urls.subject_details);
    },
    newSubject: {
      clearLocalStorage: () => {
        NewSubject.clearLocalStorage();
      },
      updateSubjectData: (val: any) => {
        NewSubject.updateSubjectData(val);
      },
      updateContactsData: (val: any) => {
        NewSubject.updateContactsData(val);
      },
      updateAddressesData: (val: any) => {
        NewSubject.updateAddressesData(val);
      },
      updateDocumentsData: (val: any) => {
        NewSubject.updateDocumentsData(val);
      },
    },
  };
};
