/**
 * 包装 Model
 * @param data
 * @param type
 * @constructor
 */
export default function OrderModel(data, type = null) {
  this.data = data;
  this.type = type;
}
