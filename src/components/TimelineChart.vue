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
    GChart,
  },
})
export default class TimelineChart extends Vue {
  @Prop({ type: Array, required: true })
  chartData!: Array<Array<string | Date>>;
  data() {
    return {
      chartSettings: {
        packages: ["timeline"],
      },
      chartOptions: {
        height: 780,
        timeline: {
          colorByRowLabel: true,
        },
        tooltip: {
          isHtml: true,
        },
      },
      chartEvents: {
        onmouseover: this.eventOnmouseover,
        onmouseout: this.setupNowLine,
        ready: this.setupNowLine,
      },
    };
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
  setupNowLine() {
    const svgPath =
      "#timeline-container > div > div > div:nth-child(1) > div > svg > ";
    const tableElement = document.querySelector(
      `${svgPath} g:nth-child(2) > rect:last-child`
    );
    if (tableElement !== null) {
      const tableHeight = tableElement.getAttribute("height");
      if (tableHeight !== null) {
        const lineElement = document.querySelector(
          `${svgPath} g:nth-child(5) > rect:nth-child(1)`
        );
        const nowOverElement = document.querySelector(
          `${svgPath} g:nth-child(7) > text:nth-child(2)`
        );
        if (nowOverElement !== null && nowOverElement.textContent === "Now") {
          const lineElementSnd = document.querySelector(
            `${svgPath} g:nth-child(7) > rect:nth-child(1)`
          );
          if (lineElementSnd !== null) {
            lineElementSnd.setAttribute("style", "display:none;");
          }
        }
        if (lineElement !== null) {
          lineElement.removeAttribute("style");
          lineElement.setAttribute("height", `${tableHeight}px`);
          lineElement.setAttribute("width", "1px");
          lineElement.setAttribute("y", "0");
        }
      }
    }
  }
}
</script>
