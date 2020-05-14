<template>
    <div>
        <h2>Popular Stocks by Sector</h2>
        <select v-model="selectedCategory" @change="selectCategory">>
            <option v-for="stockcategory in stockcategories" 
              :key="stockcategory.categoryname"
              :value="stockcategory.categoryname">
            {{ stockcategory.categoryname }}
            </option>
        </select>
        <br/><br/>
        <table class="popularStocks">
            <thead>
                <tr>
                 <th>Company</th>
                 <th>Symbol</th>
                 <th>Price</th>
                 <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <show-stock v-for='stock in popularStocks' :key='stock.symbol' :stock='stock'></show-stock>
            </tbody>
        </table>
    </div>
</template>
<script>

import ShowStock from '@/components/ShowStock.vue';

export default {
    name: '',
    components: {
        'show-stock': ShowStock
    },
    data: function() {
        return {
            selectedCategory: localStorage.getItem('selectSector')
        };
    },

    methods: {
      selectCategory:function() {
        //set selection to localstorage so when user comes back we can default sector
        localStorage.setItem('selectSector', this.selectedCategory);
        return this.popularStocks;
    
    }},

    computed: {
        popularStocks() {
             return this.$store.getters.getStocksBySector(this.selectedCategory);
        },
        stockcategories: function() {
            return this.$store.state.stockSectors;
        },


        }
    
};

</script>

<style>
table.popularStocks {
  width: 100%;
  background-color: #FFFFFF;
  border-collapse: collapse;
  border-width: 1px;
  border-color: #C9C1C1;
  border-style: solid;
  color: #000000;
}

table.popularStocks td, table.popularStocks th {
  border-width: 1px;
  border-color: #C9C1C1;
  border-style: solid;
  padding: 10px;
}

table.popularStocks thead {
  background-color: #92F8BB;
}
</style>

