import { sign } from "jsonwebtoken";


class GenerateTokenProvider{

    async execute(userId: string){
       
        //UUID generator 43c68a1c-47bd-4d22-ac5f-8506fe5d56fa
        const token = sign({}, "43c68a1c-47bd-4d22-ac5f-8506fe5d56fa", {
            subject: userId,
            expiresIn: "20s", 
        });  

        return token;
    }
}

export {GenerateTokenProvider}