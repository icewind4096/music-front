<template>
  <div class="page">
    这个是主页 {{ nickname }}
    <q-btn @click="logout">退出</q-btn>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: "Index",
  setup() {
    const store = useStore()
    return {
      nickname: computed(()=> {
        return store.getters['user/nickName'];
      })
    }
  },
}
</script>

<style scoped>

</style>
