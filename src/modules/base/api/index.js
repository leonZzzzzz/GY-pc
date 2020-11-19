import template from './template'
import news from './news';
import banner from './banner';
import config from './config';
import notice from './notice';
import specialArea from './specialArea';

export default {
  ...template,
  ...news,
  ...banner,
  ...config,
  ...notice,
  ...specialArea
}
