import { Pool } from 'pg';
import dotenv from 'dotenv';
import uuidv4 from 'uuid/v4';
import moment from 'moment';

dotenv.config();

const pool = new Pool({
  connect: process.env.DATABASE_URL
});

const postParty = (req, res) => {
  const { name, address, email, city, logo } = req.body;

  pool.query(
    'INSERT INTO parties(id,name,address,email,city,logo,created_date,modified_date) VALUES($1,$2,$3,$4,$5,$6,$7,$8)',
    [
      uuidv4(),
      name,
      address,
      email,
      city,
      logo,
      moment(new Date()),
      moment(new Date())
    ],
    (err, results) => {
      if (err) {
        throw err;
      }
      res.status(201).send(results);
    }
  );
};

const getParties = (req, res) => {
  pool.query('SELECT * FROM parties', (err, parties) => {
    if (err) {
      throw err;
    }
    res.send({
      status: 200,
      data: parties.rows
    });
  });
};

const getParty = (req, res) => {
  const id = req.params.partyId;
  pool.query('SELECT * FROM parties WHERE id = $1', [id], (err, party) => {
    let found = party.rows.find(party => {
      return party.id !== parseInt(id);
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
// import knex from '../models/knex';
// import validateParty from '../helpers/validateParty';

// //get Perties
// const getParties = (req, res) => {
//   knex
//     .select()
//     .from('parties')
//     .then(parties => {
//       res.send({
//         status: 200,
//         data: parties
//       });
//     });
// };

// //get a single party
// const getParty = (req, res) => {
//   const id = req.params.partyId;

//   knex
//     .select()
//     .from('parties')
//     .where('id', id)
//     .then(party => {
//       let found = party.find(party => {
//         return party.id === parseInt(id);
//       });
//       if (found) {
//         res.send({
//           status: 200,
//           data: found
//         });
//       } else {
//         return res.send({
//           status: 404,
//           message: 'Invalid party ID'
//         });
//       }
//     });
// };

// //post party
// const postParty = (req, res) => {
//   const { name, address, email, city, logo } = req.body;

//   const err = validateParty(req.body);
//   //console.log('JOI Error is', err);

//   const error = err['error'].details.map(msg => msg.message);

//   knex('parties')
//     .insert({
//       id: 6,
//       name: name,
//       email: email,
//       address: address,
//       city: city,
//       logo: logo
//     })
//     .then(party => {
//       if (!name || !email || !address || !city || !logo) {
//         return res.send({
//           status: 400,
//           error: error
//         });
//       }
//       res.send(party);
//     });
// };

// const editParty = (req, res) => {
//   const id = req.params.partyId;
//   const name = req.body.name;

//   knex('parties')
//     .where('id', id)
//     .update({
//       name: name
//     })
//     .then(() => {
//       knex
//         .select()
//         .from('parties')
//         .where('id', id)
//         .then(party => {
//           let found = party.find(party => {
//             return party.id === parseInt(id);
//           });
//           if (found) {
//             res.send({
//               status: 200,
//               data: found
//             });
//           } else {
//             return res.send({
//               status: 404,
//               message: 'Invalid party ID'
//             });
//           }
//         });
//     });
// };
export default { postParty, getParties, getParty };
