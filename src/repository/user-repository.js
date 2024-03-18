const { User } = require('../models/index');


class UserRepository{
    // constructor(){
    // }

    async create(data){
        try {
            const response = await User.create(data);
            return response;
        } catch (error) {
            console.log("Something went wrong on repository-layer");
            throw error;
        }
    }

    async remove(userId){
        try {
            await User.destroy({
                where:{
                    id:userId,
                }
            })
            return true;
        } catch (error) {
            console.log("Something went wrong on repository layer");
            throw error;
        }
    }

    async getById(userId){
        try{
            const user = await User.findByPk(userId,{
                attributes:['id','email']
            });
            return user;
        }catch(error){
            console.log("Something went wrong on repository layer");
            throw error;
        }
    }
    async getByEmail(userEmail){
        try {
            const user = await User.findOne({
                where : {
                    email : userEmail,
                }
            });
            return user;
        } catch (error) {
            console.log("Something went wrong on repository layer");
            throw error;
        }
    }

}

module.exports = UserRepository;