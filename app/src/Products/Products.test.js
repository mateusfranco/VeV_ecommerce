const dotenv = require('dotenv');
dotenv.config();
const {Products} = require('../Products/ProductsSchema');
const mongoose = require('mongoose');
const request = require("supertest");
const routes = require("./Products");
const express = require("express");
const { uuid } = require("uuidv4");

const app = express();
app.use('/', routes);

describe("products", () => {

  beforeAll(async () => {

    await mongoose.connect(process.env.DB_PRODUCTION_URL, { useNewUrlParser: true, useCreateIndex: true }, (err) => {
      if (err) {
          console.error(err);
          process.exit(1);
      }
    });
  });
  
  afterAll(async () => {
    console.log("disconnecting db");
    mongoose.disconnect();
  })

  beforeEach((done) => {
    const everId = uuid()
    const newMockProduct = {
      id: everId,
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

  it("should create a new product", (done) => {
    
    const newMockProduct = {
      id: uuid(), 
      title: "testePost1",
      price: 123.45,
      description: "testepost1",
      images: "images",
      quantity: 20,
    };

    const product = new Products(newMockProduct);
    
    product
      .save()
      .then(() => {
          expect(!product.isNew).toBe(true); 
          done();
      });
  });
  
  it('should remove a Product', (done) => {
    Products.findOneAndRemove({title: "testePost1"})
      .then((product) => {
        expect(product).not.toBe(null);
        done();
      });
  });

  it('sets and saves product using an instance', (done) => {
    prod.set('title', 'newtest');
    prod
    .save()
    .then(()=> {
      expect(prod).toMatchObject({...prod, title:'newtest'})
      done();
    });
  });

  it("dont create products with negative quantity", async () => {
    const newMockProduct3 = {
      id: uuid(),
      title: "testePost5",
      price: 1243.45,
      description: "testepost5",
      images: "images",
      quantity: -20,
    };

    const res = await request(app)
      .post('/products')
      .send(newMockProduct3);
    expect(res.statusCode).not.toBe(200);
  });

  it("dont create products with price negative", async () => {
    const newMockProduct2 = {
      id: uuid(),
      title: "testePost1",
      price: -123.45,
      description: "testepost1",
      images: "images",
      quantity: 20,
    };

    const res = await request(app)
      .post('/products')
      .send(newMockProduct2);
    expect(res.statusCode).not.toBe(200);
  });

  it("verify get on the server ", async () => {
    const res = await request(app)
      .get("/products")
    expect(res.statusCode).toBe(200);
  });
  

});
