exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('parties')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('parties').insert([
        {
          id: 1,
          name: 'rich',
          email: 'rich@gmail.com',
          address: '61 cross roads new port',
          city: 'Harare',
          logo: 'https://farm7.staticflickr.com/6057/6262125702_a086dd49f1.jpg'
        },
        {
          id: 2,
          name: 'tate',
          email: 'tate@gmail.com',
          address: '6 borroawads roads bluffhills',
          city: 'kigali',
          logo: 'https://farm7.staticflickr.com/6057/6262125702_a086dd49f1.jpg'
        },
        {
          id: 3,
          name: 'zesk',
          email: 'zesk@gmail.com',
          address: '37 k 09 midlle new yprk',
          city: 'new york',
          logo: 'https://farm7.staticflickr.com/6057/6262125702_a086dd49f1.jpg'
        }
      ]);
    });
};
