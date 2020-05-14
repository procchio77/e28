<template>
        <tr>
          <td>{{ stock.companyname }}</td>
          <td>{{ stock.symbol}}</td>
          <td>${{ stock.price}}</td>
          <td> 
            <router-link class='stock' 
            :to='{ name: "buy stock", params: {symbol: stock.symbol, price: stock.price }}'>
            Buy
            </router-link>
          </td>
        </tr>
</template>

<script>
export default {
    name: '',
    props: ['stock'],
    data: function() {
        return {};
    },
    computed: {
    },
};
</script>

<style scoped>
</style>