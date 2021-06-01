const express = require('express');
const  User  = require('../user/user-model');
const  Produs  = require('./produs-model');
const {restrict} = require('../middlewares/middlewares');
const router = express.Router();

router.get('/',restrict,async (req, res,next) => {
    
    const foundUser = await User.findById( req.decoded.id ).catch((err) => {
     res.status(500).json({ message: err });
   }); 
   if(foundUser){
        const produs = await Produs.find(
            { user_id: req.decoded.id }
        ).catch((error) => {
            next(error)
        });
        
        res.json( produs );
    }
    else{
        return res.status(404).json({ message: 'Not found' });
    }

 });

 router.get('/onlyUser',restrict,async (req, res,next) => {
    
  const foundUser = await User.findById( req.decoded.id ).catch((err) => {
   res.status(500).json({ message: err });
 }); 
 if(foundUser){
      const produs = await Produs.findOnlyforUser(req.decoded.id).catch((error) => 
      {
          next(error)
      });
      
      res.json( produs );
  }
  else{
      return res.status(404).json({ message: 'Not found' });
  }

});

 router.get('/:id',restrict,async (req, res,next) => {
    
    try {
      const foundProdus = await Produs.findById(req.params.id,);
  
      if (!foundProdus) {
        return res.status(404).json({ message: 'Not found' });
      }
  
      return res.status(200).json(foundProdus);
    } catch (error) {
      next(error);
    }
  });

  router.post('/',restrict,async  (req, res,next) => {
    const { title, text,price,isBought } = req.body;
    const userId = req.decoded.id;

    Produs.add({ title, text, user_id: userId ,price,isBought})
    .then((produs) => {
      res.status(201).json(produs);
    })
    .catch((error) => {
     next(error);
    });
  });

  router.delete('/:id',(req, res,next) => {
    Produs.remove(req.params.id)
      .then((deletedProdus) => {
        res.status(200).json({ deletedProdus });
      })
      .catch((error) => {
        next(error);
      });
  });

  router.put('/:id', (req, res,next) => {
    const changedProdus = req.body;
    Produs.update(req.params.id, changedProdus)
      .then((updatedProdus) => {
        res.status(200).json({ updatedProdus });
      })
      .catch((error) => {
        next(error);
      });
  });
 /*  router.put('/:idP/cumpara', async (req, res,next) => {
    const foundProdus = await Produs.findById(req.params.idP);
      if (!foundProdus) {
        return res.status(404).json({ message: 'Not found' });
      }
      
      console.log(foundProdus);
    
    const userId = req.decoded.id;
    if (!userId) {
      return res.status(404).json({ message: 'Not found id' });
    }
    console.log(req.decoded.id);
    
    const changedProdus = {_id:foundProdus._id, title:foundProdus.title, text:foundProdus.text,
       user_id: userId ,price:foundProdus.price,isBought:foundProdus.isBought}
    Produs.update(req.params.id, changedProdus)
      .then((updatedProdus) => {
        res.status(200).json({ updatedProdus });
      })
      .catch((error) => {
        next(error);
      });
  }); */
  module.exports = router;