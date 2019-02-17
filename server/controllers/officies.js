import { Pool } from 'pg';
import dotenv from 'dotenv';
import uuidv4 from 'uuid/v4';
import moment from 'moment';

dotenv.config();

const pool = new Pool({
  connect: process.env.DATABASE_URL
});

const postOffice = (req, res) => {
  const { name, type } = req.body;

  pool.query(
    'INSERT INTO officies(id,name,type,created_date,modified_date) VALUES($1,$2,$3,$4,$5)',
    [uuidv4(), name, type, moment(new Date()), moment(new Date())],
    (err, results) => {
      if (err) {
        throw err;
      }
      res.status(201).send(results);
    }
  );
};

// const getOfficies = (req, res) => {
//   pool.query('SELECT * FROM officies', (err, officies) => {
//     if (err) {
//       throw err;
//     }
//     res.send({
//       status: 200,
//       data: officies.rows
//     });
//   });
// };
// import office from '../models/officies';
// import validateOffice from '../helpers/validateOffice';

// let currentId = office['data'].length;

// //get parties
// const getOfficies = (req, res) => {
//   res.send({ office });
// };

// //get a party by id
// const getOffice = (req, res) => {
//   const id = req.params.officeId;

//   let found = office['data'].find(office => {
//     return office.id === parseInt(id);
//   });

//   if (found) {
//     return res.send({
//       status: office.status,
//       data: found
//     });
//   } else {
//     return res.send({
//       status: 404,
//       message: 'Not Found'
//     });
//   }
// };

// //post parties
// const postOffice = (req, res) => {
//   const { name, type } = req.body;

//   //let data = req.body;
//   currentId++;

//   let newOffice = {
//     id: currentId,
//     name: name,
//     type: type
//   };

//   const err = validateOffice(req.body);
//   console.log('JOI Error is', err['error'].details.map(n => console.log(n)));

//   let error = err['error'].details.map(n => n.message);
//   for (let i of error) {
//     console.log(i);
//   }
//   console.log(error);
//   if (!name || !type) {
//     return res.send({
//       status: 400,
//       error: error
//     });
//   }

//   office['data'].push(newOffice);
//   res.send({
//     status: office.status,
//     data: [
//       {
//         id: newOffice.id,
//         name: newOffice.name,
//         type: newOffice.type
//       }
//     ]
//   });
// };

export default { postOffice };
