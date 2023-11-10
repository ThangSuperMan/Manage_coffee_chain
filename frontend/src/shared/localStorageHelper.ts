export const getLocalStorageItem = (key: string) => {
  const data = localStorage.getItem(key) || null;
  return data;
};

export const setLocalStorageItem = (key: string, data: any) => {
  localStorage.setItem(key, data);
};

export const clearaLocalStorageItem = () => {
  localStorage.clear
};
