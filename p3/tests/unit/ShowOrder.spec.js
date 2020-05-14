import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import ShowOrder from '@/components/ShowOrder.vue'

describe('ShowOrder.vue', () => {
  it('it shows an order', () => {

    let order = {
       orderid: '0000111',
       orderdate: '5/13/2020',
       ordertype: 'Buy',
       symbol: 'F',
       shares: '10',
       price: 5,
       ordertotal: 50
    }

    const wrapper = shallowMount(ShowOrder, {
      propsData: { order },

  })

   // Assert our results
   expect(wrapper.text()).to.include(order.ordertotal)
   
})

})