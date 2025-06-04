import express from 'express';
const router = express.Router();
import './Controllers/AlumnosController.js'; // Import the AlumnosController
import { AlumnoController } from '../Controllers/AlumnoController.js';
// Import all controllers


router.get('/',AlumnoController.getAllAlumnos);

// Add routes for each controller

router.get('/alumnos', (req, res) => {
  // Logic to get all alumnos
  res.send('List of alumnos');
});
router.get('/alumnos/:id', (req, res) => {
  const id = req.params.id;
  // Logic to get a specific alumno by id
  res.send(`Details of alumno with id ${id}`);
});
router.post('/alumnos', (req, res) => {
  const newAlumno = req.body;
  // Logic to create a new alumno
  res.status(201).send(`Alumno created with data: ${JSON.stringify(newAlumno)}`);
}
);
router.put('/alumnos/:id', (req, res) => {
  const id = req.params.id;
  const updatedAlumno = req.body;
  // Logic to update an existing alumno by id
  res.send(`Alumno with id ${id} updated with data: ${JSON.stringify(updatedAlumno)}`);
});
router.delete('/alumnos/:id', (req, res) => {
  const id = req.params.id;
  // Logic to delete an alumno by id
  res.send(`Alumno with id ${id} deleted`);
} );