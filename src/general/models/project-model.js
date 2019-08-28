/**
 * 带收藏状态的 ItemModel
 * @param item
 * @param isFavourite
 * @constructor
 */
export default function ProjectModel(item, isFavourite) {
  this.item = item;
  this.isFavourite = isFavourite;
}
