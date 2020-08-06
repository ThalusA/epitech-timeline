<template>
  <div>
    <title>Epitech Timeline - Promotion {{ promotion }}</title>
    <h1>Epitech Timeline - Promotion {{ promotion }}</h1>
    <h2>Semester {{ semester }}</h2>
  </div>
</template>

<script lang="ts">
import { Prop, Vue } from "vue-property-decorator";

export default class App extends Vue {
  @Prop({ type: [String, Number], default: "..." }) promotion!: string | number;
  @Prop({ type: [String, Number], default: "..." }) semester!: string | number;
}
</script>
