const express = require("express");
const request = require("request");
const bodyParser = require("express");
const path = require("path");

const app = express();

//middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.post("/subscribe", (req, res) => {
  console.log("hello world");
  const { email, js } = req.body;
  const mcData = {
    members: [
      {
        email,
        status: "pending" //subscribe if you want to skip verification email
      }
    ]
  };

  const mcDataPost = JSON.stringify(mcData);

  const options = {
    url: "", //found in mailchimp account
    method: "POST",
    headers: {
      Authorization: "auth .." //replace .. with api key
    },
    body: mcDataPost
  };

  if (email) {
    request(options, (err, response, body) => {
      //successful so far
      if (err) {
        res.json({ error: err });
      } else {
        if (js) {
          res.sendStatus(200);
        } else {
          res.redirect("/success.html");
        }
      }
    });
  } else {
    res.status(404).send({ message: "failed" });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log("Server has started"));

// Front End fetch request documentation
// handleSubmit = e => {
//   e.preventDefault();

//   if (this.email.value === null || this.email.value === "") {
//     window.alert("please submit email");
//   } else {
//     const fetchData = {
//       method: "POST",
//       body: JSON.stringify({ email: this.value.email, js: true }),
//       headers: { "Content-Type": "application/json" }
//     };

//     fetch("/subscribe", fetchData).then(res => {
//       if (res.ok) {
//         console.log("excelsior!"); //success animation
//       } else {
//         console.log("sad face");
//       }
//     });
//   }
// };
