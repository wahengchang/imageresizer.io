# imageresizer.io

A wrapper around functions of https://imageresizer.io/

[![NPM](https://nodei.co/npm/imageresizer.io.png?downloads=true&downloadRank=true)](https://www.npmjs.com/package/imageresizer.io)


## Install

```
$ npm install --save imageresizer.io
```

## Initializing

```js
var imageresizerModule = require('imageresizer.io')

imageresizerModule.init({
    key : 'YOU_API_KEY'
});
```

## Usage
#### upload
```js
//Puting one image to server, when getting the keyID, we are able to do processing

var url = 'http://www.w3schools.com/css/trolltunga.jpg'

imageresizerModule.upload(url).then(function(result){
    console.log(result);
},function(err){
    done(err);
})

```

#### resizeById
```js
//Puting one image to server, when getting the keyID, we are able to do processing

// _id is responsed by request
// w,h,q
// or {f: 'png'}
var resizedUrl = imageresizerModule.resizeById(_id,{h:100});

```


#### resizeById
```js
var url = 'http://www.w3schools.com/css/trolltunga.jpg'

imageresizerModule.uploadAndResize(url,{w:1000}).then(function(result){
    console.log(result);
},function(err){
    done(err);
})

```

## License


[MIT](http://vjpr.mit-license.org)