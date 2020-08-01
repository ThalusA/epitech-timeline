import { Component, Vue, Prop } from "vue-property-decorator";
import { GChart } from "vue-google-charts";
@Component({
  components: {
    GChart
  }
})
export default class Timeline extends Vue {
  @Prop({ type: [Number, String], default: "" }) promotion!: number | string;
  @Prop({ type: [Number, String], default: "" }) semester!: number | string;
  //@Prop({ type: Array, default: () => [] }) chartData!: Array<Bar>;
  data() {
    return {
      chartData: [
        ["Module", "Project", new Date() , new Date()]
      ],
      chartOptions: {
        chart: {}
      },
      chartSettings: {
        packages: ["timeline"]
      }
    };
  }
  beforeMount() {
    //this.fetchTimeline();
  }
  async fetchTimeline() {
    const response = await fetch("timeline.json");
    if (!response.ok)
      throw `Could not get timeline data: ${response.statusText}`;
    const timelineData: TimelineInfo = await response.json();
    this.promotion = timelineData.promo;
    this.semester = timelineData.semester;
    for (const moduleInfo of timelineData.modules) {
      const moduleData: Bar = {
        data: []
      };
      for (const projectInfo of moduleInfo.projects) {
        moduleData.data.push({
          x: moduleInfo.name,
          y: [
            new Date(projectInfo.start).getTime(),
            new Date(projectInfo.end).getTime()
          ],
          z: projectInfo.name,
          fillcolor: "#008FFB"
        });
      }
    }
  }
}
