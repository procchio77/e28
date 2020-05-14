import { expect } from 'chai'
import { shallowMount, RouterLinkStub } from '@vue/test-utils'
import ShowStock from '@/components/ShowStock.vue'

describe('ShowStock.vue', () => {
  it('it shows a stock', () => {

    let stock = {
       symbol: 'F',
       price: 2.22,
       companyname: 'Ford'
    }

    const wrapper = shallowMount(ShowStock, {
      propsData: { stock },
      stubs: {
          RouterLink: RouterLinkStub
      }
  })

   // Assert our results
   expect(wrapper.text()).to.include(stock.companyname)
   
   let foundBuyLink = wrapper.find('[data-test="buy-link"]').exists();
   expect(foundBuyLink).to.equal(true);
})

})