const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

const respondedEmails = {};

app.post("/email", (req, res) => {
  const { to, subject, text } = req.body;

  if (respondedEmails[to]) {
    return res
      .status(400)
      .json({ message: "This email has already been responded to......" });
  }
  const response = `Thank you for your email. This is an automated response to let you know that we have received your message and will respond as soon as possible.\n\nOriginal message:\n${text}`;

  console.log(`Sending response to ${to}: ${response}`);

  respondedEmails[to] = true;

  res.json({ message: "Automatic response sent." });
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
