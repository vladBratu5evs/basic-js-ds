const { NotImplementedError } = require('../lib');
const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/

class BinarySearchTree {
  constructor(){
    this._root = null;
  }

  root() {
    return this._root;
  }

  add(data) {
    this._root = addNode(this._root);

    function addNode(node) {
      if (!node){
        return new Node(data);
      }
      if (node.data === data) {
        return node;
      }
      if (data < node.data) {
        node.left = addNode(node.left);
      } else {
        node.right = addNode(node.right);
      }
      return node;
    }
  }

  has(data) {
    return searchNode(this._root);

    function searchNode(node) {
      if (!node) {
        return false;
      }
      if (node.data === data) {
        return true;
      }
      return data < node.data ? searchNode(node.left) : searchNode(node.right);
    }
  }

  find(data) {
    return findNode(this._root);

    function findNode(node) {
      if (!node) {
        return null;
      }
      if (node.data === data) {
        return node;
      }
      return data < node.data ? findNode(node.left) : findNode(node.right);
    }
  }

  remove(data) {
    this._root = removeNode(this._root);

    function removeNode(node) {
      if (!node) {
        return null;
      }

      if (data < node.data) {
        node.left = removeNode(node.left);
        return node;
      } else if (data > node.data) {
        node.right = removeNode(node.right);
        return node;
      } else {
        if (!node.left && !node.right) {
          return null;
        }

        if (!node.right) {
          return node.left;
        }

        if (!node.left) {
          return node.right;
        }

        let minFromRight = node.right;
        while (minFromRight.left) {
          minFromRight = minFromRight.left;
        }
        node.data = minFromRight.data;
        node.right = removeNodeFromSubtree(node.right, minFromRight.data);

        return node;
      }
    }

    function removeNodeFromSubtree(node, value) {
      if (!node) return null;
      if (value < node.data) {
        node.left = removeNodeFromSubtree(node.left, value);
        return node;
      } else if (value > node.data) {
        node.right = removeNodeFromSubtree(node.right, value);
        return node;
      } else {
        return node.right;
      }
    }
  }

  min() {
    if (!this._root) {
      return null;
    }

    let node = this._root;
    while (node.left) {
      node = node.left;
    }
    return node.data;
  }

  max() {
    if (!this._root) {
      return null;
    }

    let node = this._root;
    while (node.right) {
      node = node.right;
    }
    return node.data;
  }
}

module.exports = {
  BinarySearchTree
};
