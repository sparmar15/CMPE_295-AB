import dotenv from 'dotenv';
dotenv.config();
async function ipfsClient() {
  const {create} = await import('ipfs-http-client');
  const projectIdAndSecret =
    process.env.INFURA_PROJECT_ID + ':' + process.env.INFURA_SECRET_ID;
  const client = await create({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    headers: {
      authorization: `Basic ${Buffer.from(projectIdAndSecret).toString(
        'base64',
      )}`,
    },
  });
  return client;
}

export {ipfsClient};
