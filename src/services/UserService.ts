import { UserCreationAttributes } from './../models/User';
import { User } from "../models"

export const userService = {
    findByEmail: async (email: string) => {
        const user = await User.findOne({
            where: {
                email
            }
        })

        return user
    },

    create: async (attributes: UserCreationAttributes) => {
        const user = await User.create(attributes)
        return user
    }
}