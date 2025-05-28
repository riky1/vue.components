<script setup>
import { computed, useSlots, Comment, Text, Fragment } from 'vue';

// TODO: loading, fullWidth o Block, to per vue router

const props = defineProps({
  tag: {
    type: String,
    default: 'button', // Può essere 'button', 'a', o un router-link tag
  },
  href: { // Per quando tag è 'a'
    type: String,
    default: null,
  },
  target: { // Per quando tag è 'a', es. '_blank'
    type: String,
    default: null,
  },
  ariaLabel: { // Per l'accessibilità, specialmente per bottoni solo icona
    type: String,
    default: null,
  },
  // Altre props come href, to, type, disabled, ecc.
  disabled: {
    type: Boolean
  },
  // icon: String,
  variant: { // Prop per definire la variante del bottone
    type: String,
    default: 'primary', // Valore di default
    validator: (value) => 
      ['primary', 'secondary', 'tertiary', 'text', 'tonal'].includes(value),
  },
  size: { // Prop per la dimensione del bottone
    type: String,
    default: 'md', // 'md' (medium) come default
    validator: (value) => ['sm', 'md', 'lg'].includes(value),
  },
  icon: { // Prop per passare il tracciato SVG dell'icona
    type: String,
    default: null,
  },
  iconSize: { // Dimensione dell'icona
    type: [String, Number],
    default: '1.2em', // Relativa alla dimensione del font del bottone, o un valore fisso es: 20
  },
  iconPosition: { // Posizione dell'icona rispetto al testo
    type: String,
    default: 'left',
    validator: (value) => ['left', 'right'].includes(value),
  },
});

const slots = useSlots();

const hasIcon = computed(() => !!props.icon || !!slots.icon);

const hasVisibleTextContent = computed(() => {
  if (!slots.default) {
    return false; // Lo slot di default non è stato fornito
  }
  const defaultNodes = slots.default();

  // Funzione helper per determinare se un nodo è effettivamente "vuoto"
  // (un commento, testo solo whitespace, o un frammento che contiene solo nodi vuoti)
  function isNodeEffectivelyEmpty(node) {
    if (!node) return true;
    if (node.type === Comment) return true;
    if (node.type === Text && String(node.children).trim() === '') return true;
    if (node.type === Fragment && (!node.children || node.children.length === 0 || node.children.every(isNodeEffectivelyEmpty))) return true;
    return false;
  }
  return defaultNodes.some(node => !isNodeEffectivelyEmpty(node));
});

const buttonClasses = computed(() => {
  const baseClasses = ['btn', `btn--${props.variant}`]; // Applica la classe base e la classe della variante

  if (props.size && props.size !== 'md') { // Aggiunge la classe per la dimensione solo se non è 'md' (default)
    baseClasses.push(`btn--${props.size}`);
  }

  if (props.disabled) {
    baseClasses.push('disabled'); // Aggiunge la classe .disabled per coerenza stilistica
  }
  
  const utilityClasses = {
    'btn--icon': hasIcon.value,
    'btn--icon-right': hasIcon.value && props.iconPosition === 'right',
    // 'btn--icon-left' è implicito se 'btn--with-icon' è presente e 'btn--icon-right' non lo è
  }

  return [...baseClasses, utilityClasses];
});

const buttonType = computed(() => {
  if (props.tag === 'button') {
    return props.type || 'button';
  }
  return null;
});

function handleClick(event) {
  if (props.disabled) {
    event.preventDefault(); // Impedisce l'azione predefinita (es. navigazione per <a>)
    event.stopPropagation(); // Opzionale: ferma la propagazione dell'evento
    return;
  }
  // Qui potresti voler emettere un evento 'click' se necessario: emit('click', event);
}
</script>

<template>
  <component
    :is="tag"
    :class="buttonClasses"
    :type="buttonType"
    :disabled="disabled"
    :tabindex="disabled ? -1 : undefined"
    role="button"
    :href="(tag === 'a' && !disabled) ? href : null"
    :target="(tag === 'a' && !disabled) ? target : null"
    :aria-disabled="disabled ? 'true' : null"
    :aria-label="ariaLabel"
    v-bind="$attrs"
    @click="handleClick"
  >
    <span v-if="hasIcon" class="btn__icon">
      <slot v-if="$slots.icon" name="icon"></slot>
      <SvgIcon
        v-else-if="icon"
        :path="icon"
        :size="iconSize"
        type="mdi"
        aria-hidden="true"
      />
    </span>
    <span v-if="hasVisibleTextContent" class="btn__text">
      <slot></slot> <!-- Contenuto di default del bottone (testo) -->
    </span>
  </component>
</template>

<style lang="scss" scoped>

</style>