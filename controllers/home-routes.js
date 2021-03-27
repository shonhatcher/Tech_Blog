
const router = require('express').Router();
const {BlogPost} = require('../models');
// Import the custom middleware
const withAuth = require('../utils/auth');

// // GET all blog posts for homepage
router.get('/', async (req, res) => {
  try {
      const blogPostData = await BlogPost.findAll();

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







// const router = require('express').Router();
// const { Gallery, Painting } = require('../models');
// // Import the custom middleware
// const withAuth = require('../utils/auth');

// // GET all galleries for homepage
// router.get('/', async (req, res) => {
//   try {
//     const dbGalleryData = await Gallery.findAll({
//       include: [
//         {
//           model: Painting,
//           attributes: ['filename', 'description'],
//         },
//       ],
//     });

//     const galleries = dbGalleryData.map((gallery) =>
//       gallery.get({ plain: true })
//     );

//     res.render('homepage', {
//       galleries,
//       loggedIn: req.session.loggedIn,
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

// // GET one gallery
// // Use the custom middleware before allowing the user to access the gallery
// router.get('/gallery/:id', withAuth, async (req, res) => {
//   try {
//     const dbGalleryData = await Gallery.findByPk(req.params.id, {
//       include: [
//         {
//           model: Painting,
//           attributes: [
//             'id',
//             'title',
//             'artist',
//             'exhibition_date',
//             'filename',
//             'description',
//           ],
//         },
//       ],
//     });

//     const gallery = dbGalleryData.get({ plain: true });
//     res.render('gallery', { gallery, loggedIn: req.session.loggedIn });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

// // GET one painting
// // Use the custom middleware before allowing the user to access the painting
// router.get('/painting/:id', withAuth, async (req, res) => {
//   try {
//     const dbPaintingData = await Painting.findByPk(req.params.id);

//     const painting = dbPaintingData.get({ plain: true });

//     res.render('painting', { painting, loggedIn: req.session.loggedIn });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

// router.get('/login', (req, res) => {
//   if (req.session.loggedIn) {
//     res.redirect('/');
//     return;
//   }

//   res.render('login');
// });

// module.exports = router;
