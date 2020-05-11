
//import { writeFileSync } from "fs";
//import * as XLSX from "xlsx";

//require('\excel.js');
import excel

// describe("Dynamically Generated Tests", () => {
/*	it('successfully Page loads', function() {
try {
	
  const workBook = XLSX.readFileSync("BirthDay.xlsx");
  } catch (e) {
  throw Error(e);
}
  const jsonData = XLSX.utils.sheet_to_json('BirthDay');
  writeFileSync(
    "testData.json",
    JSON.stringify(jsonData, null, 4),
    "utf-8"
  );

	})
*/	
/*	it('successfully Page loads', function() {
	
	cy.readFile('C:\\Users\\swati.amberkar\\Downloads\\BirthDay.xlsx').then(records => {
	cy.log(records.toString())
        // do stuff with records
})

cy.fixture('BirthDay.xlsx').then(xlsx => xlsx[process.env.ENVIRONMENT]).as('myData')

cy.log(this.myData)


})
*/

describe("Dynamically Generated Tests", () => {
it('successfully Page loads', function() {
	cy.log(this.result)
})
});
