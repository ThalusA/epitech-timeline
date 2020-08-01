<template>
  <div id="chart">
    <title>Epitech Timeline - Promotion {{ promotion }}</title>
    <h1>Epitech Timeline - Promotion {{ promotion }}</h1>
    <h2>Semester {{ semester }}</h2>
    <GChart
      type="Timeline"
      :settings="chartSettings"
      :data="chartData"
      :options="chartOptions"
    ></GChart>
  </div>
</template>

<script lang="ts" src="../scripts/timeline.ts" />
<style scoped src="../styles/timeline.css" />
