// import express from 'express';
// import {
//   addRider,
//   getRiderById,
//   updateRiderById,
//   deleteRiderById,
// } from '../OrbitFns/rider.js';

// const riderRoute = express.Router();

// // Define endpoints for Rider document
// riderRoute.post('/', async (req, res) => {
//   const rider = await addRider(req.body);
//   res.status(201).json(rider);
// });

// riderRoute.get('/:id', async (req, res) => {
//   const rider = await getRiderById(req.params.id);
//   console.log(rider);
//   res.status(200).json(rider);
// });

// riderRoute.put('/:id', async (req, res) => {
//   const rider = await updateRiderById(req.params.id, req.body);
//   res.status(200).json(rider);
// });

// riderRoute.delete('/:id', async (req, res) => {
//   await deleteRiderById(req.params.id);
//   res.sendStatus(204);
// });

// export {riderRoute};
