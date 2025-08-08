import { Request, Response } from 'express';

import { CareerService } from './CareerSearchServices.js';

const CareerServices = new CareerService();

export const CareerController = {
  
  
  async getByName(req: Request, res: Response) {
    const name  = req.params.name;

    try {
      const Careers = await CareerServices.getCareersByName(name as string);

      if (!Careers) {
        
        res.status(404).json({ message: 'No races with that name were found' });
        return;
      }

      res.status(200).json(Careers);
    } catch (error) {
      res.status(500).json({ message: 'Error  to search by name', error: error });
      return;
    }
  },

 
  

};
