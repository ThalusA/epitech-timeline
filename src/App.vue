<template>
  <div id="app">
    <TimelineHeader :promotion="promotion" :semester="semester" />
    <Timeline :chartData="chartData" />
    <TimelineFooter v-on:bttfToggle="bttfToggle" />
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
  @Prop({ type: Object }) timelineData!: TimelineInfo;
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
  @Prop({
    type: Array,
    default: () => [
      ["Module", "Project", "Start", "End"],
      ["Timeline", "Now", new Date(), new Date()]
    ]
  })
  chartDataNoBTTF!: Array<Array<string | Date>>;
  @Prop({
    type: Array,
    default: () => [
      ["Module", "Project", "Start", "End"],
      ["Timeline", "Now", new Date(), new Date()]
    ]
  })
  chartDataBTTF!: Array<Array<string | Date>>;
  @Watch("timelineData") onTimelineDataChanged() {
    this.promotion = this.timelineData.promo;
    this.semester = this.timelineData.semester;
    this.chartDataBTTF = this.processTimeline();
    this.chartData = this.chartDataBTTF;
    this.chartDataNoBTTF = this.processTimeline(false);
  }
  async mounted() {
    const response = await fetch("timeline.json");
    if (!response.ok)
      throw `Could not get timeline data: ${response.statusText}`;
    this.timelineData = await response.json();
  }
  bttfToggle(state: boolean) {
    if (state == true) this.chartData = this.chartDataBTTF;
    else if (state == false) this.chartData = this.chartDataNoBTTF;
  }
  processTimeline(bttf = true) {
    const chartData: Array<Array<string | Date>> = [
      ["Module", "Project", "Start", "End"],
      ["‎‎‎‎‎‎Timeline", "Now", new Date(), new Date()]
    ];
    for (const moduleInfo of this.timelineData.modules) {
      for (const projectInfo of moduleInfo.projects) {
        if (bttf == true || projectInfo.bttf == false) {
          const endDate = new Date(projectInfo.end);
          chartData.push([
            moduleInfo.name,
            projectInfo.name,
            new Date(projectInfo.start),
            new Date(endDate.setDate(endDate.getDate() + 1))
          ]);
        }
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
