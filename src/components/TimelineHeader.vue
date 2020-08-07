<template>
  <div id="timeline-header">
    <title>Epitech Timeline - Promotion {{ promotion }}</title>
    <h1>Epitech Timeline - Promotion {{ promotion }}</h1>
    <h2>Semester {{ semester }}</h2>
  </div>
</template>

<script lang="ts">
import { Prop, Vue, Component } from "vue-property-decorator";

@Component
export default class TimelineHeader extends Vue {
  @Prop({ type: [String, Number], default: "..." }) promotion!: string | number;
  @Prop({ type: [String, Number], default: "..." }) semester!: string | number;
}
</script>
