// Creates a node containing the data and a reference to the next item
class _Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class Queue {
    constructor() {
        this.first = null;
        this.last = null;
    }

    enqueue(data) {
        const node = new _Node(data);

        if (this.first === null) {
            this.first = node;
        }

        if (this.last) {
            this.last.next = node;
        }

        //make the new node the last item on the queue
        this.last = node;
    }

    dequeue() {
        //if the queue is empty, there is nothing to return
       if (this.first === null) {
           return;
       }
       const node = this.first;
       this.first = this.first.next;
        //if this is the last item in the queue
       if (node === this.last) {
           this.last = null;
       }
       return node.value;
    }
}

class SquareDance {
    constructor() {
        this.maleQueue = new Queue();
        this.femaleQueue = new Queue();
    }

    addDancer(dancer) {
        if (dancer[0] === 'F') {
            if (isEmpty(this.maleQueue)) {
                this.femaleQueue.enqueue(dancer)
            } else {
                const male = this.maleQueue.dequeue();
                console.log(`Female dance is ${dancer.slice(2)}; male dancer is ${male.slice(2)}`);
            }
        } else {
            if (isEmpty(this.femaleQueue)) {
                this.maleQueue.enqueue(dancer);
            } else {
                const female = this.femaleQueue.dequeue();
                console.log(`Female dance is ${female.slice(2)}; male dancer is ${dancer.slice(2)}`); 
            }
        }
    }
}

class OphidianBank {
    constructor() {
        this.queue = new Queue();
    }

    addCustomer(customer) {
        this.queue.enqueue(customer);
    }

    checkCustomer() {
        const customer = this.queue.dequeue();
        if (!customer) {
            return;
        }
        const rand = Math.random();
        console.log(rand)
        if (rand <= 0.25) {
            this.queue.enqueue(customer);
        }
    }
}

function peek(queue) {
    console.log(queue.first);
}

function isEmpty(queue) {
    if (queue.first === null) {
        return true;
    }
    return false;
}

function display(queue) {
    if (isEmpty(queue)) {
        console.log('Queue is empty');
        return;
    } else {
        let q = '';
        let curr = queue.first;
        
        while (curr !== null) {
            q = q + ' ' + curr.value;
            curr = curr.next;
        }
        console.log(q);
    }
}

module.exports = Queue;