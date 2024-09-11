<script lang="ts" setup>

defineProps<{ status: 'error'|'success'; }>();

</script>

<template>
    <Transition name="message">
        <div :class="['message', {'message_status-error': status == 'error'}]">
            <button class="message__close-button"></button>
        </div>
    </Transition>
    
</template>