/**
 * Basic recursion. If you write this, be prepared for follow up questions like the function could be broken by passing in a bad default array
 * Example: flattenArray(arr, ['a', 1, 'bad', 'default']);
 */

function flattenArray(arr, result = []) {
  for (elem of arr) {
    if (Array.isArray(elem)) {
      flattenArray(elem, result);
    } else {
      result.push(elem);
    }
  }

  return result;
}


/**
 * Recursion within a wrapper. 
 */
function flattenArray(arr) {
  // Also consider edge case of input being falsey (null/undefined). 
  // Don’t need to consider for empty array since it’s taken care by solution. 
  if (!Array.isArray(arr)) {
    return [];
  }

  const _flatten = (arr, result = []) => {
    for (elem of arr) {
      if (Array.isArray(elem)) {
        _flatten(elem, result);
      } else {
        result.push(elem);
      }
    }
    return result;
  }

  return _flatten(arr);
}

/**
 * Flatten upto a given depth
 */
function flattenArray(arr, depth = 10) {
  let localDepth = 0;
  
  if (!Array.isArray(arr)) {
    return [];
  }

  const _flatten = (arr, result = []) => {
    localDepth++;
    for (elem of arr) {
      if (Array.isArray(elem) && localDepth <= depth) {
        _flatten(elem, result);
      } else {
        result.push(elem);
      }
    }
    return result;
  }

  return _flatten(arr);
}
