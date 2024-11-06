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
    await db.user.update({
        where: { id: databaseUser?.id },
        data: {
            ...values,
        }
    })
    return{success:"Settings Updated"}
}