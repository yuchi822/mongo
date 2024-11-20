import { UpdateResult } from "mongodb";
import { DB } from "./classes/DB";
import { Student } from "./interfaces/Student";
import { csvImport } from "./utils/import";
require('dotenv').config()

const main = async (): Promise<void> => {

    const mongo: DB = new DB({
        name:process.env.DBUSER as string,
        password:process.env.DBPASSWORD as string,
        host:process.env.DBHOST as string,
        port:process.env.DBPORT as string,
        dbName:process.env.DBNAME as string
    });

    const student:Student = {
        userName: "tkuee0787",
        sid: 1,
        name: "張佳慧",
        department: "電機工程系",
        grade: "四年級",
        class: "A",
        Email: "tkuee0787@tkuim.com"
    };

    await mongo.connectDB();

    // const res = await mongo.insertOne(student,"students");

    // await csvImport("./statics/studentslist.csv",mongo,"students");

    await update(mongo,"students");

}

const update = async (mongo:DB,collectionName:string)=>{

    if (mongo.db) {

        const collection = mongo.db.collection(collectionName);

        /**
         * 批量更新
         */
        // const res = await collection.updateMany({},{
        //     $set: {
        //         absences: Math.floor(Math.random() * 6)
        //     }
        // });

        /**
         * 遍歷更新
         */
        const cursor = collection.find({});
        
        while (await cursor.hasNext()) {
            const doc = await cursor.next();
            if (doc) {
                const absences = Math.floor(Math.random() * 6);
                await collection.updateOne(
                    { _id: doc._id },
                    { $set: { absences: absences } }
                );

                console.log(`${doc.name} 更新成功`);

            }
        }
    }
}

main();