import position from './position'
import category from './category'
import tag from './tag'
import common from './common';
import pay from './pay';
import svcharge from './svcharge';
export default {
  ...common,
  ...position,
  ...category,
  ...tag,
  ...pay,
  ...svcharge
}
