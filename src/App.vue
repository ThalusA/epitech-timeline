<template>
  <div id="app">
    <TimelineHeader :promotion="promotion" :semester="semester" />
    <Timeline :chartData="chartData" />
    <TimelineFooter />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import TimelineHeader from "./components/TimelineHeader.vue";
import TimelineFooter from "./components/TimelineFooter.vue";
import Timeline from "./components/Timeline.vue";

@Component({
  components: {
    Timeline,
    TimelineHeader,
    TimelineFooter
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
  async mounted() {
    const response = await fetch("timeline.json");
    if (!response.ok)
      throw `Could not get timeline data: ${response.statusText}`;
    this.timelineData = await response.json();
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
