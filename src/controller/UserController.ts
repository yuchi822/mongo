import { Contorller } from "../abstract/Contorller";
import { Request, response, Response } from "express";
import { studentsDbResp, UserService } from "../Service/UserService";
import { resp } from "../utils/resp";
require('dotenv').config()

export class UserController extends Contorller {
    protected service: UserService;

    constructor() {
        super();
        this.service = new UserService();
    }

    public async test(Request: Request, Response: Response) {

        const res:resp<studentsDbResp|undefined> ={
            code: 200,
            message: "",
            body: undefined
        }

        const dbResp = await this.service.getAllStudents();
        if (dbResp) {
            res.body = dbResp;
            res.message = "find sucess";
            Response.send(res);
        }else{
            res.code = 500;
            res.message = "server error";
            Response.status(500).send(res);
        }
        
    }
}