import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User)
        private userModel: typeof User,
    ) {}

    async findAll(): Promise<User[]> {
        return this.userModel.findAll();
    }
    
    async create(userData: Partial<User>): Promise<User> {
        return this.userModel.create(userData);
        }
        
    async findOne(username: string): Promise<User | null> {
        return this.userModel.findOne({ where: { username } });
    }
}
