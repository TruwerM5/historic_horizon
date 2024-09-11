import { PrismaService } from "../src/prisma.service";
import * as bcrypt from 'bcrypt';

class CreateAuthor {
    constructor(
        private prismaSerivce: PrismaService
        
    ) {}
    async createAuthor() {
        const email = process.env.AUTHOR_EMAIL;
        const rawPassword = process.env.AUTHOR_PASSWORD;
        const hash = await this.generatePassword(rawPassword);

        try {
            const user = await this.prismaSerivce.user.create({
                data: {
                    email,
                    password: hash,
                    username: 'Ray Bradbury',
                    role: "AUTHOR"
                }
            });
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


const author = new CreateAuthor(new PrismaService);

author.createAuthor();