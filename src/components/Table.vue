<template>
  <div>
    <div class="title-container">
      <p class="title">各地区疫情情况</p>
    </div>
    <div class="table-container">
      <table class="table" border="0" cellspacing="0" cellpadding="0">
        <thead>
          <tr>
            <th>地区</th>
            <th  style="color:#51b5ca;font-weight:bolder">新增确诊</th>
            <th style="color:#b6332a;font-weight:bolder">确诊</th>
            <th style="color:#76ba9c;font-weight:bolder">治愈</th>
            <th  style="color:grey;font-weight:bolder">死亡</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) in tableData" :key="index">
            <td>{{item.cityName}}</td>
            <td  style="color:#51b5ca;font-weight:bolder">{{item.suspectedCount}}</td>
            <td style="color:#b6332a;font-weight:bolder">{{item.confirmedCount}}</td>
            <td  style="color:#76ba9c;font-weight:bolder">{{item.curedCount}}</td>
            <td  style="color:grey;font-weight:bolder">{{item.deadCount}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
export default {
  name: "Table",
  props: {
    totalInfo: {
      default: null
    }
  },
  computed: {
    tableData() {
      if (!this.totalInfo) {
        return [];
      }
      return this.totalInfo.cities;
    }
  },
  methods: {}
};
</script>
<style lang="scss" scoped>

.table-container {
  margin-top: 5px;
  & table {
    width: 375px;
    text-align: center;
    font-size: 16px;
    & td,
    th {
      height: 40px;
    }
    & tbody tr:nth-child(odd) {
      background: #ccc;
    }
  }
}
</style>