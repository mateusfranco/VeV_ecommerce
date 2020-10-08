
const priceNegativeMiddleware = (req, res, next) => {
  const { price } = req.body;
  
  if(price > 0) return next();
  else res.status(400).send();
}

const quantityNegativeMiddleware = (req, res, next) => {
  const { quantity } = req.body;
  
  if(quantity > 0) return next();
  else res.status(400).send();
}




module.exports = {
  priceNegativeMiddleware, 
  quantityNegativeMiddleware,
}