import { Request, Response } from 'express';
import { CarreraRepository } from '../Carrera/Carrera.repository.ts';

const CarreraRepositories = new CarreraRepository();

export const CarreraController = {
  async getAll(req: Request, res: Response) {
    try {
      const carreras = await CarreraRepositories.findAll();
      res.status(200).json(carreras);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener las carreras', error: error.message });
    }
  },

  async getById(req: Request, res: Response) {
    const id = parseInt(req.params.id);

    try {
      const carrera = await CarreraRepositories.findById(id);

      if (!carrera) {
        return res.status(404).json({ message: 'Carrera no encontrada' });
      }

      res.status(200).json(carrera);
    } catch (error) {
      res.status(500).json({ message: 'Error al buscar la carrera', error: error.message });
    }
  },

  async getByName(req: Request, res: Response) {
    const { nombre } = req.query;

    try {
      const carreras = await CarreraRepositories.findByName(nombre as string);

      if (!carreras) {
        return res.status(404).json({ message: 'No se encontraron carreras con ese nombre' });
      }

      res.status(200).json(carreras);
    } catch (error) {
      res.status(500).json({ message: 'Error al buscar por nombre', error: error.message });
    }
  },

  async create(req: Request, res: Response) {
    try {
      const carrera = await CarreraRepositories.create(req.body);
      res.status(201).json(carrera);
    } catch (error) {
      if (error.message === 'Ya existe una carrera con ese nombre') {
        return res.status(400).json({ message: error.message });
      }

      res.status(500).json({ message: 'Error al crear la carrera', error: error.message });
    }
  },

  async update(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const data = req.body;

    try {
      const updated = await CarreraRepositories.update(id, data);

      if (!updated) {
        return res.status(404).json({ message: 'Carrera no encontrada o sin cambios' });
      }

      res.status(200).json({ message: 'Carrera actualizada correctamente' });
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar carrera', error: error.message });
    }
  },
};
