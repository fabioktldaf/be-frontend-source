const functions = require("firebase-functions");

const subjects = require("./data/subjects"); // --- 6
const policies = require("./data/policies"); // ----- 7
const vehicles = require("./data/vehicles"); // --- 5
const contacts = require("./data/contacts"); // --- 4 email / 4 phone
const documents = require("./data/documents"); // - 2 cardId / 2 passport / 2 drivingLicense
const claims = require("./data/claims");

const searchResult_1 = {
  subject: {
    name: subjects.naturalPerson[0].name,
    lastname: subjects.naturalPerson[0].lastname,
    fiscalCode: subjects.naturalPerson[0].fiscalCode,
  },
  contractor: {
    business_name: subjects.giuridicalPerson[0].business_name,
    type: subjects.giuridicalPerson[0].type,
    p_iva: subjects.giuridicalPerson[0].p_iva,
  },
  policies: [
    {
      policy_number: policies[0].policy_number,
      effect_date: policies[0].effect_date,
      expiration_date: policies[0].expiration_date,
      claims: claims.filter((c) => c.policyNumber === policies[0].policy_number),
    },
    {
      policy_number: policies[1].policy_number,
      effect_date: policies[1].effect_date,
      expiration_date: policies[1].expiration_date,
      claims: claims.filter((c) => c.policyNumber === policies[1].policy_number),
    },
  ],
};

const searchResult_2 = {
  subject: {
    name: subjects.naturalPerson[2].name,
    lastname: subjects.naturalPerson[2].lastname,
    fiscalCode: subjects.naturalPerson[2].fiscalCode,
  },
  policies: [
    {
      policy_number: policies[2].policy_number,
      effect_date: policies[2].effect_date,
      expiration_date: policies[2].expiration_date,
      claims: claims.filter((c) => c.policyNumber === policies[2].policy_number),
    },
    {
      policy_number: policies[3].policy_number,
      effect_date: policies[3].effect_date,
      expiration_date: policies[3].expiration_date,
      claims: claims.filter((c) => c.policyNumber === policies[2].policy_number),
    },
  ],
};

const searchResult_3 = {
  subject: {
    business_name: subjects.giuridicalPerson[2].business_name,
    type: subjects.giuridicalPerson[2].type,
    p_iva: subjects.giuridicalPerson[2].p_iva,
    proprietorship: subjects.giuridicalPerson[2].proprietorship,
  },
  policies: [
    {
      policy_number: policies[4].policy_number,
      effect_date: policies[4].effect_date,
      expiration_date: policies[4].expiration_date,
      claims: claims.filter((c) => c.policyNumber === policies[4].policy_number),
    },
  ],
};

const searchResult_4 = {
  subject: {
    business_name: subjects.giuridicalPerson[1].business_name,
    type: subjects.giuridicalPerson[1].type,
    p_iva: subjects.giuridicalPerson[1].p_iva,
  },
  policies: [
    {
      policy_number: policies[5].policy_number,
      effect_date: policies[5].effect_date,
      expiration_date: policies[5].expiration_date,
      claims: claims.filter((c) => c.policyNumber === policies[5].policy_number),
    },
    {
      policy_number: policies[6].policy_number,
      effect_date: policies[6].effect_date,
      expiration_date: policies[6].expiration_date,
      claims: claims.filter((c) => c.policyNumber === policies[6].policy_number),
    },
  ],
};

const result = [searchResult_1, searchResult_2, searchResult_3, searchResult_4];

exports.search = functions.https.onRequest(async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.json({ result });
});

/*
    firebase emulators:start
    
    firebase deploy --only functions
*/
