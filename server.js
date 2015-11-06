//Lets require/import the HTTP module
var http = require('http');
var https = require('https');
var psamls = require('./psalms.js');

var base64 = require('base-64');
var Buffer = require('buffer').Buffer;

const PORT=9500;
const TOKEN="gDhmWP1FmwXWIeR5j6Xv5We3JnAwY8unOIumLlAC:X";

var auth = new Buffer(TOKEN).toString('base64');


var options = {
    host: 'es.bibles.org',
    port: 443,
    path: '/v2/verses/spa-RVR1960:' + psamls.randomChapter(),
    //path: '/v2/versions.js',
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
  options.path = '/v2/verses/spa-RVR1960:' + psamls.randomChapter();
  str = '';
};

//We need a function which handles requests and send response
function handleRequest(request, response){

    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Request-Method', '*');
    response.setHeader('Access-Control-Allow-Methods', 'GET');

    switch (request.url){
        case "/get_verse":
            resetData();
            response.writeHeader(200);
            https.request(options, function(r){
                r.on('data', function(chunk){
                    str += chunk;
                });
                r.on('end', function(){
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
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s", PORT);
});      