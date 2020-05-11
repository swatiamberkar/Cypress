describe('test_name', function() {
const fs = require('fs');
const pdf = require('pdf-parse');
	
var filename = '- Pocket HRMS.xlsx' 


/*	Cypress.Commands.add('getFileChecksumValue',(filename)=>{
    	 const getFileChecksum = (filename) => {
			 cy.log("filename: "+filename)
 // la(is.unemptyString(filename), 'expected filename', filename)
  la(is.unemptyString(filename), '- Pocket HRMS.xlsx', filename)

  const hashStream = () => {
    const s = crypto.createHash('sha512')

    s.setEncoding('hex')

    return s
  }

  return new Promise((resolve, reject) => {
    const stream = fs.createReadStream(filename)

    stream.on('error', reject)
    .pipe(hashStream())
    .on('error', reject)
    .on('finish', function () {
      resolve(this.read())
    })
  })
}
})
*/

/* it('what_it_does', function() {

    cy.visit('https://next.pockethrms.com/')
 
	Cypress.on('uncaught:exception', (err,runnable) => {
				return false;
		});
		
    //cy.visit('http://next.pockethrms.com/')
		cy.get('#Email').should('be.visible').should('have.css', 'border-radius') 
		cy.get('#Email').should('exist')
		cy.get('#Email').click()
		cy.get('#Email').type('administrator@bhagya.com')
		cy.get('#Email').should('have.value', 'administrator@bhagya.com')
		cy.get('#Password').should('be.visible').should('have.css', 'border-radius') 
		cy.get('#Password').should('exist')
		cy.get('#Password').click()
		cy.get('#Password').type('123456')
		cy.get('#Password').should('have.value', '123456')
		
		cy.get('[type="submit"]').click({force: true})
		
		 
	 
	 

	util.getFileChecksum
	
 
    cy.visit('https://next.pockethrms.com/identity/Home/Index')
	 cy.get('.dripicons-menu').click({force: true})
	 
 
    cy.get('.nav-link:nth-child(1) > table > tbody > tr > .menu-name-td > .img-fluid').click({force: true})
 
    cy.get('.menu-body > #MetricaAnalytic > .nav > .nav-item:nth-child(3) > .nav-link').click()
 
    cy.visit('https://next.pockethrms.com/Reports/Report/index')
 
    cy.get('.card > .card-body > #pills-tab > .nav-item > #payroll_detail_tab').click()
 
    cy.get('#payroll_detail > .row:nth-child(1) > .col-lg-2:nth-child(1) > .xcard:nth-child(1) > .xcard-body:nth-child(1) > div:nth-child(1) > .xeducation-activity:nth-child(1) > .xactivity:nth-child(1) > .list-group-item:nth-child(1) span:nth-child(2)').click()
 
 cy.wait(5000)
   
 
    cy.get('.well > .row > .col-sm-6 > .col-sm-6 > #drpfromMonth').select('1')
 

 
    cy.get('.well > .form-group > .col-sm-6 > .col-sm-6 > #drptoMonth').select('12')
 
 
    cy.get('.container-fluid > .col-sm-12 > #form1 > .text-center > #btnview').click()
  cy.wait(2000)
    cy.get('#payrollContentTitle > .row > .col-8 > #Salarysummary_Export > .fas').click()
	 cy.wait(2000)
	

 
 })
 */
 
 
	
	
/* it('Open Application', function() {
		const { softAssert, softExpect } = chai;
		//cy.readFile('cypress.json')
		
		var file = '- Pocket HRMS.xlsx' 
		var checkSum_MachineLog = 'DD0D5252B6D672A6BDC06E705A06EF02'
		
		
		//cy.visit('http://onlinemd5.com/') 
		
		cy.wait(2000)
		cy.fixture(file, 'binary')
		.then(Cypress.Blob.binaryStringToBlob)
		.then(fileContent => {
		cy.get('#files').upload({
		fileContent,
		fileName: file,
		mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
		encoding: 'utf8'
		})
		})
		
		Cypress.on('uncaught:exception', (err,runnable) => {
				return false;
		});
		
		cy.wait(2000)
		
			cy.get('#hash_string2').click({force: true})
			cy.get('#hash_string2').type(checkSum_MachineLog)
			
			cy.get("div").then(($sp) => {
			var result = $sp.hasClass('IcoSprite IcoCorrect IcoPos')
			cy.log(result)
			if ($sp.hasClass('IcoSprite IcoError IcoPos')) {
				
				softAssert(result === true, file+' Checksum is not Coreect');
			}
			else if ($sp.hasClass('IcoSprite IcoCorrect IcoPos')) {
				softAssert(result === true, file+' Checksum is Coreect');
			}
			})

	})
*/

it('successfully loads', function() {
		cy.visit('http://next.pockethrms.com/') 
	
	})
	
it('tests a pdf', () => {
	Cypress.on('uncaught:exception', (err,runnable) => {
				return false;
		});
  cy.task('getPdfContent', 'BirthDay.pdf').then(content => {
    // test you pdf content here, with expect(this and that)...
	 // number of pages
    cy.log(content);
	


  })
  
  
})
})
