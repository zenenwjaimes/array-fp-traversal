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
}

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
}

const arrayStreamT = (data, makeCopy=false, position = 0) => {
  const array = makeCopy ? data.slice():data;
  let current = 0;
  
  if (isInvalidPosition(array, position)) {
    throwInvalidPosition(array, position);
  }

  current = position;

  return ({
    array,
    read(len=-1) {
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
    seek(seekPosition) {
      if (isInvalidPosition(array, seekPosition)) {
        throwInvalidPosition(array, seekPosition);
      }

      current = seekPosition;
      return this;
    },
    tell(){ return current; },
  });
};

exports.arrayStreamT = arrayStreamT;
exports.InvalidPositionException = InvalidPositionException;
