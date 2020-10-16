const BinarySearchTree = require('./binary-search-tree');
const Queue = require('./queue');

class DepthFirstSearch extends BinarySearchTree {
    inOrder(values=[]) {
        if (this.left) {
            values = this.left.inOrder(values);
        }
        values.push(this.value);
    
        if (this.right) {
            values = this.right.inOrder(values);
        }
        return values;
    }

    preOrder(values=[]) {
        values.push(this.value);
        if (this.left) {
            values = this.left.preOrder(values);
        }

        if (this.right) {
            values = this.right.preOrder(values);
        }
        return values;
    }

    postOrder(values=[]) {
        if (this.left) {
            values = this.left.postOrder(values);
        }

        if (this.right) {
            values = this.right.postOrder(values);
        }
        values.push(this.value);
        return values;
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
                this.left = new DepthFirstSearch(key, value, this);
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
                this.right = new DepthFirstSearch(key, value, this);
            }
            else {
                this.right.insert(key, value);
            }
        }
    }
}

function linearSearch(sought, arr) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === sought) {
            return `Found '${sought}' after ${i + 1} attempts`;
        }
    }
    return `'${sought}' not found after ${arr.length} attempts`;
}

function binarySearch(sought, arr) {
    const sorted = [...arr].sort();
    let i = 1;
    while (sorted.length > 1) {
        let index = Math.floor(sorted.length / 2);
        const found = sorted[index];
        if (found === sought) {
            return `Found '${sought}' after ${i + 1} attempts`;
        }
        if (found > sought) {
            sorted.splice(index, sorted.length - index)
        } else {
            sorted.splice(0, index)
        }
        i++;
    }
    return `'${sought}' not found after ${i} attempts`;
}

function nextCommandingOfficer(tree, values = []) {
    const queue = new Queue(); 
    const node = tree.root;
    queue.enqueue(node);
    while (queue.length) {
        const node = queue.dequeue(); //remove from the queue
        values.push(node.value); // add that value from the queue to an array

        if (node.left) {
            queue.enqueue(node.left); //add left child to the queue
        }

        if (node.right) {
            queue.enqueue(node.right); // add right child to the queue
        }
    }

    return values;
}

function maxProfit(array) {
    let bestProfit;

    for (let i = 0; i < array.length -1; i++) {
        if (!bestProfit) {
            bestProfit = -array[i] + array[i+1];
        } else {
            if (-array[i] + array[i+1] > bestProfit) {
                bestProfit = -array[i] + array[i+1];
            }
        }
    }

    return bestProfit;
}

const testArray = [89, 30, 25, 32, 72, 70, 51, 42, 25, 24, 53, 55, 78, 50, 13, 40, 48, 32, 26, 2, 14, 33, 45, 72, 56, 44, 21, 88, 27, 68, 15, 62, 93, 98, 73, 28, 16, 46, 87, 28, 65, 38, 67, 16, 85, 63, 23, 69, 64, 91, 9, 70, 81, 27, 97, 82, 6, 88, 3, 7, 46, 13, 11, 64, 76, 31, 26, 38, 28, 13, 17, 69, 90, 1, 6, 7, 64, 43, 9, 73, 80, 98, 46, 27, 22, 87, 49, 83, 6, 39, 42, 51, 54, 84, 34, 53, 78, 40, 14, 5,];

const treeArray = [25, 15, 50, 10, 24, 35, 70, 4, 12, 18, 31, 44, 66, 90, 22,];

function main() {
    const tree = new DepthFirstSearch();
    treeArray.forEach(item => tree.insert(item, item));
    console.log(tree.preOrder());
    console.log(tree.inOrder());
    console.log(tree.postOrder());
}

console.log(maxProfit([128, 97, 121, 123, 98, 97, 105]));