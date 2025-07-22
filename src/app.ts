import express from 'express';
import { sequelizeDB } from './Database/Sequelize.js';
import relaciones from './Database/Relaciones.js';
import carreraRouter from './Carrera/Carrera.router.js';
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/carrera', carreraRouter);

 relaciones;
  
    
// Importar rutas   

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });

export default app;


