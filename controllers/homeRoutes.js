
const router = require('express').Router();
const {BlogPost, Comment, User} = require('../models');
// Import the custom middleware
const withAuth = require('../utils/auth');

// // GET all blog posts for homepage
router.get('/', async (req, res) => {
  try {
      const blogPostData = await BlogPost.findAll({
        // include: [
        // //   {
        // //     model: User,
        // //     attributes: ['username'],
        // //   },
        //   {
        //     model: Comment,
        //     // attributes: ['comment','comment_date'],
        //      attributes: ['comment'],
        //   },
        // ],
      });

      // Serialize data so the template can read it
      const blogPosts = blogPostData.map((posts) => posts.get({ plain: true })); 
    
      // Pass serialized data and session flag into template
      res.render('homepage', {
          blogPosts,
          loggedIn: req.session.loggedIn,
        });
    } catch (err) {
          console.log(err);
          res.status(500).json(err);
      }
});
      
// // GET one gallery
// // Use the custom middleware before allowing the user to access the gallery
router.get('/blogpost/:id', withAuth, async (req, res) => {
  try {
    const blogPostData = await BlogPost.findByPk(req.params.id);  
    const gallery = blogPostData.get({ plain: true });
        res.render('blogpost', { blogpost, loggedIn: req.session.loggedIn });
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
});


router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;

// Use withAuth middleware to prevent access to route
// router.get('/profile', withAuth, async (req, res) => {
//   try {
//     // Find the logged in user based on the session ID
//     const userData = await User.findByPk(req.session.user_id, {
//       attributes: { exclude: ['password'] },
//       include: [{ model: Project }],
//     });

//     const user = userData.get({ plain: true });

//     res.render('profile', {
//       ...user,
//       logged_in: true
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// router.get('/login', (req, res) => {
//   // If the user is already logged in, redirect the request to another route
//   if (req.session.logged_in) {
//     res.redirect('/profile');
//     return;
//   }

//   res.render('login');
// });

// module.exports = router;