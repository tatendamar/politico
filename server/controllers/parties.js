import knex from '../models/knex';
import validateParty from '../helpers/validateParty';

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
      let found = party.find(party => {
        return party.id === parseInt(id);
      });
      if (found) {
        res.send({
          status: 200,
          data: found
        });
      } else {
        return res.send({
          status: 404,
          message: 'Invalid party ID'
        });
      }
    });
};

//post party
const postParty = (req, res) => {
  const { name, address, email, city, logo } = req.body;

  const err = validateParty(req.body);
  //console.log('JOI Error is', err);

  const error = err['error'].details.map(msg => msg.message);

  knex('parties')
    .insert({
      id: 6,
      name: name,
      email: email,
      address: address,
      city: city,
      logo: logo
    })
    .then(party => {
      if (!name || !email || !address || !city || !logo) {
        return res.send({
          status: 400,
          error: error
        });
      }
      res.send(party);
    });
};

export default { getParties, getParty, postParty };
