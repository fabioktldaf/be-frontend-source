import { store } from "../redux/store";
import {
  clear,
  setStatus,
  setPolicyData,
  updateStepperData,
  updateClaimData,
  updateTabsCompletedState,
  setResponsabilityData,
  setDamagedPart,
  removeDamagedPart,
  addDamagedPart,
  setOwnerManagementType,
} from "../redux/features/newClaimSlice";
import { defaultClaimPolicyData } from "../config/dummy-data";
import {
  ClaimType,
  DamagedPartType,
  NewClaimStateType,
  PartDamagedDetailsVehicle,
  SelectPair,
  SteppedChangeDataType,
  UpdateNewClaimDataFieldsType,
  UpdateNewClaimResponsabilityDataFieldsType,
} from "../types/new-claim.types";
import {
  CardVehicleTypes,
  OwnerRolesType,
  DamageTypeEmpty,
  DamageTypeThing,
  DamageTypePerson,
  DamageTypeVehicle,
  DamageTypeLocation,
  DamageTypeGeneric,
  PartRoleTPC,
  PartRoleCP,
  PartRoleNPC,
  PartRoleEmpty,
  PartRoleCN,
  PartRoleTN,
  PartRoleTS,
  PartRoleTD,
} from "../config/const";

const isCardVehicle = (type: ClaimType) => CardVehicleTypes.indexOf(type) >= 0;

export default {
  startNewClaim: () => {
    store.dispatch(clear());
    store.dispatch(setStatus(NewClaimStateType.MandatoryData));
    store.dispatch(setPolicyData(defaultClaimPolicyData));
    store.dispatch(
      setDamagedPart({
        index: 0,
        damagedPart: {
          pdNumber: Date.now().toString(),
          subject: defaultClaimPolicyData.owner,
          roleType: "",
          managementType: "---",
          damages: [
            {
              damageType: "Vehicle",
              details: {
                plate: defaultClaimPolicyData.ownerVehicle.plate.number,
                format: defaultClaimPolicyData.ownerVehicle.plate.format,
                type: defaultClaimPolicyData.ownerVehicle.type,
                collisionPoints: [],
                note: "",
              } as PartDamagedDetailsVehicle,
            },
          ],
        },
      })
    );
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
    checkClaimDataCompleted();
  },
  updateClaimData: (val: any, fieldName: UpdateNewClaimDataFieldsType) => {
    const updatedClaimData = Object.assign({}, store.getState().newClaim.clamiData);

    if (fieldName === "receipt-date") {
      updatedClaimData.receiptDate = val;
    } else if (fieldName === "occurrence-date") {
      updatedClaimData.occurrenceDate = val;
    } else if (fieldName === "occurrence-time") {
      updatedClaimData.occurrenceTime = val;
    } else if (fieldName === "occurrence-place") {
      updatedClaimData.occurrencePlace = val;
    } else if (fieldName === "police-intervention") {
      updatedClaimData.policeIntervention = val;
    } else if (fieldName === "witnesses") {
      updatedClaimData.witnesses = val;
    } else if (fieldName === "note") {
      updatedClaimData.note = val;
    }

    store.dispatch(updateClaimData(updatedClaimData));
    checkClaimDataCompleted();
  },
  updateResponsabilityData: (val: any, fieldName: UpdateNewClaimResponsabilityDataFieldsType) => {
    const updatedResponsabilityData = Object.assign({}, store.getState().newClaim.responsability);
    let OwnerManagementType = "CG";

    if (fieldName === "barems") {
      updatedResponsabilityData.barems = Object.assign({}, val);
    } else if (fieldName === "forced-reason") {
      updatedResponsabilityData.forcedReason = val;
    } else if (fieldName === "signature-type") {
      updatedResponsabilityData.signatureType = val;
    }

    if (updatedResponsabilityData.barems.result === "T") {
      if (["1", "2"].indexOf(updatedResponsabilityData.forcedReason) >= 0) {
        updatedResponsabilityData.responsabilityType = "2";
        updatedResponsabilityData.responsabilityPercentage = "50%";
      } else {
        updatedResponsabilityData.responsabilityType = "1";
        updatedResponsabilityData.responsabilityPercentage = "100%";
        OwnerManagementType = "CD";
      }
    } else if (updatedResponsabilityData.barems.result === "C") {
      updatedResponsabilityData.responsabilityType = "2";
      updatedResponsabilityData.responsabilityPercentage = "50%";
    } else if (updatedResponsabilityData.barems.result === "R") {
      updatedResponsabilityData.responsabilityType = "3";
      updatedResponsabilityData.responsabilityPercentage = "0%";
    }

    store.dispatch(setOwnerManagementType(OwnerManagementType));
    store.dispatch(setResponsabilityData(updatedResponsabilityData));
    checkResponsabilityDataCompleted();
  },
  getDamageAvailableRoleTypes: (damagedPartIndex: number) => {
    if (damagedPartIndex === 0) return OwnerRolesType;

    const availableRoles = [PartRoleEmpty, PartRoleTN, PartRoleTS, PartRoleTD];
    const damagedParts = store.getState().newClaim.damagedParts;

    if (damagedParts[0].roleType != PartRoleCP.value) {
      const hasAlreadyDriver = damagedParts.find((p) => p.damages.find((d) => d.damageType === PartRoleCN.value));
      if (!hasAlreadyDriver) availableRoles.push(PartRoleCN);
    }

    return availableRoles;
  },
  damagedPartsRemoveOtherDrivers: () => {
    const parts = store.getState().newClaim.damagedParts;
    parts.forEach((p, i) => {
      if (p.roleType === PartRoleCN.value) {
        const updatedPart = JSON.parse(JSON.stringify(p));
        updatedPart.roleType = PartRoleEmpty.value;
        store.dispatch(setDamagedPart({ damagedPart: updatedPart, index: i }));
      }
    });
  },
  updateDamagedPart: (damagedPart: DamagedPartType, index: number) => {
    store.dispatch(setDamagedPart({ damagedPart, index }));
    checkDamagedPartsDataCompleted();
  },
  addDamagedPart: () => {
    debugger;
    store.dispatch(addDamagedPart());
    checkDamagedPartsDataCompleted();
  },
  removeDamagedPart: (index: number) => {
    debugger;
    store.dispatch(removeDamagedPart(index));
    checkDamagedPartsDataCompleted();
  },
  getAvailableDamageTypes: (index: number, part: DamagedPartType) => {
    let availableDamages: SelectPair[] = [DamageTypeEmpty, DamageTypeThing];

    const damageParts = store.getState().newClaim.damagedParts;

    if (part.roleType === PartRoleCP.value || part.roleType === PartRoleTPC.value) {
      const alreadyHasPerson = part.damages.find((d) => d.damageType === DamageTypePerson.value);
      if (!alreadyHasPerson) availableDamages.push(DamageTypePerson);
    }

    if (part.roleType === PartRoleCN.value) {
      const alreadyHasPerson = part.damages.find((d) => d.damageType === DamageTypePerson.value);
      if (!alreadyHasPerson) availableDamages.push(DamageTypePerson);
    }

    if (
      part.roleType === PartRoleTN.value ||
      part.roleType === PartRoleTS.value ||
      part.roleType === PartRoleTD.value
    ) {
      const alreadyHasPerson = part.damages.find((d) => d.damageType === DamageTypePerson.value);
      if (!alreadyHasPerson) availableDamages.push(DamageTypePerson);
    }

    return availableDamages;
  },
};

