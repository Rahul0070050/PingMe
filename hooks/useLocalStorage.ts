"use client";

import { useState, useEffect, useCallback } from "react";

type StorageValue<T> = T | null;

function useLocalStorage<T>(
  key: string,
  initialValue: T | (() => T) | null = null
): [
  StorageValue<T>,
  (value: T | ((prev: StorageValue<T>) => T)) => void,
  () => void
] {
  const [storedValue, setStoredValue] = useState<StorageValue<T>>(() => {
    if (typeof window === "undefined") {
      if (initialValue === null) return null;
      return initialValue instanceof Function ? initialValue() : initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item
        ? JSON.parse(item)
        : initialValue instanceof Function
        ? initialValue()
        : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue instanceof Function ? initialValue() : initialValue;
    }
  });
  const setValue = useCallback(
    (value: T | ((prev: StorageValue<T>) => T)) => {
      try {
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;

        setStoredValue(valueToStore);

        if (typeof window !== "undefined") {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
          window.dispatchEvent(
            new StorageEvent("storage", {
              key,
              newValue: JSON.stringify(valueToStore),
            })
          );
        }
      } catch (error) {
        console.error(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key, storedValue]
  );
  const removeValue = useCallback(() => {
    try {
      setStoredValue(null);
      if (typeof window !== "undefined") {
        window.localStorage.removeItem(key);
        window.dispatchEvent(
          new StorageEvent("storage", {
            key,
            newValue: null,
          })
        );
      }
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  }, [key]);
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === key) {
        try {
          const newValue = event.newValue ? JSON.parse(event.newValue) : null;
          setStoredValue(newValue);
        } catch (error) {
          console.error(`Error parsing storage event for key "${key}":`, error);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [key]);

  return [storedValue, setValue, removeValue];
}

export default useLocalStorage;
