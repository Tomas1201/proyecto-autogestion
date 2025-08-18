

import { SubjectModel, Subject} from '../../Shared/Models/SubjectModel.js'; 
import { SubjectInterface } from './SubjectInterface.js'; 
import { SubjectRepository } from './SubjectRepository.js'; 
import { FindOptions } from 'sequelize'; 


export interface ISubjectService {
    GetAllSubject(): Promise<Subject[]>;
    GetSubjectById(Id: string): Promise<Subject | null>;
    
    CreateSubject(SubjectData:Subject):Promise<Subject>;
    UpdateSubject(Id: string, SubjectData: Partial<Subject>):Promise<boolean>;
   
}

export class SubjectService implements ISubjectService {
    private SubjectRepository: SubjectInterface;

    
    constructor(subjectRepository: SubjectInterface = new SubjectRepository()) {
        this.SubjectRepository = subjectRepository;
    }

    public async GetAllSubject(): Promise<Subject[]> {
        
        try {
            
            const Careers = await this.SubjectRepository.FindAll();
            return Careers;
        } catch (error) {
            console.error('Service Error: Failed to get all Careers.', error);
            
            throw new Error('Careers could not be retrieved due to an internal error.');
        }
    }

    public async GetSubjectById(Id: string): Promise<Subject | null> {
        console.log(`Service: Requesting Career by ID: ${Id}`);
        try {
            
            const Career = await this.SubjectRepository.FindById(Id);
            return Career;
        } catch (error) {
            console.error(`Service Error: Fail to get the Career ID ${Id}.`, error);
            throw new Error(`Could'nt be recovery a Career by ID ${Id} Because produce an error.`);
        }
    }

    
 
    public async CreateSubject(SubjectData: Subject): Promise<Subject> {
        
        
        if (!SubjectData.Name || SubjectData.Name.trim() === '') {
            

            throw new Error("The Career's Name is mandatory. ");
        }
        

            SubjectData.Name = SubjectData.Name.toLowerCase();

        try {
            console.log(SubjectData);
            const NewSubject = await this.SubjectRepository.Create(SubjectData);
            return NewSubject;
        } catch (error: any) { 
            console.error('Service Error: Faill to creat Subject.', error);
                        
            throw new Error('The Subject could not be created due to an internal error.');
        }
    }

    public async UpdateSubject(Id: string,SubjectData: Subject): Promise<boolean> {        

        try {
          

            const success = await this.SubjectRepository.Update(Id, SubjectData);
            if (!success) {
                
                const exists = await this.SubjectRepository.FindById(Id);
                if (!exists) {
                    throw new Error(`The Subject with ID  ${Id} was not found to update..`);
                }
                throw new Error(`Could not update Subject with ID${Id}.`);
            }
            return success;
        } catch (error) {
            console.error(`Service Error: Failed to update Subject with ID${Id}.`, error);
            throw error; 
        }
    }

   
}