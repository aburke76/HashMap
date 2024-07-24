function hash(key, tableSize) {
    let hashCode = 0;
    const primeNumber = 31;

    for (let i = 0; i < key.length; i++) {
        hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % tableSize;
    }

    return hashCode;
}

class HashMap {
    table = new Array(16);
    numItems = 0;

    resize() {
        const newTable = new Array(this.table.length * 2);
        this.table.forEach((el) => {
            if (el) {
                el.forEach(([key, value]) => {
                    const index = hash(key, newTable.length);
                    if (newTable[index]) {
                        newTable[index].push([key, value]);
                    } else {
                        newTable[index] = [[key, value]];
                    }
                });
            }
        });
        this.table = newTable;
    }

    set(key, value) {
        this.numItems++;
        const loadFactor = this.numItems / this.table.length;
        if (loadFactor > 0.75) {
            this.resize();
        }
        const index = hash(key, this.table.length);
        // if (this.table[index]) {
        //     this.table[index].push([key, value]);
        // } else {
        this.table[index] = [[key, value]];
        // }
    }

    get(key) {
        const index = hash(key, this.table.length);

        if (!this.table[index]) {
            return null;
        }
        return this.table[index].find((el) => el[0] === key)[1];
    }
    has(key) {
        const index = hash(key, this.table.length);
        if (this.table[index]) {
            return true;
        }
        return false;
    }
    remove(key) {
        const index = hash(key, this.table.length);
        if (!this.table[index]) {
            return false;
        }
        this.table.splice(index, 1);

        return true;
    }
    length() {
        return this.numItems;
    }
    clear() {
        this.table.forEach(() => {});
    }
    keys() {
        const keysArray = [];
        this.table.forEach((el) => {
            keysArray.push(el[0][0]);
        });
        return keysArray;
    }
    values() {
        const valuesArray = [];
        this.table.forEach((el) => {
            valuesArray.push(el[0][1]);
        });
        return valuesArray;
    }

    entries() {
        const entriesArray = [];
        this.table.forEach((el) => {
            const pair = [el[0][0], el[0][1]];
            entriesArray.push(pair);
        });
        return entriesArray;
    }
}

const test = new HashMap();

console.log(hash("apple", 16));

test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");
//overwrite
test.set("apple", "green");
//add to exceed loadfactor
test.set("moon", "silver");
console.log(test.table);
console.log(test.get("moon"));
console.log(test.values());
console.log(test.keys());
