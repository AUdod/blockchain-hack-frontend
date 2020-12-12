import * as axios from 'axios';

const BASE_URL = 'http://178.154.248.132:8081';

export async function deployKYCContract(privateKey) {
  const url = `${BASE_URL}/ethereum/filestore/deployContract`;
  const res = await axios.post(url, null, {
    params: {
      privateKey,
    },
  })
    .then((x) => x.data);
  return res;
}

export function uploadFileToIPFS(file, privateKey, contractAddress) {
  console.log('file', file);
  // eslint-disable-next-line dot-notation
  /* file.set('file', file.get('photos')); */
  const url = `${BASE_URL}/ethereum/filestore/init/info`;
  return axios.post(url, file, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    params: {
      privateKey,
      contractAddress,
    },
  })
    // get data
    .then((x) => x.data);
}
