<template>
  <img :src="src" :original="original" />
</template>

<script>
export default {
  name: "lightbox-img",
  props: {
    src: String,
    original: String
  }
};
</script>
