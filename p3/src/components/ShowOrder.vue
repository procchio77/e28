<template>
        <tr>
          <td>{{ order.orderid }}</td>
          <td>{{ order.orderdate }}</td>
          <td>{{ order.ordertype }}</td>
          <td>{{ order.symbol }}</td>
          <td>{{ order.shares }}</td>
          <td>${{ order.price }}</td>
          <td>${{ order.ordertotal }}</td>
        </tr>
</template>

<script>
export default {
    name: '',
    props: ['order'],
    data: function() {
        return {};
    },
    computed: {
    },
};
</script>

<style scoped>
</style>


