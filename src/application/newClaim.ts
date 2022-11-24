import { store } from "../redux/store";
import {
  clear,
  setStatus,
  setPolicyData,
  updateStepperData,
  updateClaimData,
  updateTabsCompletedState,
} from "../redux/features/newClaimSlice";
import { defaultClaimPolicyData } from "../config/dummy-data";
import { ClaimType, NewClaimStateType, SteppedChangeDataType, UpdateDataFieldsType } from "../types/new-claim.types";
import { CardVehicleTypes } from "../config/const";
import ClaimData from "../components/NewClaim/ClaimData";

const isCardVehicle = (type: ClaimType) => CardVehicleTypes.indexOf(type) >= 0;

export default {
  startNewClaim: () => {
    store.dispatch(clear());
    store.dispatch(setStatus(NewClaimStateType.MandatoryData));
    store.dispatch(setPolicyData(defaultClaimPolicyData));
  },
  updateStepperData: (val: any, field: SteppedChangeDataType) => {
    const updatedStepperData = Object.assign({}, store.getState().newClaim.stepperData);

    if (field === "vehicles_number") {
      updatedStepperData.numeroVeicoliCoinvolti = val;
      updatedStepperData.veicoloAVisibile = val === 2;
      updatedStepperData.tipoVeicoloA = "---";
      updatedStepperData.veicoloBVisibile = false;
      updatedStepperData.tipoVeicoloB = "---";
      updatedStepperData.collisioneVisibile = false;
      updatedStepperData.collisione = false;
      updatedStepperData.inItaliaVisibile = false;
      updatedStepperData.inItalia = false;
      updatedStepperData.tipoSinistro = "---";
    } else if (field === "vehicle_a_type") {
      updatedStepperData.tipoVeicoloA = val;
      updatedStepperData.veicoloBVisibile = isCardVehicle(val);
      updatedStepperData.tipoVeicoloB = "---";
      updatedStepperData.collisioneVisibile = false;
      updatedStepperData.collisione = false;
      updatedStepperData.inItaliaVisibile = false;
      updatedStepperData.inItalia = false;
      updatedStepperData.tipoSinistro = "NO CARD";
    } else if (field === "vehicle_b_type") {
      updatedStepperData.tipoVeicoloB = val;
      updatedStepperData.collisioneVisibile = isCardVehicle(val);
      updatedStepperData.collisione = false;
      updatedStepperData.inItaliaVisibile = false;
      updatedStepperData.inItalia = false;
      updatedStepperData.tipoSinistro = "NO CARD";
    }
    if (field === "collision") {
      updatedStepperData.collisione = val;
      updatedStepperData.inItaliaVisibile = val;
      updatedStepperData.inItalia = false;
      updatedStepperData.tipoSinistro = "NO CARD";
    }
    if (field === "inItaly") {
      updatedStepperData.inItalia = val;
      updatedStepperData.tipoSinistro = val ? "CARD" : "NO CARD";
    }

    store.dispatch(updateStepperData(updatedStepperData));
    checkDataCompleted();
  },
  updateClaimData: (val: any, field: UpdateDataFieldsType) => {
    const updatedClaimData = Object.assign({}, store.getState().newClaim.clamiData);

    if (field === "receipt-date") {
      updatedClaimData.receiptDate = val;
    } else if (field === "occurrence-date") {
      updatedClaimData.occurrenceDate = val;
    } else if (field === "occurrence-time") {
      updatedClaimData.occurrenceTime = val;
    } else if (field === "occurrence-place") {
      updatedClaimData.occurrencePlace = val;
    } else if (field === "police-intervention") {
      updatedClaimData.policeIntervention = val;
    } else if (field === "witnesses") {
      updatedClaimData.witnesses = val;
    } else if (field === "note") {
      updatedClaimData.note = val;
    }

    store.dispatch(updateClaimData(updatedClaimData));
    checkDataCompleted();
  },
};

///////////////

const notEmpty = (s: string | null | undefined) => !!s && s !== "";

const checkDataCompleted = () => {
  const completed = [false, false, false];
  const { clamiData, stepperData } = store.getState().newClaim;

  completed[0] =
    stepperData.tipoSinistro === "CARD" &&
    notEmpty(clamiData?.receiptDate) &&
    notEmpty(clamiData?.occurrenceDate) &&
    notEmpty(clamiData?.occurrenceTime) &&
    notEmpty(clamiData?.occurrencePlace);

  store.dispatch(updateTabsCompletedState(completed));
};
