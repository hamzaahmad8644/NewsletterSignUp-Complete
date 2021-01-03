const express = require("express");
const bodyParser= require("body-parser");
const request = require("request");
const https = require("https");



const app = express();

app.use(express.static("Public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){
  const firstName= req.body.fname;
  const lastName= req.body.lname;
  const email= req.body.email;

  const data = {
    members: [
      {
        email_address:email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };

 const jsonData = JSON.stringify(data);

 const url = "https://us7.api.mailchimp.com/3.0/lists/3fd31c5f06";

 const options = {
   method: "POST",
   auth: "hamzaahmad8644:4cc4a911d44d5dec70a4bafdb3e3a1c6-us7"

 }
  const request = https.request(url, options, function(response){

    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }

    response.on("data", function(data){
      console.log(JSON.parse(data));
    });
  });

  request.write(jsonData);
  request.end();
});

app.post("/failure", function(req, res){
  res.redirect("/");
});



app.listen(process.env.PORT || 3000, function(){
  console.log("Server is running on port 3000");
});

//API Key
// 4cc4a911d44d5dec70a4bafdb3e3a1c6-us7

// List id
// 3fd31c5f06
