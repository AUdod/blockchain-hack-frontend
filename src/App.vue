<template>
  <div id="app">
    <Particles id="tsparticles" :options="particlesConfig" />

    <div class="main-container">
      <h1>Blockchain Hack</h1>
      <h2>FintechSquad's solution of 4th case</h2>
      <div>
        <p>
          <b>Private key</b>
        </p>
        <div class="code">
          <code>{{ privateKey }}</code>
        </div>
      </div>
      <div v-if="contractAddress">
        <p>
          <b>Contract Address</b>
        </p>
        <div class="code">
          <code>{{ contractAddress }}</code>
        </div>
      </div>
      <FileUpload />
      <div v-if="fileInfo">
        <b>File info</b>
        <div class="code">
        <div v-for="(value, name) in fileInfo" :key="name">
          <div v-if="value">
              <code>--- {{name}} --- </code> <br>
              <code>{{ value }}</code>
          </div>
        </div>

        </div>
      </div>
      <div v-if="eventInfo">
        <b>Event info</b>
        <div class="code">
        <div v-for="(value, name) in eventInfo" :key="name" >
          <div v-if="value" >
              <code>--- {{name}} ---</code> <br>
              <code>{{ value }}</code>
          </div>
        </div>

        </div>
      </div>
      <div v-if="transactionHash">
        <p>
          <b>Transaction hash</b>
        </p>
        <div class="code">
          <code>{{ transactionHash }}</code>
        </div>
      </div>
      <div v-if="hashOfFileInCorda">
        <p>
          <b>Info of file in Corda</b>
        </p>
        <div class="code">
        <div v-for="(value, name) in hashOfFileInCorda" :key="name" >
          <div v-if="value" >
              <code>--- {{name}} ---</code> <br>
              <code>{{ value }}</code>
          </div>
        </div>

        </div>
        <div class="container btn-container">
          <p>UnZip and set file extention to check the file</p>
        <a class="btn"
          :href="cordaDownloadUrl + hashOfFileInCorda.hashOfFile">
          Get file from Corda
        </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import FileUpload from './components/FileUpload.vue';
// eslint-disable-next-line no-unused-vars
import particlesConfig from './particlesConfig';

export default {
  name: 'App',
  data() {
    return {
      particlesConfig,
      cordaDownloadUrl: 'http://84.201.169.143:10056/attachments/',
    };
  },
  components: {
    FileUpload,
  },
  created() {
    this.$store.dispatch('deployKYCContractAction');
  },
  mounted() {
    this.$nextTick(() => document.body.classList.add('app-mounted'));
  },
  computed: {
    ...mapState({
      privateKey: 'privateKey',
      contractAddress: 'contractAddress',
      fileInfo: 'fileInfo',
      eventInfo: 'eventInfo',
      transactionHash: 'transactionHash',
      hashOfFileInCorda: 'hashOfFileInCorda',
    }),
  },
};
</script>

<style>
body {
  padding: 0;
  margin: 0;
  font-family: "Oswald", sans-serif;
  color: black;
  font-size: 16px;
}

h1 {
  font-size: 100px;
  margin-bottom: 10px;
  margin-top: -86px;
  letter-spacing: 0.02em;
}
h2 {
  font-size: 45px;
  margin: 10px 0;
}
b {
  font-size: 1.4rem;
}
.main-container {
  background-color: rgb(255, 255, 255);
  max-width: 900px;
  margin: 150px auto 50px auto;
  padding: 1rem;
}
#tsparticles {
  z-index: -1;
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
}

#tsparticles canvas {
  background: rgb(209, 155, 169);
  background: linear-gradient(343deg, rgba(209, 155, 169, 1) 0%, rgba(174, 141, 222, 1) 100%);
}

.container {
  margin-top: 15px;
  text-align: center;
}

.btn {
  text-decoration: none;
  color: #000;
  font-size: 17px;
  text-align: center;
  letter-spacing: 0.1em;
  padding: 17px 47px;
  border: 1px solid #000;
  width: 238px;
  transition: all 0.5s ease;
}

.btn-container {
  margin: 50px;
  /* height: 50px; */
}

.btn:hover {
  background: rgb(61, 61, 61);
  color: rgb(255, 255, 255);
}

.code {
  border-radius: 5px;
  padding: 5px 15px;
  background-color: #333;
  color: greenyellow;
  overflow-wrap: break-word;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}
footer {
  width: 100%;
  text-align: center;
  text-shadow: #fff;
  margin-bottom: 40px;
}
</style>
