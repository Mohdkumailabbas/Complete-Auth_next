/* eslint-disable @typescript-eslint/no-unused-vars */
import { getVerficationTokenByEmail } from "@/app/auth/data/verificationToken";
import {v4 as uuidv4} from "uuid";
import { db } from "./db";


export const generateVerificationToken=async(email:string)=>{
    const token =uuidv4()//enerates a new unique identifier using the uuidv4 function, which creates a universally unique identifier (UUID) in version 4 format
    const expires= new Date((new Date().getTime()+3600 *1000));

    const existingToken = await getVerficationTokenByEmail(email);
    if(existingToken){
        await db.verificationToken.delete({
            where:{
                id:existingToken.id
            }
        })
    }
    const verificationToken= await db.verificationToken.create({
        data:{
            email,
            token,
            expires
        }
    })
    return verificationToken;
}