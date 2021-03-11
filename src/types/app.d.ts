// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Vue from "vue";

declare module "../App.vue" {
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
}
