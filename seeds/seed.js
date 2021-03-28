const sequelize = require('../config/connection');
const { User, Project, Comment, BlogPost } = require('../models');

const userData = require('./userData.json');
const projectData = require('./projectData.json');
const blogPostdata = require ('./blogPostData.json');
const commentData = require ('./commentData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const project of projectData) {
    await Project.create({
      ...project,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  for (const blogPosts of blogPostdata) {
    await BlogPost.create({
      ...blogPosts,
      author_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  for (const comment of commentData) {
    await Comment.create({
      ...comment,
      user_id: users[Math.floor(Math.random() * users.length)].id,
      //post_id: blogpost[Math.floor(Math.random() * blogpost.length)].id,
      post_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
