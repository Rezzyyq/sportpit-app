import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const read = (path) => fs.readFileSync(path, "utf8");

test("frontend modular structure files exist", () => {
  const expectedFiles = [
    "src/Content.jsx",
    "src/Header.jsx",
    "src/hooks/useProducts.js",
    "src/views/ProductsView.jsx",
    "src/views/SettingsView.jsx",
    "src/views/ShipmentView.jsx",
    "src/views/StatsView.jsx",
    "src/utils/productImages.js",
    "public/musclelab-logo.svg",
  ];

  for (const file of expectedFiles) {
    assert.equal(fs.existsSync(file), true, `Missing file: ${file}`);
  }
});

test("Content.jsx composes views and uses product hook", () => {
  const content = read("src/Content.jsx");

  assert.match(content, /useProducts\(/);
  assert.match(content, /<StatsView/);
  assert.match(content, /<SettingsView/);
  assert.match(content, /<ShipmentView/);
  assert.match(content, /<ProductsView/);
  assert.match(content, /error-state/);
});

test("Header uses MuscleLab brand", () => {
  const header = read("src/Header.jsx");
  const html = read("index.html");

  assert.match(header, /MuscleLab/);
  assert.match(header, /musclelab-logo\.svg/);
  assert.match(html, /<title>MuscleLab<\/title>/);
});

test("ProductsView contains CRUD action UI and state rendering", () => {
  const view = read("src/views/ProductsView.jsx");

  assert.match(view, /onCreate/);
  assert.match(view, /onUpdate/);
  assert.match(view, /onDelete/);
  assert.match(view, /actionError/);
  assert.match(view, /inline-error/);
  assert.match(view, /shipment-form/);
  assert.match(view, /empty-state/);
  assert.match(view, /type="submit"/);
});

test("useProducts exposes API CRUD methods and action errors", () => {
  const hook = read("src/hooks/useProducts.js");

  assert.match(hook, /const createProduct = async/);
  assert.match(hook, /const updateProduct = async/);
  assert.match(hook, /const deleteProduct = async/);
  assert.match(hook, /setActionError/);
  assert.doesNotMatch(hook, /localhost:5000/);
  assert.match(hook, /return \{/);
});

test("Vite proxies API requests for mobile dev access", () => {
  const config = read("vite.config.js");

  assert.match(config, /proxy/);
  assert.match(config, /"\/api"/);
  assert.match(config, /localhost:5000/);
});

test("Vercel exposes product API routes for production", () => {
  assert.equal(fs.existsSync("api/products.js"), true);
  assert.equal(fs.existsSync("api/products/[id].js"), true);

  const listRoute = read("api/products.js");
  const itemRoute = read("api/products/[id].js");

  assert.match(listRoute, /Product\.find/);
  assert.match(listRoute, /Product\(validated\.value\)/);
  assert.match(itemRoute, /findByIdAndUpdate/);
  assert.match(itemRoute, /findByIdAndDelete/);
});
