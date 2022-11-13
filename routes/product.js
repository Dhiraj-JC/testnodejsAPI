const productRouter = require('express').Router();
const { Product } = require('../models');

productRouter.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).send(err.message || err);
  }
});

productRouter.get('/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const product = await Product.findById(id);
    res.json(product);
  } catch (err) {
    res.status(500).send(err.message || err);
  }
});

productRouter.post('/',async (req, res) => {
  const {name,description,price,quantity} = req.body;
  
  const productEntity = new Product({
    name: name,
    description: description,
    price: price,
    quantity: quantity,
  });

  try {
    await productEntity.save();
    res.json(productEntity);
  } catch (err) {
    res.status(500).send(err.message || err);
  }

});

productRouter.put('/:id', async (req, res) => {
    const id = req.params.id;
    const {name,description,price,quantity} = req.body;
  
    try {
      const product = await Product.findById(id);

      product.name = name;
      product.description = description;
      product.price = price;
      product.quantity = quantity;

      await product.save();

      res.json(product);
    } catch (err) {
      res.status(500).send(err.message || err);
    }
});

productRouter.delete('/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const product = await Product.findById(id);
    await product.deleteOne();
    res.json(product);
  } catch (err) {
    res.status(500).send(err.message || err);
  }
});

module.exports = productRouter;
