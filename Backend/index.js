import express from 'express';
import {orbitRouter} from './Routes/orbit.mjs';
const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/orbit', orbitRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
