const IS_DEV = process.env.NODE_ENV == 'development'

// 项目接口前缀
export const BASEURL = IS_DEV
  ? 'mrguyu'
  : location.origin + location.pathname.match(/\/\w+/g)[0]

export const PHPURL = IS_DEV
  ? 'guyu'
  : location.origin + '/guyu/index.php/'

// 图片前缀
export const IMGURL = 'https://guyu-1300342109.cos.ap-guangzhou.myqcloud.com'
