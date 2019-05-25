var express = require("express");
var router  = express.Router({mergeParams: true});
var feedback=require("../models/feedback");
var middleware = require("../middleware");
/*router.get('/',function(req,res){
	console.log("success1");
	res.send("hello oops");
	feedback.find({},function(err,allfeedback){
		if(err)
		{
			console.log(err);
		}
		else
		{
			console.log("success5");
			//res.render("feedback",{ feedback: allfeedback});
		}
	});
	
});*/
/*router.post('/',function(req,res)
{
	console.log("success 2");
	var feedba={username:req.body.username,email:req.body.email,feedback:req.body.feedback};
	feedback.create(feedba,function(err,feedback){
		if(err)
		{
			console.log(err);
		}
		else
		{
			console.log("success");
			res.redirect("/feedback");

		}
	})
})*/
module.exports=router;