import { Request, Response } from 'express';

import { CareerService } from './career-search.services.js';

const CareerServices = new CareerService();

export const CareerController = {
  
  
  async getByName(req: Request, res: Response) {
    const name  = req.params.name;

    try {
      const careers = await CareerServices.getCareersByName(name as string);

      if (!careers) {
        
        res.status(404).json({ message: 'No career with that name were found' });
        return;
      }

      res.status(200).json(careers);
    } catch (error) {
      res.status(500).json({ message: 'Error  to search by name', error: error });
      return;
    }
  },

 
  

};
