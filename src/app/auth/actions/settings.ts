/* eslint-disable @typescript-eslint/no-unused-expressions */
"use server"

import { CurrentUser } from "@/lib/auth"
import { SettingSchema } from "@/schemas"
import { z } from "zod"
import { getUserById } from "@/app/auth/data/user"
import { db } from "@/lib/db"

export const settings = async (values: z.infer<typeof SettingSchema>) => {
    const user = await CurrentUser()
    if (!user || !user.id)
        return { error: "Access Restricted" }
    const databaseUser = await getUserById(user.id)
    if(user.isOAuth){
        values.email=undefined,
        values.isTwoFactorEnabled=undefined,
        values.password=undefined,
        values.newPassword=undefined
    }
    await db.user.update({
        where: { id: databaseUser?.id },
        data: {
            ...values,
        }
    })
    return{success:"Settings Updated"}
}