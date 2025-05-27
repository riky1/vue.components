<script setup>
import { computed } from 'vue';

const props = defineProps({
  tag: {
    type: String,
    default: 'button', // Può essere 'button', 'a', o un router-link tag
  },
  // Altre props come href, to, type, disabled, ecc.
  disabled: Boolean,
  // Potresti volere una prop per l'icona
  // icon: String,
});

const buttonClasses = computed(() => [
  'btn',
  'btn--primary',
  // Aggiungi qui altre classi basate su props se necessario
]);

const buttonType = computed(() => {
  if (props.tag === 'button') {
    return props.type || 'button';
  }
  return null;
});
</script>

<template>
  <component
    :is="tag"
    :class="buttonClasses"
    :type="buttonType"
    :disabled="disabled"
    role="button"
    :aria-disabled="disabled ? 'true' : null"
    v-bind="$attrs"
  >
    <!-- Esempio con slot per icona e testo -->
    <span v-if="$slots.icon" class="btn__icon">
      <slot name="icon"></slot>
    </span>
    <span class="btn__text">
      <slot></slot> <!-- Contenuto di default del bottone (testo) -->
    </span>
  </component>
</template>

<style lang="scss" scoped>
.btn__text {
  font-size: 0.875rem;
  
  @include media-query(sm) {
    font-size: 1rem;
  }
}
</style>