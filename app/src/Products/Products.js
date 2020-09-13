const { uuid } = require("uuidv4");
const router = require('express').Router();
const db = require('../../db/db');

router.get("/products",async (req, res) => {
    const { title } = req.query;

    const results = title 
    ? await db.collection('Products').find(product => {
      return product.title === title;
    }).toArray()
    : await db.collection('Products').find().toArray();
    return res.status(200).json(results);
});

router.post("/products",async (req, res) => {
  
  const { title, price, description, images, quantity } = req.body;
  const product = {
    id: uuid(),
    title,
    price,
    description,
    images,
    quantity,
  };
  result = await db.collection('Products').insertOne(product);
  return res.status(200).json(result.ops);
});

router.put("/products/:id",async (req, res) => {
  const { id } = req.params;
  const { title, price, description, images, quantity } = req.body;

  const product = {
    id,
    title,
    price,
    description,
    images,
    quantity,
  };

  const result = await db.collection('Products')
    .findOneAndReplace({'id':id},
    product);
  if(!result.lastErrorObject.updatedExisting) return res.status(400)
    .json({message:'object dont exists'}); 
  return res.status(200).json(product);
});

router.delete("/products/:id", async (req, res) =>{
  const {id} = req.params;
  const result = await db.collection('Products')
    .findOneAndDelete({'id':id});
  if(!result.value) return res.status(400).send();
  return res.status(204).send();
});

module.exports = router;