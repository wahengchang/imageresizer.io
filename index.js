var request = require('request');

function imageresizerModule() {

  var BASEURL = 'http://api.imageresizer.io/images';
  var DOWNLOAD_BASEURL = 'https://im.ages.io/';
  var key;
  var isInit;

  function init(_initJson) {
    if (!_initJson) {
      console.error('Missing config values');
      return false;
    } else {
      key = _initJson.key;

      if (!key) {
        console.error('Missing config values');
        return false;
      } else {
        console.error('Init finished');
        isInit = true;
        return true;
      }
    }
  }

  function upload(_url) {
    return new Promise(function (resolve, reject) {

      if(!key){
        reject('ERROR: api key is not init...');
      } else {
        try {
          var url = BASEURL + '?key=' + key + '&url=' + _url;

          request(url, function (error, response, body) {
            if (!error && response.statusCode === 200) {
              resolve(body);
            } else {
              reject(error);
            }
          });
        } catch (err) {
          reject(err);
        }
      }
    });
  }

  function uploadAndResize(_url, options) {
    return new Promise(function (resolve, reject) {
      upload(_url).then(function (result) {
        var _id = JSON.parse(result).response.id;

        resolve(resizeById(_id, options));
      }, function (err) {
        reject(err);
      });
    });

  }

  function resizeById(id, options) {

    var _str = '';

    if (options.h) {
      _str += 'height=' + options.h;
    } else if (options.w) {
      _str += 'width=' + options.w;
    } else if (options.f) {
      _str += 'format=' + options.f;
    } else if (options.quality) {
      _str += 'quality=' + options.q;
    } else {
      return DOWNLOAD_BASEURL;
    }

    return DOWNLOAD_BASEURL + id + '?' + _str +'&cors';
  }

  return {
    init: init,
    upload: upload,
    uploadAndResize: uploadAndResize,
    resizeById: resizeById
  };
}


module.exports = (function () {
  // Singleton instance goes into this variable
  var instance;

  // Singleton factory method
  function factory() {
    return imageresizerModule();
  }

  // Singleton instance getter
  function getInstance() {
    // If the instance does not exists, creates it
    if (instance === undefined) {
      instance = factory();
    }

    return instance;
  }

  // Public API definition
  return (function () {
    {
      // If the instance does not exists, creates it
      if (instance === undefined) {
        instance = factory();
      }

      return instance;
    }
  })();
})();
