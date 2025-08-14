import { Request, Response } from 'express';

import { CareerService } from './CareerSearchServices.js';

const CareerServices = new CareerService();

export const CareerController = {
  
  
  async getByName(req: Request, res: Response) {
    const Name  = req.params.Name;

    try {
      const Careers = await CareerServices.getCareersByName(Name as string);

      if (!Careers) {
        
        res.status(404).json({ message: 'No races with that Name were found' });
        return;
      }

      res.status(200).json(Careers);
    } catch (error) {
      res.status(500).json({ message: 'Error  to search by Name', error: error });
      return;
    }
  },

 
  

};
