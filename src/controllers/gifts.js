var express   = require('express'),
    Gifts  = express.Router(),
    fs        = require('fs'),
    mongoose  = require('mongoose'),
    Gift   = require('../models/gift');

 var testGifts = [{
                      userId: "57851a10c810f1c74f6485ce",
                      name: "sheng freddy nikes",
                      category: "clothes",
                      imgUrl: "http://theshoegame.com/wp-content/uploads/2012/02/Air-Jordan-VI6-Freddy-Kruger-Customs-04.jpg",
                      description: "want these for Halloween. size 10",
                      price: 250,
                      gimeStatus: "want"
                    },
                    { userId: "57851a10c810f1c74f6485ce",
                      name: "sheng's kids tablet",
                      category: "computer",
                      imgUrl: "https://images-na.ssl-images-amazon.com/images/I/71ePnCmB%2BkL._SL1000_.jpg",
                      description: "1 blue and 1 pink... maybe",
                      price: 100,
                      gimeStatus: "want"
                    },
                    { userId: "57851085d518556f4f06ec79",
                      name: "jaxx kids tablet",
                      category: "computer",
                      imgUrl: "https://images-na.ssl-images-amazon.com/images/I/71ePnCmB%2BkL._SL1000_.jpg",
                      description: "1 blue and 1 pink... maybe",
                      price: 100,
                      gimeStatus: "want"
                    },
                    { userId: "57851085d518556f4f06ec79",
                      name: "jaxx kids tablet",
                      category: "computer",
                      imgUrl: "https://images-na.ssl-images-amazon.com/images/I/71ePnCmB%2BkL._SL1000_.jpg",
                      description: "1 blue and 1 pink... maybe",
                      price: 100,
                      gimeStatus: "want"
                    },
                    { userId: "578578d30e484a5f548eab14",
                      name: "subzeros ice cream",
                      category: "computer",
                      imgUrl: "http://pngimg.com/upload/ice_cream_PNG5101.png",
                      description: "all sorts of flavors",
                      price: 100,
                      gimeStatus: "want"
                    },
                    { userId: "578578d30e484a5f548eab14",
                      name: "subzeros other ice cream",
                      category: "food",
                      imgUrl: "http://7-themes.com/data_images/out/31/6876711-ice-cream-wallpaper.jpg",
                      description: "not ben n jerry's but its still so cool",
                      price: 5,
                      gimeStatus: "want"
                    },
                    { userId: "57857bb3d8bb806f54c75e7d",
                      name: "reptile's pet lizard",
                      category: "home",
                      imgUrl: "https://filmfork-cdn.s3.amazonaws.com/content/Godzilla%20-%209.gif",
                      description: "large and in charge",
                      price: 250,
                      gimeStatus: "want"
                    },
                    { userId: "57857bb3d8bb806f54c75e7d",
                      name: "reptiles anaconda mpvie",
                      category: "media",
                      imgUrl: "http://3.bp.blogspot.com/-7twzh3U2lek/UDTA3kTCqGI/AAAAAAAAB1U/LSqJbhC6VRo/s1600/Anaconda%2B%25281997%2529.jpg",
                      description: "mmm jLo",
                      price: 25,
                      gimeStatus: "want"
                    },
                    { userId: "57851a6c4e6a63cc4f50e862",
                      name: "point tool",
                      category: "computer",
                      imgUrl: "http://static1.squarespace.com/static/50f2d3e5e4b07e77c466e869/t/52fcd065e4b003139ba7ea76/1392300134827/1111.IMG_8701.jpg",
                      description: "sure sharp",
                      price: 400,
                      gimeStatus: "want"
                    } ,
                    { userId: "57851a6c4e6a63cc4f50e862",
                      name: "points pyramid",
                      category: "computer",
                      imgUrl: "https://i.ytimg.com/vi/lotbZQ55SgU/maxresdefault.jpg",
                      description: "ultimate point",
                      price: 1000000,
                      gimeStatus: "want"
                    }      ];   
/////mebersonly/gifts 
 //Mongoose
 Gifts.route('/:id/?')
  .get(function(req, res, next) {
    res.json({
        message: "you asked for " + req.params.id});
  })
  .patch(function(req, res, next) {
    var id = req.params.id;
    Gift.findByIdAndUpdate(id, { username: "jaxx", password: "ffp", email: "gotcha@mk.com"}, function (err, task) {
  console.log(task);
});
    res.json({message: "Updated todo at " + req.params.id});
  })
  .delete(function(req, res, next) {
    var id = req.params.id;
    Gift.findByIdAndRemove(id, function(err, task) {
        console.log("Deleted:");
        console.log(task);
      });
    res.json({message: "Deleted entry at " + req.params.id});
  });

Gifts.route('/?')
  .get(function(req, res) {
    Gift.find(function(err, gifts) { //first thing is Error and second thing is all gifts within user database
      console.log(gifts);  
      //console.log(err);
      //res.json(gifts);
      res.render('gifts', {gift: gifts});
      //res.render('form');
    })
  })
  ///////FOR ADDING GIFTS
  .post(function(req, res) {
    Gift.create( {
      userId: req.session.userId, ///// GRAB USER ID FROM SESSION
      name: req.body.itemname,
      category: req.body.category,
      imgUrl: req.body.picture,
      description: req.body.description,
      gimeStatus: "gime",
      price: req.body.price
    }, function(err, gifts) {
      //console.log(gifts);
      //res.json(gifts);
      res.redirect('/membersonly/gifts');
    });
  });  
  /////////END OF ACTUAL POSTING GIFTS
  ///////FOR TESTING TO LOAD ALL GIFTS
  // .post(function(req, res) {
  //   // User.create(req.body, function(err, gifts) {
  //   Gift.create(testGifts, function(err, gifts) {
  //     console.log(gifts);
  //     res.json(gifts);
  //   });
  // });  
  /////////END OF TESTING POST METHOD

module.exports = Gifts;
