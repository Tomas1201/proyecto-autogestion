import { Request, Response } from 'express';
import { SubjectRepository } from './SubjectRepository.js';
import { SubjectService } from './SubjectService.js';

const SubjectServices = new SubjectService();

export const SubjectController = {
  async GetAll(req: Request, res: Response) {
    try {
      const Subject = await SubjectServices.GetAllSubject();
      res.status(200).json(Subject);
      return;
    } catch (error) {
      res.status(500).json({ message: 'Error to get Subject', error: error });
      return;
    }
  },

  async GetById(req: Request, res: Response) {

    const id = req.params.Id;

    try {
      const Subject = await SubjectServices.GetSubjectById(id);

      if (Subject) {
        res.status(404).json({ message: 'Subject not found' });
        return;
      }

      res.status(200).json(Subject);
      return;
    } catch (error) {
      res.status(500).json({ message: 'Error to search Subject', error: error });
      return;
    }
  },

  

  async Create(req: Request, res: Response) {
    try {
      console.log(req.body);
      const Subject = await SubjectServices.CreateSubject(req.body);
            res.status(201).json(Subject);
      return;
    } catch (error) {
      if (error === 'There is already a Subject with that name.') {
         res.status(400).json({ message: error });
          return;
        }

      res.status(500).json({ message: 'Error when creating a Subject', error: error });
        return;
    }
  },

  async Update(req: Request, res: Response) {
    const id = req.params.Id;
    const data = req.body;
  
    try {
      const updated = await SubjectServices.UpdateSubject(id, data);

      if (!updated) {
        res.status(404).json({ message: 'Subject not found or no changes' });
        return;
      }

      res.status(200).json({ message: 'Subject updated correctly' });
      return
    } catch (error) {
      res.status(500).json({ message: 'Error updating Subject', error: error });
      return;
    }
  },



};