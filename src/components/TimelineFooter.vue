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
        Switch to {{ darkMode === true ? "light" : "dark" }}
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
  @Prop({ type: Boolean, default: false }) darkMode!: boolean;
  @Prop({ type: Boolean, default: true }) bttfDisplay!: boolean;
  toggleDarkMode() {
    document.body.classList.toggle("dark");
    this.darkMode = !this.darkMode;
  }
  toggleBTTF() {
    this.bttfDisplay = !this.bttfDisplay;
    this.$emit("bttfToggle", this.bttfDisplay);
  }
}
</script>
