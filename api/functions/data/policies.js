const vehicles = require("./vehicles");
const subjects = require("./subjects");

module.exports = [
  {
    policy_number: "AB-12345789",
    effect_date: "01/01/2022",
    expiration_date: "31/12/2022",
    owner: subjects.naturalPerson[0],
    contractor: subjects.giuridicalPerson[0],
    vehicle: vehicles[0],
  },
  {
    policy_number: "XE12945385",
    effect_date: "03/04/2022",
    expiration_date: "03/04/2023",
    owner: subjects.giuridicalPerson[0],
    vehicle: vehicles[1],
  },
  {
    policy_number: "DG35176769",
    effect_date: "04/05/2022",
    expiration_date: "04/05/2023",
    owner: subjects.naturalPerson[2],
    vehicle: vehicles[2],
  },
  {
    policy_number: "TY76339738",
    effect_date: "05/06/2022",
    expiration_date: "05/06/2023",
    owner: subjects.naturalPerson[2],
    vehicle: vehicles[3],
  },
  {
    policy_number: "HF85111281",
    effect_date: "05/06/2020",
    expiration_date: "05/06/2025",
    owner: subjects.giuridicalPerson[2],
    vehicle: vehicles[4],
  },
  {
    policy_number: "YK38678791",
    effect_date: "15/16/2019",
    expiration_date: "15/16/2024",
    owner: subjects.giuridicalPerson[1],
    vehicle: vehicles[5],
  },
  {
    policy_number: "TF53310059",
    effect_date: "15/06/2022",
    expiration_date: "15/06/2024",
    owner: subjects.giuridicalPerson[1],
    vehicle: vehicles[6],
  },
];
