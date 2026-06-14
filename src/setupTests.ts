import '@testing-library/jest-dom/vitest';
// jsdom には IndexedDB が無いので、テストでは fake-indexeddb で代替する。
import 'fake-indexeddb/auto';
