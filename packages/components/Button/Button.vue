<script setup lang="ts">
import { ref,computed,inject } from "vue";
import type { ButtonProps,ButtonEmits,ButtonInstance } from "./types";
import {throttle } from 'lodash-es'
import ErIcon from "../Icon/Icon.vue";
import { BUTTON_GROUP_CTX_KEY } from "./contants";
defineOptions({ name: 'ErButton' })

const props = withDefaults(defineProps<ButtonProps>(), {
    tag: 'button',
    nativeType: 'button',
    useThrottle: true,
    throttleDuration: 500,
})

const slots=defineSlots()

const emits = defineEmits<ButtonEmits>()

const ctx=inject(BUTTON_GROUP_CTX_KEY,void 0)

const _ref=ref<HTMLButtonElement>()

const size=computed(()=>ctx?.size??props?.size ??"")
const type=computed(()=>ctx?.type??props?.type ??"")

const disabled=computed(()=>ctx?.disabled||props?.disabled ||false)

const handleBthClick = (e: MouseEvent) => emits('click', e)

const handleBthClickThrottle = throttle(handleBthClick, props.throttleDuration, { trailing: false })

const iconStyle = computed(() => ({
  marginRight: slots.default ? "6px" : "0px",
}));

defineExpose<ButtonInstance>({
    ref:_ref
})
</script>

<template>
    <component :is="tag" 
    ref="_ref"
    class="er-button"
    :type="tag==='button'?nativeType:void 0"
    :disabled="disabled || loading ? true : void 0"
    :autofocus="autofocus"
    :class="{
        [`er-button--${type}`]:type,
        [`er-button--${size}`]:size,
        'is-round':round,
        'is-circle':circle,
        'is-plain':plain,
        'is-disabled':disabled,
        'is-loading':loading
    }"
      @click="(e: MouseEvent) => useThrottle ? handleBthClickThrottle(e) : handleBthClick(e)">
      <template v-if="loading">
       <slot name="loading">
        <er-icon class="loading-icon" 
        :icon="loadingIcon??'spinner'"
          spin  size="1x"  :style="iconStyle"/>
       </slot>
      </template>
      <er-icon
      v-if="icon && !loading"
      :icon="icon"
      :style="iconStyle"
      size="1x"
    />
    <slot></slot>
    </component>
</template>

<style scoped>
@import './style.css';
</style>
