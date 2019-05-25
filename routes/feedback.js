var express = require("express");
var router  = express.Router({mergeParams: true});
var feedback=require("../models/feedback");
var middleware = require("../middleware");
router.get('/',function(req,res){
	//console.log("success1");
	//res.send("hello oops");
	feedback.find({},function(err,allfeedback){
		if(err)
		{
			console.log(err);
		}
		else
		{
			//console.log("success5");
			res.render("feedback",{ feedback: allfeedback});
		}
	});
	
});
router.post('/rr',function(req,res)
{
	//console.log("success 2");
	var username=req.body.username;
	var email=req.body.email;
	var feed=req.body.feedback;
	var rating=req.body.rating;
	var feedba={username:username,email:email,rating:rating,feedback:feed};
	feedback.create(feedba,function(err,feedback){
		if(err)
		{
			console.log(err);
		}
		else
		{
			//console.log("success");
			res.redirect("/feedback");

		}
	})
})
module.exports=router;