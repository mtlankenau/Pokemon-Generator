const router = require('express').Router();
const sequelize = require('../config/connection');
const { Pokemon, User } = require('../models');

// checks if user logged in; have session; authorized
const withAuth = require('../utils/auth');

// all dashboard views will be prefixed with /dashboard
router.get('/', withAuth, (req, res) => { // add withAuth here as our own middlware
    Pokemon.findAll({
        where: {
          // use the ID from the session so we retrieve posts made by logged in user
          user_id: req.session.user_id
        },
        include: [
          {
            model: User
          }
        ]
      })
        .then(dbPokemonData => {
          // serialize data before passing to template
          // using post here but this can be named ANYTHING 
          const pokemons = dbPokemonData.map(pokemon => pokemon.get({ plain: true }));
          // user won't be able to get to the dashboard page unless they're logged in
          console.table(pokemons);
          res.render('dashboard', { pokemons, loggedIn: true });
        })
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });

  });

router.get('/edit/:id', withAuth, (req, res) => { // add withAuth here as our own middlware
  Pokemon.findOne({
    where: {
        id: req.params.id
    },
    include: [
        {
            model: User,
            attributes: ['username']
        }
    ]
  })
    .then(dbPostData => {
        if(!dbPostData) {
            // The 404 status code identifies a user error and will need a different request for a successful response.
            res.status(404).json({ message: 'No post with this id was found'});
            return;
        }

        // serialize the data with plain: true
        const pokemon = dbPostData.get({ plain: true });

        // pass data to template
        res.render('edit-pokemon', { 
          pokemon,
          loggedIn: req.session.loggedIn
          // user will only see comments if logged in
        });
    })  
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });

});

// router.get('/edit/users/:id', withAuth, (req, res) => { // add withAuth here as our own middlware
//   User.findOne({
//     where: {
//         id: req.params.id
//     },
//   })
//     .then(dbUserData => {
//         if(!dbUserData) {
//             // The 404 status code identifies a user error and will need a different request for a successful response.
//             res.status(404).json({ message: 'No user with this id was found'});
//             return;
//         }

//         // serialize the data with plain: true
//         const newUser = dbUserData.get({ plain: true });

//         console.log('Route works');
//         // pass data to template
//         res.render('edit-users', { 
//           newUser,
//           loggedIn: req.session.loggedIn
//         });
//     })  
//     .catch(err => {
//         console.log(err);
//         res.status(500).json(err);
//     });
// });

module.exports = router;