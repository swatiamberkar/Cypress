'use strict';
var excelToJson = require('convert-excel-to-json');
var fs = require('fs')
//var fs = require('fs-extra')

//'use strict';



/*
function getFileTextData(data){
    return result = excelToJson({
	sourceFile: 'C:\\Users\\swati.amberkar\\Downloads\\BirthDay.xlsx'
	
});
};

this.PrintText = function()
{
	fs.readFile(process.argv[2], function(err, data) {
		var content = "{dateTime:"+new Date()+", checksum:"+getFileTextData(data)+"},\n";
		fs.appendFileSync('outputs/fileChecksum'+new Date().toLocaleDateString().replace(/\//g,"-")+'.txt', content);
		console.log("File Appended Successfully");
		console.log(content);
	});
}

module.expoers = this.PrintText();

*/


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

	
/*this.PrintText = function()
{
	fs.readFile(process.argv[2], function(err, data) {
		var content = "{"+ JSON.stringify(getFileTextData())+"},\n";
		fs.appendFileSync('outputs/fileConvertData'+new Date().toLocaleDateString().replace(/\//g,"-")+'.txt', content);
		console.log("File Parsed Successfully");
		console.log(content);
	});
}

module.expoers = this.PrintText();
*/

function PrintText()
{
	fs.readFile(process.argv[2], function(err, data) {
		var content = "{"+ JSON.stringify(getFileTextData())+"},\n";
		fs.appendFileSync('outputs/fileConvertData'+new Date().toLocaleDateString().replace(/\//g,"-")+'.txt', content);
		console.log("File Parsed Successfully");
		console.log(content);
	});
}

module.expoers = PrintText();