<template>
  <div style="display: none;">
    <slot name="top"></slot>
    <div class="lightbox-scroller">
      <slot name="content"></slot>
    </div>
    <slot name="bottom"></slot>
  </div>
</template>

<script>
export default {
  name: "lightbox-txt"
};
</script>
