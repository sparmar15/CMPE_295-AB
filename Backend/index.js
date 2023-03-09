import express from 'express';
import {orbitRouter} from './Routes/orbit.mjs';
import {orbitDB} from './orbitDB.mjs';
const app = express();
const port = 3000;

app.use(express.json());

// code to create orbitDB instance
const orbitdb = orbitDB();

app.get('/', (req, res) => {
  res.send('Database Address: ' + orbitdb.address);
});

app.use('/orbit', orbitRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
