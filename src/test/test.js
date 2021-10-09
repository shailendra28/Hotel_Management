const assert = require("assert");
const chai = require("chai");
const Utility = require("../utility/Utility");
const u = new Utility();
describe("generateuniqueKey", function () {
  describe("generateuniqueKey", function () {
    it("generateuniqueKey should return valid key", function () {
      let result = u.generateuniqueKey("Shailendra", "9969550645");
      assert.equal(result, "Shai9969");
    });

    it("generateuniqueKey should return a string", function () {
      let result = u.generateuniqueKey("Shailendra", "9969550645");
      assert.toString(result, "string");
    });
  });
});
