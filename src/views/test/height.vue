<template>
  <div class="container">
    <div class="title">hover max-height</div>
    <div class="body">
      <div>
        <p>这是一段内容1111</p>
        <p>这是一段内容1111</p>
        <p>这是一段内容1111</p>
      </div>
    </div>
  </div>
  <div class="container2">
    <div class="title">hover2 height</div>
    <div class="body">
      <div>
        <p>这是一段内容2222</p>
        <p>这是一段内容2222</p>
        <p>这是一段内容2222</p>
      </div>
    </div>
  </div>

  <div class="container3">
    <div class="title">hover3 grid-template-rows</div>
    <div class="body">
      <div>
        <p>这是一段内容333</p>
        <p>这是一段内容333</p>
        <p>这是一段内容333</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.container .body {
  max-height: 40px;
  transition: 500ms max-height ease;
  background-color: #eee;
  overflow: hidden;
}
.container:hover .body {
  max-height: 200px;
}

.container2 .body {
  height: 40px;
  transition: 500ms height ease;
  background-color: #e4e4e4;
  overflow: hidden;
}
.container2:hover .body {
  height: 200px;
}

.container3 .body {
  display: grid;
  grid-template-rows: 0fr;
  transition: 500ms grid-template-rows ease;
  background-color: #eee;
  & > div {
    overflow: hidden;
  }
}
.container3:hover .body {
  grid-template-rows: 1fr;
}
</style>
