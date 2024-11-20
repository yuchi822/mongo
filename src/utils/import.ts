import csv from "csv-parser";
import {createReadStream} from "fs";
import { Student } from "../interfaces/Student";
import { Collection, MongoClient } from "mongodb";
import { DB } from "../classes/DB";

export const csvImport = async (csvPath:string,db:DB,collectionName:string)=>{
    const results:Array<Student> = [];
    createReadStream(csvPath) // CSV 檔案路徑
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', async () => {
        // 插入資料到 MongoDB
        const insertResult = await db.insertMany(results as unknown as Document[],collectionName);
        if (insertResult) {
            console.log(`成功插入 ${insertResult.insertedCount} 筆資料！`);
        }else{
            console.error("插入失敗")
        }
    });
}