import mongoose from "mongoose";
import {beforeAll , afterAll} from '@jest/globals'

import {connectDB} from '../db.js'

beforeAll (async()=>{
    await connectDB;
})

afterAll(async()=>{
    await mongoose.disconnect()
})