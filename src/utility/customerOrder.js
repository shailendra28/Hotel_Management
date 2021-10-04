 //Details of customer's Order
 class CustomerOrders{
    itemName;
    itemQuantity;
    itemprice;
    totalAmount;

    constructor(itemName,itemQuantity,itemprice,totalAmount){
      this.itemName = itemName;
      this.itemQuantity = itemQuantity;
      this.itemprice =itemprice;
      this.totalAmount = totalAmount;
    }

    get getitemName() {
        return this.itemName;
    }

    set setitemName(value) {
        this.itemName = value;
    }

    get getitemQuantity() {
        return this.itemQuantity;
    }

    set setItemQuantity(value) {
        this.itemQuantity = value;
    }

    get getitemPrice() {
        return this.itemPrice;
    }

    set setitemPrice(value) {
        this.itemPrice = value;
    }

    get gettotalAmount() {
        return this.totalAmount;
    }

    set settotalAmount(value) {
        this.totalAmount = value;
    }
}

module.exports = CustomerOrders;