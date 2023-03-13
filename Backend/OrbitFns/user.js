import {db} from './db.js';

async function createUser(username, password) {
  await db.put({_id: username, doc: 'users', password: password});
}

async function getUser(username) {
  const user = await db.get(username);
  return user;
}

export {createUser, getUser};
