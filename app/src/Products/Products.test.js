const { uuid } = require("uuidv4");
const dotenv = require('dotenv');
dotenv.config();
const dbPath = process.env.DB_PRODUCTION_URL;
const request = require("supertest");
const app = require("../../../main");
const {Products} = require('../Products/ProductsSchema');

describe("products", async () => {
  // beforeAll(async () => {
  //   const db = await mongoose.connect(dbPath, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
  //       if (err) {
  //           console.error(err);
  //           process.exit(1);
  //       }
  //   });
  // });
  

  it("should get all products", async () => {
    const prod = await Products.find();
    console.log(prod);
    // const res = await jest.fn().mockResolvedValue([
    //   {
    //     "_id": "fe59bb95-ce73-45dd-a889-096ea4daf153",
    //     "title": "teste",
    //     "price": 1000.40,
    //     "description": "Headset gamer razer",
    //     "images": "asjdhgasdhgdgajhsdgjhasdghagjhasgd",
    //     "quantity": 10
    //   }
    // ])
    
    // expect(res.statusCode).toEqual(200);
  });

  // it("should get products array", async () => {
  //   const res = await request(app).get("/products");
  //   expect(res.statusCode).toEqual(200);
  // })

  // it("should create a new product", async () => {
  //   const dbProductsLengthBefore = db.products.length;
  //   const newMockProduct = {
  //     title: "testePost",
  //     price: 123.32,
  //     description: "testepost",
  //     images: "jadghsdgjsdgajhsdgjhasgdjhasgdjhgasjdhgasdjhgasjdjasdad",
  //     quantity: 21,
  //   };
  //   const res = await request(app).post("/products").send(newMockProduct);
  //   expect(res.statusCode).toEqual(200);
  //   const dbProductsLengthAfter = db.products.length;
  //   expect(dbProductsLengthBefore).toEqual(dbProductsLengthAfter - 1);
  // });

  // it("alter one product", async () => {
  //   const productId = db.products[0].id;
  //   const product = {
  //     id: productId,
  //     title: "testePost",
  //     price: 123.32,
  //     description: "testepost",
  //     images: "jjjjjjjj",
  //     quantity: 21,        
  //   };
  //   const res = await request(app).put(`/products/${productId}`).send(product);
  //   expect(res.statusCode).toEqual(200);
  //   expect(res.body).toEqual(product);
  //   // verificar se o produto foi alterado 
  // });

  // it('should delete product id', async () => {
  //   const dbProductsLengthBefore = db.products.length;
  //   const productId = db.products[0].id;
  //   const res = await request(app).delete(`/products/${productId}`);
  //   expect(res.statusCode).toEqual(204);
  //   const dbProductsLengthAfter = db.products.length;
  //   expect(dbProductsLengthBefore - 1).toEqual(dbProductsLengthAfter);
    
  // })
});
