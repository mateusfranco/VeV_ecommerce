const { uuid } = require("uuidv4");
const router = require('express').Router();

const {
  products
} = require('../../db/db');

router.get("/products", (req, res) => {
    const { title } = req.query;
    const results = title
      ? products.filter((product) => product.title.includes(title))
      : products;
  
    return res.json(results);
  });
  
router.post("/products", (req, res) => {
  console.log(req, res);
  const { title, price, description, images, quantity } = req.body;
  const product = {
    id: uuid(),
    title,
    price,
    description,
    images,
    quantity,
  };
  products.push(product);
  return res.json(product);
});

router.put("/products/:id", (req, res) => {
  const { id } = req.params;
  const { title, price, description, images, quantity } = req.body;

  const productIndex = products.findIndex((product) => product.id === id);
  if (productIndex < 0) {
    return res.status(400).json({ error: "Product not found!" });
  }

  const product = {
    id,
    title,
    price,
    description,
    images,
    quantity,
  };

  product[productIndex] = product;

  return response.json(product);
});

router.delete("/products/:title", (req, res) =>{
  const {id} = req.params;
  const productIndex = products.findIndex((product) => product.id === id);
  if (productIndex < 0) {
    return res.status(400).json({ error: "Product not found!" });
  }

  products.splice(productIndex,1);

});

module.exports = router;