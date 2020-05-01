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

import * as app from '@/common/app.js';
import ShowStock from '@/components/ShowStock.vue';

export default {
    name: '',
    //props: ['category'],
    components: {
        'show-stock': ShowStock
    },
    data: function() {
        return {
            popularStocks: [],
            selectedCategory: '',
            stockcategories: []
        };
    },

    methods: {
      selectCategory:function() {

        app.api.filter('stocks', 'categories', 'array-contains', this.selectedCategory).
        then(response => {this.popularStocks = response;
    });
    }},

    mounted: function() {

        app.api.all('stockcategories').then(response => {
            this.stockcategories = response;
        });

        app.api.filter('stocks', 'categories', 'array-contains', this.selectedCategory).
        then(response => {this.popularStocks = response;
    });

    },
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

