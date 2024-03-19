const jwt = require("jsonwebtoken");
const { JWT_KEY } = require("../config/serverConfig");
const bcrypt = require("bcrypt");

const UserRepository = require("../repository/user-repository");
const { use } = require("../routes/v1");

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async create(data) {
    try {
      const user = await this.userRepository.create(data);
      return user;
    } catch (error) {
      console.log(`Something went wrong in service-layer`);
      throw error;
    }
  }

  createToken(user) {
    try {
      const result = jwt.sign(user, JWT_KEY, { expiresIn: "1d" });
      return result;
    } catch (error) {
      console.log(`Something went wrong in token generation`);
      throw error;
    }
  }

  async signIn(email, plaintextPassword) {
    try {
      const user = await this.userRepository.getByEmail(email);

      if(!user){
        console.error(`User not found`);
        throw error;
      }

      const isPasswordValid = this.checkPassword(
        plaintextPassword,
        user.password
      );
      console.log(isPasswordValid);

      if (!isPasswordValid) {
        console.log("Invalid password try again later");
        throw new Error("Invalid password");
      }

      const newJWT = this.createToken({ email: user.email, id: user.id });
      return newJWT;
    } catch (error) {
      console.log(`Something went wrong in User Signed In`);
      throw error;
    }
  }

  async isAuthencticated(token){
    try {
      const response = this.verifyToken(token);
      
      if(!response){
        throw {error: ` Invalid token `};
      }

      const user =this.userRepository.getById(response.id);

      if(!user){
        throw {error: ` No user with the corresponding token exists`}
      }
      return user.id;


    } catch (error) {
      console.log(`Something went wrong in the auth process`);
      throw {error :`user not authenticated`};
    }
  }

  verifyToken(token) {
    try {
      const response = jwt.verify(token, JWT_KEY);
      return response;
    } catch (error) {
      console.log(`Something went wrong in token validation`);
      throw error;
    }
  }

  checkPassword(userInputPlainPassword, encryptedPassword) {
    try {
      return bcrypt.compareSync(userInputPlainPassword, encryptedPassword);
    } catch (error) {
      console.log(`Something went wrong in the password comparasion`);
      throw error;
    }
  }
}

module.exports = UserService;
