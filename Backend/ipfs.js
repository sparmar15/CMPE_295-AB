async function ipfsClient() {
  const {create} = await import('ipfs-http-client');
  const projectIdAndSecret =
    '2NCwUfTwoFruReI1zAN8UELE1KV:79b7dd39388d0b0bc75d2a81a5c3c364';
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
