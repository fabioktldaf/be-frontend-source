const functions = require("firebase-functions");

const subjects = require("./data/subjects"); // --- 6 natural / 3 giuridical
const policies = require("./data/policies"); // ----- 7
const vehicles = require("./data/vehicles"); // --- 5
const contacts = require("./data/contacts"); // --- 4 email / 4 phone
const documents = require("./data/documents"); // - 2 cardId / 2 passport / 2 drivingLicense
const claims = require("./data/claims");
const { responsiveArray } = require("antd/lib/_util/responsiveObserve");

const buildResultItem = (
  iSubjectNaturalPerson,
  iSubjectGiuridicalPerson,
  iContractorNaturalPerson,
  iContractorGiuridicalPerson,
  policies
) => {
  let item = {};

  const subjectNaturalPerson = iSubjectNaturalPerson >= 0 ? subjects.naturalPerson[iSubjectNaturalPerson] : null;
  const subjectGiuridicalPerson =
    iSubjectGiuridicalPerson >= 0 ? subjects.giuridicalPerson[iSubjectGiuridicalPerson] : null;
  const contractorNaturalPerson =
    iContractorNaturalPerson >= 0 ? subjects.naturalPerson[iContractorNaturalPerson] : null;
  const contractorGiuridicalPerson =
    iContractorGiuridicalPerson >= 0 ? subjects.giuridicalPerson[iContractorGiuridicalPerson] : null;

  if (subjectNaturalPerson) {
    item.subject = {
      ...subjectNaturalPerson,
    };
  }

  if (subjectGiuridicalPerson) {
    item.subject = {
      ...subjectGiuridicalPerson,
    };
  }

  if (contractorNaturalPerson) {
    item.contractor = {
      ...subjectNaturalPerson,
    };
  }

  if (contractorGiuridicalPerson) {
    item.contractor = {
      ...subjectGiuridicalPerson,
    };
  }

  if (policies && policies.length > 0) {
    item.policies = policies.map((p) => ({
      id: p.id,
      policy_number: p.policy_number,
      effect_date: p.effect_date,
      expiration_date: p.expiration_date,
      claims: claims.filter((c) => c.policyNumber === p.policy_number),
      vehicle: p.vehicle,
    }));
  }

  return item;
};

const resultAll = [
  buildResultItem(0, null, null, 0, [policies[0], policies[1]]),
  buildResultItem(1, null, null, null, [policies[2], policies[3]]),
  buildResultItem(2, null, null, 0, [policies[4]]),
  buildResultItem(3, null, null, 0, [policies[5], policies[0]]),
  buildResultItem(null, 0, null, null, 0, [policies[0], policies[1]]),
  buildResultItem(null, 1, null, null, 0, [policies[0], policies[1]]),
  buildResultItem(null, 2, null, null, [policies[4]]),
];

exports.search = functions.https.onRequest(async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Headers", "*");

  let result = { error: "not found" };

  console.log("req.body ", req.body);

  if (req.body.type === "generic") result = resultAll;
  else if (req.body.type === "subject") result = [...subjects.naturalPerson, ...subjects.giuridicalPerson];

  console.log(result);
  res.json({ result });
});

exports.subject = functions.https.onRequest(async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Headers", "*");

  console.log("req.body ", req.body);

  const subject =
    subjects.naturalPerson.find((s) => s.id === req.body.id) ||
    subjects.giuridicalPerson.find((s) => s.id === req.body.id);

  res.json({ result: subject });
});

exports.policy = functions.https.onRequest(async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Headers", "*");

  console.log("req.body ", req.body);

  const policy = policies.find((p) => p.id === req.body.id);

  console.log(policy);
  res.json({ result: policy });
});

exports.authorized = functions.https.onRequest(async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Headers", "*");

  const server = req.query.server;

  if (server.toLowerCase() === "github") {
    const code = req.query.code;
    const clientId = req.query.clientId;
    const clientSecret = req.query.clientSecret;

    console.log("githubcode ", code);

    res.json({ result: { code: code } });
  }

  res.json({ result: { authorized: false } });
});

exports.token = functions.https.onRequest(async (req, res) => {
  const CLIENT_SECRET = "";
  const AUTHORIZATION_SERVER_TOKEN_URL = "";

  const { code, client_id, redirect_uri } = req.query;
  const url = `${AUTHORIZATION_SERVER_TOKEN_URL}?grant_type=authorization_code&client_id=${client_id}&client_secret=${client_secret}&redirect_uri=${recirec_uri}&code=${code}`;

  console.log("url ", url);
  const data = await fetch(url, { method: "POST" });

  const result = await data.json();
  console.log("result ", result);

  res.json({ result });
});

/*
    firebase emulators:start    
    firebase deploy --only functions
*/
