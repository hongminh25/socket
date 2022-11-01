const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const { Mess} = require("./config/models/mess_model")
const { User} = require("./config/models/user_model")
const jwt = require("jsonwebtoken");
const { checkToken } = require ("./utils/checkToken")
const { isEmpty } = require ("./utils/validate");
const { response } = require("express");


const app = express();
app.use(cookieParser());
app.use(express.json());

app.use(cors());

app.get("/",async (req, res) => {
    const a = await User.findAll()
    res.send(a)
})

app.post("/sign-up", async (req, res) => {
    try {
      const {name, phoneNumber, password } = req.body;
  
      const user = await User.create({
        name: name,
          phoneNumber: phoneNumber,
          password: password
      });
      res.send({ error_code: 0, result: user, message: null });

    } catch (err) {
      res.json({
        error_code: 500,
        message: "Something went wrong, try again later",
        error_debug: err,
      });
    }
  });

app.post("/sign-in", async (req, res) => {
    try {
      const { phoneNumber, password } = req.body;
  
      const user = await User.findOne({
        where: {
          phoneNumber: phoneNumber,
          password: password
        },
      });
      if (isEmpty(user)) {
        res.send({
          error_code: 404,
          message: "PhoneNumber or password is incorrect",
        });
      } else {
        const id = user.id;
        const token = jwt.sign({ id }, "111111", {
          expiresIn: "50m",
        });
        res.send({ token, error_code: 0 });
      }
    } catch (err) {
      res.json({
        error_code: 500,
        message: "Something went wrong, try again later",
        error_debug: err,
      });
    }
  });

  app.get("/user", checkToken ,async (req, res) => {
    const key = req.query.search ? {
      name: { $regex: req.query.search, $options: "i"}
    } : {}

    const users =  await User.findAll(key).find({id: {$ne: req.id}})

    res.send(users)
  })

  app.get("/chat", checkToken, async(req, res) => {
    
  })

  app.post("/chat", checkToken, async(req, res) => {
    const { userId } = req.body;

    var isChat = await Mess.findAll({
      where: {
        send_id: req.id,
        receive_id: userId
      }
    })
  })



app.listen("5000", () => {
    console.log("Running");
})