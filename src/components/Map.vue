<template>
  <div>
    <div class="title-container">
      <p class="title">疫情地图</p>
    </div>
    <button @click="backToZhejiangMap()" v-if="!isZhejiangMap" class="backButton">&lt;返回</button>
    <div id="main"></div>
    <div class="title-container">
      <p class="title">疫情走势</p>
    </div>
    <div id="trending"></div>
  </div>
</template>
<script>
var echarts = require("echarts/lib/echarts");
require("echarts/lib/chart/line");
require("echarts/lib/chart/map");
require("echarts/lib/component/tooltip");
require("echarts/lib/component/legend");
require("echarts/lib/component/geo");
require("echarts/lib/component/visualMap");
export default {
  name: "Map",
  props: {
    totalInfo: null
  },
  data() {
    return {
      isZhejiangMap: true,
      mapChart: null,
      trendingChart: null,
      options: {
        tooltip: {},
        visualMap: {
          type: "piecewise",
          pieces: [
            {
              max: 10,
              color: "#FAEBD2"
            },
            {
              min: 10,
              max: 100,
              color: "#E9A188"
            },
            {
              min: 100,
              max: 200,
              color: "#D56354"
            },
            {
              min: 200,
              max: 500,
              color: "#BB3A37"
            },
            {
              min: 500,
              color: "#480F10"
            }
          ],
          calculable: true,
          seriesIndex: [0]
        },
        series: [
          {
            name: "确诊人数",
            type: "map",
            geoIndex: 0,
            data: []
          }
        ],
        geo: {
          map: "zhejiang",
          roam: false,
          zoom: 1.2,
          label: {
            show: true,
            color: "rgba(0,0,0,0.4)",
            fontSize: 12
          },
          itemStyle: {
            borderColor: "rgba(0, 0, 0, 0.2)"
          },
          emphasis: {
            itemStyle: {
              areaColor: null,
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              shadowBlur: 20,
              borderWidth: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)"
            }
          }
        }
      }
    };
  },
  mounted() {
    this.initMap();
    this.parseData();
    //测试数据
    this.initTrending();
  },
  methods: {
    initMap() {
      this.mapChart = echarts.init(document.getElementById("main"));
      this.getMapFromJson();
      this.mapChart.setOption(this.options);
      this.mapChart.on("click", data => {
        if (this.isZhejiangMap) {
          this.options.geo.label.fontSize = 6;
          this.changeMap(data.name);
        }
      });
    },
    getMapFromJson(map = "zhejiang") {
      echarts.registerMap(map, require(`@/static/${map}.json`));
    },
    changeMap(mapName) {
      this.getMapFromJson(mapName);
      this.options.geo.map = mapName;
      this.mapChart.setOption(this.options);
      this.isZhejiangMap = false;
    },
    backToZhejiangMap() {
      this.options.geo.label.fontSize = 12;
      this.changeMap("zhejiang");
      this.isZhejiangMap = true;
    },
    parseData() {
      let cities = this.totalInfo ? this.totalInfo.cities : [];
      cities.forEach(item => {
        this.options.series[0].data.push({
          name: item.cityName + "市",
          value: item.confirmedCount
        });
      });
      this.mapChart.setOption(this.options);
    },
    initTrending() {
      this.trendingChart = echarts.init(document.getElementById("trending"));
      this.trendingChart.setOption({
        tooltip: {},
        legend: {
          data: ["新增确诊", "新增治愈", "死亡人数"]
        },
        xAxis: {
          data: ["02.04", "02.05", "02.06", "02.07", "02.08", "02.09", "02.10"]
        },
        yAxis: {},
        series: [
          {
            name: "新增确诊",
            type: "line",
            // symbol:true,
            color: "#AD443D",
            smooth: true,
            data: [80, 67, 51, 42, 31, 20, 11]
          },
          {
            name: "新增治愈",
            type: "line",
            color: "#85B89E",
            smooth: true,
            data: [6, 12, 21, 23, 31, 21, 27]
          },
          {
            name: "死亡人数",
            type: "line",
            color: "grey",
            smooth: true,
            data: [0, 0, 0, 0, 0, 0, 0]
          }
        ]
      });
    }
  },
  watch: {
    totalInfo: function(newVal, oldVal) {
      // console.log(newVal);
      this.parseData();
    }
  }
};
</script>
<style lang="scss">
#main {
  width: 375px;
  height: 570px;
}
#trending {
  width: 375px;
  height: 255px;
}
.backButton {
  padding: 10px;
  color: #4c97d4;
  font-size: 15px;
  border: none;
  outline: none;
  background-color: white;
}
</style>
