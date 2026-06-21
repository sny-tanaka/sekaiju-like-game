import { getSiblingCharIds } from './memberNavigation';

describe('getSiblingCharIds', () => {
  test('団員が 1 人のみの場合は prev/next ともに null で hasSiblings が false', () => {
    const result = getSiblingCharIds(['a'], 'a');
    expect(result).toEqual({ prev: null, next: null, hasSiblings: false });
  });

  test('団員が 0 人の場合も prev/next ともに null で hasSiblings が false', () => {
    const result = getSiblingCharIds([], 'a');
    expect(result).toEqual({ prev: null, next: null, hasSiblings: false });
  });

  test('見つからない charId は prev/next ともに null で hasSiblings が false', () => {
    const result = getSiblingCharIds(['a', 'b', 'c'], 'x');
    expect(result).toEqual({ prev: null, next: null, hasSiblings: false });
  });

  test('2 人の先頭: prev は末尾に循環し、next は 2 番目', () => {
    const result = getSiblingCharIds(['a', 'b'], 'a');
    expect(result).toEqual({ prev: 'b', next: 'b', hasSiblings: true });
  });

  test('2 人の末尾: prev は先頭に循環し、next は先頭に循環', () => {
    const result = getSiblingCharIds(['a', 'b'], 'b');
    expect(result).toEqual({ prev: 'a', next: 'a', hasSiblings: true });
  });

  test('3 人の先頭: prev は末尾に循環', () => {
    const result = getSiblingCharIds(['a', 'b', 'c'], 'a');
    expect(result).toEqual({ prev: 'c', next: 'b', hasSiblings: true });
  });

  test('3 人の中央: 両側が正しく返る', () => {
    const result = getSiblingCharIds(['a', 'b', 'c'], 'b');
    expect(result).toEqual({ prev: 'a', next: 'c', hasSiblings: true });
  });

  test('3 人の末尾: next は先頭に循環', () => {
    const result = getSiblingCharIds(['a', 'b', 'c'], 'c');
    expect(result).toEqual({ prev: 'b', next: 'a', hasSiblings: true });
  });

  test('4 人以上でも循環が正しく機能する', () => {
    const ids = ['p1', 'p2', 'p3', 'p4'];
    const first = getSiblingCharIds(ids, 'p1');
    expect(first).toEqual({ prev: 'p4', next: 'p2', hasSiblings: true });

    const last = getSiblingCharIds(ids, 'p4');
    expect(last).toEqual({ prev: 'p3', next: 'p1', hasSiblings: true });
  });
});
