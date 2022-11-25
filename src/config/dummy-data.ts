export const defaultClaimPolicyData = {
  policy_number: "AB-12345789",
  effect_date: "01/01/2022",
  expiration_date: "31/12/2022",
  owner: {
    natural_person: {
      id: 1,
      name: "Mario",
      lastname: "Rossi",
      fiscal_code: "RSSMRA73L09Z103F",
      province_of_residence: "Milano",
      city_of_residence: "Rho",
    },
  },
  contractor: {
    giuridical_person: {
      id: 2,
      business_name: "Acme Inc.",
      iva: "01960170684",
      registered_office_province: "Bologna",
      registered_office_city: "Bologna",
    },
  },
  ownerVehicle: {
    type: "A",
    plate: {
      number: "AB123CD",
      format: "Targa Italiana",
    },
  },
};
