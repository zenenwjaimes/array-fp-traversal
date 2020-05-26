import {ArrayStreamT} from './index.js';

describe('ArraySteamT backing array', () => {
  test('test array is the same reference', () => {
    const items = [1, 2, 3, 4];
    const arrayStream = ArrayStreamT.load(items, false);
    // this won't change the backing array of the stream
    items[0] = 13;

    expect(items).toEqual(arrayStream.array);
  });

  test('test array is not the same reference', () => {
    const items = [1, 2, 3, 4];
    const arrayStream = ArrayStreamT.load(items, true);
    // this will change the first key on both arrays, theyre the same ref
    items[0] = 13;

    expect(items).not.toEqual(arrayStream.array);
  });
});

describe('ArrayStreamT exception position testing', () => {
  test('throws exception for invalid  read len(-2)', () => {
    expect(() => {
      const items = [1, 2, 3, 4];
      const arrayStreamT = ArrayStreamT.load(items, true);

      arrayStreamT.read(-2);
    }).toThrow();
  });

  test('throws exception for pos. position invalid (4, 4 items array)', () => {
    expect(() => {
      const items = [1, 2, 3, 4];
      ArrayStreamT.load(items, true, 4);
    }).toThrow();
  });

  test('doesn\'t throw exception for valid position', () => {
    expect(() => {
      const items = [1, 2, 3, 4];
      ArrayStreamT.load(items, true, 2);
    }).not.toThrow();
  });

  test('throws exception for invalid neg. position (-5, 4 items array)', () => {
    expect(() => {
      const items = [1, 2, 3, 4];
      ArrayStreamT.load(items, true, -5);
    }).toThrow();
  });


  test('doesn\'t throw exception valid position (-4, 4 items array)', () => {
    expect(() => {
      const items = [1, 2, 3, 4];
      ArrayStreamT.load(items, true, -4);
    }).not.toThrow();
  });
});

describe('ArrayStreamT position modifications', () => {
  test('tell/current position being 2', () => {
    const items = [1, 2, 3, 4];
    const arrayStream = ArrayStreamT.load(items, true, 2);

    expect(arrayStream.tell()).toEqual(2);
  });

  test('seek to new position index 3 after init with position 0', () => {
    const items = [1, 2, 3, 4];
    const arrayStream = ArrayStreamT.load(items, true, 0);

    expect(arrayStream.tell()).toEqual(0);
    expect(arrayStream.seek(3).tell()).toEqual(3);
  });
});

describe('ArrayStreamT reading', () => {
  test('read 1 byte: seek to pos 5 (value 10)', () => {
    const items = [4, 4, 4, 4, 4, 10, 9, 2];
    const arrayStream = ArrayStreamT.load(items, true, 0);

    expect(arrayStream.seek(5).read(1)).toEqual([10]);
  });

  test('read 1: seek to pos 1, return [4] and check pos changed to 2', () => {
    const items = [4, 4];
    const arrayStream = ArrayStreamT.load(items, true, 0);

    expect(arrayStream.seek(1).read(1)).toEqual([4]);
    expect(arrayStream.tell()).toEqual(2);
  });

  const whenceTestName =
    'seek current position, read 1, seek 1,' +
    'return is [1], tell is 2, seek 1, pos should be 3';

  test(whenceTestName, () => {
    const items = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    const whence = ArrayStreamT.SeekPos.CURR;
    const arrayStream = ArrayStreamT.load(items, true, 0, whence);

    expect(arrayStream.seek(1).read(1)).toEqual([1]);
    expect(arrayStream.tell()).toEqual(2);
    expect(arrayStream.seek(1).tell()).toEqual(3);
  });

  test('ghub example code', () => {
    const exampleArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    try {
      const ast = ArrayStreamT.load(exampleArray);
      const res = ast.read(4); // res = [0, 1, 2, 3]
      expect(res).toEqual([0, 1, 2, 3]);
      ast.seek(1); // pointer should be at idx 1

      const res2 = ast.read(1); // [1] and move pointer to idx 2
      expect(res2).toEqual([1]);
      ast.seek(2, ArrayStreamT.SeekPos.CURR); // Seeks from current position
      expect(ast.tell()).toEqual(4);
      expect(ast.read()).toEqual(5);
    } catch (err) {
      // do things here
    }
  });
});
