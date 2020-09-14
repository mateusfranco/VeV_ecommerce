const dotenv = require('dotenv');
dotenv.config();
const {Products} = require('../Products/ProductsSchema');
const mongoose = require('mongoose');

describe("products", () => {

  beforeAll(async () => {
    await mongoose.connect(process.env.DB_PRODUCTION_URL, { useNewUrlParser: true, useCreateIndex: true }, (err) => {
      if (err) {
          console.error(err);
          process.exit(1);
      }
    });
  });
  
  beforeEach((done) => {
    const newMockProduct = {
      id: "asdg 872613 ajhds",
      title: "testePost1",
      price: 123.45,
      description: "testepost1",
      images: "images",
      quantity: 20,
    };

    prod = new Products(newMockProduct);
    prod.save()
      .then(() => done());
  });

  it('teste', () => {
    expect(true).toBe(true);
  });

  it("should get all products", async () => {
    const prod = await Products.find();
    const prodCount = await Products.count();
    
    expect(prod).toHaveLength(prodCount);
  });

  it("should create a new product", async (done) => {
    
    const newMockProduct = {
      id: "asdg 872613 ajhdsgjahsgd",
      title: "testePost1",
      price: 123.45,
      description: "testepost1",
      images: "images",
      quantity: 20,
    };

    const product = new Products(newMockProduct);
    
    product
      .save() //takes some time and returns a promise
      .then(() => {
          expect(!product.isNew).toBe(true); //if poke is saved to db it is not new
          done();
      });
  });

  it('should remove a Product', async (done) => {
    Products.findOneAndRemove({title: "testePostPopulate"})
      .then(() => Products.findOne({title: "testePostPopulate"}))
      .then((product) => {
        expect(product).toBe(null);
        done();
      });
  });

  it('sets and saves pokemon using an instance', (done) => {
    prod.set('title', 'newtest');
    prod
    .save()
    .then(()=> {
      expect(prod).toMatchObject({...prod, title:'newtest'})
      done();
    });
  });

});
