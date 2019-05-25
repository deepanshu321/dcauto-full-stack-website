var express=require("express");
var mongoose= require("mongoose");
var nodemailer = require('nodemailer');
var bp=require("body-parser");
var path=require("path");
var flash       = require("connect-flash");
var    passport    = require("passport");
var  LocalStrategy = require("passport-local");
var  User        = require("./models/user");
var app=express();

 
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bp.urlencoded({extended: false }));
app.use(flash());

mongoose.connect(process.env.DATABASEURL||'mongodb://localhost/mydb');
/*var UserSchema = new mongoose.Schema({
    username: String,
    email:String,
    password: String
});*/

//var user =mongoose.model('user',UserSchema);
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.get('/booknow',function(req,res){
	res.sendFile(path.join(__dirname+'/book.html'));
});
app.post('/booknow',function(req,res){
 var api_key = 'ac312543e616583cbe9cc9b135ca95d5-1b65790d-d5e99c4e';
var domain = 'sandbox4b227f593d1e4e5292877de2a9362991.mailgun.org';
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
 
var data = {
  from: 'DCautomobile<me@samples.mailgun.org>',
  to: 'palgolu000@gmail.com',
  subject: req.body.name,
  text: req.body.comments
};
 
mailgun.messages().send(data, function (error, body) {
  console.log(body);
});


var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'palgolu000@gmail.com',
    pass: 'Deep321@'
  }
});

var mailOptions = {
  from: 'youremail@gmail.com',
  to: req.body.email,
  subject: 'DC automobile',
  text: 'Thank You for contacting us'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
if(req.body.name==="" ||req.body.email===""||req.body.comments==="")
{
	res.send("please fill all the details");
}
 res.send("you will shortly get the email");

});
/*app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});*/
app.get("/signup",function(req,res){
	
  res.render('pages/signup');
});
app.get("/login",function(req,res){
 res.render("pages/login");
});
app.post("/login",function(req,res){
   if(req.body.email===""||req.body.comments==="")
  {
  res.send("please fill all the details");
   }
   else
   {
  user.find({email:req.body.email},function(err,newuser){
    if(err)
    {
      console.log(err);
    }
    else
    {
     if(newuser.length!=0)
     {
      res.send(newuser[0].username+"! you have successfully logged in");
    }
    else
    {
      res.send("please sign up first");
    }
    }
  });
}
});
app.post("/signup",function(req,res){

  if(req.body.name==="" ||req.body.email===""||req.body.comments==="")
{
  res.send("please fill all the details");
}
else
{
  var t=0;
  user.find({email:req.body.email},function(err,newuser){
    if(err)
    {

      console.log(err);
    }
    else
    {
     t=1;
      res.send(newuser[0].username+"! you have already signed  up please login now");
    }
  });
  if(t==0)
  {
 user.create({username:req.body.name,email:req.body.email,password:req.body.password},function(err,us){
  if(err)
  {
    console.log(err);
  }
  else
  {
    console.log(us);
    res.send(us.username+' Now you Can Login');
  }

 });
}
}
});
app.use("/feedback",require("./routes/feedback"));
app.listen(process.env.PORT||1010,function(req,res){
	console.log("start");
});




