const express=require("express")
const app=express()
const session = require("express-session");
const router=require("./router/mail")
const cors = require('cors');
const nocache = require("nocache");
const port=5000
const oneday = 1000 * 60 * 60 * 24;


app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(
    session({
      secret: "secret-Key",
      resave: false,
      cookie: { maxAge: oneday },
      saveUninitialized: true,
    })
  );
  app.use(nocache());


app.use("/",router)

app.listen(port,()=>console.log("ssss"))