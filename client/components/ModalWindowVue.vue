<script lang="ts" setup>


</script>

<template>
    <div class="modal-window">
        <slot></slot>
    </div>
</template>

<style lang="sass" scoped>
.modal-window
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    display: grid
    place-items: center
    background-color: rgba(0, 0, 0, 0.7)
    z-index: 2
</style>