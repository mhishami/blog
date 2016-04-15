<template>
  <menu media="uk-active"></menu>

  <vue-file-upload label="Pick Files"
                   url='http://localhost:8983/solr/media/update/json/docs?commit=true&wt=json'
                   :files.async="files"
                   :filters="filters"
                   :events="cbEvents"
                   :request-options="reqopts">
  </vue-file-upload>
  <table class="uk-table">
    <thead>
      <tr>
        <th>Name</th>
        <th>Size</th>
        <th>Progress</th>
        <th>Status</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="file in files">
        <td v-text="file.name"></td>
        <td v-text="file.size"></td>
        <td v-text="file.progress"></td>
        <td v-text="onStatus(file)"></td>
        <td>
          <button class="uk-button uk-button-mini" @click="uploadItem(file)">Upload</button>
        </td>
      </tr>
    </tbody>
  </table>
  <button class="uk-button uk-button-primary" @click="uploadAll">Upload All</button>

  <div class="uk-panel uk-panel-box">
    <pre>
      {{ files | json }}
    </pre>
  </div>
<!--
  vue-file-upload(url='upload.do',
    v-bind:files.sync = 'files',
    v-bind:filters = "filters",
    v-bind:events = 'cbEvents',
    v-bind:request-options = "reqopts")
  table
    thead
      tr
        th name
        th size
        th progress
        th status
        th action
    tbody
      tr(v-for='file in files')
        td(v-text='file.name')
        td(v-text='file.size')
        td(v-text='file.progress')
        td(v-text='onStatus(file)')
        td
          button(type='button',@click="uploadItem(file)")
  button(type='button',@click="uploadAll")
 -->
</template>
<script>
import VueFileUpload from 'vue-file-upload'
import TabMenu from './TabMenu'
import Menu from '../Menu'

export default {
  data () {
    return {
      files: [],
      filters: [],
      filtersold: [{
        name: 'imageFilter',
        fn (file) {
          var type = '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|'
          return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1
        }
      }],
      cbEvents: {
        onCompleteUpload: (file, response, status, header) => {
          console.log(file)
          console.log('upload finished')
        }
      },
      // xhr
      reqopts: {
        formData: {
          tokens: 'tttttttttttttt'
        },
        responseType: 'json',
        withCredentials: false
      }
    }
  },
  methods: {
    onStatus (file) {
      if (file.isSuccess) {
        return 'success'
      } else if (file.isError) {
        return 'error'
      } else if (file.isUploading) {
        return 'uploading'
      } else {
        return '...'
      }
    },
    uploadItem (file) {
      file.upload()
    },
    uploadAll () {
      this.$broadcast('DO_POST_FILE')
    }
  },
  components: {
    VueFileUpload, TabMenu, Menu
  }
}
</script>