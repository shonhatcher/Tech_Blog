const { BlogPost } = require('../models');

const postdata = [
  {
    post_title: 'Blossoming Apricot',
    post: 'It is almost April. Apricots blossom in April.',
    author: 'Sean John',
    // post_date: 'March 30, 2020',
  },

  {
    post_title: '17 Year Anniversary',
    post: 'I have been married for 17 years!',
    author: 'Jimmy Walker',
    // post_date: 'April 2, 2020',
  },
  {
    post_title: 'Batman vs Superman',
    post: 'Can Batman beat Superman?',
    author: 'Diana Prince',
    // post_date: 'March 1, 2021',
  },
];


const seedBlog = () => BlogPost.bulkCreate(postdata);

module.exports = seedBlog;

