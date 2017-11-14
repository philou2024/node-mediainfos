
node-mediainfos
===============

Overview
--------

Library node.js to extract data from mediainfo output, in simple ou Full mode.

**WARNING** : It doesn't work with XML issues.

Library was written to access metadata issued by mediainfo.

It works on Linux (Ubuntu, CentOS), and Windows.

Usage
-----

`var mediainfo = require('node-mediainfos');`


## Mode with 2 parameters:

`mediainfo([complete_path],callback)`

* parameter 1

  Full path to file to analyze. It takes only one file.

* parameter 3

The callback function is called with 2 parameters:

err: return true or false

metadata: return hash of data


## Mode with 3 parameters:

`mediainfo([complete_path],'--Full',callback)`

* parameter 1

  Full path to file to analyze. It takes only one file.

* parameter 2

  --Full  

* parameter 3

The callback function is called with 2 parameters:

err: returns error from mediainfo.

metadatr: returns hash of data

## metadata

The second parameter of callback contains issue from mediainfo  in a javascript object.

The keys of level 1 come from mediainfo issue.

Regular keys:

* general
* video
* audio

Other keys

* text
* menu

Depends from data found by mediainfo.

For each key, data are set in an array.


Example
-------

```javascript
var mediainfo = require('node-mediainfos');
mediainfo([complete_path],'--Full',function (err,metadata) {
    if (err) {
        console.log(err);
    } else {
        console.log("%o", metadata);
    }
});

```

Promise Example
-------

```javascript
var mediainfo = require('node-mediainfos').es6;
mediainfo([complete_path],'--Full').then(function(metadata){
	console.log("%o", metadata);
}, function(err){
	console.log(err);
});

```

Contributors
-------

Thank you to jgjake2 for adding promise.


Contact
-------

email: [philou2024](mailto:philippe@devisme.com)

