const mongoose = require('mongoose');

const produsSchema = new mongoose.Schema({
  title:{
    type:String,
    required: true,
  },
  text:{
    type:String,
    required: true,
  },
  user_id:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  price:{
    type:Number,
    required: true,
  },
  isBought:{
    type:Boolean,
    required: true,
  }
});

const Produs = mongoose.model('Produs', produsSchema);

const find = () => {
    return Produs.find().exec();
  };
  const findExeptUser = (userID) => {
    return Produs.find({user_id:{ $nin: userID}}).exec();
  };
  const findOnlyforUser = (userID) => {
    return Produs.find({user_id:userID}).exec();
  };
  const add = (produs) => {
    return new Produs(produs).save();
  };
  const findById = (produsId) => {
    return Produs.findById(produsId).exec();
  };
  
  const remove = (produsId) => {
    return Produs.findOneAndDelete({ _id: produsId }).exec();
  };
  
  const update = (produsId, changedProdus) => {
    return Produs.findByIdAndUpdate(produsId, changedProdus).exec();
  };
  module.exports = {
    find,
    add,
    findById,
    remove,
    update,
    findOnlyforUser,
    findExeptUser
  };