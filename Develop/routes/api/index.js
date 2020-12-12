/* jshint esversion: 6 */

const router = require('express').Router();
const categoryRoutes = require('./category-routes');
const productRoutes = require('./product-routes');
const tagRoutes = require('./tag-routes');

//Added
const bcrypt = require('bcrypt');

router.use('/categories', categoryRoutes);
router.use('/products', productRoutes);
router.use('/tags', tagRoutes);

//Attempt at password
router.post('/', async(req, res)=>{
  try{
    const newUser = req.body;
    newUser.password = await bcrypt.hash(req.body.password, 10);
    const updateUser = await newUser.create(newUser);
    res.status(200).json(updateUser);
  }catch (err) {
    res.status(400).json(err);
  }
})

module.exports = router;