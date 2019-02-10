const getFromLs = key => {
  return JSON.parse(localStorage.getItem(key));
};

const setToLs = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export { getFromLs, setToLs };
