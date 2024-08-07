<script lang="ts" setup>
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <div style="margin-top: var(--header-height); color: #000">
    Weather view page {{ route.params.id }}
  </div>
</template>
