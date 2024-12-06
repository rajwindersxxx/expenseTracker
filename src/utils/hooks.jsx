import { useState, useEffect } from 'react';
export function useLocalStorage(initialState, key) {
  const [value, setValue] = useState(() => {
    const storedRecord = localStorage.getItem(key);
    return storedRecord ? JSON.parse(storedRecord) : initialState;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
}

