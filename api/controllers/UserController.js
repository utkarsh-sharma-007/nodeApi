/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

var crypto = require("crypto");
const TokenGenerator = require('uuid-token-generator');
const tokgen = new TokenGenerator()
var sendMail = require('../Scripts/MailSender.js');

module.exports = {
  
	register: register,
	login: login,
	logout: logout,
	activateAccount: activateAccount,
	getUserDetails: getUserDetails,
	sendResetPass: sendResetPass,
	resetPass: resetPass,
	hello: hello

};

// this function is to register a new user you can look at models/user.js for how to send the body, post request
async function register(req,res) {
	// res.status(200).send('hello');
	// console.log(tokgen.generate())
	if (!req.body){
		return res.status(400)
	}
	else{
		let obj = {...req.body};
		obj.password = crypto.createHash("sha1").update(req.body.password).digest('hex');
		obj.OTP = tokgen.generate();
		// console.log(obj);
		await User.create(obj).exec((err,user)=>{
			if(err)
				return res.status(404).send(err)
			else{
				console.log(crypto.createHash("sha1").update(obj.OTP).digest('hex'),'<<<<<<<< use this as OTP to activate the account')
				res.status(200).send({
					"message": "Your account has been created successfully. You will receive an approval mail on your email id. Check your spam email, if you do not receive email within 24 hours."
				});
			}
		})
	}
}

// login function only needs email and password, post request
async function login(req,res) {
	// console.log(req.body)
	if (!req.body){
		// console.log(req.body,'req.body')
		return res.status(400)
	}
	else{
		let obj = {};
		obj.email = req.body.email;
		obj.password = crypto.createHash("sha1").update(req.body.password).digest('hex');
		var user = await User.findOne({email:req.body.email});
		// console.log(user);
		if(!user)
			return res.status(404).send('User Not Found');
		else{
			if(user.status=='inactive'){
				return res.status(403).send('You need to verifiy your email first.')
			}
			if(user.password != obj.password)
				return res.status(404).send('Wrong password')
			else{
				delete user.password;
				delete user.OTP;
				req.session.user = user;
				return res.status(200).send(user)
			}
		}
	}
}

// this is a get request no params required, get request
async function logout(req,res) {
	// console.log(req.body)
	if(req.session){
		delete req.session.user
		req.session.destroy();
		return res.status(200).send('logged out')
	}else{
		return res.status(404).send('User already Logged out')
	}
}

// activateaccount needs two parameters user id and otp in req.body, post request
async function activateAccount(req,res) {
	if (!req.body.OTP||!req.body.id){
		return res.status(400).send('Unathorized')
	}else{
		var user = await User.findOne({id:req.body.id});
		if(crypto.createHash("sha1").update(user.OTP).digest('hex') == req.body.OTP){
			console.log(user,'update')
			var newUser = await User.update({id:req.body.id}).set({OTP:'',status:'active'});
			res.status(200).send({msg:'Your account is now active.'});
		}else{
			res.status(400).send('Something went wrong, please ask for the token again.')
		}
	}
}

// won't be able to access till you're logged in no params required get function, get request
async function getUserDetails(req,res) {
	console.log(req.session)
	if (!req.session.user.id){
		return res.status(403).send('forbidden')
	}else{
		var userDetail = await User.findOne({id:req.session.user.id})
		var userKnowledge = await Knowledge.find({user_id:req.session.user.id})
		var userEducation = await Education.find({user_id:req.session.user.id})
		var userPersonalInfo = await PersonalInfo.find({user_id:req.session.user.id})
		var userDevice = await Device.find({user_id:req.session.user.id})
		var userSocial = await Social.find({user_id:req.session.user.id})

		return res.status(200).send({
			userDetail:userDetail,
			userKnowledge:userKnowledge,
			userEducation:userEducation,
			userPersonalInfo:userPersonalInfo,
			userDevice:userDevice,
			userSocial:userSocial,
		})		
		// if(crypto.createHash("sha1").update(user.OTP).digest('hex') == req.body.OTP){
		// 	console.log(user,'update')
		// 	var newUser = await User.update({id:req.body.id}).set({OTP:'',status:'active'});
		// 	res.status(200).send({msg:'Your account is now active.'});
		// }else{
		// 	res.status(400).send('Something went wrong, please ask for the token again.')
		// }
	}
}

// one parameter required user email, post request
async function sendResetPass(req,res) {
	if(!req.body.email)
		return res.status(400).send('Unathorized')
	else{
		await User.findOne({email:req.body.email}).exec((err,user)=>{
			if(err)
				return res.status(404).send('User not found')
			else{
				var newOTP = tokgen.generate();
				console.log(crypto.createHash("sha1").update(newOTP).digest('hex'),'<<<<<<<< use this as OTP to activate the account');
				User.update({email:req.body.email}).set({OTP:newOTP})
				.exec((err,data)=>{
					if(err)
						res.status(404).send(err);
					else{
						res.status(200).send("you'll get the reset password link soon");
					}
				})
				//token to be send to mail = crypto.createHash("sha1").update(newOTP).digest('hex')
				//also send the user id of the user in the link
				//do the nodemailer activity here

			}
		});

	}
}

// 3 params required user id otp and password, post request 
async function resetPass(req,res) {
	if(!req.body.OTP||!req.body.id||!req.body.password)
		return res.status(400).send('Unathorized')
	else{
		let user = await User.findOne({id:req.body.id})
		if(crypto.createHash("sha1").update(user.OTP).digest('hex')==req.body.OTP){
			var newPassword = crypto.createHash("sha1").update(req.body.password).digest('hex')
			await User.update({id:req.body.id}).set({OTP:'',password:newPassword})
			return res.status(200).send('password updated successfully');
		}else{
			return res.status(403).send('OTP does not match');
		}

	}
}

async function hello(req,res){
	sendMail.sendMail('hello',function(res){
			console.log(res)
	})
	console.log(req.session);
	res.status(200).send('okay');
}