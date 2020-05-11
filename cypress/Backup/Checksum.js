describe('Attendence Process ', function() {
	
	var company='ABC INDIA PVT LTD'
	var employeeCode = 'A-002'
	
/*	it('Open Application', function() {
		const { softAssert, softExpect } = chai;
		cy.readFile('cypress.json')
		
		var file = 'machinelog17-2.xlsx' 
		var checkSum_MachineLog = '65903e82432c1ddb2a402f89d7bcbb4'
		
		
		cy.visit('http://onlinemd5.com/') 
		
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
	it('Write file', function() {
		cy.writeFile('D:/DemoFiles/ascii.xlsx', employeeCode, 'ascii')
	})


})

