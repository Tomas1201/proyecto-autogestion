

export const AlumnoRepository = {  
    findbyPk: async (id) => {
        try {
            //const alumno = await Alumno.findByPk(id);
            //return alumno;
        } catch (error) {
            console.error('Error fetching alumno by ID:', error);
            throw new Error('Database error');
        }
    }
}