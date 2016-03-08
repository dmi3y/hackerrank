function processData(input) {
    //Enter your code here
    return input.split("\n").map(function(el) {
        var res = el.split(" ").map(Number);
        return res.length > 1? res: res[0];
    });
} 

// process.stdin.resume();
// process.stdin.setEncoding("ascii");
// _input = "";
// process.stdin.on("data", function (input) {
//     _input += input;
// });

function makeMatrix(size, vertices) {
    var fill = [];
    var matrix = [];
    fill.length = size;
    fill = fill.join().split(",").map(Number);
    for(;size--;) {
        matrix.push(fill.slice());
    }
    var vsize = vertices.length;
    
    for(;vsize--;) {
        var el = vertices[vsize];
        var x = el[0] - 1;
        var y = el[1] - 1;
        
        matrix[x][y] = 1;
        matrix[y][x] = 1;
    }
    
    return matrix;
}


function GreedyQueue() {
    this.queue = [];
    this.length = 0;
    this.visitedMap = {};
}

GreedyQueue.prototype = {
    set: function(el) {
        if ( this.visitedMap.hasOwnProperty(el.key) ) {
            return false;
        } else {
            this.length = this.queue.push(el);
            this.visitedMap[el.key] = true;
            return true;
        }
    },
    get: function() {
        var qlen = this.queue.length;
        this.length = qlen? qlen - 1: 0;
        
        return this.queue.shift();
    }
};

function breadthFirstSearch(matrix, key) {
    var size = matrix.length;
    var out = [];
    out.length = size;
    out = out.join().split(",").map(function(){return -1;});
    var gq = new GreedyQueue();
    
    gq.set({
        key: key,
        d: 6
    });

    while ( gq.length ) {
        var search = gq.get();

        var row = matrix[search.key];
        var d = search.d;
        var i = 0;

        for ( i; i < size; i++ ) {
            var el = row[i];
            if ( el && gq.set({
                key: i,
                d: d + 6
            }) ) {
                out[i] = d;
            }
        }
    }
    
    return out;
}

var fs = require("fs");
fs.readFile("./breadthFirst.txt", function (er, fdata) {
   var _input = fdata.toString();
   var data = processData(_input);
   data.shift();
    while( data.length ) {
        var head = data.shift();
        var size = head[0];
        var vsize = head[1];
        var vertices = data.splice(0, vsize);
        var key = data.shift() - 1; // 0 base normalized
        var matrix = makeMatrix(size, vertices); // 0 base normalized
        console.log(matrix.map(function(e){return e.join(" ");}).join("\n"));
        var result = breadthFirstSearch(matrix, key);
        result.splice(key, 1);
        console.log(result.join(" "));
    }
});
