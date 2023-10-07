import { Request, Response } from 'express';
import { User } from '../models/User';


const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.findAll();
        // const users = await sequelize.query("select * from users");
        res.json(users);
    } catch (error) {
        console.error('Error retrieving users:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


export {
    getAllUsers,
}