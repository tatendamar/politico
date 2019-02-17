exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('officies')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('officies').insert([
        {
          id: 1,
          name: 'member of parliament',
          type: 'House of representatives'
        },
        {
          id: 2,
          name: 'senate member',
          type: 'House of commons'
        },
        {
          id: 3,
          name: 'campaign officer',
          type: 'National campaign'
        }
      ]);
    });
};
