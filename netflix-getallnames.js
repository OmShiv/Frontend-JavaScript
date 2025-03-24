/**
 * Write a getAllNames
 * Example data and usage
 */
const data = {
  names: ["Alice"],
  children: [
    {
      names: ["Bob"],
      children: [
        { names: ["Charlie"] },
        { names: ["David", "Eve"] }
      ]
    },
    {
      names: ["Frank"]
    }
  ]
};

console.log(getAllNames(data)); 
// Output: ["Alice", "Bob", "Charlie", "David", "Eve", "Frank"]

function getAllNames(obj) {
  let result = [];

  if (obj.names) {
    result.push(...obj.names);
  }

  if (obj.children && Array.isArray(obj.children)) {
    for (let child of obj.children) {
      result.push(...getAllNames(child));
    }
  }

  return result;
}
