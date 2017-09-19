import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import optional from '@/components/optional'
import market from '@/components/market'
import order from '@/components/order'
import stocksearch from '@/components/stocksearch'
import todaynew from '@/components/todaynew'
import placeorder from '@/components/placeorder'
import guadan from '@/components/guadan'
import gpkk from '@/components/gpkk'
import indexkk from '@/components/indexkk'
import mycenter from '@/components/mycenter'
import myassets from '@/components/myassets'
import myphone from '@/components/myphone'
import breakdownassets from '@/components/breakdownassets'
import golden from '@/components/golden'
import gold from '@/components/gold'
import orderdetails from '@/components/orderdetails'
import addbank from '@/components/addbank'
import mybank from '@/components/mybank'

import iView from 'iview'
import 'iview/dist/styles/iview.css'   // 使用 CSS

Vue.use(iView);
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },{
    	path: '/optional',
    	name: 'optional',
    	component: optional
    },{
    	path: '/market',
    	name: 'market',
    	component: market
    },{
    	path: '/order',
    	name: 'order',
    	component: order
    },{
    	path: '/stocksearch',
    	name: 'stocksearch',
    	component: stocksearch
    },{
    	path: '/todaynew',
    	name: 'todaynew',
    	component: todaynew
    },{
    	path: '/placeorder',
    	name: 'placeorder',
    	component: placeorder
    },{
    	path: '/gpkk',
    	name: 'gpkk',
    	component: gpkk
    },{
    	path: '/indexkk',
    	name: 'indexkk',
    	component: indexkk
    },{
    	path: '/mycenter',
    	name: 'mycenter',
    	component: mycenter
    },{
    	path: '/myassets',
    	name: 'myassets',
    	component: myassets
    },{
    	path: '/myphone',
    	name: 'myphone',
    	component: myphone
    },{
    	path: '/breakdownassets',
    	name: 'breakdownassets',
    	component: breakdownassets
    },{
    	path: '/golden',
    	name: 'golden',
    	component: golden
    },{
    	path: '/gold',
    	name: 'gold',
    	component: gold
    },{
    	path: '/orderdetails',
    	name: 'orderdetails',
    	component: orderdetails
    },{
    	path: '/guadan',
    	name: 'guadan',
    	component: guadan
    },{
    	path: '/addbank',
    	name: 'addbank',
    	component: addbank
    },{
    	path: '/mybank',
    	name: 'mybank',
    	component: mybank
    }
  ]
})