///////////////

const notEmpty = (s: string | null | undefined) => !!s && s !== "";

const checkClaimDataCompleted = () => {
  debugger;
  const { clamiData, stepperData, responsabilityDataCompleted, damagedPartsDataCompleted } = store.getState().newClaim;

  const claimDataCompleted =
    stepperData.tipoSinistro === "CARD" &&
    notEmpty(clamiData?.receiptDate) &&
    notEmpty(clamiData?.occurrenceDate) &&
    notEmpty(clamiData?.occurrenceTime) &&
    notEmpty(clamiData?.occurrencePlace);

  store.dispatch(
    updateTabsCompletedState([claimDataCompleted, responsabilityDataCompleted, damagedPartsDataCompleted])
  );
};

const checkResponsabilityDataCompleted = () => {
  const { responsability, claimDataCompleted, damagedPartsDataCompleted } = store.getState().newClaim;

  const responsabilityDataCompleted =
    (!!responsability?.barems.result && ["1", "2"].indexOf(responsability?.signatureType) >= 0) || false;

  store.dispatch(
    updateTabsCompletedState([claimDataCompleted, responsabilityDataCompleted, damagedPartsDataCompleted])
  );
};

const checkDamagedPartsDataCompleted = () => {
  debugger;
  const { damagedParts, claimDataCompleted, responsabilityDataCompleted } = store.getState().newClaim;

  /**
   * controllare anche se ci sono dei danni alla persona non valorizzati....
   *
   */

  if (damagedParts.length === 1) {
    const owner = damagedParts[0];
    const haseRole = owner.roleType !== PartRoleEmpty.value;
    const hasVehicleDamage = (owner.damages[0].details as PartDamagedDetailsVehicle).collisionPoints.length > 0;
    const damagedPartsDataCompleted = haseRole && hasVehicleDamage;

    const newCompleted = [claimDataCompleted, responsabilityDataCompleted, damagedPartsDataCompleted];
    console.log("newCompleted ", newCompleted);
    store.dispatch(updateTabsCompletedState(newCompleted));
  } else {
    // check other data
    //
    //
    //
    //
  }
};
