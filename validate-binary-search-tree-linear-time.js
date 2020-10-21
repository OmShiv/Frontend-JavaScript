/**
 * https://leetcode.com/problems/validate-binary-search-tree/
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

var isValidBST = function(root) {
  const _localIsValidBST = function(node, min, max) {
    if (node === null) { // previous recursion call was a leaf node.
      return true;
    }
    
    if (node.val <= min || node.val >= max) {
      return false;
    }
    
    return _localIsValidBST(node.left, min, node.val) && _localIsValidBST(node.right, node.val, max);
  }
  
  return _localIsValidBST(root, -Infinity, Infinity);
};
