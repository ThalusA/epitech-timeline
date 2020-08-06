<template>
  <div>
    <hr />
    <p class="bottom">
      See the project on
      <a href="https://gitlab.com/epi-codes/Epitech-2023-Timeline">GitLab</a>
      - Based on
      <a href="https://github.com/Shigumitsu/shigumitsu.github.io">
        shigumitsu.github.io
      </a>
      -
      <a href="javascript:void(0);" id="switch" v-on:click="toggleDarkMode">
        Switch to {{ darkMode === true ? "light" : "dark" }}
      </a>
      - <a href="javascript:void(0);" id="bttf-button">Toggle BTTF display</a>
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
  toggleDarkMode() {
    document.body.classList.toggle("dark");
    this.darkMode = !this.darkMode;
  }
}
</script>
