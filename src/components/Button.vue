<script setup>
import { computed, useSlots, Comment, Text, Fragment } from 'vue';

// TODO: loading, fullWidth o Block, "to" per vue router

// Può essere 'button', 'a', o un router-link tag
const props = defineProps({
  tag: {
    type: String,
    default: 'button', 
  },

  // Per quando tag è 'a'
  href: { 
    type: String,
    default: null,
  },

   // Per quando tag è 'a', es. '_blank'
  target: {
    type: String,
    default: null,
  },

  // Prop per l'attributo 'type' del tag <button> (es. 'button', 'submit', 'reset')
  type: {
    type: String,
    default: 'button', 
    validator: (value) => ['button', 'submit', 'reset'].includes(value),
  },

  // Per l'accessibilità, specialmente per bottoni solo icona
  ariaLabel: { 
    type: String,
    default: null,
  },

  // Prop per la dimensione del bottone
  // TODO: xs, xl
  size: { 
    type: String,
    default: 'md', 
    validator: (value) => ['xs','sm', 'md', 'lg', 'xl'].includes(value),
  },

  // Prop per i border-radius del bottone
  // TODO
  shape: { 
    type: String,
    default: 'rounded',
    validator: (value) => ['rounded', 'square'].includes(value),
  },

  // Prop per le elevazioni del bottone
  elevated: { 
    type: String,
    default: null,
    validator: (value) => ['1', '2', '3'].includes(value),
  },

  // Prop per definire la variante del bottone
  // TODO: aggiungere/modificare classi
  variant: { 
    type: String,
    default: 'primary',
    validator: (value) => 
      ['primary', 'secondary', 'tertiary', 'text', 'tonal', 'outlined', 'custom-primary', 'custom-secondary'].includes(value),
  },
  
  disabled: {
    type: Boolean
  },  

  // Prop per passare il tracciato SVG dell'icona
  icon: { 
    type: String,
    default: null,
  },

  // Dimensione dell'icona
  // TODO: forse dimensioni preconfiguate? xs, sm, md, lg, xl?
  iconSize: { 
    type: [String, Number],
    default: '1.2em',         // Relativa alla dimensione del font del bottone, o un valore fisso es: 20
  },

  // Posizione dell'icona rispetto al testo
  iconPosition: { 
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
  // Applica la classe base e la classe della variante
  const baseClasses = ['btn', `btn--${props.variant}`]; 

  // Aggiunge la classe per il border-radius solo se non è 'round' (default)
  if (props.shape && props.shape !== 'round') { 
    baseClasses.push(`btn--${props.shape}`);
  }

  // Aggiunge la classe per elevated
  if (props.elevated) { 
    baseClasses.push(`btn--elevated-${props.elevated}`);
  }

  // Aggiunge la classe per la dimensione solo se non è 'md' (default)
  if (props.size && props.size !== 'md') { 
    baseClasses.push(`btn--${props.size}`);
  }

  // Aggiunge la classe .disabled per coerenza stilistica
  if (props.disabled) {
    baseClasses.push('disabled'); 
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
    role="button"
    :type="buttonType"
    
    :href="(tag === 'a' && !disabled) ? href : null"
    :target="(tag === 'a' && !disabled) ? target : null"
    
    :class="buttonClasses"    
    :disabled="disabled"
    :tabindex="disabled ? -1 : undefined"
        
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