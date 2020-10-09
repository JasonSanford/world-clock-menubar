type Value = object | string | null;

const get = (key: string, defaultValue = null) => {
  const value = localStorage.getItem(key);

  return value ? JSON.parse(value) : defaultValue;
};

const set = (key: string, value: Value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export { get, set }
