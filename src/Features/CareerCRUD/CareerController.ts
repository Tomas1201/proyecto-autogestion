import { Request, Response } from 'express';
import { CareerRepository } from './CareerRepository.js';
import { CareerService, ICareerService } from './CareerServices.js';
const careerRepository = new CareerRepository();
const careerService = new CareerService(careerRepository);
export class CareerController{
 private careerService: ICareerService;
    // se restructuró para que el controlador cumpla con SOLID, debido a que antes tenía const CareerServices = new CareerService(new CareerRepository()); que conectaba con las otras capas.    // Se inyecta la dependencia del servicio a través del constructor.
    // Esto cumple con el Principio de Inversión de Dependencias (DIP).
    constructor(careerService: ICareerService) {
        this.careerService = careerService;
    }

   public async getAll(req: Request, res: Response) {
    try {
      const Careers = await this.careerService.getAllCareers();
      res.status(200).json(Careers);
      return;
    } catch (error) {
      res.status(500).json({ message: 'Error to get Career', error: error });
      return;
    }
  }

  async getById(req: Request, res: Response) {

    const id = req.params.Id;

    try {
      const Career = await this.careerService.getCareerById(id);

      if (!Career) {
        res.status(404).json({ message: 'Career not found' });
        return;
      }

      res.status(200).json(Career);
      return;
    } catch (error) {
      res.status(500).json({ message: 'Error to search Career', error: error });
      return;
    }
  }

  

  async create(req: Request, res: Response) {
    try {
      
      const Career = await this.careerService.createCareer(req.body);
            res.status(201).json(Career);
      return;
    } catch (error) {
      
         res.status(400).json({ message: error });
        
        

      res.status(500).json({ message: 'Error when creating a Career', error: error });
        return;
    }
  }

  async update(req: Request, res: Response) {
    const id = req.params.Id;
    const data = req.body;
  
    try {
      const updated = await this.careerService.UpdateCareer(id, data);

      if (!updated) {
        res.status(404).json({ message: 'Career not found or no changes' });
        return;
      }

      res.status(200).json({ message: 'Career updated correctly' });
      return
    } catch (error) {
      res.status(500).json({ message: 'Error updating Career', error: error });
      return;
    }
  }



};
const careerController = new CareerController(careerService);
export { careerController };
