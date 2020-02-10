<template>
  <div>
    <div class="header-container">
      <div class="header-title-container">
        <p class="header-title">浙江省疫情实时数据</p>
        <p class="date">截至 {{formatedDate}} 数据统计</p>
      </div>
      <div class="total-data-container">
        <div>
          <p class="p1 num">{{totalInfo?totalInfo.suspectedCount:0}}</p>
          <p class="desc">新增确诊</p>
        </div>
        <div>
          <p class="p2 num">{{totalInfo?totalInfo.confirmedCount:0}}</p>
          <p class="desc">确诊病例</p>
        </div>
        <div>
          <p class="p3 num">{{totalInfo?totalInfo.curedCount:0}}</p>
          <p class="desc">治愈病例</p>
        </div>
        <div>
          <p class="p4 num">{{totalInfo?totalInfo.deadCount:0}}</p>
          <p class="desc">死亡</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Header",
  props: {
    totalInfo: {
      default: null
    }
  },
  computed: {
    formatedDate() {
      if (!this.totalInfo) {
        return "";
      } else {
        return new Date(this.totalInfo.updateTime + 8 * 3600 * 1000)
          .toJSON()
          .substr(0, 19)
          .replace("T", " ")
          .replace(/-/g, ".");
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.header-container {
  background-color: #4c97d4;
  height: 150px;
  width: 100%;
  position: relative;
  & .header-title-container {
    position: absolute;
    top: 10px;
    left: 10px;
    height: 6px;
  }
  & .header-title {
    font-size: 22px;
    color: white;
    font-weight: bolder;
    padding-left: 20px;
    // border-left: 3px solid white;
  }
  & .header-title::before {
    content: " ";
    position: absolute;
    left: 8px;
    top: 6px;
    height: 17px;
    width: 4px;
    background-color: white;
  }
  & .date {
    font-size: 12px;
    color: #d2d8df;
    padding-left: 20px;
  }

  & .total-data-container {
    position: absolute;
    width: 350px;
    height: 70px;
    bottom: 10px;
    left: 12px;
    background-color: white;
    border-radius: 4px;
    display: flex;
    flex-wrap: nowrap;
    justify-content: center;
    & div {
      width: 25%;
      height: 100px;
      padding-top: 6px;
      & p {
        text-align: center;
      }
      & .desc {
        color: #666666;
        font-size: 12px;
      }
      & .num {
        font-size: 28px;
        font-weight: bolder;
      }
      & .p1 {
        color: #51b5ca;
      }
      & .p2 {
        color: #b6332a;
      }
      & .p3 {
        color: #76ba9c;
      }
      & .p4 {
        color: grey;
      }
    }
  }
}
</style>