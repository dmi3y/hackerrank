function processData(input) {
    var data = input.split("\n");
    data.shift();
    return data.map(function(w) {
        return w.split("").map(function(c) {
            return c.charCodeAt();
        });
    });
} 

process.stdin.resume();
process.stdin.setEncoding("ascii");
_input = "";
process.stdin.on("data", function (input) {
    _input += input;
});

function biggerMinOnRight(arr, i) {
    var out = Infinity;
    var el = arr[i];
    i++;
    for (; i < arr.length; i += 1) {
        if ( arr[i] > el ) {
            out = Math.min(out, arr[i]);
        }
    }
    return out === Infinity? 0: out;
}

function doSwaps(arr, swap, i) {
    var right = arr.splice(i);
    var ix = right.indexOf(swap);
    right.splice(ix, 1, arr.pop());
    
    right = right.sort(function(a, b) {
        return a - b;
    });
    
    return arr.concat([swap], right);
}

function reorder(arr) {
    var i = arr.length;
    var out = false;
    
    for (;i-->0;) {
        var swap = biggerMinOnRight(arr, i);
        if ( swap ) {
            
            out = doSwaps(arr, swap, i);
            break;
        }
    }
    
    return out;
}

process.stdin.on("end", function () {
   var data = processData(_input);
    
   for (var i = 0; i < data.length; i += 1) {
       var arr = data[i];

       var reordered = reorder(arr);
       var answer = "no answer";
       if ( reordered ) {
           answer = reordered.map(function(c) {
               return String.fromCharCode(c);
           }).join("");
       }
             
       console.log(answer);
   }
});
