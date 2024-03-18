const jwt = require('jsonwebtoken');
const { JWT_KEY} = require('../config/serverConfig');
const bcrypt = require('bcrypt');


const UserRepository = require('../repository/user-repository');

class UserService{

    constructor(){
        this.userRepository = new UserRepository();
    }

    async create(data){
        try {
            const user = await this.userRepository.create(data);
            return user;
        } catch (error) {
            console.log(`Something went wrong in service-layer`);
            throw error;
        }
    }

    createToken(user){
        try {
            const result = jwt.sign(user,JWT_KEY,{expiresIn:'1d'});
            return result;
        } catch (error) {
            console.log(`Something went wrong in token generation`);
            throw error;
        }
    }

    async signIn(email,plaintextPassword){
    try {
        const user = await this.userRepository.getByEmail(email);

        const checkingPassword = this.checkPassword(plaintextPassword,user.password);
        
        if(!checkingPassword){
            console.log("Invalid password try again later");
            throw error;
        }

        const generateToken = this.createToken({email : user.email, id : user.id});
        return generateToken;

    } catch (error) {
        console.log(`Something went wrong in User Signed In`);
    }
    }



    verifyToken(token){
        try {
            const response = jwt.verify(token,JWT_KEY);
            return response;
        } catch (error) {
            console.log(`Something went wrong in token validation`);
            throw error;
            
        }
    }

    checkPassword(userInputPlainPassword, encryptedPassword){
        try {
            return bcrypt.compareSync(userInputPlainPassword,encryptedPassword);
        } catch (error) {
            console.log(`Something went wrong in the password comparasion`);
            throw error;
        }
    }

}

module.exports = UserService;