import relations from './shared/relations.js'; 
import express from "express";
import generalRouter from "./features/general.router.js"
import cors from 'cors';


const app = express();
const PORT = process.env.PORT || 3000;

const corsOptions = {
    
    origin: 'http://localhost:4200', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, 
    optionsSuccessStatus: 204
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

relations;

app.use('/api/v1/', generalRouter); 






app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
