import { Request, Response } from 'express';
import { CarreraRepository } from '../Carrera/Carrera.repository.js';
import { CarreraService } from './Carrera.Services.js';

const CarreraServices = new CarreraService();

export const CarreraController = {
  async getAll(req: Request, res: Response) {
    try {
      const carreras = await CarreraServices.getAllCarreras();
      res.status(200).json(carreras);
      return;
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener las carreras', error: error });
      return;
    }
  },

  async getById(req: Request, res: Response) {
    const id = parseInt(req.params.id);

    try {
      const carrera = await CarreraServices.getCarreraById(id);

      if (!carrera) {
        res.status(404).json({ message: 'Carrera no encontrada' });
        return;
      }

      res.status(200).json(carrera);
      return;
    } catch (error) {
      res.status(500).json({ message: 'Error al buscar la carrera', error: error });
      return;
    }
  },

  async getByName(req: Request, res: Response) {
    const nombre  = req.params.name;

    try {
      const carreras = await CarreraServices.getCarrerasByName(nombre as string);

      if (!carreras) {
        
        res.status(404).json({ message: 'No se encontraron carreras con ese nombre' });
        return;
      }

      res.status(200).json(carreras);
    } catch (error) {
      res.status(500).json({ message: 'Error al buscar por nombre', error: error });
      return;
    }
  },

  async create(req: Request, res: Response) {
    try {
      const carrera = await CarreraServices.createCarrera(req.body);
      res.status(201).json(carrera);
      return;
    } catch (error) {
      if (error === 'Ya existe una carrera con ese nombre') {
         res.status(400).json({ message: error });
          return;
        }

      res.status(500).json({ message: 'Error al crear la carrera', error: error });
        return;
    }
  },

  async update(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const data = req.body;

    try {
      const updated = await CarreraServices.updateCarrera(id, data);

      if (!updated) {
        res.status(404).json({ message: 'Carrera no encontrada o sin cambios' });
        return;
      }

      res.status(200).json({ message: 'Carrera actualizada correctamente' });
      return
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar carrera', error: error });
      return;
    }
  },


  async delete(req: Request, res: Response) {
    const id = parseInt(req.params.id);

    try {
      const deleted = await CarreraServices.deleteCarrera(id);

      if (!deleted) {
        res.status(404).json({ message: 'Carrera no encontrada' });
        return;
      }

      res.status(200).json({ message: 'Carrera eliminada correctamente' });
      return;
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar la carrera', error: error });
      return;
    }
  } 

};
