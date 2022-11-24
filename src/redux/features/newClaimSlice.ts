import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ClaimDataPolicyDataType,
  ClaimDataType,
  NewClaimStateType,
  StepperDataType,
} from "../../types/new-claim.types";

export interface NewClaimState {
  status?: NewClaimStateType;
  step: number;
  policyData?: ClaimDataPolicyDataType;
  clamiData?: ClaimDataType;
  claimDataCompleted: boolean;
  stepperData: StepperDataType;
  // responsability?: string;
  responsabilityDataCompleted: boolean;
  // damagedParts?: string;
  damagedPartsDataCompleted: boolean;
}

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
    claimDataCompleted: false,
    responsabilityDataCompleted: false,
    damagedPartsDataCompleted: false,
  } as NewClaimState;
};

export const newClaimSlice = createSlice({
  name: "new-claim",
  initialState: buildInitialState(),
  reducers: {
    clear(state) {
      const newState = buildInitialState();

      state.status = newState.status;
      state.step = newState.step;
      state.policyData = newState.policyData;
      state.stepperData = newState.stepperData;
    },
    setStatus(state, action: PayloadAction<NewClaimStateType>) {
      const status = action.payload;
      state.status = status;

      if (status === NewClaimStateType.Unknown || status === NewClaimStateType.MandatoryData) state.step = 0;
      if (
        status === NewClaimStateType.VerifingSic ||
        status === NewClaimStateType.SicCorrect ||
        status === NewClaimStateType.SicError
      )
        state.step = 1;
      if (status === NewClaimStateType.AdditionalData) state.step = 2;
      if (status === NewClaimStateType.Resume) state.step = 3;
    },
    setPolicyData(state, action: PayloadAction<ClaimDataPolicyDataType>) {
      state.policyData = action.payload;
    },
    updateStepperData(state, action: PayloadAction<StepperDataType>) {
      state.stepperData = action.payload;
    },
    updateClaimData(state, action: PayloadAction<ClaimDataType>) {
      state.clamiData = action.payload;
    },
    updateTabsCompletedState(state, action: PayloadAction<boolean[]>) {
      state.claimDataCompleted = action.payload[0];
      state.responsabilityDataCompleted = action.payload[1];
      state.damagedPartsDataCompleted = action.payload[2];
    },
  },
});

export const { clear, setStatus, setPolicyData, updateStepperData, updateClaimData, updateTabsCompletedState } =
  newClaimSlice.actions;
export default newClaimSlice.reducer;
