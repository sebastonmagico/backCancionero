/**
 * Main server
 */
var http = require('http');
var https = require('https');
var base64 = require('base-64');
var Buffer = require('buffer').Buffer;
var psamls = require('./psalms.js');
var constants = require('./constants.js');

var auth = new Buffer(constants.token).toString('base64');

var options = {
    host: constants.bibleURL,
    port: 443,
    path: constants.biblePath + psamls.randomChapter(),
    headers: {
        'Authorization': 'Basic ' + auth
    }
};

var str = '';

var final = {
    text:"",
    reference:""
};

function resetData(){
  options.path = constants.biblePath + psamls.randomChapter();
  str = '';
};


//We need a function which handles requests and send response
function handleRequest(request, response){

    //Config headers
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Request-Method', '*');
    response.setHeader('Access-Control-Allow-Methods', 'GET');

    //Access controlled by requested url
    switch (request.url){
        case "/get_verse":
            //Reset my response
            resetData();
            response.writeHeader(200);

            //Making the curl request and waiting
            https.request(options, function(r){
                r.on('data', function(chunk){
                    str += chunk;
                });
                r.on('end', function(){
                    //Resolving with json parsed string
                    str = JSON.parse(str);
                    final.text = str.response.verses[0].text;
                    final.reference = str.response.verses[0].reference;
                    response.write(JSON.stringify(final));
                    console.log(options.path);
                    response.end();
                })
            }).end();
            break;
        default:
            //Not allowed buddy.
            response.writeHeader(404, {"Content-Type": "text/plain"});
            response.write("Not found");
            response.end();
            break;
    }
}

//Create a server
var server = http.createServer(handleRequest);

//Lets start our server
server.listen(PORT, function(){
    console.log("Server listening on: http://localhost:%s", PORT);
});      