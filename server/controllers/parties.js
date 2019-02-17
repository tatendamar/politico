import knex from '../models/knex';

//get Perties
const getParties = (req, res) => {
  knex
    .select()
    .from('parties')
    .then(parties => {
      res.send({
        status: 200,
        data: parties
      });
    });
};

//get a single party
const getParty = (req, res) => {
  const id = req.params.partyId;
  knex
    .select()
    .from('parties')
    .where('id', id)
    .then(party => {
      res.send({
        status: 200,
        data: party
      });
    });
};

export default { getParties, getParty };
