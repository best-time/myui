<template>
  <router-link :to="href" class="list-item" v-if="type == 'link'">
    <div class="list-img">
      <slot name="img"></slot>
    </div>
    <div class="list-mes">
      <div class="list-title">
        <slot name="title"></slot>
      </div>
      <slot name="other"></slot>
    </div>
  </router-link>
  <a :href="href || 'javascript:;'" class="list-item" v-else-if="type == 'a'">
    <div class="list-img">
      <slot name="img"></slot>
    </div>
    <div class="list-mes">
      <div class="list-title">
        <slot name="title"></slot>
      </div>
      <slot name="other"></slot>
    </div>
  </a>
  <div class="list-item" v-else>
    <div class="list-img">
      <slot name="img"></slot>
    </div>
    <div class="list-mes">
      <div class="list-title">
        <slot name="title"></slot>
      </div>
      <slot name="other"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "list-item",
  props: {
    type: {
      type: String,
      validator(value) {
        return ["link", "a", "div"].indexOf(value) > -1;
      },
      default: "a"
    },
    href: [String, Object]
  }
};
</script>
