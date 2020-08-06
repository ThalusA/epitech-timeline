<template>
  <div id="app">
    <TimelineHeader :promotion="promotion" :semester="semester" />
    <GChart
      type="Timeline"
      :data="chartData"
      :settings="chartSettings"
      :options="chartOptions"
      :events="chartEvents"
    />
    <hr />
    <p class="bottom">
      See the project on
      <a href="https://gitlab.com/epi-codes/Epitech-2023-Timeline">GitLab</a> -
      Based on
      <a href="https://github.com/Shigumitsu/shigumitsu.github.io"
        >shigumitsu.github.io</a
      >
      -
      <a href="#" id="switch" v-on:click="toggleDarkMode"
        >Switch to {{ darkMode === true ? "light" : "dark" }}</a
      >
      - <a href="#" id="bttf-button">Toggle BTTF display</a> - Scroll down to
      read the changelog
    </p>
    <hr />
    <h3>Changelog</h3>
    <div id="changelog-container">Loading changelog...</div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import TimelineHeader from "./components/TimelineHeader.vue";
import { GChart } from "vue-google-charts";

@Component({
  components: {
    GChart,
    TimelineHeader
  }
})
export default class App extends Vue {
  @Prop() timelineData!: TimelineInfo;
  @Prop({ type: Boolean, default: false }) darkMode!: boolean;
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
  toggleDarkMode() {
    document.body.classList.toggle("dark");
    this.darkMode = !this.darkMode;
  }
  data() {
    return {
      chartSettings: {
        packages: ["timeline"]
      },
      chartOptions: {
        height: 700,
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
@import "https://fonts.googleapis.com/css?family=Roboto:100,300";
@import "./styles/style.css";
@import "./styles/dark.css";
</style>
