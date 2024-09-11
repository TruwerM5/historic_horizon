import { PrismaService } from "../src/prisma.service";
import * as bcrypt from 'bcrypt';

class CreateAdmin {
    constructor(
        private prismaSerivce: PrismaService
        
    ) {}
    async createAdmin() {
        const email = process.env.ADMIN_EMAIL;
        const rawPassword = process.env.ADMIN_PASSWORD;
        const hash = await this.generatePassword(rawPassword);

        try {
            const user = await this.prismaSerivce.user.create({
                data: {
                    email,
                    password: hash,
                    username: 'Alex Mercer',
                    role: "ADMIN"
                }
            });
            console.log(user);
        } catch(e: any) {
            console.log("Error: ", e);
        }
    }
    async generatePassword(rawPassword: string) {
        const salt = Number(process.env.SALT);
        console.log(salt);
        return await bcrypt.hash(rawPassword, salt);
    }
}

const admin = new CreateAdmin(new PrismaService);

admin.createAdmin();