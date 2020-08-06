<template>
  <div>
    <hr />
    <p class="bottom">
      See the project on
      <a
        href="https://gitlab.com/epi-codes/Epitech-2023-Timeline"
        target="_blank"
        >GitLab</a
      >
      - Based on
      <a
        href="https://github.com/Shigumitsu/shigumitsu.github.io"
        target="_blank"
      >
        shigumitsu.github.io
      </a>
      -
      <a href="javascript:void(0);" v-on:click="toggleDarkMode">
        Switch to {{ this.darkMode === true ? "light" : "dark" }}
      </a>
      -
      <a href="javascript:void(0);" v-on:click="toggleBTTF"
        >Toggle BTTF display</a
      >
      - Scroll down to read the changelog
    </p>
    <hr />
    <h3>Changelog</h3>
    <div id="changelog-container">Loading changelog...</div>
  </div>
</template>

<script lang="ts">
import { Prop, Vue, Component } from "vue-property-decorator";

@Component({})
export default class TimelineFooter extends Vue {
  @Prop({
    type: Boolean,
    default: () => {
      const state = localStorage.getItem("theme");
      if (state !== null) {
        if (state === "dark") return true;
        else if (state === "light") return false;
      }
      localStorage.setItem("theme", "light");
      return false;
    }
  })
  darkMode!: boolean;
  @Prop({ type: Boolean, default: true }) bttfDisplay!: boolean;
  mounted() {
    if (this.darkMode === true) {
      document.body.classList.add("dark");
    } else if (this.darkMode === false) {
      document.body.classList.remove("dark");
    }
  }
  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    if (this.darkMode === true) {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else if (this.darkMode === false) {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }
  toggleBTTF() {
    this.bttfDisplay = !this.bttfDisplay;
    this.$emit("bttfToggle", this.bttfDisplay);
  }
}
</script>
