import * as axios from 'axios';

const ETH_URL = 'http://178.154.248.132:8081';
const CORDA_URL = 'http://84.201.169.143:10056';

export async function deployKYCContract(privateKey) {
  const url = `${ETH_URL}/ethereum/filestore/deployContract`;
  const res = await axios.post(url, null, {
    params: {
      privateKey,
    },
  })
    .then((x) => x.data);
  return res;
}

export function uploadFileToIPFS(file, privateKey, contractAddress) {
  // eslint-disable-next-line dot-notation
  const url = `${ETH_URL}/ethereum/filestore/init/info`;
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

export function getInitFileStoreEvents(privateKey, contractAddress) {
  // eslint-disable-next-line dot-notation
  const url = `${ETH_URL}/ethereum/filestore/events/initFile`;
  return axios.get(url, {
    params: {
      privateKey,
      contractAddress,
    },
  })
    // get data
    .then((x) => x.data[0]);
}

export function initCrosschainTransaction({
  organisation,
  locality,
  country,
  publicKey,
},
privateKey,
hashOfFile) {
  // eslint-disable-next-line dot-notation
  const url = `${ETH_URL}/crosschain/ethereum/filestore/requester/changeOwner`;
  return axios.post(url, null, {
    params: {
      organisation,
      locality,
      country,
      publicKey,
      privateKey,
      hashOfFile,
    },
  })
    // get data
    .then((x) => x.data);
}

export function getKYCStatesCorda() {
  // eslint-disable-next-line dot-notation
  const url = `${CORDA_URL}/attachments`;
  return axios.get(url)
    // get data
    .then((x) => x.data);
}

/* export function downloadAttachmentByHashCorda(hashOfFileInCorda) {
  // eslint-disable-next-line dot-notation
  const url = `${CORDA_URL}/attachments/${hashOfFileInCorda}`;
  return axios.get(url)
    // get data
    .then((x) => x.data);
}
 */
