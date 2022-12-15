const contacts = require("./contacts"); // --- 4 email / 4 phone
const addresses = require("./addresses"); // --- 5 residence / 3 shipping
const documents = require("./documents"); // - 2 cardId / 2 passport / 2 drivingLicense

module.exports = {
  naturalPerson: [
    {
      name: "Tranquillino",
      lastname: " Pirozzi",
      gender: "male",
      fiscalCode: "BK35710027",
      birth: {
        date: "25/11/1939",
        city: "San Giuseppe Alla Rena",
        province: "Catania",
        country: "Italia",
      },
      contacts: [contacts.email[0], contacts.phone[0]],
      addresses: [addresses.residence[0], addresses.shipping[0]],
      documents: [documents.cardId[0], documents.passport[0]],
    },
    {
      name: "Nadia",
      lastname: " Marcelo",
      gender: "female",
      fiscalCode: "FM45872015",
      birth: {
        date: "30/08/1971",
        city: "Lauro Di Sessa Aurunca",
        province: "Cesena",
        country: "Italia",
      },
      contacts: [contacts.email[1], contacts.phone[1]],
      addresses: [addresses.residence[1], addresses.shipping[1]],
      documents: [documents.cardId[1], documents.passport[1]],
    },

    {
      name: "Marianna",
      lastname: " Palerma",
      gender: "female",
      fiscalCode: "RR61475525",
      birth: {
        date: "21/01/1981",
        city: "San Giovanni Ilarione",
        province: "Verona",
        country: "Italia",
      },
      contacts: [contacts.email[2], contacts.phone[2]],
      addresses: [addresses.residence[2], addresses.shipping[2]],
      documents: [documents.drivingLicense[0]],
    },
    {
      name: "Angela",
      lastname: " Mazzanti",
      gender: "female",
      fiscalCode: "OZ44334623",
      birth: {
        date: "04/04/1993",
        city: "San Michele In Monte Laureto",
        province: "Bari",
        country: "Italia",
      },
      contacts: [contacts.email[3], contacts.phone[3]],
      addresses: [addresses.residence[3]],
      documents: [documents.drivingLicense[1]],
    },
    {
      name: "Marcelo",
      lastname: " Alfredo",
      gender: "male",
      fiscalCode: "IW73687058",
      birth: {
        date: "16/04/1957",
        city: "Villa San Giuseppe",
        province: "Reggio Calabria",
        country: "Italia",
      },
      contacts: [contacts.email[0], contacts.phone[0]],
      addresses: [addresses.shipping[0]],
      documents: [documents.passport[0]],
    },
  ],
  giuridicalPerson: [
    {
      business_name: "Hickle-Hettinger",
      type: "srl",
      p_iva: "5397936790165",
      contacts: [contacts.email[1]],
      addresses: [addresses.shipping[1]],
      documents: [documents.passport[1]],
    },
    {
      business_name: "Upton-Rolfson",
      type: "spa",
      p_iva: "9976861",
      contacts: [],
      addresses: [],
      documents: [],
    },
    {
      business_name: "Elga Trevisani",
      type: "proprietorship",
      p_iva: "123456789",
      contacts: [],
      addresses: [],
      documents: [],
      proprietorship: {
        name: "Elga",
        lastname: " Trevisani",
        gender: "female",
        fiscalCode: "VM87422970",
        birth: {
          date: "26/03/1949",
          city: "Gaiato",
          province: "Modena",
          country: "Italia",
        },
      },
    },
  ],
};
