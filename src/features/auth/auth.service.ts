import {AuthRepository} from "./auth.repository.js";
import {generateToken, verifyToken} from "../../shared/services/jwt.service.js";
import {User} from "./users.model.js";
import {verifyPassword, hashPassword} from "./hashing-auth.service.js"

enum Role {
    ADMIN = 'ADMIN',
    PROFESSOR = 'PROFESSOR',
    STUDENT = 'STUDENT'
}
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



    async validateUser(file: string, password: string){

        const user = await this.authRepository.findUser(file);
        console.log(user);

        if(user === null ){
            return null;
        }else{
            const compare = await verifyPassword(password, user.password);
            
            if(!compare){
                throw new Error("Token no válido");
            }
        const token = generateToken(user.id,file, user.role);   
        
        return token;
        }
    }

     async validateNewUser(userData: User){
        const user = await this.authRepository.findUser(userData.file);
        
        if(user === null && (userData.role === Role.ADMIN || userData.role === Role.PROFESSOR || userData.role === Role.STUDENT)){
             
            userData.password= await hashPassword(userData.password);
            this.authRepository.createUser(userData);
            return;
        }else{
        return user;
        }
    }
}

