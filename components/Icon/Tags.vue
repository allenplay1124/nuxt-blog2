<template>
    <svg :width="width" :height="height" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 24 24">
        <path
            d="M12.79 21L3 11.21v2c0 .53.21 1.04.59 1.41l7.79 7.79c.78.78 2.05.78 2.83 0l6.21-6.21c.78-.78.78-2.05 0-2.83L12.79 21z"
            fill="currentColor"></path>
        <path
            d="M11.38 17.41c.39.39.9.59 1.41.59c.51 0 1.02-.2 1.41-.59l6.21-6.21c.78-.78.78-2.05 0-2.83L12.62.58C12.25.21 11.74 0 11.21 0H5C3.9 0 3 .9 3 2v6.21c0 .53.21 1.04.59 1.41l7.79 7.79zM5 2h6.21L19 9.79L12.79 16L5 8.21V2z"
            fill="currentColor"></path>
        <circle cx="7.25" cy="4.25" r="1.25" fill="currentColor"></circle>
    </svg>
</template>
<script>
    export default {
        name: 'IconTags',

        props: {
            width: {
                type: Number,
                default: 24,
            },
            height: {
                type: Number,
                default: 24,
            },
        }
    }
</script>
