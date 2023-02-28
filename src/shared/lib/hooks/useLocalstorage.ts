import { useState, useEffect } from 'react';

function getStorageValue(key: any, defaultValue: any) {
  // getting stored value
  const saved = localStorage.getItem(key);
  const initial = saved ? JSON.parse(saved) : '';
  return initial || defaultValue;
}

export const useLocalStorage = (key: any, defaultValue: any) => {
  const [value, setValue] = useState(() => getStorageValue(key, defaultValue));

  useEffect(() => {
    // storing input name
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};
