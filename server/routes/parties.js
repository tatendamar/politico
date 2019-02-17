import parties from '../controllers/parties';
const app = require('express')();

app
  .route('/parties')
  .get(parties.getParties)
  .post(parties.postParty);
app.route('/parties/:partyId').get(parties.getParty);
// .delete(parties.deleteParty);

export default app;
