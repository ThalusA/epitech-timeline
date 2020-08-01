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
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { GChart } from "vue-google-charts";

@Component({
  components: {
    GChart
  }
})
export default class App extends Vue {
  @Prop({ type: [Number, String] }) promotion!: number | string;
  @Prop({ type: [Number, String] }) semester!: number | string;
  @Prop() timelineData!: TimelineInfo;
  @Prop({
    type: Array,
    default: () => [
      ["Module", "Project", "Start", "End"],
      ["Now", "Now", new Date(), new Date()]
    ]
  })
  chartData!: Array<Array<string | number | Date>>;
  data() {
    return {
      chartSettings: {
        packages: ["timeline"]
      },
      chartOptions: {
        height: 1000,
        colorByRowLabel: true
      }
    };
  }
  async beforeMount() {
    const response = await fetch("timeline.json");
    if (!response.ok)
      throw `Could not get timeline data: ${response.statusText}`;
    this.timelineData = await response.json();
    await this.fetchTimeline();
  }
  async fetchTimeline() {
    this.promotion = this.timelineData.promo;
    this.semester = this.timelineData.semester;
    for (const moduleInfo of this.timelineData.modules) {
      for (const projectInfo of moduleInfo.projects) {
        this.chartData.push([
          moduleInfo.name,
          projectInfo.name,
          new Date(projectInfo.start),
          new Date(projectInfo.end)
        ]);
      }
    }
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
