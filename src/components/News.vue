<template>
  <div>
    <div class="title-container">
      <p class="title">浙江动态播报</p>
    </div>
    <van-steps direction="vertical" active-color="#969799" active-icon="flag-o">
      <van-step v-for="(item,index) in newsList" :key="index">
        <p class="news-date">{{formatedDate(item.pubDate)}}</p>
        <div class="news-container" @click="openApp(item.sourceUrl)">
          <p class="news-title">{{item.title}}</p>
          <p class="news-content">{{item.summary}}</p>
          <p class="news-source">信息来源:{{item.infoSource}}</p>
        </div>
      </van-step>
    </van-steps>
  </div>
</template>
<script>
export default {
  name: "News",
  data() {
    return {
      newsList: []
    };
  },
  mounted() {
    this.getNews();
  },
  methods: {
    formatedDate(time) {
      return new Date(time + 8 * 3600 * 1000)
        .toJSON()
        .substr(0, 19)
        .replace("T", " ")
        .replace(/-/g, ".");
    },
    getNews() {
      this.$axios.get("https://lab.isaaclin.cn/nCoV/api/news?province=浙江省").then(res => {
        if (res.data.success) {
          this.newsList = res.data.results;
        }
      });
    },
    openApp(url) {
      window.open(url,"_blank");
    }
  }
};
</script>
<style lang="scss" scoped>
.news-date {
  font-size: 13px;
  padding-bottom: 4px;
}
.news-container {
  padding: 9px;
  background-color: #f9f9f9;
  & .news-title {
    padding-top: 4px;
    padding-bottom: 6px;
    color: black;
    font-size: 15px;
    font-weight: bolder;
  }
  & .news-content {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
  }
  & .news-source {
    padding-top: 6px;
    padding-bottom: 3px;
  }
}
</style>