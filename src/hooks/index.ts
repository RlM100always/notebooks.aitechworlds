import { useState, useEffect, useCallback } from 'react';
import { Resource } from '../types';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = useCallback((value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  }, [key, storedValue]);

  return [storedValue, setValue] as const;
}

export function useSavedResources() {
  const [saved, setSaved] = useLocalStorage<string[]>('atw_saved', []);

  const toggleSave = useCallback((id: string) => {
    setSaved(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);
  }, [setSaved]);

  const isSaved = useCallback((id: string) => saved.includes(id), [saved]);

  return { saved, toggleSave, isSaved };
}

export function useRecentlyViewed() {
  const [recent, setRecent] = useLocalStorage<string[]>('atw_recent', []);

  const addViewed = useCallback((id: string) => {
    setRecent(prev => [id, ...prev.filter(r => r !== id)].slice(0, 20));
  }, [setRecent]);

  return { recent, addViewed };
}

export function useSearch(resources: Resource[]) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Resource[]>([]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const q = query.toLowerCase();
    const filtered = resources.filter(r =>
      r.title.toLowerCase().includes(q) ||
      r.description.toLowerCase().includes(q) ||
      r.tags.some(t => t.toLowerCase().includes(q)) ||
      r.subcategory.toLowerCase().includes(q) ||
      r.category.toLowerCase().includes(q)
    );
    setResults(filtered.slice(0, 10));
  }, [query, resources]);

  return { query, setQuery, results };
}

export function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const pct = (scrollTop / (scrollHeight - clientHeight)) * 100;
      setProgress(Math.min(100, Math.max(0, pct)));
    };
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  return progress;
}
