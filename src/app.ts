
// app.ts
import express from 'express';
import { sequelizeDB } from './Database/Sequelize.js';
import CarreraModel from './Carrera/CarreraModel.js'; // ✅ Importa el modelo de Carrera

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Función asíncrona para inicializar la base de datos y el servidor
async function initializeApp() {
  try {

      CarreraModel.findAll();
    
    await sequelizeDB.sync({ alter: true }); 
    console.log('Todos los modelos fueron sincronizados exitosamente con la base de datos.');
    console.log(sequelizeDB.models+" app.ts");
    app.get('/', (req, res) => {
      res.send('Hello, World!');
    });

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error('Error al inicializar la aplicación o la base de datos:', error);
    process.exit(1); // Sale de la aplicación si hay un error crítico
  }
}

initializeApp(); 



export default app;


