const { response } = require('express');
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
            message:`Successfully created the user`,
            data:response,
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

const signIn = async (req,res)=>{
    try {
        const response = await userService.signIn(req.body.email,req.body.password);
        return res.status(201).json({
            success:true,
            message:`Successfully signed in user`,
            data:response,
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

module.exports = {
    create,
    signIn,
}