<template>
  <div class="dashboard-container flex-center">
    <p class="color-black-light">国土资讯巡检平台</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard-container {
  height: calc(100vh - 50px);
  background: url("~@/assets/images/home_back.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  p {
    font-size: 28px;
  }
}
</style>
