const Receipt = require("../models/receipt");
const { OAuth2Client } = require("google-auth-library");
const token = require("../token");
const { uuid } = require('uuidv4');

exports.add = function (req, res) {
  console.log("add")
  console.log(req.body)
  const receipt = req.body;
  var document = new Receipt({
    title: receipt.title,
    description: receipt.description,
    userId: receipt.userId,
    imageId: receipt.imageId,
    text: receipt.text,
    fileUrl: receipt.fileUrl,
    created: receipt.created,
    id: uuid(),
  });
  document.save(function (err) {
    if (err) {
      console.log("exports.add - Error")
      console.log(err)
      res.status(500).send(err);
    } else {
      res.status(204).send();
    }
  });
};

exports.search = function (req, res) {
  const query = req.query.query;
  console.log("search")
  console.log(query)

  Receipt.find(
    {
      $or: [
        { description: { $regex: query, $options: "i" } },
        { text: { $regex: query, $options: "i" } },
        { title: { $regex: query, $options: "i" } },
      ],
    },
    "-__v",
    null,
    function (err, receipts) {
      if (err) {
        res.status(500).send(err);
      }
      res.status(200).send(receipts);
    }
  );
};

exports.delete = function (req, res) {
  const query = req.query.query;
  console.log("query:" + query);

  Receipt.find(
    {
      $or: [
        { description: { $regex: query, $options: "i" } },
        { text: { $regex: query, $options: "i" } },
        { title: { $regex: query, $options: "i" } },
      ],
    },
    "-__v",
    null,
    function (err, receipts) {
      if (err) {
        res.status(500).send(err);
      }
      console.log("result");
      console.log(receipts);
      res.status(200).send(receipts);
    }
  );
};

exports.get_user = function (req, res) {
  const username = req.params.username;
  User.findOne(
    {
      username,
    },
    function (err, userData) {
      if (userData != null && userData.locations != null) {
        res.status(200).send(userData.locations);
      } else {
        res.status(200).send([]);
      }
    }
  );
};

exports.verifyToken = function (req, res) {
  verify(req.body.token)
    .then((resp) =>
      resp !== null
        ? res.status(200).send({ token: resp })
        : res.status(401).send()
    )
    .catch((err) => {
      console.log(err);
      res.status(401).send();
    });
};

async function verify(token) {
  const client = new OAuth2Client(process.env.GOOGLE_CLIENTID);
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENTID,
  });
  const payload = ticket.getPayload();
  const audience = payload["aud"];
  if (audience === process.env.GOOGLE_CLIENTID) {
    const userid = payload["sub"];
    jwtToken = generateUserToken(userid);
    return jwtToken;
  } else {
    return null;
  }
}

// Generate the Token for the user authenticated in the request
function generateUserToken(userId) {
  return token.generateAccessToken(userId);
}
