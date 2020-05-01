<template>
  <div class="container">
    <div id="form" class="form">
      <h2>Buy Stock</h2>

      <div class="form-control">
        <label for="symbol">Symbol</label>
        <input type="text" v-model="stockorder.symbol" id="symbol"/>
      </div>

      <div class="form-control">
      <label for="shares">Shares Qty</label>
      <input type="text" v-model="stockorder.shares" id="shares" />
      </div>
    
      <div class="form-control">
      <label for="price">Stock Price</label>
      <input type="text" v-model="stockorder.price" id="price" />
      </div>

      <div class="form-control">
      <label for="ordertotal">Estimated Costs</label>
      <input type="text" v-model="orderTotal" id="ordertotal" />
      </div>

      <button type="submit" value="Buy" @click.prevent="addStockOrder">Buy</button>

      <transition name="fade">
        <div class="alert" v-if="added">Your order was successful!</div>
      </transition>
    </div>
  </div>
</template>

<script>
import * as app from "@/common/app.js";
import { uuid } from "vue-uuid";

export default {
  name: "",
  props:  ['symbol', 'price'],
  data: function() {
    return {
      added: false,
      stockorder: {
        symbol: "",
        shares: "",
        price: "",
        orderid: "",
        orderdate: "",
        ordertype: "",
        ordertotal: "",
      },
    };
  },
  methods: {
    addStockOrder: function() {
      //set orderid
      this.stockorder.orderid = uuid.v1();
      this.stockorder.orderdate = new Date();
      this.stockorder.ordertotal =
        this.stockorder.shares * this.stockorder.price;
      this.stockorder.ordertype = "buy";
      app.api.add("stockorder", this.stockorder).then((id) => {
        console.log("Stock order was added with the order number of: " + id);
        this.added = true;
        setTimeout(() => (this.added = false), 3000);
        this.stockorder = {
          symbol: "",
          shares: "",
          price: "",
          orderid: "",
          orderdate: "",
        };
      });
    },
  },
  
   mounted: function() {
       this.stockorder.symbol = this.symbol;
       this.stockorder.price = this.price;

    },
  
  computed: {
    orderTotal: function() {
      let total = this.stockorder.shares * this.stockorder.price;
      if (isNaN(total)) {
          total = 0;
      }
      var formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      });

      return formatter.format(total);
    },
  },
};
</script>

<style lang="scss" scoped>
html {
  box-sizing: border-box;
}
*,
*:before,
*:after {
  box-sizing: inherit;
}

body {
  font-size: 16px;
  background-color: #f9fafb;
  font-family: "Open Sans", sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  margin: 0;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

h2 {
  font-size: 1.8rem;
  margin-bottom: 2rem;
  text-align: center;
}

.container {
  background: white;
  border-radius: 25px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3), 0 2px 50px 0 rgba(0, 0, 0, 0.1);
  width: 100%;
}

.form {
  padding: 1.5rem 1.8rem;
}

.form-control {
  padding-bottom: 0.1rem;
  position: relative;
}

  input {
    border: 2px solid #f0f0f0;
    border-radius: 4px;
    display: block;
    height:30px;
    width: 100%;
    padding: 10px;
    margin: 1rem 0;
    &:focus {
      border-color: var(--primary-color);
      outline: 0;
      &:valid {
        background: white;
        z-index: -1;
      }
    }
  }


.form button {
  cursor: pointer;
  background: green;
  border: 2px solid var(--primary-color);
  color: white;
  display: block;
  font-size: 16px;
  padding: 0.5rem;
  border-radius: 4px;
  width: 100%;
  margin-top: 1rem;
}

</style>
