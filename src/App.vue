<template>
  <div id="app">
    <TimelineHeader
      :promotion="timelineData.promo"
      :semester="timelineData.semester"
    />
    <TimelineChart
      :chartData="bttfDisplay === true ? chartDataBTTF : chartDataNoBTTF"
    />
    <TimelineFooter v-on:bttfToggle="bttfToggle" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import TimelineHeader from "./components/TimelineHeader.vue";
import TimelineFooter from "./components/TimelineFooter.vue";
import TimelineChart from "./components/TimelineChart.vue";

@Component({
  components: {
    TimelineChart,
    TimelineHeader,
    TimelineFooter
  }
})
export default class App extends Vue {
  @Prop({
    type: Object,
    default: { promo: "...", semester: "...", modules: [] }
  })
  timelineData!: TimelineInfo;
  @Prop({ type: Boolean, default: true }) bttfDisplay!: boolean;
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
    this.chartDataBTTF = this.processTimeline();
    this.chartDataNoBTTF = this.processTimeline(false);
  }
  async mounted() {
    const response = await fetch("timeline.json");
    if (!response.ok)
      throw `Could not get timeline data: ${response.statusText}`;
    this.timelineData = await response.json();
  }
  bttfToggle(state: boolean) {
    this.bttfDisplay = state;
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
