<template>
  <div class="commit" id="changelog-container">
    <a :href="commitURL" target="_blank" class="commit-msg">{{
      commitTitle
    }}</a>
    <div v-if="commitDesc.length > 0">
      <div v-for="(desc, index) in commitDesc" :key="`desc-${index}`">
        <span class="commit-desc">{{ desc }}</span>
      </div>
    </div>
    <span :title="commitDate">{{ calculatedDate }}</span>
  </div>
</template>

<script lang="ts">
import { Prop, Vue, Component } from "vue-property-decorator";
import moment from "moment";

@Component
export default class TimelineHeader extends Vue {
  @Prop({ type: String, default: "..." }) commitURL!: string;
  @Prop({ type: String, default: "..." }) commitTitle!: string;
  @Prop({ type: String, default: "..." }) commitMessage!: string;
  @Prop({ type: String, default: "..." }) commitDate!: string;
  get calculatedDate() {
    return moment(this.commitDate).fromNow();
  }
  get commitDesc() {
    return this.commitMessage.split("\n").slice(1);
  }
}
</script>
