<template>
    <div>
        <h2>Order History</h2>

        <table class="popularStocks">
            <thead>
                <tr>
                 <th>OrderId</th>
                 <th>Order Date</th>
                 <th>Order Type</th>
                 <th>Stock Symbol</th>
                 <th>Shares</th>
                 <th>Buy/Sell Price</th>
                 <th>Order Total</th>
                </tr>
            </thead>
            <tbody>
                 <show-order v-for='order in stockorder' :key='order.orderid' :order='order'></show-order>
            </tbody>
        </table>
    </div>
</template>
<script>


import ShowOrder from '@/components/ShowOrder.vue';
export default {
    name: '',
    components: {
        'show-order': ShowOrder
    },
    props: [],
    
    data: function() {
        return {
            //stockorder: []
        };
    },
    mounted: function() {
         this.$store.dispatch('setOrderHistory');
    },

    computed: {
        stockorder: function() {
            return this.$store.state.orderHistory;
        }
    }

};
</script>

<style scoped>
</style>