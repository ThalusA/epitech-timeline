<template>
  <div id="chart">
    <title>Epitech Timeline - Promotion {{ promotion }}</title>
    <h1>Epitech Timeline - Promotion {{ promotion }}</h1>
    <h2>Semester {{ semester }}</h2>
    <apexchart
      type="rangeBar"
      height="350"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import VueApexCharts from "vue-apexcharts";
import moment from "moment";

interface BarData {
  x: string;
  y: Array<number>;
  fillcolor: string;
}

interface Bar {
  name: string;
  data: Array<BarData>;
}

interface Project {
  name: string;
  start: string | number;
  end: string | number;
  bttf: boolean;
}

interface Module {
  name: string;
  projects: Array<Project>;
}

interface TimelineInfo {
  promo: string | number;
  semester: string | number;
  modules: Array<Module>;
}

interface ApexChartsLabel {
  labels: Array<string>;
}

interface ApexChartsGlobal {
  globals: ApexChartsLabel;
}

@Component({
  components: {
    apexchart: VueApexCharts
  }
})
export default class Timeline extends Vue {
  @Prop([Number, String]) promotion!: number | string;
  @Prop([Number, String]) semester!: number | string;
  @Prop(Array) series!: Array<Bar>;
  data() {
    return {
      series: [],
      chartOptions: {
        chart: {
          height: 350,
          type: "rangeBar"
        },
        plotOptions: {
          bar: {
            horizontal: true,
            distributed: true,
            dataLabels: {
              hideOverflowingLabels: false
            }
          }
        },
        dataLabels: {
          enabled: true,
          formatter: function(
            timeInterval: Array<number>,
            {
              dataPointIndex,
              w
            }: { dataPointIndex: number; w: ApexChartsGlobal }
          ) {
            const label = w.globals.labels[dataPointIndex];
            const startMoment = moment(timeInterval[0]);
            const endMoment = moment(timeInterval[1]);
            const diff = endMoment.diff(startMoment, "days");
            return label + ": " + diff + (diff > 1 ? " days" : " day");
          },
          style: {
            colors: ["#f3f4f5", "#fff"]
          }
        },
        xaxis: {
          type: "datetime"
        },
        yaxis: {
          show: false
        },
        grid: {
          row: {
            colors: ["#f3f4f5", "#fff"],
            opacity: 1
          }
        }
      },
      promotion: 2024,
      semester: 2
    };
  }
  async created() {
    const response = await fetch("data.json");
    if (!response.ok)
      throw `Could not get timeline data: ${response.statusText}`;
    const timelineData: TimelineInfo = await response.json();
    this.promotion = timelineData.promo;
    this.semester = timelineData.semester;
    for (const moduleInfo of timelineData.modules) {
      const moduleData: Bar = {
        name: moduleInfo.name,
        data: []
      };
      for (const projectInfo of moduleInfo.projects) {
        moduleData.data.push({
          x: projectInfo.name,
          y: [
            new Date(projectInfo.start).getTime(),
            new Date(projectInfo.end).getTime()
          ],
          fillcolor: "#008FFB"
        });
      }
      this.series.push(moduleData);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
