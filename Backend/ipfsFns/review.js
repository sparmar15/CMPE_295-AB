import fetch from 'node-fetch';
import {pinata} from '../index.js';

// insert new review
async function addReview(reviewData, options) {
  const result = pinata
    .pinJSONToIPFS(reviewData, options)
    .then(result => {
      console.log(result);
      return result;
    })
    .catch(err => {
      return err;
    });
  return result;
}

// get review by id
async function getReviewByHash(cid) {
  const url = 'https://gateway.pinata.cloud/ipfs/' + cid;
  let settings = {method: 'Get'};
  const result = await fetch(url, settings)
    .then(res => {
      return res.json();
    })
    .catch(err => {
      return err;
    });
  return result;
}

// update review by id
async function getFileHash(filters) {
  const result = pinata
    .pinList(filters)
    .then(result => {
      return result.rows[0].ipfs_pin_hash;
    })
    .catch(err => {
      return err;
    });
  return result;
}

// delete review by id
async function deleteFileByHash(cid) {
  const result = await pinata
    .unpin(cid)
    .then(result => {
      console.log(result);
      return result;
    })
    .catch(err => {
      return err;
    });
  return result;
}

export {addReview, getReviewByHash, getFileHash, deleteFileByHash};
