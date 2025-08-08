import { Request, Response } from 'express';
import { CareerRepository } from './CareerRepository.js';
import { CareerService } from './CareerServices.js';

const CareerServices = new CareerService();

export const CareerController = {
  async getAll(req: Request, res: Response) {
    try {
      const Careers = await CareerServices.getAllCareers();
      res.status(200).json(Careers);
      return;
    } catch (error) {
      res.status(500).json({ message: 'Error to get Career', error: error });
      return;
    }
  },

  async getById(req: Request, res: Response) {
    const id = parseInt(req.params.id);

    try {
      const Career = await CareerServices.getCareerById(id);

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
  },

  

  async create(req: Request, res: Response) {
    try {
      const Career = await CareerServices.createCareer(req.body);
      res.status(201).json(Career);
      return;
    } catch (error) {
      if (error === 'There is already a Career with that name.') {
         res.status(400).json({ message: error });
          return;
        }

      res.status(500).json({ message: 'Error when creating a Career', error: error });
        return;
    }
  },

  async update(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const data = req.body;

    try {
      const updated = await CareerServices.UpdateCareer(id, data);

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
  },


  async delete(req: Request, res: Response) {
    const id = parseInt(req.params.id);

    try {
      const deleted = await CareerServices.deleteCareer(id);

      if (!deleted) {
        res.status(404).json({ message: 'Career not found' });
        return;
      }

      res.status(200).json({ message: 'Career successfully removed' });
      return;
    } catch (error) {
      res.status(500).json({ message: 'Error deleting the Career', error: error });
      return;
    }
  } 

};
