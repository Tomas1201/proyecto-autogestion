
import { CarreraInterface } from './Carrera.interface';
import  { Carrera, CarreraModel } from './CarreraModel'; // Asegúrate de que la ruta sea correcta
import { Op } from 'sequelize';

export class CarreraRepository implements CarreraInterface {
    // Aquí irían las implementaciones de los métodos definidos en CarreraInterface
    // Implementación para obtener todas las carreras
    async findAll(): Promise<Carrera[]> {
         try {
            const carreras = await CarreraModel.findAll();
            return carreras ? carreras as Carrera[] : [];
        } catch (error) {
            console.error('Error fetching all Carreras:', error);
            throw new Error('Database error');
        }      
       
    }
    
    async findById(id: number): Promise<Carrera | null> {
        try {
            const carrera = await CarreraModel.findByPk(id);
            return carrera ? carrera as Carrera : null;
        } catch (error) {
            console.error('Error fetching de la carrera por ID:', error);
            throw new Error('Database error');
        }
    }
    
    async findByName(name: string): Promise<Carrera[] | null> {
        try {
            if (!name || typeof name !== 'string') {
                throw new Error('Invalid name parameter');
            }
            const query = {
                where: {
                    nombre: {
                        [Op.like]: `%${name.toLowerCase()}%`
                    }
                }
            };
            
            const carreras = await CarreraModel.findAll(query);
                    
            return carreras ? carreras as Carrera[] : null;
        } catch (error) {
            console.error('Error en la busqueda de la Carrera por Nombre:', error);
            throw error;
        }
    }
    
      async create(carreraData: Omit<Carrera, 'id'>): Promise<Carrera> {
        try {
            
            
            const ifExist = await CarreraModel.findOne({ where: { nombre: carreraData.nombre } });

            if (ifExist) {
                
                throw new Error(`La Carrera con el nombre '${carreraData.nombre}' ya existe.`);
            }

            
            const newCarrera = await CarreraModel.create(carreraData);
            return newCarrera as Carrera;

        } catch (error) {
            console.error('Error creating Carrera:', error);
            
            throw error;
        }
    }
            
      
        

        
        async update(id: number, carreraData: Partial<Carrera>): Promise<boolean> {
            try {
                const [rowsUpdated] = await CarreraModel.update(carreraData, {
                 where: { id },
           });

           return rowsUpdated > 0;
           } catch (error) {
             console.error(`Error al actualizar la carrera con ID ${id}:`, error);
             throw new Error('Error al actualizar la carrera');
            }
} 
    
    async delete(id: number): Promise<boolean> { 
        try {
            const rowsDeleted = await CarreraModel.destroy({
                where: { id },
            });
            return rowsDeleted > 0;
        } catch (error) {
            console.error(`Error deleting Carrera with ID ${id}:`, error);
            throw new Error('Database error during deletion');
        }
    }      



}
          

            // Implementación para actualizar una carrera existente
         
            
            
            /*const resultado = await Carrera.update({ nombre: 'Nuevo' }, { where: { id: 1 } });
                console.log(resultado); // --> [1]

                const [rowsUpdated] = resultado;
                esto es equivalente a--->
                const rowsUpdated = resultado[0];

 */
    