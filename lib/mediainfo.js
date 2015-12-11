var child_process = require("child_process");

module.exports = function() {
    var done; 
    var params = [ arguments[0][0]  ];
    if ( arguments.length == 3 ) {
        params.unshift( arguments[1]);   
        done = arguments[2];
    } else {
        done = arguments[1];
    }
    var data = {};
    child_process.execFile("mediainfo", params , function(err, stdout, stderr) {
        if (err) { return done( err,null); }
        var mark;
        var number = 0;
        var array = stdout.split(/\n/);
        for ( var line in array ) {
           if (array[line].match(/\s+:\s/) ) {
                var splitted = array[line].split(/\s+:\s+/);
                if (!data[mark]) {
                    data[mark] = {};
                }
                if (!data[mark][number]) {
                    data[mark][number] = {};
                }
                if ( data[mark][number][splitted[0]]   ) {
                    data[mark][number][splitted[0]].push(splitted[1]);
                } else {
                    data[mark][number][splitted[0]] = [splitted[1]];
                }
           } else if (array[line].match(/^$/) )  {
                mark    = null;
                number  = 0;
           } else {
                var chunks = array[line].toLowerCase().split(/\s+/);
                mark = chunks[0];
                if ( chunks[1]) {
                    number = chunks[1];
                    number.replace(/\D/g,"");
                    number--;
                }
           }
        }
        return done(null, data);
    });
};
