import Vue from 'vue'
import Vuex from 'vuex'
import * as app from '@/common/app.js'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        stocks: [],
        stockSectors: [],
        orderHistory: []
    },

    //Mutations are used to update the state
    mutations: {
        setStocks(state, payload) {
            state.stocks = payload;
        },
        setStockSectors(state, payload) {
            state.stockSectors = payload;
        },
        setOrderHistory(state, payload) {
            state.orderHistory = payload;
        },

    },

    /*actions are similar to mutation except
      1. they can be asynchronous 
      2. they can't directly mutate the state; instead they commit mutations in order to effect change on the state.
    */
    actions: {
        setStocks(context) {
            app.api.all('stocks').then(response => {
                context.commit('setStocks', response);
            });
        },
        setStockSector(context) {
            app.api.all('stockcategories').then(response => {
                context.commit('setStockSectors', response);
            });
        },

        setOrderHistory(context) {
            app.api.all('stockorder').then(response => {
                context.commit('setOrderHistory', response);
            });
        }


    },

    // Getters - Methods used to retrieve and perform some operation on data in the store.
    getters: {
        getStocksBySector(state) {
            return function (sector) {

                const filteredObjects = Object.keys(state.stocks).reduce((acc, rec) => {
                    if (state.stocks[rec].categories.includes(sector))
                      return [...acc, state.stocks[rec]]
                    return acc;
                  }, [])

                    return filteredObjects;
            }
        }
    }


})