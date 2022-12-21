import { store } from "../redux/store";
import { NavigateFunction } from "react-router-dom";
import { setLanguage } from "../redux/features/userSlice";
import i18next from "i18next";
import NewClaim from "./newClaim";
import SearchSubject from "./searchSubject";
import EditSubject from "./editSubject";
import NewSubject, { INewSubject } from "./newSubject";
import Search, { ISearch } from "./backend/search";
import Policies, { IPolicy } from "./backend/policies";

import {
  AdditionalInfoDataType,
  DamagedPartType,
  SteppedChangeDataType,
  UpdateNewClaimDataFieldsType,
  UpdateNewClaimResponsabilityDataFieldsType,
} from "../types/new-claim.types";
import { SubjectData, SubjectGiuridicalPersonData, SubjectNaturalPersonData } from "../types/uses-data.types";
import {
  editingSubjectAddAddress,
  editSubject,
  setRetrievingSubject,
  showSubject,
} from "../redux/features/subjectsSlice";
import { Urls } from "../config/const";
import { SearchParams } from "../types/search.types";
import Subject from "./backend/subject";

import PolicyManualInsert from "../components/PolicyManualInsert";
import { editPolicy, setRetrievingPolicy, updatePolicySubject } from "../redux/features/policySlice";
import { addNewPolicy, clear as clearSearch } from "../redux/features/searchSlice";
import { PolicySubjectTypes } from "../types/policy.types";

export interface IApplication {
  init: () => void;
  changeLanguage: (lang: string) => void;

  // NEW CLAIM
  startNewClaim: (policyNumber?: string) => void;
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
  _editSubject: (subjectId: string | undefined) => void;
  showSubject: (subject: SubjectData, navigate: NavigateFunction) => void;
  editingSubjectAddContact: () => void;
  editingSubjectRemoveContact: (index: number) => void;
  editingSubjectAddAddress: () => void;
  editingSubjectRemoveAddress: (index: number) => void;
  editingSubjectAddDocument: () => void;
  editingSubjectRemoveDocument: (index: number) => void;

  editingSubjectAddPayment: () => void;
  editingSubjectRemovePayment: (index: number) => void;

  retrieveSubject: (id: string) => Promise<SubjectData | undefined>;

  addNewSubject: (navigate: NavigateFunction) => void;
  _addNewSubject: () => void;

  clearSearch: () => void;

  editPolicy: (id: string) => void;
  addNewPolicy: (ubjectIdd: string) => void;

  updatePolicySubject: (
    subject: undefined | SubjectNaturalPersonData | SubjectGiuridicalPersonData,
    type: PolicySubjectTypes
  ) => void;

  search: ISearch;
  newSubject: INewSubject;
  policies: IPolicy;
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
    startNewClaim: (policyNumber?: string) => {
      NewClaim.startNewClaim(policyNumber);
    },
    clearLocalStorage: () => {
      NewClaim.clearLocalStorage();
    },
    clearSearch: () => {
      store.dispatch(clearSearch());
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
    _editSubject: async (subjectId: string | undefined) => {
      store.dispatch(setRetrievingSubject(true));
      await Subject.retrieve(subjectId);
      store.dispatch(setRetrievingSubject(false));
    },
    _addNewSubject: () => {
      store.dispatch(editSubject({}));
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
    editingSubjectAddPayment: () => {
      EditSubject.editingSubjectAddPayment();
    },
    editingSubjectRemovePayment: (index: number) => {
      EditSubject.editingSubjectRemovePayment(index);
    },
    addNewSubject: (navigate: NavigateFunction) => {
      store.dispatch(editSubject({}));
      navigate(Urls.subject_details);
    },
    retrieveSubject: async (id: string) => {
      const subject = await Subject.retrieve(id);
      return subject;
    },
    editPolicy: async (id: string) => {
      store.dispatch(setRetrievingPolicy(true));
      const policy = await Policies.retrieve(id);
      if (policy) store.dispatch(editPolicy(policy));
      store.dispatch(setRetrievingPolicy(false));
    },
    addNewPolicy: (subjectId: string) => {
      store.dispatch(addNewPolicy(subjectId));
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
    search: {
      search: (params: SearchParams) => {
        Search.search(params);
      },
    },
    policies: {
      retrieve: async (policyId: string) => {
        debugger;
        store.dispatch(setRetrievingPolicy(true));
        const policy = await Policies.retrieve(policyId);
        store.dispatch(setRetrievingPolicy(false));
        return policy;
      },
    },
    updatePolicySubject: (
      subject: undefined | SubjectNaturalPersonData | SubjectGiuridicalPersonData,
      type: PolicySubjectTypes
    ) => {
      store.dispatch(updatePolicySubject({ subject, type }));
    },
  };
};
