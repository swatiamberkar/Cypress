'use strict';
var excelToJson = require('convert-excel-to-json');
const fs = require('fs')


function getFileTextData(){
	
     const result = excelToJson({
	sourceFile: 'C:\\Users\\swati.amberkar\\Downloads\\BirthDay.xlsx',
	sheets: [
	{
		name: 'BirthDay',
	    range: 'A4:C5'
	}],
	columnToKey: {
		A: 'EmployeeCode',
		B: 'EmployeeName',
		C: 'DateOfBirth'
	}
	
	//sourceFile: data	
});

console.log("File Parsed Successfully");
		console.log(result);
		
return result;
};


module.exports = (on, config) => {
  on('task', {
    PrintText() {
      fs.readFile(process.argv[2], function(err, data) {
		var content = "{"+ JSON.stringify(getFileTextData())+"},\n";
		fs.appendFileSync('outputs/fileConvertData'+new Date().toLocaleDateString().replace(/\//g,"-")+'.txt', content);
		console.log("File Parsed Successfully");
		console.log(content);
	});

      //return null
    }
  })
}

