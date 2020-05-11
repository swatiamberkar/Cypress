
	
const fs = require('fs');
const pdf = require('pdf-parse');



	fs.readFile('C:\\Users\\swati.amberkar\\Downloads\\BirthDay.xlsx', function (err, data) {
   if (err) {
      return console.error(err);
   }
   console.log("Asynchronous read: " + data.toString());
});

// Synchronous read
var data = fs.readFileSync('C:\\Users\\swati.amberkar\\Downloads\\BirthDay.xlsx');
console.log("Synchronous read: " + data.toString());

console.log("Program Ended");


	
/*
	//const fileUrl = new URL();

	let dataBuffer = fs.readFileSync('C:\\Users\\swati.amberkar\\Downloads\\BirthDay.pdf');
 
	pdf(dataBuffer).then(function(data) {
 
  // number of pages
    cy.log(data.numpages);
    // number of pages
    console.log(data.numpages);
    // number of rendered pages
    console.log(data.numrender);
    // PDF info
    console.log(data.info);
    // PDF metadata
    console.log(data.metadata); 
    // PDF.js version
    // check https://mozilla.github.io/pdf.js/getting_started/
    console.log(data.version);
    // PDF text
    console.log(data.text); 
        
});
*/
