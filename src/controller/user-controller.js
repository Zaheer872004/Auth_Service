// const { response } = require('express');
const UserService = require('../services/user-service');

const userService = new UserService();
 
const create = async (req,res)=>{
    try {
        const response = await userService.create({
            email:req.body.email,
            password:req.body.password
        })       
        return res.status(201).json({
            success:true,
            data:response,
            message:`Successfully created the user`,
            err:{}
        })
    } catch (error) {
        console.log(`Something went wrong in the controller`);
        return res.status(400).json({
            message:"Not able to create the user",
            success :false,
            data:{},
            err:error
        })
    }
}

const signIn = async (req, res, next) => {
    try {
        const response = await userService.signIn(
            req.body.email,
            req.body.password
        );
        return res.status(200).json({
            success: true,
            data: response,
            err: {},
            message: `Successfully signed in user`,
        });
    } catch (error) {
        console.log(`Something went wrong in the controller`);
        return res.status(401).json({
            message: "Not able to sign in the user",
            success: false,
            data: {},
            err: error
        });
    }
}

const isAuthenticated = async (req, res)=>{
    try {
        const token = req.headers['x-access-token'];
        const response = await userService.isAuthencticated(token);
        return res.status(200).json({
            success:true,
            err:{},
            data : response,
            message : `user is authenticated and token is valid`
        });
    } catch (error) {
        console.log(`Something went wrong in the controller `);
        return res.status(401).json({
            message: "Not able to sign in the user on user authenticated and invalid",
            success: false,
            data: {},
            err: error
        });
    }
}


module.exports = {
    create,
    signIn,
    isAuthenticated
}