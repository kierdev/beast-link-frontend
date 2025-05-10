export function toCamelCase(data) {
  if (Array.isArray(data)) {
    return data.map((item) => toCamelCase(item));
  } else if (typeof data === "object" && data !== null) {
    return Object.keys(data).reduce((accumulator, key) => {
      const newKey = key.replace(/([-_][a-z])/g, (group) =>
        group.toUpperCase().replace("-", "").replace("_", "")
      );
      accumulator[newKey] = toCamelCase(data[key]);
      return accumulator;
    }, {});
  }
  return data;
}
