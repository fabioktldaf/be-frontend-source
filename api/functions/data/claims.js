const policies = require("./policies");

module.exports = [
  {
    policyNumber: policies[0].policy_number,
    created: {
      number: "qwerty-987654",
      occurrenceDate: "23/04/2019",
      occurrenceTime: "10:10",
    },
  },
  {
    policyNumber: policies[1].policy_number,
    created: {
      number: "qabc-987654",
      occurrenceDate: "03/02/2022",
      occurrenceTime: "18:05",
    },
  },
  {
    policyNumber: policies[2].policy_number,
    created: {
      number: "zxc-987654",
      occurrenceDate: "03/02/2020",
      occurrenceTime: "15:11",
    },
    received: {
      number: "eee-987654",
      occurrenceDate: "05/02/2020",
      occurrenceTime: "15:15",
    },
  },
];
