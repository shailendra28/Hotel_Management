class CustomerDetail {
    firstName;
    lastName;
    phoneNumber;
    email;
    durationtoStay;
    uniqueKey;
  
    constructor(firstName, lastName,phoneNumber, email,durationtoStay,uniqueKey,orders) {
      this.firstName = firstName;
      this.lastName = lastName;
      this. phoneNumber = phoneNumber;
      this. email =  email;
      this.durationtoStay = durationtoStay;
      this.uniqueKey = uniqueKey;
    }
  
    get fName() {
        return this.firstName;
      }

    set fName(firstName) {
      let nameRegex = RegExp("^[A-Z]{1}[a-z]{3,}$");
      if (nameRegex.test(firstName)) {
        this.firstName = firstName;
      } else {
        throw "Please Start with one Upper case !!!";
      }
    }
  
    get lName() {
        return this.lastName;
      }
  
    set lName(lastName) {
      let nameRegex = RegExp("^[A-Z]{1}[a-z]{3,}$");
      if (nameRegex.test(lastName)) {
        this.lastName = lastName;
      } else {
        throw "Please Start with one Upper case";
      }
    }
  
   
    get pNumber() {
        return this.phoneNumber;
      }
  
    set pNumber(phoneNumber) {
      let nameRegex = RegExp("^[6-9]{1}[0-9]{9}$");
      if (nameRegex.test(phoneNumber)) {
        this.phoneNumber =phoneNumber;
      } else {
        throw "Please Enter proper phone Number";
      }
    }

    
    get customeremail() {
        return this.email;
      }

    set customeremail(email) {
      let nameRegex = RegExp("^[A-Za-z0-9+_.-]+@(.+)$");
      if (nameRegex.test(email)) {
        this.email = email;
      } else {
        throw "Please Enter Valid Email ID !!!";
      }
    }
    get duration() {
        return this.durationtoStay;
      }
  
    set duration(durationtoStay) {
      this.durationtoStay = durationtoStay;
    }
  
    get unique() {
        return this.uniqueKey;
    }
  
    set unique(uniqueKey) {
      this.uniqueKey = uniqueKey;
    }
  }
  
  module.exports = CustomerDetail;