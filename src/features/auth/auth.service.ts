import {AuthRepository} from "./auth.repository.js";
import {generateToken, verifyToken} from "../../shared/services/jwt.service.js";
import {User} from "./users.model.js";
import {verifyPassword, hashPassword} from "./hashing-auth.service.js"

export class AuthService{
    static instance: AuthService;
    static getInstance(): AuthService {
        if (!AuthService.instance) {
            AuthService.instance = new AuthService();
        }
        return AuthService.instance;
    }
    private authRepository: AuthRepository;

    constructor() {
        this.authRepository = AuthRepository.getInstance();
    }

    async validateUser(email: string, password_hash: string){
        const user = await this.authRepository.findUser(email);
        console.log(user);

        if(user === null ){
            return null;
        }else{
            const compare = await verifyPassword(password_hash, user.password);
            
            if(!compare){
                throw new Error("Token no válido");
            }
        const token = generateToken(user.id, user.role);   
        
        return token;
        }
    }

     async validateNewUser(userData: User){
        const user = await this.authRepository.findUser(userData.email);
        
        if(user === null ){
             
            userData.password= await hashPassword(userData.password);
            this.authRepository.createUser(userData);
            return;
        }else{
        return user;
        }
    }
}

