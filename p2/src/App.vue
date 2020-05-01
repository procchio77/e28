<template>
    <div id='app'>
        <img alt='bTrader logo' id='logo' src='@/assets/images/companylogo.png' />
        <nav>
            <ul>
                <li v-for='link in links' :key='link'>
                    <router-link :to='{ name: link }' exact>{{ link }}</router-link>
                </li>
            </ul>
        </nav>

        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: 'App',
    components: {},
    data: function() {
        return {
            links: ['home', 'portfolio', 'buy stock', 'sell stock', 'order history']
        };
    },
    mounted: function() {}
};
</script>

<style lang='scss'>
@import '@/assets/styles/cm.scss';
</style>