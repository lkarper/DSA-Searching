class BinarySearchTree {
    constructor(key = null, value = null, parent = null) {
        this.key = key; // If null, tree is empty
        this.value = value;
        this.parent = parent; // If null, tree is root
        this.left = null;
        this.right = null;
    }

    insert(key, value) {
        // If the tree is empty then this key being inserted is the root node of the tree
        if (this.key == null) {
            this.key = key;
            this.value = value;
        }

        /* If the tree already exists, then start at the root, 
           and compare it to the key you want to insert.
           If the new key is less than the node's key 
           then the new node needs to live in the left-hand branch */
        else if (key < this.key) {
            /* If the existing node does not have a left child, 
               meaning that if the `left` pointer is empty, 
               then we can just instantiate and insert the new node 
               as the left child of that node, passing `this` as the parent */
            if (this.left == null) {
                this.left = new BinarySearchTree(key, value, this);
            }
            /* If the node has an existing left child, 
               then we recursively call the `insert` method 
               so the node is added further down the tree */
            else {
                this.left.insert(key, value);
            }
        }
        /* Similarly, if the new key is greater than the node's key 
           then you do the same thing, but on the right-hand side */
        else {
            if (this.right == null) {
                this.right = new BinarySearchTree(key, value, this);
            }
            else {
                this.right.insert(key, value);
            }
        }
    }

    find(key) {
        // If the item is found at the root then return that value
        if (this.key == key) {
            return this.value;
        }
        /* If the item you are looking for is less than the root 
           then follow the left child.
           If there is an existing left child, 
           then recursively check its left and/or right child
           until you find the item */
        else if (key < this.key && this.left) {
            return this.left.find(key);
        }
        /* If the item you are looking for is greater than the root 
           then follow the right child.
           If there is an existing right child, 
           then recursively check its left and/or right child
           until you find the item */
        else if (key > this.key && this.right) {
            return this.right.find(key);
        }
        // You have searched the tree and the item is not in the tree
        else {
            throw new Error('Key Error');
        }
    }

    _replaceWith(node) {
        if (this.parent) {
            if (this == this.parent.left) {
                this.parent.left = node;
            }
            else if (this == this.parent.right) {
                this.parent.right = node;
            }

            if (node) {
                node.parent = this.parent;
            }
        }
        else {
            if (node) {
                this.key = node.key;
                this.value = node.value;
                this.left = node.left;
                this.right = node.right;
            }
            else {
                this.key = null;
                this.value = null;
                this.left = null;
                this.right = null;
            }
        }
    }

    _findMin() {
        if (!this.left) {
            return this;
        }
        return this.left._findMin();
    }

    remove(key) {
        if (this.key == key) {
            if (this.left && this.right) {
                const successor = this.right._findMin();
                this.key = successor.key;
                this.value = successor.value;
                successor.remove(successor.key);
            }
            /* If the node only has a left child, 
               then you replace the node with its left child */
            else if (this.left) {
                this._replaceWith(this.left);
            }
            /* And similarly if the node only has a right child 
               then you replace it with its right child */
            else if (this.right) {
                this._replaceWith(this.right);
            }
            /* If the node has no children then
               simply remove it and any references to it 
               by calling "this._replaceWith(null)" */
            else {
                this._replaceWith(null);
            }
        }
        else if (key < this.key && this.left) {
            this.left.remove(key);
        }
        else if (key > this.key && this.right) {
            this.right.remove(key);
        }
        else {
            throw new Error('Key Error');
        }
    }
}


function tree(t){
    if(!t){
        return 0;
    }
    return tree(t.left) + t.value + tree(t.right)
}

function height(tree) {
    
    if (!tree.key) {
        return 0;
    } else if (!tree.left && !tree.right) {
        return 1;
    } else {
        let maxH = 1;
        function searchTree(t, h) {
            if (!t.left && !t.right) {
                if (h > maxH) {
                   maxH = h;
                }
            } else if (t.left && t.right) {
                searchTree(t.left, h + 1);
                searchTree(t.right, h + 1);
            } else if (t.left) {
                searchTree(t.left, h + 1);
            } else {
                searchTree(t.right, h + 1);
            }
        }
        searchTree(tree, 1);
        return maxH;
    }
}

