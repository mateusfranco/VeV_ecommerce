const { uuid } = require("uuidv4");
const request = require("supertest");
const app = require("../../../index");
const db = require("../../db/db");

describe("products", () => {
  it("should get all products", async () => {
    const res = await request(app).get("/products");
    expect(res.statusCode).toEqual(200);
    expect(db.products).toHaveLength(res.body.length);
  });

  it("should create a new product", async () => {
    const dbProductsLengthBefore = db.products.length;
    const newMockProduct = {
      title: "testePost",
      price: 123.32,
      description: "testepost",
      images: "jadghsdgjsdgajhsdgjhasgdjhasgdjhgasjdhgasdjhgasjdjasdad",
      quantity: 21,
    };
    const res = await request(app).post("/products").send(newMockProduct);
    expect(res.statusCode).toEqual(200);
    const dbProductsLengthAfter = db.products.length;
    expect(dbProductsLengthBefore).toEqual(dbProductsLengthAfter - 1);
  });

  it("alter one product", async () => {
    const productId = db.products[0].id;
    const product = {
      id: productId,
      title: "testePost",
      price: 123.32,
      description: "testepost",
      images: "jjjjjjjj",
      quantity: 21,        
    };
    const res = await request(app).put(`/products/${productId}`).send(product);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(product);
    // verificar se o produto foi alterado 
  });

  it('should delete product id', async () => {
    const dbProductsLengthBefore = db.products.length;
    const productId = db.products[0].id;
    const res = await request(app).delete(`/products/${productId}`);
    expect(res.statusCode).toEqual(204);
    const dbProductsLengthAfter = db.products.length;
    expect(dbProductsLengthBefore - 1).toEqual(dbProductsLengthAfter);
    
  })
});
