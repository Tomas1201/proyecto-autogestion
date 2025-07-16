import express from 'express';
import {sequelize} from './Database/Sequelize';
//import carreraRoutes from './Routers/Carrera.router';
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));




app.get('/', (req, res) => {
  res.send('Hello, World!');
});

sequelize.authenticate().then(() => {

    console.log('Database connection established successfully.');
    }).catch((error) => {
    console.error('Unable to connect to the database:', error);
    });




app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});




//app.use('/carreras', carreraRoutes);

export default app;
