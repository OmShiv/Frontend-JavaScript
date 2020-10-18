/**
 * Given an array of integers and 0s, shift the 0s to the start of the array
 * Preserve the original order of elements
 */

/**
 * O(n) time
 * Explanation: 
 *  - Go through the array from end to start, using two pointers. One for reading, and one for writing
 *  - When you are reading a value which is not 0, write it again (it’s fine to overwrite). When you write, only then update the write pointer (i.e., decrement it)
 *  - In this way, for an array with 0s in between, the read pointer will read all but the write pointer will be ahead (farther in an array) since you are not writing all
 *  - The final value of write pointer, is the amount of 0s to be filled. 
 * 
 * Example: [1,2,0,0,3,4]
 * First While loop pass will convert this to: [1,2,1,2,3,4]
 *                                              r   w       <-- positions of read and write pointers
 * Second While loop pass will convert this to: [0,0,1,2,3,4]
 */

function shiftZeroesToLeft(arr) {
  let w = arr.length - 1; // use a pointer `w` to write/overwrite a value
  let r = arr.length - 1; // use a pointer `r` to read a value.

  while (r >= 0) {
    if (arr[r] !== 0) {
      arr[w] = arr[r];
      w--;
    }
    r--;
  }

  while (w >= 0) {
    arr[w] = 0;
    w--;
  }
}
