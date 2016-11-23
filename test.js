var should = require('should');
var imageresizerModule = require('./index.js')
var valid = require('url-valid');

console.log('imageresizerModule: ', imageresizerModule)

imageresizerModule.init({
    key : process.env.IMAGERESIZER
});

describe('Test imageresizer.io', function () {
    var _id =''

    this.timeout(4000);

    before(function (done) {

        done();
    });


    it('imageresizerModule.upload(url)', function (done) {
        var url = 'http://www.w3schools.com/css/trolltunga.jpg'

        imageresizerModule.upload(url).then(function(result){
            console.log(result);
            _id = JSON.parse(result).response.id;
            done();
        },function(err){
            done(err);
        })
    });

    describe('Test resizeById', function () {

        it('height only', function (done) {
            var resizedUrl = imageresizerModule.resizeById(_id,{h:100});
            valid(resizedUrl, function (err, valid) {
                if (err) done(err)
                done();
            });
        });

        it('width only', function (done) {
            var resizedUrl = imageresizerModule.resizeById(_id,{w:100});
            valid(resizedUrl, function (err, valid) {
                if (err) done(err)
                done();
            });
        });

        it('quality only', function (done) {
            var resizedUrl = imageresizerModule.resizeById(_id,{q:90});
            valid(resizedUrl, function (err, valid) {
                if (err) done(err)
                done();
            });
        });

        it('format only', function (done) {
            var resizedUrl = imageresizerModule.resizeById(_id,{f:'png'});
            valid(resizedUrl, function (err, valid) {
                if (err) done(err)
                done();
            });
        });
    });


    describe('Test uploadAndResize', function () {
        it('height only', function (done) {
            var url2 = 'http://facefacts.scot/images/science/Q2_high_health_f.jpg';
            imageresizerModule.uploadAndResize(url2,{w:1000}).then(function(result){
                var resizedUrl = result;
                console.log('resizedUrl',resizedUrl);
                valid(resizedUrl, function (err, valid) {
                    if (err) done(err)
                    done();
                });
            },function(err){
                done(err);
            })
        });
    });
});
