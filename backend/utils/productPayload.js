const normalizeStringField = (value, fieldName) => {
  if (value === undefined) return undefined;
  if (typeof value !== "string") {
    return { error: `${fieldName} має бути рядком` };
  }
  return value.trim();
};

export const validateProductPayload = (body) => {
  const rawName = normalizeStringField(body.name, "name");
  if (rawName?.error) return rawName;

  const quantity = Number(body.quantity);

  if (!rawName || rawName.length === 0) {
    return { error: "name є обов'язковим полем" };
  }

  if (!Number.isInteger(quantity) || quantity < 0) {
    return { error: "quantity має бути цілим невід'ємним числом" };
  }

  const customer = normalizeStringField(body.customer, "customer");
  if (customer?.error) return customer;

  const date = normalizeStringField(body.date, "date");
  if (date?.error) return date;

  const image = normalizeStringField(body.image, "image");
  if (image?.error) return image;

  return {
    value: {
      name: rawName,
      quantity,
      customer: customer || "",
      date: date || "",
      ...(image ? { image } : {}),
    },
  };
};
