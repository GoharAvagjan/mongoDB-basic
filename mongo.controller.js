const userModel = require('./mongo.confic');
class UserController {
   static async createUser(req, res) {
        try {
            const { username, email, password, age, hobbies } = req.body;
            const newUser = new userModel({ username, email, password, age, hobbies });
            await User.create(newUser);
            res.status(201).json(newUser);
        } catch (error) {
            res.status(500).json({ error: 'Failed to create user' });
        }
    }
    static async getAllUsers(req, res) {
        try {
            const users = await userModel.find();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch users' });
        }
    }
    static async getUserById(req, res) {
        try {
            const user = await userModel.findById(req.params.id);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch user' });
        }
    }
    static async updateUser(req, res) {
        try {
            const updatedUser = await userModel.findByIdAndUpdate(req.params.id, req.body);
            if (!updatedUser) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.status(200).json(updatedUser);
        } catch (error) {
            res.status(500).json({ error: 'Failed to update user' });
        }
    }
    static async deleteUser(req, res) {
        try {
            const deletedUser = await userModel.findByIdAndDelete(req.params.id);
            if (!deletedUser) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.status(200).json({ message: 'User deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Failed to delete user' });
        }
    }    
}
module.exports = UserController;
