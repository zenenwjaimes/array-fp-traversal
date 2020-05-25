import {arrayStreamT, InvalidPositionException} from './index.js';

describe('ArraySteamT backing array', () => {
  test('test array is the same reference', () => {
    const items = [1, 2, 3, 4];
    const arrayStream = arrayStreamT(items, false);
    // this won't change the backing array of the stream
    items[0] = 13;

    expect(items).toEqual(arrayStream.array);
  });

  test('test array is not the same reference', () => {
    const items = [1, 2, 3, 4];
    const arrayStream = arrayStreamT(items, true);
    // this will change the first key on both arrays, theyre the same ref
    items[0] = 13;

    expect(items).not.toEqual(arrayStream.array);
  });
});

describe('ArrayStreamT exception position testing', () => {
  test('throws exception for pos. position invalid (4, 4 items array)', () => {
    expect(() => {
      const items = [1, 2, 3, 4];
      const arrayStream = arrayStreamT(items, true, 4);
    }).toThrow();
  });

  test('doesn\'t throw exception for valid position', () => {
    expect(() => {
      const items = [1, 2, 3, 4];
      const arrayStream = arrayStreamT(items, true, 2);
    }).not.toThrow();
  });

  test('throws exception for invalid neg. position (-5, 4 items array)', () => {
    expect(() => {
      const items = [1, 2, 3, 4];
      const arrayStream = arrayStreamT(items, true, -5);
    }).toThrow();
  });


  test('doesn\'t throw exception valid position (-4, 4 items array)', () => {
    expect(() => {
      const items = [1, 2, 3, 4];
      const arrayStream = arrayStreamT(items, true, -4);
    }).not.toThrow();
  });
});

describe('ArrayStreamT position modifications', () => {
  test('tell/current position being 2', () => {
    const items = [1, 2, 3, 4];
    const arrayStream = arrayStreamT(items, true, 2);

    expect(arrayStream.tell()).toEqual(2);
  });

  test('seek to new position index 3 after init with position 0', () => {
    const items = [1, 2, 3, 4];
    const arrayStream = arrayStreamT(items, true, 0);

    expect(arrayStream.tell()).toEqual(0);
    expect(arrayStream.seek(3).tell()).toEqual(3);
  });
});

describe('ArrayStreamT reading', () => {
  test('read 1 byte: seek to pos 5 (value 10)', () => {
    const items = [4, 4, 4, 4, 4, 10, 9, 2];
    const arrayStream = arrayStreamT(items, true, 0);

    expect(arrayStream.seek(5).read(1)).toEqual([10]);
  });

  test('read 1: seek to pos 1, return [4] and check pos changed to 2', () => {
    const items = [4, 4];
    const arrayStream = arrayStreamT(items, true, 0);

    expect(arrayStream.seek(1).read(1)).toEqual([4]);
    expect(arrayStream.tell()).toEqual(2);
  });
});
