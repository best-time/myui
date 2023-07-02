<template>
  <div id="hello">
    <h1>hello</h1>
    <p>{{ran}}</p>
  </div>
</template>
<script>

export default {
  name: 'hello',
  data() {
    return {
      ran: Math.random()
    }
  },
}
</script>
