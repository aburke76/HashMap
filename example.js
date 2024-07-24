function hashStringToInt(s, tableSize) {
    let hash = 17;
    for (let i = 0; i < s.length; i++) {
        hash = (13 * hash * s.charCodeAt(i)) % tableSize;
    }
    return hash;
}

class HashTable {
    table = new Array(3);
    numItems = 0;
    loadFactor = 0.75;

    setItem = (key, value) => {
        this.numItems++;
        const index = hashStringToInt(key, this.table.length);
        if (this.table[index]) {
            this.table[index].push([key, value]);
        } else {
            this.table[index] = [[key, value]];
        }
        console.log(this.table);
    };
    getItem = (key) => {
        const index = hashStringToInt(key, this.table.length);
        if (!this.table[index]) {
            return null;
        }
        return this.table[index].find((x) => x[0] === key)[1];
    };
}

const myTable = new HashTable();
myTable.setItem("firstName", "alex");
myTable.setItem("lastName", "burke");
myTable.getItem("firstName");
myTable.getItem("lastName");
console.log(myTable.getItem("firstName"));
console.log(myTable.getItem("lastName"));
console.log(myTable.table);
