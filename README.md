# array-stream-traversal
Adds the ability to traverse an array with file stream like abilities such as seek, read, tell.
## Example Usage

```
import {ArrayStreamT} from 'array-stream-traversal';

const exampleArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

try {
  const ast = ArrayStreamT.load(exampleArray);
  const res = ast.read(4); // res = [0, 1, 2, 3]
  
  ast.seek(1); // pointer should be at idx 1
  
  const res2 = ast.read(1); // [1] and move pointer to idx 2
  
  ast.seek(2, ArrayStreamT.SeekPos.CURR); // Seeks from current position, so it adds on instead of resettting to beginning
  
  console.log(ast.tell()); // 4
  console.log(ast.read()); // 5
}
catch(err) {
  // do error things here
} 
```

<a name="module_ArrayStreamT"></a>

## ArrayStreamT
External ArrayStreamT object


* [ArrayStreamT](#module_ArrayStreamT)
    * [~SeekPos](#module_ArrayStreamT..SeekPos) ⇒ <code>object</code>
    * [~InvalidLengthException(message)](#module_ArrayStreamT..InvalidLengthException) ⇒ <code>Error</code>
    * [~InvalidPositionException(message)](#module_ArrayStreamT..InvalidPositionException) ⇒ <code>Error</code>
    * [~load(data, makeCopy:, position:, whence:)](#module_ArrayStreamT..arrayStreamT) ⇒ <code>object</code>
        * [~read(len:)](#module_ArrayStreamT..read) ⇒ <code>array</code>
        * [~seek(offset:, whence:)](#module_ArrayStreamT..seek) ⇒ <code>this</code>
        * [~tell()](#module_ArrayStreamT..tell) ⇒ <code>integer</code>

<a name="module_ArrayStreamT..SeekPos"></a>

### ArrayStreamT~SeekPos ⇒ <code>object</code>
Seek whence constant
SET: Starts seek from beginning of array
CURR: Seek from current position

**Kind**: inner enum of [<code>ArrayStreamT</code>](#module_ArrayStreamT)  
**Properties**

| Name | Type | Default |
| --- | --- | --- |
| SET | <code>integer</code> | <code>0</code> | 
| CURR | <code>integer</code> | <code>1</code> | 

<a name="module_ArrayStreamT..InvalidLengthException"></a>

### ArrayStreamT~InvalidLengthException(message) ⇒ <code>Error</code>
Returns custom invalid length exception

**Kind**: inner method of [<code>ArrayStreamT</code>](#module_ArrayStreamT)  

| Param | Type | Description |
| --- | --- | --- |
| message | <code>string</code> | exception message |

<a name="module_ArrayStreamT..InvalidPositionException"></a>

### ArrayStreamT~InvalidPositionException(message) ⇒ <code>Error</code>
Returns custom invalid position exception

**Kind**: inner method of [<code>ArrayStreamT</code>](#module_ArrayStreamT)  

| Param | Type | Description |
| --- | --- | --- |
| message | <code>string</code> | exception message |

<a name="module_ArrayStreamT..arrayStreamT"></a>

### ArrayStreamT~load(data, makeCopy:, position:, whence:) ⇒ <code>object</code>
ArrayStreamT Object

**Kind**: inner method of [<code>ArrayStreamT</code>](#module_ArrayStreamT)  
**Returns**: <code>object</code> - returns array, read/seek/tell methods  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Array</code> |  |
| makeCopy: | <code>boolean</code> | Copies the array (recommended), default true |
| position: | <code>integer</code> | Starting position, default 0 |
| whence: | <code>integer</code> | Where to start seeking from, default SeekPos.SET |

<a name="module_ArrayStreamT..read"></a>

### ArrayStreamT~read(len:) ⇒ <code>array</code>
Read x amount of bytes/items

**Kind**: inner method of [<code>ArrayStreamT</code>](#module_ArrayStreamT)  

| Param | Type | Description |
| --- | --- | --- |
| len: | <code>integer</code> | -1 reads til eof, has to be 0+ |

<a name="module_ArrayStreamT..seek"></a>

### ArrayStreamT~seek(offset:, whence:) ⇒ <code>this</code>
Sets the current position

**Kind**: inner method of [<code>ArrayStreamT</code>](#module_ArrayStreamT)  

| Param | Type | Description |
| --- | --- | --- |
| offset: | <code>integer</code> | position |
| whence: | <code>integer</code> | where to start seeking (start, current) |

<a name="module_ArrayStreamT..tell"></a>

### ArrayStreamT~tell() ⇒ <code>integer</code>
Returns current position of the pointer

**Kind**: inner method of [<code>ArrayStreamT</code>](#module_ArrayStreamT)  
