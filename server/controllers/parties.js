import knex from '../models/knex';

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

export default { getParties };
