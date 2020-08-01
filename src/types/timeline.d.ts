import Vue from "vue";

declare module "../scripts/timeline" {
  interface BarData {
    x: string;
    y: Array<number>;
    z: string;
    fillcolor: string;
  }
  
  interface Bar {
    data: Array<BarData>;
  }
  
  interface Project {
    name: string;
    start: string | number;
    end: string | number;
    bttf: boolean;
  }
  
  interface Module {
    name: string;
    projects: Array<Project>;
  }
  
  interface TimelineInfo {
    promo: string | number;
    semester: string | number;
    modules: Array<Module>;
  }

  interface ApexChartsLabel {
    seriesZ: Array<Array<string>>;
    series: Array<Bar>;
    labels: Array<string>;
  }
  
  interface ApexChartsGlobal {
    globals: ApexChartsLabel;
  }
}

