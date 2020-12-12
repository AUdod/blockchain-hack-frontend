/* eslint-disable no-console */
import Vue from 'vue';
import Vuex from 'vuex';
import { deployKYCContract, uploadFileToIPFS } from '@/services/api.service';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    privateKey: '0x4bf40ab02f60d90e348b2fc6a88ae503b7c4f47f2972c30bee5704321f70b1bc',
    fileInfo: '',
    contractAddress: '',
  },
  mutations: {
    setfileInfoMutation(state, fileInfo) {
      state.fileInfo = fileInfo;
    },
    setContractAddressMutation(state, contractAddress) {
      state.contractAddress = contractAddress;
    },
  },
  actions: {
    deployKYCContractAction({ commit, state }) {
      deployKYCContract(state.privateKey).then((x) => {
        commit('setContractAddressMutation', x);
      });
    },
    uploadFileToIPFSAction({ commit, state }, file) {
      uploadFileToIPFS(file, state.privateKey, state.contractAddress).then((x) => {
        console.log('fileInfo', x);
        commit('setfileInfoMutation', x);
      });
    },
  },
  modules: {
  },
});
