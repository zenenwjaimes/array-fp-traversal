/**
 * External ArrayStreamT object
 *
 * @module ArrayStreamT
 */

/**
 * Returns custom invalid length exception
 * @param {string} message - exception message
 * @return {Error}
 */
function InvalidLengthException(message) {
  const error = new Error(message);

  return error;
}

InvalidLengthException.prototype = Object.create(Error.prototype);

const isInvalidReadLength = (array, length) => {
  if (length < -1 || length > array.length) {
    return true;
  }

  return false;
};

const throwInvalidReadLength= (array, length) => {
  const errorMsg = 'Invalid read length: '+ length;

  throw new InvalidPositionException(errorMsg);
};

/**
 * Returns custom invalid position exception
 * @param {string} message - exception message
 * @return {Error}
 */
function InvalidPositionException(message) {
  const error = new Error(message);

  return error;
}

InvalidPositionException.prototype = Object.create(Error.prototype);

const isInvalidPosition = (array, position) => {
  if (
    ((position < 0) && ((array.length + position) < 0)) || // negative pos
    ((position >=0) && (((array.length - 1) - position) < 0)) // positive pos
  ) {
    return true;
  }

  return false;
};

const throwInvalidPosition = (array, position) => {
  const len = array.length;
  const errorMsg = 'Invalid position: '+ position + ' for len: ' + len;

  throw new InvalidPositionException(errorMsg);
};

/**
 * Seek whence constant
 * SET: Starts seek from beginning of array
 * CURR: Seek from current position
 * @enum {integer}
 *
 * @return {object}
 */
const SeekPos = {
  SET: 0,
  CURR: 1,
};
Object.freeze(SeekPos);

/**
 * ArrayStreamT Object
 *
 * @param {Array} data
 * @param {boolean} makeCopy: Copies the array (recommended), default true
 * @param {integer} position: Starting position, default 0
 * @param {integer} whence: Where to start seeking from, default SeekPos.SET
 *
 * @return {object} returns array, read/seek/tell methods
 */
const arrayStreamT = (
    data,
    makeCopy = true,
    position = 0,
    whence = SeekPos.SET,
) => {
  const array = makeCopy ? data.slice() : data;
  let current = 0;
  let seekPos = whence;

  if (isInvalidPosition(array, position)) {
    throwInvalidPosition(array, position);
  }

  current = position;

  return ({
    array,
    /**
     * Read x amount of bytes/items
     *
    * @param {integer} len: -1 reads til eof, has to be 0+
    * @return {array}
    */
    read(len = -1) {
      if (isInvalidReadLength(array, len)) {
        throwInvalidReadLength(array, len);
      }

      const currentPos = this.tell();

      if (len === -1) {
        current = array.length - 1;

        return array.slice(currentPos);
      }

      current += len;
      return array.slice(currentPos, len + currentPos);
    },
    /**
     * Sets the current position
     *
     * @param {integer} offset: position
     * @param {integer} whence: where to start seeking (start, current)
     * @return {this}
     */
    seek(offset, whence = seekPos) {
      if (isInvalidPosition(array, offset)) {
        throwInvalidPosition(array, offset);
      }

      seekPos = whence;

      if (seekPos == SeekPos.SET) {
        current = offset;
      } else if (seekPos == SeekPos.CURR) {
        current += offset;
      }

      return this;
    },
    /**
     * Returns current position of the pointer
     *
     * @return {integer}
     */
    tell() {
      return current;
    },
  });
};

exports.ArrayStreamT = {
  load: arrayStreamT,
  SeekPos: SeekPos,
  InvalidPositionException: InvalidPositionException,
  InvalidLengthException: InvalidLengthException,
};
