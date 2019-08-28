// import { FLAG_STORAGE } from './DataStore';

export default class SysUtil {
  /**
   * 检查Item是否被收藏
   * @param item
   * @param keys
   * @returns {boolean}
   */
  static checkFavourite(item, keys = []) {
    if (!keys) return false;
    for (let i = 0, len = keys.length; i < len; i++) {
      const id = item.id ? item.id : item.fullName;
      if (id.toString() === keys[i]) {
        return true;
      }
    }
    return false;
  }

  /**
   * 检查key是否存在于keys中
   * @param keys
   * @param key
   */
  static checkKeyIsExist(keys, key) {
    for (let i = 0, len = keys.length; i < len; i++) {
      const item = keys[i].name.toLowerCase();
      if (key && key.toLowerCase() === item.toLowerCase()) return true;
    }
    return false;
  }

  /**
   * 收藏函数
   * @param item
   * @param isFavourite
   * @param favouriteDao
   */
  static onFavourite(item, isFavourite, favouriteDao) {
    const key = flag === FLAG_STORAGE.FLAG_TRENDING ? item.fullName : item.id.toString();
    if (isFavourite) {
      favouriteDao.saveFavouriteItem(key, JSON.stringify(item));
    } else {
      favouriteDao.removeFavouriteItem(key);
    }
  }

  /**
   * 收藏函数 - 最热
   * @param item
   * @param isFavourite
   * @param favouriteDao
   */
  static onFavouritePopular(item, isFavourite, favouriteDao) {
    const key = item.id.toString();
    if (isFavourite) {
      favouriteDao.saveFavouriteItem(key, JSON.stringify(item));
    } else {
      favouriteDao.removeFavouriteItem(key);
    }
  }

  /**
   * 收藏函数 - 趋势
   * @param item
   * @param isFavourite
   * @param favouriteDao
   */
  static onFavouriteTrending(item, isFavourite, favouriteDao) {
    const key = item.fullName;
    if (isFavourite) {
      favouriteDao.saveFavouriteItem(key, JSON.stringify(item));
    } else {
      favouriteDao.removeFavouriteItem(key);
    }
  }

}
