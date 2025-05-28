<script setup>
import Button from './components/Button.vue'
import { iconForward, iconSettings } from '@/assets/icons/icons.js';

</script>

<template>
  <main>

    <div>
      <Button :icon="iconSettings">
        Primary
      </Button>
    </div>

    <div>
      <Button :icon="iconSettings" icon-position="right" disabled>
        Primary Disabled
      </Button>
    </div>

    <div>
      <Button :icon="iconSettings" variant="primary-container">
        Primary container
      </Button>
    </div>

    <div>
      <Button 
        tag="button"
        type="submit"
        :icon="iconSettings"
        icon-size="2em"
        size="lg"
        elevated="3"
      >
      </Button>
    </div>

    <div>
      <Button
        tag="a"
        href="#"
        target="_blank"
        variant="secondary"
        :icon="iconForward"
        icon-position="right"
        aria-label="Link Vue.js"
      >
        Secondary
      </Button>
    </div>

    <div>
      <Button
        tag="a"
        href="#"
        target="_blank"
        variant="secondary"
        :icon="iconForward"
        icon-position="right"
        aria-label="Link Vue.js"
        disabled
      >
        Secondary disabled
      </Button>
    </div>

    <div>
      <Button variant="tertiary" :icon="iconForward">
        Azione Terziaria Speciale
      </Button>
    </div>

    <div>
      <Button variant="tertiary" :icon="iconForward" disabled>
        Terziaria disabled
      </Button>
    </div>

    <div>
      <Button variant="tonal" :icon="iconForward">
        Tonal
      </Button>
    </div>

    <div>
      <Button variant="tonal" :icon="iconForward" disabled>
        Tonal disabled
      </Button>
    </div>
  </main>
</template>

<style scoped lang="scss">
main {
  @include component-wrapper;
}

div {
  margin: 0.5rem;
}

</style>
