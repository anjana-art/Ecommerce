import { MongoMemoryServer } from "mongodb-memory-server";
require("dotenv").config();

/* let  CONNECTION_URI = 'mongodb+srv://bhattaanjana0:anjana123@anjana.zcmelmw.mongodb.net/myCollection?retryWrites=true&w=majority&appName=anjana'
 */
export default async function globalSetup(){
    const instance = await MongoMemoryServer.create({
        binary:{
            version:'6.0.4',
        },
    })

    global.__MONGOINSTANCE = instance
    process.env.TEST_CONNECTION_URI = instance.getUri();

}