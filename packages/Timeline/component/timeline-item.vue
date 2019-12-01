<template>
  <li :class="!!$slots.icon ? 'timeline-custom-item' : 'timeline-item'">
    <template v-if="!!$slots.icon">
      <span class="timeline-icon"><slot name="icon"></slot></span>
    </template>
    <template v-else>
      <em class="timeline-icon"></em>
    </template>
    <slot></slot>
  </li>
</template>

<script>
export default {
  name: "timeline-item"
};
</script>
