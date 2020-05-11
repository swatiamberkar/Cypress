const excelToJson = require('convert-excel-to-json');
const fs = require('fs');

//'use strict';


const result = excelToJson({
	sourceFile: 'C:\\Users\\swati.amberkar\\Downloads\\BirthDay.xlsx'
	
});
console.log("File Appended Successfully");
console.log(result);
	

