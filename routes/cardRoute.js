const router = require('express').Router();
const Card = require('../models/CardModel');
const User = require('../models/UserModel');


//@route POST api/cards/add
//@desc create new card
//@access Public
router.post("/add", async (req, res) => {

    const {email,title, image, description, category, region} = req.body;
    
    try {
      const newCard = new Card({
        email,
        title,
        image, 
        description, 
        category, 
        region
      });
      const card = await newCard.save();
      console.log(author)
      res.json({ msg: "card added", card });

    } catch (error) {
      console.log(error.message);
    }
  });
  


//@route GET api/cards/allCards
//@desc read cards
//@access Public
router.get("/allCards", async (req, res) => {
    try {
      const cards = await Card.find()
      res.json(cards);
    } catch (error) {
      console.log(error);
    }
  });


//@route DELETE api/cards/delete/id
//@desc remove a card
//@access Public
router.delete("/delete/:id", async (req, res) => {
    const { id } = req.params;

    try {
      const card = await Card.findOneAndDelete({ _id: id });
      res.json({ msg: "card deleted", card });
    } catch (error) {
      console.log(error);
    }
  });


//@route PUT api/cards/edit/id
//@desc edit a card
//@access Public
router.put("/edit/:_id", async (req, res) => {
    const { _id } = req.params;
    const editedCard = req.body
    try {
      const card = await Card.findByIdAndUpdate(_id, editedCard,{new: true});
      res.json({ msg: "card edited", card });
    } catch (error) {
      console.log(error);
    }
  });


//@route PUT api/cards/subscribe/card-id/user-id
router.put('/subscribe/:_id/:userID', async (req, res) => {
  const  _id  = req.params._id;
  const userID = req.params.userID
  console.log(userID)
  try {
    const user = await User.findById(userID)
    const card = await Card.findByIdAndUpdate(_id, {$push:{subscribers: user }},{new: true});
    res.json({ card });
  } catch (error) {
    console.log(error);
  }
});


//@route PUT api/cards/unsubscribe/card-id/user-id
router.put('/unsubscribe/:_id/:userID', async (req, res) => {
  const  _id  = req.params._id;
  const userID = req.params.userID
  
  try {
    const user = await User.findById(userID)
    const card = await Card.findByIdAndUpdate(_id, {$pull:{subscribers: user}},{new: true});
    res.json({ card });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;

