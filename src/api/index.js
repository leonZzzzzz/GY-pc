import core from '@/modules/core/api'
import base from '@/modules/base/api'
import shopping from '@/modules/shopping/api'
import systemManager from '@/modules/system-manager/api'
import store from '@/modules/store/api'

export default {
  ...core,
  ...base,
  ...shopping,
  ...systemManager,
  ...store
}
