export const getLocalStorageItem = (key: string) => {
  return localStorage.getItem(key);
};

export const setLocalStorageItem = (key: string, data: any) => {
  localStorage.setItem(key, data);
};

export const clearaLocalStorageItem = () => {
  localStorage.clear;
};
