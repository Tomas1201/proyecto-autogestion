import relations from './shared/relations.js'; 
import express from "express";
import generalRouter from "./features/general.router.js"



const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

relations;
app.use('/api/v1/', generalRouter); 






app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
