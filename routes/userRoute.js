const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');


const isAuth = require('../middlewares/isAuth');

const {
  validator,
  registerRules,
  loginRules,
} = require('../middlewares/validator');



//@route POST api/user/register
//@desc Register new user
//@access Public
router.post('/register', registerRules(), validator, async (req, res) => {
  const { fullname, dateOfBirth, email, password, address, phoneNumber, role } = req.body;
  
  try {
    
    // Check for existing user
    let user = await User.findOne({ email });
    
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    } 
    // Create new User
    user = new User({ fullname, dateOfBirth, email, password, address, phoneNumber, role });
    // Create Salt & hash
    const salt = 10;
    const hashedPassword = await bcrypt.hash(password, salt);

    user.password = hashedPassword;
    // Save the user
    await user.save();

    // sign user
    const payload = {
      id: user._id,
    };

    const token = await jwt.sign(payload, process.env.secretOrKey);

    res.status(200).send({ msg: 'User registred with success', user, token });
  } catch (error) {
    res.status(500).send({ msg: 'Server Error', error });
  }
});




//@route POST api/user/login
//@desc Login User
//@access Public
router.post('/login', loginRules(), validator, async (req, res) => {
  const { email, password } = req.body;
  try {
    
    // Check for existing user
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({ msg: 'Bad Credentials!' });
    }
    //Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({ msg: 'Bad Credentials!' });
    }
    // sign user
    const payload = {
      id: user._id,
    };
    const token = await jwt.sign(payload, process.env.secretOrKey);

    res.send({ msg: 'Logged in with success', user, token });
  } catch (error) {
    res.status(500).send({ msg: 'Server Error' });
  }
});


//@route GET api/users/user
//@desc Get authentified user
//@access Private
router.get('/user', isAuth, (req, res) => {
  res.status(200).send({ user: req.user });
});


//@route GET api/users/allUsers
//@desc read users
//@access Public
router.get("/allUsers", async (req, res) => {
  try {
    const users = await User.find()
    res.json(users);
  } catch (error) {
    console.log(error);
  }
});

//@route GET api/users/user/id
//read one user's profile
//@access public
router.get('/user/:_id', async (req, res) => {
  const  id  = req.params._id;
  try {
    const user = await User.findOne({_id: id});
    res.json(user);
  } catch (error) {
    console.log(error);
  }
});



//@route DELETE api/user/remove/id
//@desc delete a user
//@access Private
router.delete('/delete/:_id', async (req, res) => {
  const  _id  = req.params._id;
  try {
    const user = await User.findOneAndDelete({ _id });
    res.json({ msg: "user deleted", user });
  } catch (error) {
    console.log(error);
  }
});


//@route PUT api/user/edit/id
//@desc edit a user
//@access Private
router.put("/update/:_id", async (req, res) => {
  const { _id } = req.params;
  const editedUser = req.body
  try {
    const user = await User.findByIdAndUpdate(_id, editedUser);
    res.json({ msg: "user edited", user});
  } catch (error) {
    console.log(error);
  }
});


module.exports = router;