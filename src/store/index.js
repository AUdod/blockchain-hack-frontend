/* eslint-disable no-console */
import Vue from 'vue';
import Vuex from 'vuex';
import {
  deployKYCContract,
  uploadFileToIPFS,
  getInitFileStoreEvents,
  initCrosschainTransaction,
  getKYCStatesCorda,
} from '@/services/api.service';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    privateKey: '0x4bf40ab02f60d90e348b2fc6a88ae503b7c4f47f2972c30bee5704321f70b1bc',
    fileInfo: '',
    contractAddress: '',
    eventInfo: '',
    organisationInfo: {
      organisation: 'PartyA',
      locality: 'London',
      country: 'GB',
      publicKey: '0x98525aA67d3C3d1E3f27e7947bb2f048D1A732F6',
    },
    transactionHash: '',
    hashOfFileInCorda: '',
  },
  mutations: {
    setEventInfoMutation(state, eventInfo) {
      state.eventInfo = eventInfo;
    },
    setfileInfoMutation(state, fileInfo) {
      state.fileInfo = fileInfo;
    },
    setContractAddressMutation(state, contractAddress) {
      state.contractAddress = contractAddress;
    },
    setTransactionHashMutation(state, transactionHash) {
      state.transactionHash = transactionHash;
    },
    setHashOfFileCordaMutation(state, hashOfFileInCorda) {
      state.hashOfFileInCorda = hashOfFileInCorda;
    },
  },
  actions: {
    deployKYCContractAction({ commit, state }) {
      deployKYCContract(state.privateKey).then((x) => {
        commit('setContractAddressMutation', x);
      });
    },
    uploadFileToIPFSAction({ dispatch, commit, state }, file) {
      uploadFileToIPFS(file, state.privateKey, state.contractAddress).then((x) => {
        commit('setfileInfoMutation', x);
      }).then(() => {
        dispatch('getInitFileStoreEventsAction');
      });
    },
    getInitFileStoreEventsAction({ dispatch, commit, state }) {
      getInitFileStoreEvents(state.privateKey, state.contractAddress).then((x) => {
        commit('setEventInfoMutation', x);
      }).then(() => {
        dispatch('initCrosschainTransactionAction');
      });
    },
    initCrosschainTransactionAction({ dispatch, commit, state }) {
      initCrosschainTransaction(state.organisationInfo,
        state.privateKey,
        state.eventInfo.hashOfFile).then((x) => {
        commit('setTransactionHashMutation', x);
      }).then(() => {
        dispatch('getKYCStatesCordaAction');
      });
    },
    getKYCStatesCordaAction({ commit, state }) {
      getKYCStatesCorda(state.privateKey, state.contractAddress).then((x) => {
        commit('hashOfFileInCorda', x);
      });
    },
  },
  modules: {
  },
});
