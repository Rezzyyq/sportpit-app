import test from "node:test";
import assert from "node:assert/strict";
import app from "../app.js";
import Product from "../models/Product.js";

const original = {
  find: Product.find,
  save: Product.prototype.save,
  findByIdAndUpdate: Product.findByIdAndUpdate,
  findByIdAndDelete: Product.findByIdAndDelete,
};

const startServer = async () => {
  const server = app.listen(0);
  await new Promise((resolve) => server.once("listening", resolve));
  const { port } = server.address();
  return { server, baseUrl: `http://127.0.0.1:${port}` };
};

test.afterEach(() => {
  Product.find = original.find;
  Product.prototype.save = original.save;
  Product.findByIdAndUpdate = original.findByIdAndUpdate;
  Product.findByIdAndDelete = original.findByIdAndDelete;
});

test("GET / returns healthcheck payload", async () => {
  const { server, baseUrl } = await startServer();

  try {
    const response = await fetch(`${baseUrl}/`);
    const body = await response.json();

    assert.equal(response.status, 200);
    assert.equal(body.ok, true);
    assert.match(body.message, /API is running/i);
  } finally {
    server.close();
  }
});

test("GET /api/products returns product list", async () => {
  Product.find = async () => [{ _id: "1", name: "Test", quantity: 2 }];
  const { server, baseUrl } = await startServer();

  try {
    const response = await fetch(`${baseUrl}/api/products`);
    const body = await response.json();

    assert.equal(response.status, 200);
    assert.equal(Array.isArray(body), true);
    assert.equal(body[0].name, "Test");
  } finally {
    server.close();
  }
});

test("POST /api/products returns 400 for invalid payload", async () => {
  const { server, baseUrl } = await startServer();

  try {
    const response = await fetch(`${baseUrl}/api/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "", quantity: -1 }),
    });
    const body = await response.json();

    assert.equal(response.status, 400);
    assert.match(body.message, /name|quantity/i);
  } finally {
    server.close();
  }
});

test("POST /api/products creates product for valid payload", async () => {
  Product.prototype.save = async function saveMock() {
    return { _id: "new-id", ...this.toObject() };
  };

  const { server, baseUrl } = await startServer();

  try {
    const response = await fetch(`${baseUrl}/api/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "Valid", quantity: 3 }),
    });
    const body = await response.json();

    assert.equal(response.status, 201);
    assert.equal(body.name, "Valid");
    assert.equal(body.quantity, 3);
  } finally {
    server.close();
  }
});

test("PUT /api/products/:id returns 404 when product not found", async () => {
  Product.findByIdAndUpdate = async () => null;
  const { server, baseUrl } = await startServer();

  try {
    const response = await fetch(`${baseUrl}/api/products/missing-id`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "Valid", quantity: 1 }),
    });
    const body = await response.json();

    assert.equal(response.status, 404);
    assert.match(body.message, /не знайдено/i);
  } finally {
    server.close();
  }
});

test("DELETE /api/products/:id returns 404 when product not found", async () => {
  Product.findByIdAndDelete = async () => null;
  const { server, baseUrl } = await startServer();

  try {
    const response = await fetch(`${baseUrl}/api/products/missing-id`, {
      method: "DELETE",
    });
    const body = await response.json();

    assert.equal(response.status, 404);
    assert.match(body.message, /не знайдено/i);
  } finally {
    server.close();
  }
});
