import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {User} from "../entity/User";

export class UserController {

    private userRepository = getRepository(User);

    async all(request: Request, response: Response, next: NextFunction) { 
        
            return this.userRepository.find();
        
    }

    async one(request: Request, response: Response, next: NextFunction) {
        //console.log("Inside one");
        //console.log(`The request id is ${request.params.id}`);
        try {
            return this.userRepository.findOne(request.params.id);
        }catch(e) {
            console.error(e);
        }finally {
            console.log('user does not exist');
        }
        return response.sendStatus(404);
    }

    async save(request: Request, response: Response, next: NextFunction) {
        
        try {
            return  await this.userRepository.save(request.body);
        }catch(e) {
            console.error(e);
        }finally {
            console.log('version 1: a new user was added: ', request.body.lastName);

        }
        
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        let userToRemove = await this.userRepository.findOne(request.params.id);
        await this.userRepository.remove(userToRemove);
    }

}