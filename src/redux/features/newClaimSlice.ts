import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import moment from "moment";
import {
  AdditionalInfoDataType,
  ClaimDataCounterpartDataType,
  ClaimDataPolicyDataType,
  ClaimDataType,
  DamagedPartPair,
  DamagedPartType,
  NewClaimStateType,
  ResponsabilityDataType,
  AdditionalInfoPair,
  StepperDataType,
} from "../../types/new-claim.types";

export interface NewClaimState {
  status?: NewClaimStateType;
  step: number;
  stepperData: StepperDataType;
  policyData?: ClaimDataPolicyDataType;
  claimData?: ClaimDataType;

  responsability?: ResponsabilityDataType;
  damagedParts: DamagedPartType[];
  counterpartData?: ClaimDataCounterpartDataType;
  additionalInfo: AdditionalInfoDataType[];

  claimDataCompleted: boolean;
  responsabilityDataCompleted: boolean;
  damagedPartsDataCompleted: boolean;
  counterpartDataCompleted: boolean;

  loadingPolicyData: boolean;
}

const today = (() => {
  return moment().format("DD/MM/YYYY");
})();

const buildInitialState = () => {
  return {
    status: NewClaimStateType.Unknown,
    step: 0,
    stepperData: {
      numeroVeicoliCoinvolti: 0,
      veicoloAVisibile: false,
      tipoVeicoloA: "---",
      veicoloBVisibile: false,
      tipoVeicoloB: "---",
      collisioneVisibile: false,
      collisione: false,
      inItaliaVisibile: false,
      inItalia: false,
      tipoSinistro: "---",
    },
    claimData: {
      number: Date.now().toString(),
      receiptDate: today,
      dateOfReceiptCompany: today,
      dateOfReceiptDekra: today,
      registrationDate: today,
      occurrenceDate: today,
      occurrenceTime: "00:00",
      occurrencePlace: undefined,
      policeIntervention: false,
      witnesses: false,
      note: "",
      ___isPolicyCard: true,
    },
    damagedParts: [],
    additionalInfo: [],
    claimDataCompleted: false,
    responsabilityDataCompleted: false,
    damagedPartsDataCompleted: false,
    counterpartDataCompleted: false,
    loadingPolicyData: false,
  } as NewClaimState;
};

export const newClaimSlice = createSlice({
  name: "new-claim",
  initialState: buildInitialState(),
  reducers: {
    ___setIsPolicyCard(state, action: PayloadAction<boolean>) {
      if (state.claimData?.___isPolicyCard !== undefined) state.claimData.___isPolicyCard = action.payload;
    },
    clearLocalStorage(state) {
      // handled in localstoareMiddleware
    },
    clear(state) {
      const newState = buildInitialState();

      state.status = newState.status;
      state.step = newState.step;
      state.policyData = newState.policyData;
      state.stepperData = newState.stepperData;
      state.damagedParts = [];
      state.responsability = undefined;
      state.counterpartData = undefined;
      state.additionalInfo = [];
      state.claimDataCompleted = false;
      state.counterpartDataCompleted = false;
      state.responsabilityDataCompleted = false;

      state.damagedPartsDataCompleted = false;

      state.loadingPolicyData = false;
    },
    setStatus(state, action: PayloadAction<NewClaimStateType>) {
      const status = action.payload;
      state.status = status;

      if (status === NewClaimStateType.Unknown || status === NewClaimStateType.MandatoryData) state.step = 0;
      if (
        status === NewClaimStateType.CheckingData ||
        status === NewClaimStateType.VerifingSic ||
        status === NewClaimStateType.SicCorrect ||
        status === NewClaimStateType.SicError
      )
        state.step = 1;
      if (status === NewClaimStateType.AdditionalData) state.step = 2;
      if (status === NewClaimStateType.Resume) state.step = 3;
    },
    setLoadingPolicyStatus(state, action: PayloadAction<boolean>) {
      state.loadingPolicyData = action.payload;
    },
    setPolicyData(state, action: PayloadAction<ClaimDataPolicyDataType>) {
      state.policyData = action.payload;
    },
    setResponsabilityData(state, action: PayloadAction<ResponsabilityDataType>) {
      state.responsability = action.payload;
    },
    setDamagedPart(state, action: PayloadAction<DamagedPartPair>) {
      if (state.damagedParts?.length === 0 && action.payload.index === 0) {
        state.damagedParts = [action.payload.damagedPart];
      } else if (action.payload.index >= state.damagedParts?.length) {
        state.damagedParts = [...state.damagedParts, action.payload.damagedPart];
      } else {
        state.damagedParts = state.damagedParts?.map((d, i) =>
          i === action.payload.index ? action.payload.damagedPart : d
        );
      }
    },
    addDamagedPart(state) {
      state.damagedParts = [
        ...state.damagedParts,
        {
          pdNumber: Date.now().toString(),
          subject: undefined,
          roleType: "",
          damages: [],
        },
      ];
    },
    removeDamagedPart(state, action: PayloadAction<number>) {
      state.damagedParts = state.damagedParts.filter((d, i) => i !== action.payload);
    },
    updateStepperData(state, action: PayloadAction<StepperDataType>) {
      state.stepperData = action.payload;
    },
    updateClaimData(state, action: PayloadAction<ClaimDataType>) {
      state.claimData = action.payload;
    },
    updateCounterpartData(state, action: PayloadAction<ClaimDataCounterpartDataType>) {
      state.counterpartData = action.payload;
    },
    updateTabsCompletedState(state, action: PayloadAction<boolean[]>) {
      state.claimDataCompleted = action.payload[0];
      state.counterpartDataCompleted = action.payload[1];
      state.responsabilityDataCompleted = action.payload[2];
      state.damagedPartsDataCompleted = action.payload[3];
    },
    setAdditionalInfo(state, action: PayloadAction<AdditionalInfoPair>) {
      const { additionalInfo, index } = action.payload;
      if (index === -1) {
        state.additionalInfo = [...state.additionalInfo, additionalInfo];
      } else state.additionalInfo[index] = additionalInfo;
    },
    removeAdditionalInfo(state, action: PayloadAction<number>) {
      state.additionalInfo = state.additionalInfo.filter((ai) => ai.id !== action.payload);
    },
  },
});

export const {
  ___setIsPolicyCard,
  clearLocalStorage,
  clear,
  setLoadingPolicyStatus,
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
} = newClaimSlice.actions;

export default newClaimSlice.reducer;
