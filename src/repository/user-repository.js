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

}

module.exports = UserRepository;