import {Db, InsertManyResult, InsertOneResult, MongoClient } from "mongodb";
import { MongoInfo } from "../interfaces/DBInfo";
import { Student } from "../interfaces/Student";

export class DB{
    public client:MongoClient;
    public db:Db|undefined;
    public info:MongoInfo | undefined

    constructor(info:MongoInfo){
        this.info = info;
        this.client = new MongoClient(`mongodb://${this.info.name}:${this.info.password}@${this.info.host}:${this.info.port}/${this.info.dbName}`);

    }

    public async connectDB():Promise<MongoClient | undefined>{
        if (this.client && this.info) {
            const connect = await this.client.connect();
            if (connect) {
                this.db = this.client.db(this.info.dbName);
            }else{
                console.error("cannot connectDB")
            }
            return connect;
        };
    }

    public async insertOne(info:Student,collectionName:string):Promise<InsertOneResult<Document>|undefined>{
        if (this.db) {
            const collection = this.db.collection(collectionName);
            return await collection.insertOne(info);
        }else{
            console.error("db not init")
            return undefined
        }
    }

    public async insertMany<T extends Document>(infos:T[],collectionName:string):Promise<InsertManyResult<Document>|undefined>{
        if (this.db) {
            const collection = this.db.collection(collectionName);
            return await collection.insertMany(infos);
        }else{
            console.error("db not init")
            return undefined
        }
    }
}