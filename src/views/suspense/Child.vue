<template>
        <div  v-if="user">
              <p>用户名：{{ user.name }}</p>
              <p>手机号：{{ user.phone }}</p>
        </div>
        <div   v-else>
              <p>loading2...</p>
        </div>
</template>

<script   setup >
import   {   ref,   onMounted   }   from   "vue";

const   user   =   ref(null);

async   function   fetchUser()   {
      //   使用setTimeout模拟从服务端获取数据
      return   new   Promise((resolve)   =>   {
            setTimeout(()   =>   {
                  resolve({
                        name:   "张三",
                        phone:   "13800138000",
                  });
            },   2000);
      });
}

onMounted(async   ()   =>   {
      user.value   =   await   fetchUser();
});
</script>
