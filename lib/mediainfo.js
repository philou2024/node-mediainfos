const os = require('os');
const path = require('path');
const child_process = require("child_process");
const hasbin = require('hasbin');

var binaryPath = 'mediainfo';

// Check for executable in the PATH
var hasMediaInfo = hasbin.first.sync(['mediainfo', 'MediaInfo', 'mediainfo.exe', 'MediaInfo.exe']);

if(hasMediaInfo){
	binaryPath = hasMediaInfo;
} else {
	// If not found, set the binary path to the current working directory.
	if(os.platform() === 'win32'){
		binaryPath = path.join(process.cwd(), 'MediaInfo');
	} else {
		binaryPath = path.join(process.cwd(), 'mediainfo');
	}
}

function mediainfo() {
	var done = arguments[arguments.length - 1]; 
	var params = [];
	if(arguments.length > 2){
		params = Array.prototype.slice.call(arguments, 1, arguments.length - 1);
	}
	params.push(arguments[0]);
	var data = {};
	child_process.execFile(binaryPath, params, {maxBuffer: (200*1024) * 100}, function(err, stdout, stderr) {
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
				mark	= null;
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

mediainfo.es6 = function(){
	var args = Array.prototype.slice.call(arguments, 0),
		resolve, reject,
		prom = new Promise(function(_resolve, _reject){
			resolve = _resolve;
			reject = _reject;
		});
		
	var done = function(err, metadata){
		if(err){
			reject(err);
		} else {
			resolve(metadata);
		}
	};
	
	args.push(done);
	mediainfo.apply(this, args);
	
	return prom;
};

mediainfo.setBinaryPath = mediainfo.es6.setBinaryPath = function(path){
	binaryPath = path;
};

module.exports = mediainfo;
