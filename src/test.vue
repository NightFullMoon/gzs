<template>
    <input ref="input" v-bind:value="value" v-on:input="updateValue($event.target.value)">
</template>

<script>


export default {
    name: 'my-checkbox',
    model: {
        prop: 'checked',
        event: 'change'
    },
    props: {
        // this allows using the `value` prop for a different purpose
        value: String,
        // use `checked` as the prop which take the place of `value`
        checked: {
            type: Number,
            default: 0
        }
    },

}
</script>

<style>

</style>
