<template>
    <div>
      <div>
        <div class="element">
          {{ gmtFormat.format(currentTime) }}
        </div>
        <div class="element">
          {{ localFormat.format(currentTime) }}
        </div>
      </div>
    </div>
  </template>

<script setup>
import { useCurrentTime } from "../composables/useCurrentTime";
const { currentTime } = useCurrentTime();

const localOptions = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
    timeZoneName: "short",
};

const gmtOptions = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
    timeZone: "GMT",
    timeZoneName: "short",
};

const gmtFormat = new Intl.DateTimeFormat(undefined, gmtOptions)
const localFormat = new Intl.DateTimeFormat(undefined, localOptions)
</script>

<style scoped>
.element {
    margin: 3px;
}
</style>
  