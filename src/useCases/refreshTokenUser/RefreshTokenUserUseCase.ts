import { client } from "../../prisma/client"
import { GenerateTokenProvider } from "../../provider/GenerateTokenProvider";
import dayjs from "dayjs";
import { GenerateRefreshToken } from "../../provider/GenerateRefreshToken";

class RefreshTokenUserUseCase{

    async execute(refresh_token: string){

        let refreshToken = await client.refreshToken.findFirst({
            where: {
                id: refresh_token,
            }
        });

        if (!refreshToken)
          throw new Error("Refresh Token invalid");

        const refreshTokenExpired = dayjs().isAfter(dayjs.unix(refreshToken.expiresIn));

        if (refreshTokenExpired){
            await client.refreshToken.deleteMany({
                where: {
                    userId: refreshToken.userId
                }
            })
            const generateRefreshToken = new GenerateRefreshToken();
            refreshToken = await generateRefreshToken.execute(refreshToken.userId);

        }

        const generateToken = new GenerateTokenProvider();
        const token = await generateToken.execute(refreshToken.userId);
       
        return { token, refreshToken };
  
    }

}

export {RefreshTokenUserUseCase}