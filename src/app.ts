import express from 'express';
import { sequelizeDB } from './Database/Sequelize.js';
import relaciones from './Database/Relaciones.js';
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

 relaciones;
  
    console.log(sequelizeDB.models.Carrera);
    app.get('/', (req, res) => {
      res.send('Hello, World!');
    });

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });

export default app;


