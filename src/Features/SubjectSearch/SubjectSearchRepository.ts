
import { Op } from "sequelize";
import { Subject, SubjectModel } from "../../Shared/Models/SubjectModel";
import { SubjectSearchInterface } from "./SubjectSearchInterface.js";
export class SubjectSearchRepository implements SubjectSearchInterface{

    
    async FindByName(Name: string): Promise<Subject[] | null> {
            try {
                if (!Name || typeof Name !== 'string') {
                    throw new Error('Invalid name parameter');
                }
                const query = {
                    where: {
                        name: {
                            [Op.like]: `%${Name.toLowerCase()}%`
                        }
                    }
                };
                
                const Subject = await SubjectModel.findAll(query);
                        
                return Subject ? Subject as Subject[] : null;
            } catch (error) {
                console.error('Error to earch  a Subject by Nae :', error);
                throw error;
            }
        }

} 
