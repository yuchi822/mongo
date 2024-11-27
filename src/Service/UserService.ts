import { Service } from "../abstract/Service";
import { Student } from "../interfaces/Student";
import { logger } from "../middlewares/log";
import { studentsModel } from "../orm/schemas/studentSchemas";
import { Document } from "mongoose"
import { MongoDB } from "../utils/MongoDB";

export type studentsDbResp = (Document<unknown, any, Student> & Omit<Student & Required<{
    _id: string;
}>, never>)[]

export class UserService extends Service {

    public async getAllStudents(): Promise<studentsDbResp|undefined> {
        try {
            const res:studentsDbResp = await studentsModel.find({});
            return res;
        } catch (error) {
            return undefined;
        }
        
    }

}