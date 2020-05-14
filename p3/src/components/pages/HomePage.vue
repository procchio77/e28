<template>
    <div>
        <show-popular :category='stockCategory'></show-popular>
    </div>
</template>

<script>
import ShowPopularStocks from '@/components/ShowPopularStocks.vue';

export default {
    name: 'ShowHome',
    components: {
        'show-popular': ShowPopularStocks
    },
    data: function() {
        return {
            stockCategory: ''
        };
    }
};
</script>

