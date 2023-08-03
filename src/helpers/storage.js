export const getFromLocalStorage = (key) => {
  return window.localStorage.getItem(key);
};

export const setToLocalStorage = (key, value) => {
  window.localStorage.setItem(key, value);
};

export const overwriteToLocalStorage = (key, value) => {
  localStorage.setItem(key, value);
};
