<script setup lang="ts">
import { ref } from 'vue'

const openCache = ref(false)
</script>

<template>
  <RouterView>
    <template #default="{ Component, route }">
      <Transition name="fade-slide" mode="out-in" appear>
        <keep-alive v-if="openCache">
          <component :is="Component" :key="route.fullPath" />
        </keep-alive>
        <component v-else :is="Component" :key="route.fullPath" />
      </Transition>
    </template>
  </RouterView>
</template>

<style lang="scss" scoped></style>
