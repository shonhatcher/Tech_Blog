const User = require('./User');
const Project = require('./Project');
const BlogPost = require('./BlogPost');
const Comment = require('./Comment');


User.hasMany(Project, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Project.belongsTo(User, {
  foreignKey: 'user_id'
});

User.hasMany(BlogPost, {
  foreignKey: 'author_id',
  onDelete: 'CASCADE'
});

User.hasMany(Comment, {
  foreignKey: 'author_id',
  onDelete: 'CASCADE'
});

BlogPost.belongsTo(User, {
  foreignKey: 'author_id',
})

BlogPost.hasMany(Comment, {
  foreignKey: 'post_id',
  onDelete: 'CASCADE'
})

module.exports = { User, Project, BlogPost, Comment };