function isBST(tree) {
    let bst = true;

    function check(t) {
        if (!t.left && !t.right) {
            return;
        } else if (t.left && t.right) {
            if (t.left.value > t.value) {
                bst = false;
            } else if (t.right.value < t.value) {
                bst = false;
            } else {
                isBST(t.left);
                isBST(t.right);
            }
        } else if (t.left) {
            if (t.left > t.value) {
                bst = false;
            } else {
                isBST(t.left);
            }
        } else {
            if (t.right < t.value) {
                bst = false;
            } else {
                isBST(t.right);
            }
        }
    }
    check(tree);
    return bst;
}

function findRight(t) {
    if (t.right) {
        return findRight(t.right);
    } else {
        return t;
    }
}

function thirdLargestNode(t) {
    if (!t.left && !t.right) {
        return 'Less than three nodes';
    }
    const rightMost = findRight(t)
    if (rightMost.left) {
        if (rightMost.left.right) {
            return rightMost.left;
        } else if (rightMost.left.left) {
            if (rightMost.left.right) {
                return rightMost.left.right;
            } else {
                return rightMost.left.left;
            }
        } else {
            return rightMost.parent;
        }
    } else if (rightMost.parent.parent) {
        return rightMost.parent.parent;
    } else {
        return rightMost.parent.left;
    }
}

function isBalanced(tree) {
    let maxH;
    let balanced = true;

    if (!tree.left && !tree.right) {
        return balanced;
    }

    function searchTree(t, h) {
        if (balanced === false) {
            // break early if there is already an unbalanced subtree
            return;
        }
        if (!t.left && !t.right) {
            if (!maxH) {
                maxH = h;
            } 
            if (h > maxH + 1) {
               balanced = false;
            } else if (h < maxH - 1) {
                balanced = false;
            }
        } else if (t.left && t.right) {
            searchTree(t.left, h + 1);
            searchTree(t.right, h + 1);
        } else if (t.left) {
            searchTree(t.left, h + 1);
        } else {
            searchTree(t.right, h + 1);
        }
    }

    searchTree(tree, 0);
    return balanced;
}

function sameBST(arr1, arr2) {
    if (arr1.length !== arr2.length) {
        return false;
    }

    if (arr1[0] !== arr2[0]) {
        return false;
    }

    let i = 0;
    let same = true;
    const root = arr1[0];

    while (i < arr1.length && same) {
        if (i === 0) {
            const arr1Node = arr1[i];
            const arr2Node = arr2[i];
            const firstSmallerArr1 = arr1.find(n => n < arr1Node) || arr1Node;
            const firstLargerArr1 = arr1.find(n => n > arr1Node) || arr1Node;
            const firstSmallerArr2 = arr2.find(n => n < arr2Node) || arr2Node;
            const firstLargerArr2 = arr2.find(n => n > arr2Node) || arr2Node;
            if (firstSmallerArr1 !== firstSmallerArr2 || firstLargerArr1 !== firstLargerArr2) {
                same = false;
            } else {
                i++;
            }
        } else {
            if (arr1[i] > root) {
                const arr1Node = arr1[i];
                const arr2Node = arr1Node;
                const searchArray1 = [...arr1].filter(n => n > root);
                const searchArray2 = [...arr2].filter(n => n > root);
                const firstSmallerArr1 = searchArray1.find(n => n < arr1Node && n > root);
                const firstLargerArr1 = searchArray1.find(n => n > arr1Node);
                const firstSmallerArr2 = searchArray2.find(n => n < arr2Node && n > root);
                const firstLargerArr2 = searchArray2.find(n => n > arr2Node);
                if (firstSmallerArr1 !== firstSmallerArr2 || firstLargerArr1 !== firstLargerArr2) {
                    same = false;
                } else {
                    i++;
                }
            } else {
                const arr1Node = arr1[i];
                const arr2Node = arr1Node;
                const searchArray1 = [...arr1].filter(n => n < root);
                const searchArray2 = [...arr2].filter(n => n < root);
                const firstSmallerArr1 = searchArray1.find(n => n < arr1Node);
                const firstLargerArr1 = searchArray1.find(n => n > arr1Node && n < root);
                const firstSmallerArr2 = searchArray2.find(n => n < arr2Node);
                const firstLargerArr2 = searchArray2.find(n => n > arr2Node && n < root);
                if (firstSmallerArr1 !== firstSmallerArr2 || firstLargerArr1 !== firstLargerArr2) {
                    same = false;
                } else {
                    i++;
                }
            }
        }

    }
    return same;
}

module.exports = BinarySearchTree;
