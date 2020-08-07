<template>
  <div>
    <hr />
    <p class="bottom">
      See the project on
      <a :href="repoURL" target="_blank">GitLab</a>
      - Based on
      <a :href="basedURL" target="_blank">
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
    <div v-if="commits.length > 0">
      <h3>Changelog</h3>
      <TimelineCommit
        v-for="(commit, index) in commits"
        :key="`commit-${index}`"
        :commitURL="commit.web_url"
        :commitTitle="commit.title"
        :commitMessage="commit.message"
        :commitDate="commit.created_at"
      >
      </TimelineCommit>
    </div>
  </div>
</template>

<script lang="ts">
import { Prop, Vue, Component } from "vue-property-decorator";
import TimelineCommit from "./TimelineCommit.vue";

@Component({
  components: {
    TimelineCommit
  }
})
export default class TimelineFooter extends Vue {
  @Prop({
    type: String,
    default: "https://gitlab.com/epi-codes/Epitech-2023-Timeline"
  })
  readonly repoURL!: string;
  @Prop({
    type: String,
    default:
      "https://gitlab.com/api/v4/projects/epi-codes%2fEpitech-2023-Timeline/repository/commits"
  })
  readonly commitsURL!: string;
  @Prop({
    type: String,
    default: "https://github.com/Shigumitsu/shigumitsu.github.io"
  })
  readonly basedURL!: string;
  @Prop({ type: Array, default: [] }) commits!: Array<Commit>;
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
  async mounted() {
    if (this.darkMode === true) {
      document.body.classList.add("dark");
    } else if (this.darkMode === false) {
      document.body.classList.remove("dark");
    }
    this.$emit("bttfToggle", this.bttfDisplay);
    const response = await fetch(this.commitsURL);
    if (!response.ok)
      throw `Could not get commits data: ${response.statusText}`;
    this.commits = await response.json();
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
