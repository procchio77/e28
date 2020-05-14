<template>
    <div>
        <h2>Portfolio</h2>
        <p>Coming Soon!!</p>
        <table class="popularStocks">
            <thead>
                <tr>
                 <th>Stock Symbol</th>
                 <th>Total Shares</th>
                 <th>Current Price</th>
                 <th>Your Equity</th>
                </tr>
            </thead>
            <tbody>
                 <show-portfolio v-for='stock in portfolio' :key='stock.symbol' :stock='stock'></show-portfolio>
            </tbody>
        </table>
    </div>
</template>
<script>


import ShowPortfolio from '@/components/ShowPortfolio.vue';
import * as app from '@/common/app.js';

export default {

    components: {
        'show-portfolio': ShowPortfolio
    },
    props: [],

    name: '',
    data: function() {
        return {
            portfolio: [],
        };
    },
    methods: {
    },

    mounted: function() {
        app.api.all('portfolio').then(response => {
            this.portfolio = response;
        });

    }
};
</script>

<style scoped>
</style>