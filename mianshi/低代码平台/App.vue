<template>
  <div class="app">
    <Editor v-model="state"/>
  </div>
</template>

<script setup>
import {ref} from 'vue'
import data from './data.json'
import Editor from './src/packages/editor.jsx'

const state = ref(data)

</script>
