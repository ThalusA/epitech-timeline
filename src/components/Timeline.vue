<template>
  <div id="chart">
    <title>Epitech Timeline - Promotion {{ promotion }}</title>
    <h1>Epitech Timeline - Promotion {{ promotion }}</h1>
    <h2>Semester {{ semester }}</h2>
    <apexchart
      type="rangeBar"
      height="350"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
</template>

<script lang="ts" src="../scripts/timeline.ts"></script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="../styles/timeline.css"></style>
