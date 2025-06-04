
const getAlumno = async (req, res) => {
  const { id } = req.params;
  try {
    const alumno = await req.alumnoRepository.getById(id);
    if (!alumno) {
      return res.status(404).json({ message: 'Alumno not found' });
    }
    res.status(200).json(alumno);
  } catch (error) {
    console.error('Error fetching alumno:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
const getAllAlumnos = async (req, res) => {
  try {
    const alumnos = await req.alumnoRepository.getAll();
    res.status(200).json(alumnos);
  } catch (error) {
    console.error('Error fetching alumnos:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
const createAlumno = async (req, res) => {
  const { nombre, apellido, email, fechaNacimiento } = req.body;
  try {
    const newAlumno = await req.alumnoRepository.create({ nombre, apellido, email, fechaNacimiento });
    res.status(201).json(newAlumno);
  } catch (error) {
    console.error('Error creating alumno:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
const updateAlumno = async (req, res) => {
  const { id } = req.params;
  const { nombre, apellido, email, fechaNacimiento } = req.body;
  try {
    const updatedAlumno = await req.alumnoRepository.update(id, { nombre, apellido, email, fechaNacimiento });
    if (!updatedAlumno) {
      return res.status(404).json({ message: 'Alumno not found' });
    }
    res.status(200).json(updatedAlumno);
  } catch (error) {
    console.error('Error updating alumno:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
const deleteAlumno = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await req.alumnoRepository.delete(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Alumno not found' });
    }
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting alumno:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
export const AlumnoController = {
    getAlumno,
    getAllAlumnos,
    createAlumno,
    updateAlumno,
    deleteAlumno
    };