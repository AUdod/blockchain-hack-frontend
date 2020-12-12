<template>
  <div>
    <div class="container">
      <!--UPLOAD-->
      <transition name="fade" mode="out-in">
      <form enctype="multipart/form-data" novalidate v-if="isInitial || isSaving">
        <h2>Upload image</h2>
        <div class="dropbox">
          <input
            type="file"
            :name="uploadFieldName"
            :disabled="isSaving"
            @change="filesChange($event.target.name, $event.target.files);
            fileCount = $event.target.files.length"
            accept="image/*" class="input-file">
            <p v-if="isInitial">
              Drag your file here to begin<br> or click to browse
            </p>
            <p v-if="isSaving">
              Uploading {{ fileCount }} files...
            </p>
        </div>
      </form>
      <!--SUCCESS-->
      <div v-if="isSuccess" class="uploadResult">
        <h2>File uploaded successfully.</h2>
        <p>
          <button class="btn" href="javascript:void(0)" @click="reset()">Change image</button>
        </p>
        <ul class="list-unstyled">
          <li v-for="item in uploadedFiles" :key="item.url">
            <img :src="item.url" class="img-responsive img-thumbnail" :alt="item.originalName">
          </li>
        </ul>
        <p>
          <button class="btn" href="javascript:void(0)" @click="send()">Send to blockchain</button>
        </p>
      </div>
      <!--FAILED-->
      <div v-if="isFailed" class="uploadResult">
        <h2>Uploaded failed.</h2>
        <p>
          <a href="javascript:void(0)" @click="reset()">Try again</a>
        </p>
        <pre>{{ uploadError }}</pre>
      </div>
      </transition>
    </div>
  </div>
</template>

<script>
// swap as you need
import createPreview from '../services/preview.service'; // fake service
// import { upload } from './file-upload.service';   // real service
import wait from '../utils';

const STATUS_INITIAL = 0; const STATUS_SAVING = 1; const STATUS_SUCCESS = 2; const
  STATUS_FAILED = 3;

export default {
  name: 'FileUpload',
  data() {
    return {
      uploadedFiles: [],
      uploadError: null,
      currentStatus: null,
      uploadFieldName: 'file',
      file: null,
    };
  },
  computed: {
    isInitial() {
      return this.currentStatus === STATUS_INITIAL;
    },
    isSaving() {
      return this.currentStatus === STATUS_SAVING;
    },
    isSuccess() {
      return this.currentStatus === STATUS_SUCCESS;
    },
    isFailed() {
      return this.currentStatus === STATUS_FAILED;
    },
  },
  methods: {
    send() {
      this.$store.dispatch('uploadFileToIPFSAction', this.file);
    },
    reset() {
      // reset form to initial state
      this.currentStatus = STATUS_INITIAL;
      this.uploadedFiles = [];
      this.uploadError = null;
    },
    save(formData) {
      // upload data to the server
      this.currentStatus = STATUS_SAVING;

      createPreview(formData)
        .then(wait(0)) // DEV ONLY: wait for 1.5s
        .then((x) => {
          this.uploadedFiles = [].concat(x);
          this.currentStatus = STATUS_SUCCESS;
        })
        .catch((err) => {
          this.uploadError = err.response;
          this.currentStatus = STATUS_FAILED;
        });
    },
    filesChange(fieldName, fileList) {
      // handle file changes
      const formData = new FormData();

      if (!fileList.length) return;

      // append the files to FormData
      Array
        .from(Array(fileList.length).keys())
        // eslint-disable-next-line array-callback-return
        .map((x) => {
          formData.append(fieldName, fileList[x], fileList[x].name);
        });

      // save it
      this.save(formData);
      this.file = formData;
    },
  },
  mounted() {
    this.reset();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
ul{
  list-style: none;
  padding: 0;
}
.img-thumbnail{
  max-width: 100%;
  max-height: 300px;
}
.dropbox {
    outline: 2px dashed grey; /* the dash box */
    outline-offset: -10px;
    background: rgb(218, 218, 218);
    color: dimgray;
    padding: 10px 10px;
    min-height: 100px; /* minimum height */
    max-width: 500px;
    margin: auto;
    position: relative;
    cursor: pointer;
    transition: all 0.5s ease;
  }

  .input-file {
    opacity: 0; /* invisible but it's there! */
    width: 100%;
    height: 200px;
    position: absolute;
    cursor: pointer;
  }

  .dropbox:hover {
    background: rgb(61, 61, 61);
    color: white; /* when mouse over to the drop zone, change color */
  }

  .dropbox p {
    font-size: 1.2em;
    text-align: center;
    padding: 50px 0;
  }
</style>
