const { update } = require("lodash");
const prompt = require("prompt-sync")();
const CustomerDetail = require('./customerDetails');
const CustomerOrders = require('./customerDetails');
const fs = require('fs')

class CustomerUtility{
// customer's Menu 
customerMenu = () => {
console.log("\nPress 1: Registration");
console.log("Press 2: Login");
console.log("Press3: Exit");
return parseInt(prompt("Enter your choice : "));

};

// registration of customer
registerUser = (dataArray) => {
    let customer = new Customer();
    console.log("");
    customer.fName = prompt("Enter your first name");
    customer.lName = prompt("Enter your last name");
    customer.phone = prompt("Enter your phone number");
    customer.email = prompt("Enter your email Id");
    customer.daystoStay = prompt("Enter the number of days to stay");
    customer.uId = this.generateuId(
        customer.fName,
        customer.phone
    );

customer.orders = [];
this.writeJSON(customer);
console.log(
    "\n" + 
    customer.fName +
    " " +
    customer.lName +
    " You registerd succesfully"
);
};


//  customer info to json file
writeJSON = (customer) => {
    const doc = fs.readFileSync("G:/HotelManagement/json/data.json");
    const docObj = JSON.parse(doc);
    docObj.push(customer);
    const str = JSON.stringify(docObj);
    fs.writeFileSync("G:/HotelManagement/json/data.json");
};

//generate uId for customer
generateuId = (name ,number) => {
    return name.substring(0, 4) + number.stringify(0,4);
};


//login for customer
login = () =>
    {
    console.log (
        "\n(Hint : your key must b 4 char of your name and mob number)"
        );
        let name = prompt("enter your name : ");
        let uId = prompt("enter key : ");
        const doc = fs.readFileSync("G:/HotelManagement/json/data.json");
        const docObj = JSON.parse(doc);
        for (let user in docObj) {
        if  (
            (docObj[user].firstName === name && docObj[user].uId) === uId
        )
        {
            const userDetailsobj = docObj[user];
            return userDetailsobj;
        }   else if (name == "Admin" && uId == "admin123") {
            console.log("\nWelcome Admin");
            this.adminPage();
        }
    }
}
    
// order Menu of customer

orderMenu = () => {
    const loginObject = this.login();
    let option = 0;
    do {
        console.log("\nPress 1 - order food");
        console.log("\nPress 2 - order service");
        console.log("\nPress 3 - order check out");
        console.log("\nPress 4 - log out");
        option = parseInt(prompt("enter your choice: "));
        switch (option) {
            case 1 :
            this.orderFood(loginObject);
            break;
            case 2:
            this.orderServises(loginObject);
            break;
            case 3:
                console.log("not implemented yet");
                break;
                default :
                console.log();
                break;
        }
    }
     while (option != 4);
    };


    // update data According to  user's order
    updateData = (uId,order) => {
        const doc = fs.readFileSync("G:/HotelManagement/json/data.json");
        const docObj = JSON.parse(doc);
        docObj.forEach(element => {
            if (element.uId == uId) {
                element.order.push(orders);
            }
            
        });

    orderFood = (loginObject) => {
        let foodArray = new Array();
        let option = 0;
        do {
            console.log("\nPress1 - oreder tea (50)");
            console.log("\nPress2 - oreder breakfast (150)");
            console.log("\nPress3 - oreder lunch (250)");
            console.log("\nPress4 - oreder dinner (350)");
            console.log("\nPress5 - oreder confirm");
            console.log("\nPress6 - back\n");
            option = parseInt(prompt("enter ur choice : "));
                switch (option) {
                    case 1:
                        foodArray.push(new orders("tea", 1,50,50));
                        console.log("\nItem added in cart");
                        break;
                    case 2:
                        foodArray.push(new orders("breakfast", 1,150,150));
                        console.log("\nItem added in cart");
                        break;
                    case 3:
                        foodArray.push(new orders("lunch", 1,250,250));
                        console.log("\nItem added in cart");
                        break; 
                    case 4:
                        foodArray.push(new orders("dinner", 1,350,350));
                        console.log("\nItem added in cart");
                        break;   
                    case 5:
                        foodArray.push(new orders("order confirm"));
                        this.updateData(loginObject.uId.foodArray);
                        break;

                }
            }while (option != 6);
        }
    };

        // Order services

        orderServices= (loginObject) => {
            let serviceArray = new Array();
            let option = 0;
            do {
                console.log("\nPress1 - order Cleanning (50)");
                console.log("\nPress2 - order travell giude (150)");
                console.log("\nPress3 - order car (250)");
                console.log("\nPress4 - order bike (350)");
                console.log("\nPress5 - order confirm");
                console.log("\nPress6 - back\n");
                option = parseInt(prompt("enter ur choice : "));
                switch (option) {
                    case 1:
                        serviceArray.push(new orders("Cleanning", 1,50,50));
                        console.log("\nItem added in cart");
                        break;
                    case 2:
                        serviceArray.push(new orders("travell giude", 1,150,150));
                        console.log("\nItem added in cart");
                        break;
                    case 3:
                        serviceArray.push(new orders("car", 1,250,250));
                        console.log("\nItem added in cart");
                        break; 
                    case 4:
                        serviceArray.push(new orders("bike", 1,350,350));
                        console.log("\nItem added in cart");
                        break;   
                    case 5:
                        serviceArray.push(new orders("order confirm"));
                        this.updateData(loginObject.uId.foodArray);
                        break;

                }
            }while (option != 6);
        };

        // billing


        createBill = (uId) => {
            const doc = fs.readFileSystem("G:/HotelManagement/json/data.json");
            const docObj = JSON.parse(doc);
            docObj.forEach((element) => {
              if (element.uId == uId){
                  var sum = element.purchaseArray.reduce(function (a, b){
                      return a + b;
                  }, 0);
                  return sum;
              }
            });
        };

        // admin 

        adminPage = () => {
            console.log("\nPress1 - print bill");
            console.log("Press2 - view all customers");
            console.log("Press 3 - logout\n");
            let option = parseInt(prompt("enter ur choice:"));
            if (option == 1) {
                let uId = prompt("enter key to confirm :");
            console.log("Total bill :" + this.createBill(uId));
        } else if (option == 2) {
            const doc = fs.readFileSystem("G:/HotelManagement/json/data.json");
            const docObj = JSON.parse(doc);
            console.log(docObj);
        } else this.login();
    }


         orderFinal = (uId, orders) => {
            const doc = fs.readFileSync("G:/HotelManagement/json/data.json");
            const detailObj = JSON.parse(doc);
            detailObj.forEach((element) => {
            if (element.uId == uId) {
            element.orders.push(orders);
         }
    });
    const str = JSON.stringify(detailObj);
    fs.writeFileSync("", str);
  };
}

module.exports = CustomerUtility;