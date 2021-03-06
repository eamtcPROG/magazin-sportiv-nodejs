const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  username:{
    type:String,
    required: true,
  } ,
  password:{
    type:String,
    required: true,
  } ,
  balance:{
    type:Number,
    required: true,
  } ,
});

const User = mongoose.model('User', userSchema);
const find = () => {
  return User.find().exec();
};
const add = (user) => {
  return new User(user).save();
};
const findById = (userId) => {
  return User.findById(userId).exec();
};
const findByUsername = (usernameP) => {
    return User.findOne({ username: usernameP}).exec();
  };
const remove = (userId) => {
  return User.findOneAndDelete({ _id: userId }).exec();
};

const update = (userId, changedUser) => {
  return User.findByIdAndUpdate(userId, changedUser).exec();
};
module.exports = {
  find,
  add,
  findById,
  remove,
  update,
  findByUsername
};