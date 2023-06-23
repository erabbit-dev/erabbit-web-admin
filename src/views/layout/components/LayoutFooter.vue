<script setup lang="ts"></script>

<template>
  <a-layout-footer class="er-footer">
    {{ $t('app.sys') }} ©2023 Created by {{ $t('app.company') }}
  </a-layout-footer>
</template>

<style lang="scss" scoped>
.er-footer {
  background-color: var(--er-background);
  color: var(--er-text2);
  text-align: center;
}
</style>
