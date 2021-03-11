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
import { Component, Prop, Vue } from "vue-property-decorator";
import TimelineHeader from "./components/TimelineHeader.vue";
import TimelineFooter from "./components/TimelineFooter.vue";
import TimelineChart from "./components/TimelineChart.vue";
import { AsyncComputed } from "./scripts/AsyncComputed";
import moment from "moment";

@Component({
  components: {
    TimelineChart,
    TimelineHeader,
    TimelineFooter,
  },
})
export default class App extends Vue {
  @Prop({ type: Boolean, default: true }) bttfDisplay!: boolean;
  get chartDataBTTF() {
    return this.processTimeline();
  }
  get chartDataNoBTTF() {
    return this.processTimeline(false);
  }
  @AsyncComputed({ default: { promo: "...", semester: "...", modules: [] } })
  async timelineData() {
    const response = await fetch("timeline.json");
    if (!response.ok)
      throw `Could not get timeline data: ${response.statusText}`;
    const timelineData: TimelineInfo = await response.json();
    return timelineData;
  }
  bttfToggle(state: boolean) {
    this.bttfDisplay = state;
  }
  processTimeline(bttf = true) {
    const chartData: Array<Array<string | Date | object>> = [
      [
        { type: "string", id: "Module" },
        { type: "string", id: "Project" },
        { type: "string", role: "tooltip" },
        { type: "date", id: "Start" },
        { type: "date", id: "End" },
      ],
      ["‎‎‎‎‎‎Timeline", "Now", "", new Date(), new Date()],
    ];
    const timelineData = (this.timelineData as unknown) as TimelineInfo;
    for (const moduleInfo of timelineData.modules) {
      for (const projectInfo of moduleInfo.projects) {
        if (bttf == true || projectInfo.bttf == false) {
          const startDate = moment(projectInfo.start);
          const endDate = moment(projectInfo.end).add(1, "days");
          const tooltip = `
            <ul class='google-visualization-tooltip-item-list'>
              <li>
                <span style='font-family:Arial;font-size:12px;color:#000000;opacity:1;margin:0;font-style:none;text-decoration:none;font-weight:bold;'>
                  ${projectInfo.name}
                </span>
              </li>
            </ul>
            <div class='google-visualization-tooltip-separator'></div>
              <li data-logicalname="action#" class="google-visualization-tooltip-action">
                <span style="font-family:Arial;font-size:12px;color:#000000;opacity:1;margin:0;font-style:none;text-decoration:none;font-weight:bold;">
                  ${moduleInfo.name}:
                </span>
                <span style="font-family:Arial;font-size:12px;color:#000000;opacity:1;margin:0;font-style:none;text-decoration:none;font-weight:none;">
                  ${moment(startDate).format("D MMM")} -
                  ${moment(endDate).format("D MMM")}
                </span>
              </li>
              <li data-logicalname="action#" class="google-visualization-tooltip-action">
                <span style="font-family:Arial;font-size:12px;color:#000000;opacity:1;margin:0;font-style:none;text-decoration:none;font-weight:bold;">
                  Duration:
                </span>
                <span style="font-family:Arial;font-size:12px;color:#000000;opacity:1;margin:0;font-style:none;text-decoration:none;font-weight:none;">
                  ${moment.duration(endDate.diff(startDate)).humanize()}
                </span>
              </li>
            <ul class='google-visualization-tooltip-action-list'>
            </ul>
          `;
          chartData.push([
            moduleInfo.name,
            projectInfo.name,
            tooltip,
            startDate.toDate(),
            endDate.toDate(),
          ]);
        }
      }
    }
    return chartData;
  }
}
</script>

<style lang="scss">
@import "https://fonts.googleapis.com/css?family=Roboto:100,300";
@import "./styles/style.scss";
@import "./styles/dark.scss";
</style>
