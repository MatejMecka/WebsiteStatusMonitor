const express = require('express');
const bodyParser = require('body-parser');
var http = require('http');
var https = require('https');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/version', (req, res) => {
    res.status(200).send("Website Status Monitor. Version 1.0.0");
});

/* Handling all messenges */
app.post('/webhook', (req, res) => {
  console.log(req.body);
  var regex = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/
  var website = req.body.result.parameters["Websites"]
  var language = req.body["lang"]
  //console.log(language)
  if(website.match(regex)){
    console.log('nothing to do here')
  }
  else{
    website = website + '.com'
  }
  var url = 'https://' + website.toLowerCase()
  var method = 'https'
  console.log('website: ' + website)
  console.log(url)
  https.get(url, function (response) {
    console.log(response.statusCode)
    var message;
    
    if(language == "de"){
      message = 'Webseite is Online Status Code: ' + response.statusCode
    }
    else{
      message = "Website is Accessible. Status Code:" + response.statusCode
    }
    
    res.status(200).json({
            speech: message,
            displayText: message,
            source: 'cloudServiceMonitor'
    });  
 
      res.status(200).json({
            speech: message,
            displayText: message,
            source: 'cloudServiceMonitor'
    });  

  }).on('error', function(e) {
    var message;
    
    if(language == "de"){
      message = 'Webseite ist Offline das ist die Antwort: ' + e
    }
    else{
      message = 'Website is down. This is the response:' + e
    }
    
    res.status(200).json({
      speech: message,
      displayText: message,
      source: 'cloudServiceMonitor'
    });  

          
  });

});
const server = app.listen(process.env.PORT || 5000, () => {
  console.log('Express server listening on port %d in %s mode', server.address().port, app.settings.env);
});


