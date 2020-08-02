<template>
  <div id="app">
    <title>Epitech Timeline - Promotion {{ promotion }}</title>
    <h1>Epitech Timeline - Promotion {{ promotion }}</h1>
    <h2>Semester {{ semester }}</h2>
    <GChart
      type="Timeline"
      :data="chartData"
      :settings="chartSettings"
      :options="chartOptions"
      :events="chartEvents"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { GChart } from "vue-google-charts";

@Component({
  components: {
    GChart
  }
})
export default class App extends Vue {
  @Prop() timelineData!: TimelineInfo;
  @Prop({ type: [String, Number], default: "..." }) promotion!: string | number;
  @Prop({ type: [String, Number], default: "..." }) semester!: string | number;
  @Prop({
    type: Array,
    default: () => [
      ["Module", "Project", "Start", "End"],
      ["Timeline", "Now", new Date(), new Date()]
    ]
  })
  chartData!: Array<Array<string | Date>>;
  @Watch("timelineData") onTimelineDataChanged() {
    this.promotion = this.timelineData.promo;
    this.semester = this.timelineData.semester;
    this.chartData = this.fetchTimeline();
  }
  @Watch("chartData") onChartDataChanged() {
    this.setupNowLine();
  }
  data() {
    return {
      chartSettings: {
        packages: ["timeline"]
      },
      chartOptions: {
        height: 1000,
        width: 1302,
        timeline: {
          colorByRowLabel: true
        }
      },
      chartEvents: {
        onmouseover: this.eventOnmouseover,
        onmouseout: this.eventOnmouseout
      }
    };
  }
  async mounted() {
    const response = await fetch("timeline.json");
    if (!response.ok)
      throw `Could not get timeline data: ${response.statusText}`;
    this.timelineData = await response.json();
  }
  eventOnmouseover({ row }: { row: number }) {
    if (row === 0) {
      const tooltipElement = document
        .getElementsByClassName("google-visualization-tooltip")
        .item(0) as HTMLElement | null;
      if (tooltipElement !== null) tooltipElement.style.display = "none";
    }
    this.setupNowLine();
  }
  eventOnmouseout() {
    this.setupNowLine();
  }
  setupNowLine() {
    const tableElement = document.querySelector("rect[fill='none']");
    if (tableElement !== null) {
      const tableWidth = tableElement.getAttribute("width");
      const tableHeight = tableElement.getAttribute("height");
      if (tableWidth !== null && tableHeight !== null) {
        const lineElement = document.querySelector(
          `rect[x='${parseFloat(tableWidth) - 1.5}']`
        );
        if (lineElement !== null) {
          lineElement.setAttribute("height", `${tableHeight}px`);
          lineElement.setAttribute("width", "1px");
          lineElement.setAttribute("y", "0");
        }
      }
    }
  }
  fetchTimeline() {
    const chartData: Array<Array<string | Date>> = [
      ["Module", "Project", "Start", "End"],
      ["‎‎‎‎‎‎Timeline", "Now", new Date(), new Date()]
    ];
    for (const moduleInfo of this.timelineData.modules) {
      for (const projectInfo of moduleInfo.projects) {
        chartData.push([
          moduleInfo.name,
          projectInfo.name,
          new Date(projectInfo.start),
          new Date(projectInfo.end)
        ]);
      }
    }
    return chartData;
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
