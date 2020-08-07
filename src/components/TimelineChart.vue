<template>
  <div id="timeline-container">
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
import { Prop, Vue, Component } from "vue-property-decorator";
import { GChart } from "vue-google-charts";

@Component({
  components: {
    GChart
  }
})
export default class TimelineChart extends Vue {
  @Prop({
    type: Array,
    default: () => [
      ["Module", "Project", "Start", "End"],
      ["Timeline", "Now", new Date(), new Date()]
    ]
  })
  chartData!: Array<Array<string | Date>>;
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
        onmouseout: this.setupNowLine,
        ready: this.setupNowLine
      }
    };
  }
  eventOnmouseover({ row }: { row: number }) {
    if (row === 0) {
      const tooltipElement = document
        .getElementsByClassName("google-visualization-tooltip")
        .item(0) as HTMLElement | null;
      if (tooltipElement !== null) tooltipElement.style.display = "none";
    }
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
}
</script>
