<template>
  <div id="app">
    <div v-if="totalInfo">
      <Header :totalInfo="totalInfo" />
      <Map :totalInfo="totalInfo" />
      <Table :totalInfo="totalInfo" />
      <News />
    </div>
    <div class="loading" v-else>
      <img src="@/assets/loading.gif" />
    </div>
  </div>
</template>

<script>
import Header from "./components/Header";
import Map from "./components/Map";
import Table from "./components/Table";
import News from "./components/News";
export default {
  name: "App",
  components: {
    Header,
    Map,
    Table,
    News
  },
  data() {
    return {
      totalInfo: null,
      totalInfoList: null
    };
  },
  mounted() {
    this.getZhejiangTotalInfo();
    // this.getZhejiangTotalInfoList();
  },
  methods: {
    getZhejiangTotalInfo() {
      this.$axios.get("https://lab.isaaclin.cn/nCoV/api/area?latest=1&province=浙江省").then(res => {
        if (res.data.success) {
          this.totalInfo = res.data.results[0];
        }
      });
    },
    getZhejiangTotalInfoList() {
      this.$axios.get("https://lab.isaaclin.cn/nCoV/api/area?latest=0&province=浙江省").then(res => {
        if (res.data.success) {
          this.totalInfoList = res.data.results;
          this.totalInfoList.forEach(item => {
            // console.log(item.updateTime);
            // console.log(new Date(item.updateTime + 8 * 3600 * 1000).toJSON().substr(0, 10));
            item.updateTime = new Date(item.updateTime + 8 * 3600 * 1000).toJSON().substr(0, 10);
          });
          
        }
      });
    }
  }
};
</script>
<style lang="scss">
.loading {
  width: 100vw;
  height: 100vh;
  & img {
    object-fit: fill;
    width: 100%;
    height: 100%;
  }
}
</style>
