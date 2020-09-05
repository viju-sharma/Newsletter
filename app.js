const express = require("express");
const bodyParser = require("body-parser")
const app = express();
const https = require("https");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.get("/", function (req, res){
  res.sendFile(__dirname + "/signup.html");
});

//API KEY
//8754d12f3960ab67344ef60c3daa532b-us17
// UNIQUE KEY
// b1eb117659
// changes success



app.post("/", function(req, res){
  console.log("request received");
  const firstname = req.body.inputFirst;
  const lastname = req.body.inputLast;
  const email = req.body.inputEmail;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstname,
          LNAME: lastname
        }
      }
    ]
  };
  var jsonData = JSON.stringify(data);

  const url = "https://us17.api.mailchimp.com/3.0/lists/b1eb117659"
  const options = {
    method: "POST",
    auth: "vijender:8754d12f3960ab67344ef60c3daa532b-us17"
  }
  const request = https.request(url, options, function(response){
    response.on("data", function(data){
      console.log(JSON.parse(data));
    })
    if (response.statusCode===200){
      res.sendFile(__dirname + "/success.html")
    } else {
      res.sendFile(__dirname + "/failure.html")
    }

  })


  request.write(jsonData);
  request.end();
});

app.post("/failure", function(req, res){
  res.redirect('/')
})

app.listen(process.env.PORT || 3000, function (){
  console.log("server started at 3000");
});
