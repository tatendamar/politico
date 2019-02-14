import office from '../models/officies';
import validateOffice from '../helpers/validateOffice';

let currentId = 2;

//get parties
const getOfficies = (req, res) => {
  res.send({ office });
};

//get a party by id
const getOffice = (req, res) => {
  const id = req.params.officeId;

  let found = office['data'].find(office => {
    return office.id === parseInt(id);
  });

  if (found) {
    return res.send({
      status: office.status,
      data: found
    });
  } else {
    return res.send({
      status: 404,
      message: 'Not Found'
    });
  }
};

//post parties
const postOffice = (req, res) => {
  const { name, type } = req.body;

  //let data = req.body;
  currentId++;

  let newOffice = {
    id: currentId,
    name: name,
    type: type
  };

  const err = validateOffice(req.body);
  console.log('JOI Error is', err['error'].details.map(n => console.log(n)));

  let error = err['error'].details.map(n => n.message);
  for (let i of error) {
    console.log(i);
  }
  console.log(error);
  if (!name || !email) {
    return res.send({
      status: 400,
      error: error
    });
  }

  office['data'].push(newOffice);
  res.send({
    status: office.status,
    data: [
      {
        id: newOffice.id,
        name: newOffice.name,
        type: newOffice.type
      }
    ]
  });
};

export default { getOfficies, getOffice, postOffice };
