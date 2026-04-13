import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const read = (path) => fs.readFileSync(path, "utf8");

test("frontend modular structure files exist", () => {
  const expectedFiles = [
    "src/Content.jsx",
    "src/hooks/useProducts.js",
    "src/views/ProductsView.jsx",
    "src/views/SettingsView.jsx",
    "src/views/ShipmentView.jsx",
    "src/views/StatsView.jsx",
    "src/utils/productImages.js",
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
  assert.match(content, /Не вдалося завантажити каталог/);
});

test("ProductsView contains CRUD action UI and error rendering", () => {
  const view = read("src/views/ProductsView.jsx");

  assert.match(view, /onCreate/);
  assert.match(view, /onUpdate/);
  assert.match(view, /onDelete/);
  assert.match(view, /actionError/);
  assert.match(view, /Видалити/);
  assert.match(view, /Зберегти відправку/);
  assert.match(view, /type="submit"/);
  assert.match(view, /Нічого не знайдено/);
});

test("useProducts exposes API CRUD methods and readable errors", () => {
  const hook = read("src/hooks/useProducts.js");

  assert.match(hook, /const createProduct = async/);
  assert.match(hook, /const updateProduct = async/);
  assert.match(hook, /const deleteProduct = async/);
  assert.match(hook, /Не вдалося додати товар/);
  assert.match(hook, /return \{/);
});
