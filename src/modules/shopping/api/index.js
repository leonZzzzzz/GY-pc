import product from './product'
import brand from './brand'
import params from './params'
import order from './order'
import store from './store'
import service from './service'
import groupShopping from './group-shopping'
import helpShopping from './help-shopping'
import config from './config'
import salesman from './salesman'
import withdraw from './withdraw'
import driver from './driver'

export default {
  ...product,
  ...brand,
  ...params,
  ...order,
  ...store,
  ...service,
  ...groupShopping,
  ...helpShopping,
  ...config,
  ...salesman,
  ...withdraw,
  ...driver
}
