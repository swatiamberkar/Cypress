describe('Employee Profile', function() {
	
	
	var employeeId = 'CY1';
	var filePath= 'Greytrix SSL VPN.pdf';
	var Employeecatagorytype='';
	
	it('successfully page  loads', function() {
		cy.visit('https://next.pockethrms.com/') 
	})
	
	it('Pocket HRMS Login', function() {
		cy.visit('https://next.pockethrms.com/')
		cy.get('#Email').should('be.visible').should('have.css', 'border-radius') 
		cy.get('#Email').should('exist')
		cy.get('#Email').click()
		cy.get('#Email').type('nileshgajare@live.com')
		cy.get('#Email').should('have.value', 'nileshgajare@live.com')
		cy.get('#Password').should('be.visible').should('have.css', 'border-radius') 
		cy.get('#Password').should('exist')
		cy.get('#Password').click()
		cy.get('#Password').type('123456')
		cy.get('#Password').should('have.value', '123456')
		cy.get('[type="submit"]').should('have.css', 'background-color').and('eq', 'rgb(77, 121, 246)')
		cy.get('[type="submit"]').click({force: true})
		cy.get('.validation-summary-errors').should('not.exist');
		cy.wait(2000)
	})
	

	
	beforeEach(function(){
        window.console.log('Enter the beforeEach function')
		Cypress.on('uncaught:exception', (err,runnable) => {
				return false;
		});
		Cypress.Cookies.preserveOnce('.AspNetCore.Antiforgery.w5W7x28NAIs','module','__cypress.initial','.AspNetCore.Session','1P_JAR','ARRAffinity','FavouriteMenus','XCategory','XCompanyId','XName','XSchemaName','XUserId','XUserName','_ga','_gid','ai_session','ai_user','new_username','GetLicenseData')
		cy.wait(2000)
    })
	
	it('Change Company', function() {		 
		cy.changeCompany(); 
	}) 
	
it('Search Specific Emp code you want to update', function() {
		cy.wait(3000)
		cy.get('#globalSearch').type(employeeId)
		cy.wait(2000)
		cy.contains('li','Loan test(CY1)').click({force: true})
		cy.wait(3000)
		cy.get('#profile_detail_tab').click({force:true})
	})
	
	it('Add Family Details', function() {
		cy.get('#profile_detail_tab').click({force:true})
		cy.wait(2000)
		cy.get('#Profile_FamilyDetails').click({force: true})
		cy.wait(2000)
		cy.get('[title="Add Family Details"]').eq(0).click({force: true})
		cy.wait(1000)
		
		cy.get('[onclick="CheckValid();"]').click({force: true})
		cy.wait(1000)
		  cy.get(".toast-message").invoke('text').then((text) => {
			if(text.trim()=='Select Relation')	{
			cy.wait(1000)
			cy.get(".toast-message").eq(0).click({force: true})
			  cy.get('#Relation').select('Brother')
			}
		 })
		
		 cy.wait(2000)
		cy.get('[onclick="CheckValid();"]').click({force: true})
		 cy.wait(1000)
		cy.get("#Name-error").invoke('text').then((text) => {
			expect(text.trim()).equal('The Name field is required.')
			cy.get('#Name').click({force: true})
			cy.get('#Name').clear()
			cy.get('#Name').type('Roshan pawar')
		})
				
		cy.get('#Address').click({force: true})
		cy.get('#Address').clear()
		cy.get('#Address').type('Cuttack')	
		cy.wait(1000)
		cy.get('#dateOfBirth').click().then(input => {
		   input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val('04/03/2000')
	   })
		cy.wait(2000)
		cy.get('#age').then(input => {
			input.val('19');
	   })
		cy.get('#aadhaarcard').click({force: true})
		cy.get('#aadhaarcard').type('2515478251022')
		
		cy.wait(2000)
		cy.get('[onclick="CheckValid();"]').click({force: true})
		
		cy.get(".toast-message").invoke('text').then((text) => {
				cy.log(text.trim())
		})
	})
	
	
	it('Edit Family Details', function() {
		cy.wait(2000)
		cy.get('.fa-edit').eq(0).click({force: true})
		cy.wait(1000)

		
		cy.get('#Name').then($input => {
			expect($input.val()).to.contain('Roshan pawar')
		})
		
		cy.get('#Address').then($input => {
			expect($input.val()).to.contain('Cuttack')
		})
		
		cy.get('#Relation').then($input => {
			expect($input.val()).to.contain('Brother')
		})
		
		cy.get('#dateOfBirth').then($input => {
			expect($input.val()).to.contain('04/03/2000')
		})
		
		cy.get('#age').then($input => {
			expect($input.val()).to.contain('19')
		})
		
		cy.get('#aadhaarcard').click({force: true})
		cy.get('#aadhaarcard').clear()
		cy.get('#aadhaarcard').type('2885 3775 4018')
		
		cy.get('#aadhaarcard').then($input => {
			expect($input.val()).to.contain('2885 3775 4018')
		})
		
		
		cy.wait(3000)
		cy.get('[onclick="CheckValid();"]').click({force: true})
		cy.wait(2000)
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())
			expect(text.trim()).to.contain('Successfully Added Records')
				
		})
		
	})
	
	it('Delete Family Details', function() {
		cy.wait(2000)
		cy.get('.fa-trash-alt').eq(0).click({force: true})
		cy.wait(4000)
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())
			expect(text.trim()).to.contain('Record Deleted Successfully.')
				
		})
	})
	
	it('Add Academic Details', function() {	
		cy.wait(2000)
		cy.get('#Profile_AcademicDetails').click({force: true})
		cy.wait(2000)
		cy.get('[title="Add Academic Details"]').eq(0).click({force: true})
		cy.wait(2000)
		
		cy.get('[onclick="checkForm(this)"]').click({force: true})
		cy.wait(2000)	 
		cy.get("#DegreeName-error").invoke('text').then((text) => {
				expect(text.trim()).equal('The Degree field is required.')
			  cy.get('#DegreeName').click({force: true})
			  cy.get('#DegreeName').clear()
		      cy.get('#DegreeName').type('Bsc IT')
		})
		
		cy.get("#YearOfPassing-error").invoke('text').then((text) => {
			expect(text.trim()).equal('Enter Valid Year')
			cy.get('#YearOfPassing').click({force: true})
			cy.get('#YearOfPassing').clear()
			cy.get('#YearOfPassing').type('2011')
		})	
		
		
		cy.get("#InstitutionName-error").invoke('text').then((text) => {
			expect(text.trim()).equal('The Institution Name field is required.')
			cy.get('#InstitutionName').click({force: true})
			cy.get('#InstitutionName').clear()
			cy.get('#InstitutionName').type('Greytrix')	
				
		})	
		 
		 cy.get("#BoardUniversityName-error").invoke('text').then((text) => {
			expect(text.trim()).equal('The Board/University Name field is required.')
			cy.get('#BoardUniversityName').click({force: true})
			cy.get('#BoardUniversityName').clear()
			cy.get('#BoardUniversityName').type('DY Patil University')
		 })
		 
		cy.get("#Stream-error").invoke('text').then((text) => {
			expect(text.trim()).equal('The Stream field is required.')
			cy.get('#Stream').click({force: true})
			cy.get('#Stream').clear()
			cy.get('#Stream').type('Computer Science')
		})
		cy.wait(1000)
		cy.get('#Grade_Class').click({force: true})
		cy.get('#Grade_Class').clear()
		cy.get('#Grade_Class').type('A+')
		
		cy.get('#Others').click({force: true})
		cy.get('#Others').clear()
		cy.get('#Others').type('No other specification.')
		
		cy.get('[onclick="checkForm(this)"]').click({force: true})
		
		cy.get(".toast-message").invoke('text').then((text) => {
				cy.log(text.trim())
				expect(text.trim()).to.contain('Successfully Added Records')
		})
		
	})	
		
	it('Edit Academic Details', function() {	
		cy.wait(2000)
		cy.get('.fa-edit').eq(0).click({force: true})
		cy.wait(1000)
		
		cy.get('#DegreeName').then($input => {
			expect($input.val()).to.contain('Bsc IT')
		})
		
		cy.get('#YearOfPassing').then($input => {
			expect($input.val()).to.contain('2011')
		})
		
		cy.get('#InstitutionName').then($input => {
			expect($input.val()).to.contain('Greytrix')
		})
		
		cy.get('#Grade_Class').then($input => {
			expect($input.val()).to.contain('A+')
		})
		
		cy.get('#BoardUniversityName').then($input => {
			expect($input.val()).to.contain('DY Patil University')
		})
		
		cy.get('#Stream').then($input => {
			expect($input.val()).to.contain('Computer Science')
		})
		
		cy.get('#Others').then($input => {
			expect($input.val()).to.contain('No other specification.')
		})
		
		
		cy.get('#InstitutionName').click({force: true})
		cy.get('#InstitutionName').clear()
		cy.get('#InstitutionName').type('sage software solutions (p) ltd.')
		
		cy.get('#BoardUniversityName').click({force: true})
		cy.get('#BoardUniversityName').clear()
		cy.get('#BoardUniversityName').type('DR Patil University')
		
		cy.get('[onclick="checkForm(this)"]').click({force: true})
		
		cy.get(".toast-message").invoke('text').then((text) => {
			
				cy.log(text.trim())
				expect(text.trim()).to.contain('Successfully Added Records')
		})
	})


	it('Delete Academic Details', function() {	
		cy.wait(2000)
		cy.get('.fa-trash-alt').eq(0).click({force: true})
		//window:alert
		cy.wait(5000)
		cy.get(".toast-message").invoke('text').then((text) => {
				cy.log(text.trim())
				expect(text.trim()).to.contain('Record Deleted Successfully.')
		})
	
	})
	
	it('Add Emergency Contacts', function() {	
		cy.wait(1000)
		cy.get('#Profile_EmergencyContact').click({force: true})
		cy.wait(2000)
		cy.get('[title="Add Emergency Contacts"]').eq(0).click({force: true})
		cy.wait(2000)
		
		cy.get('[onclick="CheckValid()"]').click({force: true})
		cy.wait(1000)
		
		cy.get("#Name-error").invoke('text').then((text) => {
			expect(text.trim()).equal('The Name field is required.')
			cy.get('#Name').click({force: true})
			cy.get('#Name').clear()
		    cy.get('#Name').type('rakesh')
		})	
		
		cy.get("#ContactNumber-error").invoke('text').then((text) => {
			expect(text.trim()).equal('Contact Number')
			cy.get('#ContactNumber').click({force: true})
			cy.get('#ContactNumber').clear()
			cy.get('#ContactNumber').type('7788548413')
		})
		
		cy.get('#Address').click({force: true})
		cy.get('#Address').type('MIDC Main Rd, Indira Nagar, Turbhe, Navi Mumbai')
			
		cy.get('#Relation').click({force: true})
		cy.get('#Relation').type('testreleation')
		cy.wait(1000)
		cy.get('[onclick="CheckValid()"]').click({force: true})
		cy.wait(4000)
		cy.get(".toast-message").invoke('text').then((text) => {
				cy.log(text.trim())
				expect(text.trim()).to.contain('Successfully Added Records')
		})
	})	

	it('Edit Emergency Contacts', function() {	
		cy.wait(2000)
		cy.get('.fa-edit').eq(0).click({force: true})
		cy.wait(1000)
		
		cy.get('#Name').then($input => {
			expect($input.val()).to.contain('rakesh')
		})
		
		cy.get('#Address').then($input => {
			expect($input.val()).to.contain('MIDC Main Rd, Indira Nagar, Turbhe, Navi Mumbai')
		})
		
		cy.get('#Relation').then($input => {
			expect($input.val()).to.contain('testreleation')
		})
		
		cy.get('#ContactNumber').then($input => {
			expect($input.val()).to.contain('7788548413')
		})
		
		cy.get('#Name').click({force: true})
		cy.get('#Name').clear()
		cy.get('#Name').type('Shyam')
		
		cy.get('#ContactNumber').click({force: true})
		cy.get('#ContactNumber').clear()
		cy.get('#ContactNumber').type('8530244750')
		cy.get('[onclick="CheckValid()"]').click({force: true})
		cy.get(".toast-message").invoke('text').then((text) => {
				cy.log(text.trim())
				expect(text.trim()).to.contain('Successfully Added Records')
		})
	})		
	
	
	it('Delete Emergency Contacts', function() {	
		cy.wait(2000)
		cy.get('.fa-trash-alt').eq(0).click({force: true})
	
		cy.wait(3000)
		cy.get(".toast-message").invoke('text').then((text) => {
				cy.log(text.trim())
				expect(text.trim()).to.contain('Record Deleted Successfully.')
		})
	
	})
	
	it('Add Language ', function() {	
		cy.wait(2000)
		cy.get('#Profile_LanguageKnown').click({force: true})
	    cy.wait(2000)
		cy.get('[title="Add Language Known"]').eq(0).click({force: true})
		cy.wait(1000)
		cy.get('[onclick="return validate()"]').click({force: true})
		cy.wait(1000)
		
		cy.get("#Language-error").invoke('text').then((text) => {
			expect(text.trim()).equal('This field is required.')
			cy.get('#Language').click({force: true})
			cy.get('#Language').clear()
			cy.get('#Language').type('odia')
		})	
		cy.get('#IsRead').not('[disabled]').check({force: true}).should('be.checked')
		cy.get('#IsWrite').not('[disabled]').check({force: true}).should('be.checked')
		cy.get('#IsSpeak').not('[disabled]').check({force: true}).should('be.checked')
		
		cy.wait(2000)
		cy.get('[onclick="return validate()"]').click({force: true})
		cy.wait(1000)
		cy.get(".toast-message").invoke('text').then((text) => {
				cy.log(text.trim())
				expect(text.trim()).to.contain('Successfully Added Records')
		})
	})	
	
	
	it('Edit Language ', function() {	
		cy.wait(2000)
		cy.get('.fa-edit').eq(1).click({force: true})
		cy.wait(2000)
		
		cy.get('#Language').then($input => {
			expect($input.val()).to.contain('odia')
		})
		
		cy.get('#IsRead').then($input => {
					expect($input.val()).to.contain('on')
		})
		
		cy.get('#IsWrite').then($input => {
					expect($input.val()).to.contain('on')
		})
		cy.get('#IsSpeak').then($input => {
					expect($input.val()).to.contain('on')
		})
		
		cy.get('#Language').click({force: true})
		cy.get('#Language').clear()
		cy.get('#Language').type('Teluge')
		cy.wait(1000)
		cy.get('[onclick="return validate()"]').click({force: true})
		cy.get(".toast-message").invoke('text').then((text) => {
				cy.log(text.trim())
				expect(text.trim()).to.contain('Successfully Added Records')
		})
	})
	
	
	it('Delete Language ', function() {
		cy.wait(2000)
		cy.get('.fa-trash-alt').eq(0).click({force: true})
		cy.wait(5000)
		cy.get(".toast-message").invoke('text').then((text) => {
				cy.log(text.trim())
				expect(text.trim()).to.contain('Record Deleted Successfully.')
		})
	})
	
	
	it('Add Nominee Details', function() {	
	   cy.wait(2000)
		cy.get('#Profile_NomineeDetails').click({force: true})
		cy.wait(2000)
		cy.get('[title="Add Nominee Details"]').eq(0).click({force: true})
		cy.wait(1000)
		
		cy.get('[onclick="submitForm()"]').click({force: true})
		cy.wait(1000)
		
		cy.get("#Name-error").invoke('text').then((text) => {
			expect(text.trim()).equal('This field is required.')
			cy.get('#Name').click({force: true})
			cy.get('#Name').clear()
		    cy.get('#Name').type('testNominee')
			
		})	
		
		cy.get('#AmountPaidToNominee').click({force: true})
		cy.get('#AmountPaidToNominee').clear()
		cy.get('#AmountPaidToNominee').type('5')	
		cy.wait(1000)
		cy.get('#Address').click({force: true})
		cy.get('#Address').type('MIDC Main Rd, Indira Nagar, Turbhe, Navi Mumbai ')
		
		cy.get('#Relation').click({force: true})
		cy.get('#Relation').type('mother')
		
		cy.wait(2000)
		cy.get('#dateOfBirth').click().then(input => {
		   input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val('05/04/1985')
		})
		
		cy.get('#Age').then(input => {
			input.val('34');
	   })
		
		
		cy.get('#Name_Address_Guardian').click({force: true})
		cy.get('#Name_Address_Guardian').type('Greytrixindiapvtltd,MIDC Main Rd, Indira Nagar, Turbhe, Navi Mumbai')
	
		cy.get('#Age').then($input => {
			cy.log($input.val())
		})
		cy.wait(1000)
		cy.get('[onclick="submitForm()"]').click({force: true})
		cy.wait(2000)
		cy.get(".toast-message").invoke('text').then((text) => {
				cy.log(text.trim())
				expect(text.trim()).to.contain('Successfully Added Records')
		})
	})
	
	it('Edit Nominee Details', function() {	
		cy.wait(2000)
		cy.get('.fa-edit').eq(0).click({force: true})
		cy.wait(1000)
		
		cy.get('#Name').then($input => {
			expect($input.val()).to.contain('testNominee')
		})
		
		cy.get('#Address').then($input => {
			expect($input.val()).to.contain('MIDC Main Rd, Indira Nagar, Turbhe, Navi Mumbai')
		})
		
		cy.get('#Relation').then($input => {
			expect($input.val()).to.contain('mother')
		})
		cy.get('#AmountPaidToNominee').then($input => {
			expect($input.val()).to.contain('5')
		})
		
		cy.get('#dateOfBirth').then($input => {
			expect($input.val()).to.contain('05/04/1985')
		})
		
		cy.get('#Name_Address_Guardian').then($input => {
			expect($input.val()).to.contain('Greytrixindiapvtltd,MIDC Main Rd, Indira Nagar, Turbhe, Navi Mumbai')
		})
		
		
		cy.get('#Age').then($input => {
			expect($input.val()).to.contain('34')
		})
		
		cy.get('#Name').click({force: true})
		cy.get('#Name').clear()
		cy.get('#Name').type('Shyamsundar Nayak')
		
		cy.get('#Relation').click({force: true})
		cy.get('#Relation').clear()
		cy.get('#Relation').type('Father')
		cy.get('[onclick="submitForm()"]').click({force: true})
		cy.get(".toast-message").invoke('text').then((text) => {
				cy.log(text.trim())
				expect(text.trim()).to.contain('Successfully Added Records')
		})
		
	})
	
	it('Delete Nominee Details', function() {	
		cy.wait(2000)
		cy.get('.fa-trash-alt').eq(0).click({force: true})
		
		cy.wait(5000)
		cy.get(".toast-message").invoke('text').then((text) => {
				cy.log(text.trim())
				expect(text.trim()).to.contain('Record Deleted Successfully.')
				
		})
	})
	
	
	
	
	it('Add Training Details', function() {	
		cy.wait(2000)
		cy.get('#Profile_TrainingDetails').click({force: true})
		cy.wait(2000)
		cy.get('[title="Add Training Details"]').eq(0).click({force: true})
		cy.wait(1000)
		cy.get('[onclick="return validate()"]').click({force: true})
		cy.wait(2000)
		
		
		cy.get("#TrainingName-error").invoke('text').then((text) => {
			expect(text.trim()).equal('This field is required.')
			cy.get('#TrainingName').click({force: true})
			cy.get('#TrainingName').clear()
			cy.get('#TrainingName').type('MVC')
		})
		
		cy.get("#DateOfCompletion-error").invoke('text').then((text) => {
			expect(text.trim()).equal('This field is required.')
			 cy.wait(2000)
			cy.get('#DateOfCompletion').click().then(input => {
			   input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val('11/12/2013')
		   })
		})	
		
		
		cy.get("#CertificationNumber-error").invoke('text').then((text) => {
			expect(text.trim()).equal('This field is required.')
			cy.get('#CertificationNumber').click({force: true})
			cy.get('#CertificationNumber').clear()
		    cy.get('#CertificationNumber').type('mvcfg78u')
		})
		
		
		cy.get("#Institute-error").invoke('text').then((text) => {
			expect(text.trim()).equal('This field is required.')
			cy.get('#Institute').click({force: true})
			cy.get('#Institute').clear()
		    cy.get('#Institute').type('SeedInfotech')
		})
		cy.wait(1000)
		
		cy.get('#Stream').click({force: true})
		cy.get('#Stream').type('computer science')
		
		cy.get('#Grade').click({force: true})
		cy.get('#Grade').type('A')
		
		cy.get('#University').click({force: true})
		cy.get('#University').type('Kabisamrat Upendra Bhanja')
		
		
		cy.get('#Others').click({force: true})
		cy.get('#Others').type('No other speicfication.')
		
		cy.wait(2000)
		cy.get('[onclick="return validate()"]').click({force: true})
		cy.wait(1000)
		cy.get(".toast-message").invoke('text').then((text) => {
				cy.log(text.trim())
				expect(text.trim()).to.contain('Successfully Added Records')
		})
	})
	
	it('Edit Training Details', function() {	
		cy.wait(2000)
		cy.get('.fa-edit').eq(0).click({force: true})
		cy.wait(1000)
		
		cy.get('#TrainingName').then($input => {
			expect($input.val()).to.contain('MVC')
		})
		
		
		cy.get('#DateOfCompletion').then($input => {
			expect($input.val()).to.contain('11/12/2013')
		})
		cy.get('#CertificationNumber').then($input => {
			expect($input.val()).to.contain('mvcfg78u')
		})
		cy.get('#Institute').then($input => {
			expect($input.val()).to.contain('SeedInfotech')
		})
		cy.get('#Stream').then($input => {
			expect($input.val()).to.contain('computer science')
		})
		cy.get('#Grade').then($input => {
			expect($input.val()).to.contain('A')
		})
		cy.get('#University').then($input => {
			expect($input.val()).to.contain('Kabisamrat Upendra Bhanja')
		})
		
		cy.get('#Others').then($input => {
			expect($input.val()).to.contain('No other speicfication.')
		})
		cy.get('#Institute').click({force: true})
		cy.get('#Institute').clear()
		cy.get('#Institute').type('Greytrixindiapvtltd')
		
		cy.get('#Stream').click({force: true})
		cy.get('#Stream').clear()
		cy.get('#Stream').type('Implementation')
		cy.wait(2000)
		cy.get('[onclick="return validate()"]').click({force: true})
		cy.wait(2000)
		cy.get(".toast-message").invoke('text').then((text) => {
				cy.log(text.trim())
				expect(text.trim()).to.contain('Successfully Added Records')
		})
	})
	
	it('Delete Training Details', function() {	
	cy.wait(2000)	
		cy.get('.fa-trash-alt').eq(0).click({force: true})
		cy.wait(2000)
		cy.get(".toast-message").invoke('text').then((text) => {
				cy.log(text.trim())
				expect(text.trim()).to.contain('Record Deleted Successfully.')
		})
	})
	
	it('Add Employment History', function() {	
		cy.wait(1000)	
		cy.get('#Profile_EmploymentHistory').click({force: true})
		cy.wait(3000)
		cy.get('[title="Add Employment History"]').eq(0).click({force: true})
		cy.wait(2000)
		
		cy.get('[onclick="validate()"]').click({force: true})
		cy.wait(1000)
		  cy.get(".toast-message").invoke('text').then((text) => {
			if(text.trim()=='Select From Date !!')	{
			cy.wait(2000)
			cy.get(".toast-message").eq(0).click({force: true})
			  cy.wait(1000)
				cy.get('#txtFromdt').click().then(input => {
				   input[0].dispatchEvent(new Event('input', { bubbles: true }))
					input.val('06/12/2011')
			   })
			}
		 })
		
		cy.wait(2000)
		cy.get('[onclick="validate()"]').click({force: true})
		cy.wait(1000)
		  cy.get(".toast-message").invoke('text').then((text) => {
			if(text.trim()=='Select To Date !!')	{
			cy.wait(2000)
			cy.get(".toast-message").eq(0).click({force: true})
			  cy.wait(1000)
				cy.get('#txtTodt').then(input => {
					input.val('18/12/2013')
				})
			}
		 })
		
		cy.wait(2000)
	   cy.get('#totexp').then(input => {
			input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val('2 Year')
	   })
		
		cy.wait(1000)
		cy.get('[onclick="validate()"]').click({force: true})
		cy.wait(1000)
		
		
		cy.get("#CompanyName-error").invoke('text').then((text) => {
			expect(text.trim()).equal('The CompanyName field is required.')
			cy.get('#CompanyName').click({force: true})
		    cy.get('#CompanyName').type('sage software solutions (p) ltd')
		})	
		
		
		cy.get("#Position-error").invoke('text').then((text) => {
			expect(text.trim()).equal('This field is required.')
			cy.get('#Position').click({force: true})
			cy.get('#Position').type('salesman')	
		})	
		
		
		cy.get("#LastCTCDrawn-error").invoke('text').then((text) => {
			expect(text.trim()).equal('The Last CTC drawn field is required.')
				cy.get('#LastCTCDrawn').click({force: true})
				cy.get('#LastCTCDrawn').type('20000')
		})


		cy.get("#LastTakeHomeDrawn-error").invoke('text').then((text) => {
			expect(text.trim()).equal('The Last Take homedrawn field is required.')
				cy.get('#LastTakeHomeDrawn').click({force: true})
		        cy.get('#LastTakeHomeDrawn').type('18000')
		})	
		
		
		cy.get("#LeavingReason-error").invoke('text').then((text) => {
			expect(text.trim()).equal('The Leaving Reason field is required.')
				cy.get('#LeavingReason').click({force: true})
		       cy.get('#LeavingReason').type('testreason')
		})
		
		cy.get("#Others-error").invoke('text').then((text) => {
			expect(text.trim()).equal('The Others field is required.')
				cy.get('#Others').click({force: true})
		       cy.get('#Others').type('No other data!!')
		})
		
		cy.get('#totexp').then($input => {
			cy.log($input.val())
		})
		
		cy.wait(1000)
		cy.get('[onclick="validate()"]').click({force: true})
			cy.wait(5000)
		cy.get(".toast-message").invoke('text').then((text) => {
				cy.log(text.trim())
				expect(text.trim()).to.contain('Successfully Added Records')
		})
		
	})
	
	it('Edit Employment History', function() {	
		cy.wait(2000)
	
		cy.get('.fa-edit').eq(0).click({force: true})
		cy.wait(2000)
		
		cy.get('#CompanyName').then($input => {
			expect($input.val()).to.contain('sage software solutions (p) ltd')
		})
	
		cy.get('#Position').then($input => {
			expect($input.val()).to.contain('salesman')
		})
		
		cy.get('#txtFromdt').then($input => {
			expect($input.val()).to.contain('06/12/2011')
		})
		
		cy.get('#txtTodt').then($input => {
			expect($input.val()).to.contain('18/12/2013')
		})
		
		cy.get('#LastCTCDrawn').then($input => {
			expect($input.val()).to.contain('20000.00')
		})
		
		cy.get('#LastTakeHomeDrawn').then($input => {
			expect($input.val()).to.contain('18000')
		})
		
		cy.get('#LeavingReason').then($input => {
			expect($input.val()).to.contain('testreason')
		})
		
		cy.get('#Others').then($input => {
			expect($input.val()).to.contain('No other data!!')
		})
		
		cy.get('#Position').click({force: true})
		cy.get('#Position').clear()
		cy.get('#Position').type('Manger')
		
		cy.get('#LastCTCDrawn').click({force: true})
		cy.get('#LastCTCDrawn').clear()
		cy.get('#LastCTCDrawn').type('20000')
		cy.wait(1000)
		cy.get('[onclick="validate()"]').click({force: true})
			cy.wait(5000)
		cy.get(".toast-message").invoke('text').then((text) => {
				cy.log(text.trim())
				expect(text.trim()).to.contain('Successfully Added Records')
		})
	})
	
	it('Delete Employment History', function() {	
		cy.wait(2000)
	cy.get('.fa-trash-alt').eq(0).click({force: true})
		cy.wait(5000)
		cy.get(".toast-message").invoke('text').then((text) => {
				cy.log(text.trim())
				expect(text.trim()).to.contain('Record Deleted Successfully.')
		})
	
	
	})
	
	it('Add Employee Document', function() {	
		cy.get('#Profile_EmployeeDocument').click({force: true})
		cy.wait(2000)
		
		cy.fixture(filePath, 'binary')
		.then(Cypress.Blob.binaryStringToBlob)
		.then(fileContent => {
		cy.get('#employeeFile').upload({
		fileContent,
		fileName: filePath,
		mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
		encoding: 'utf8'
		})
		})
	})
	
	
	it('Self Service Role',function() {
		cy.server()
		cy.get('#Profile_SelfServiceRole').click({force: true})
		cy.wait(2000)
		
		cy.route('POST', 'https://next.pockethrms.com/Employee/Employee/SelfServiceRole').as('selfservicerole')
		 cy.get('select[name=SelfServiceRole]').select('Manager',{force: true})
		 cy.wait(2000)
		 cy.get('[onclick="saveSelfServiceRole(this)"]').click({force: true})
		 cy.wait('@selfservicerole').its('status').should('eq', 200) 
		  cy.get("#credentials").invoke('text').then((text) => {
				cy.log(text.trim())
		})
	})
	
	
	it('Joining Document',function() {
		cy.get('#Profile_JoiningDocument').click({force: true})
		cy.wait(4000)
		
		cy.get('[type="checkbox"]').eq(0).check({force: true}) 
		cy.wait(2000)
		cy.fixture(filePath, 'binary')
		.then(Cypress.Blob.binaryStringToBlob)
		.then(fileContent => {
		cy.get('.fileup').upload({
		fileContent,
		fileName: filePath,
		mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
		encoding: 'utf8'
		})
		})
		
		cy.wait(2000)
		cy.get('[onclick="return validate()"]').click({force: true})
		cy.wait(3000)
	})	
	
	
	/*
	
	it('Employee Code Transfer',function() {
		cy.wait(2000)
		cy.get('#codeTransferTab').click({force: true})
		cy.wait(2000)
		
		//send empty emp code
		
		cy.get('#saveEmployeeFields').click({force: true})
		cy.wait(1000)
		cy.get(".toast-message").invoke('text').then((text) => {
		if(text.trim()=='New Employee Code Required!!!')	{
		cy.wait(2000)
		cy.get(".toast-message").click({force: true})
		
		cy.get('#CurrentEmployeeCode').invoke('val').then(text => {
             const someText = text;
              cy.log(someText);
			  cy.get('#EmployeeNewCode').click({force: true})
		      cy.get('#EmployeeNewCode').type(someText)
		});
		
		}	
		})	
			
	cy.get('#saveEmployeeFields').click({force: true})
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())		
		
		if(text.trim()=='Employee code already exist')	{
		cy.wait(2000)
		cy.get(".toast-message").click({force: true})
		cy.get('#EmployeeNewCode').click({force: true})
		cy.get('#EmployeeNewCode').clear()
		cy.get('#EmployeeNewCode').type('CY32')
		}
		
		})
		cy.wait(1000)
		cy.get('#saveEmployeeFields').click({force: true})
	})	
	
	*/
	
	it('Category Transfer',function() {
		cy.wait(2000)
		cy.get('#basicTab').click({force:true})
		cy.wait(2000)
		cy.get('select[id=CATEGORY]').then($input => {
				Employeecatagorytype=  $input.val();		 
				cy.log(Employeecatagorytype);
		})
		cy.wait(1000)
		
	cy.get('#categoryTransferTab').click({force: true})
	cy.wait(2000)	
	
	cy.get('#catId').select('Staff',{force: true})
	
	cy.get('#transDate').click({force: true}).then(input => {
		    input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val('15/04/2020')
	    })
	
	cy.wait(2000)
	cy.get('#ToEsiLocation').select('Pune',{force: true})	
		
	cy.get('#Reason').click({force: true})
    cy.get('#Reason').type('test purpose')	
	
	cy.get('#btncategoryTransfer').click({force: true})
	
	cy.get(".toast-message").invoke('text').then((text) => {
		cy.log(text.trim())		
		
		if(text.trim()=='From Category & To Category should be different.')	{
		cy.wait(2000)
		cy.get(".toast-message").click({force: true})
		cy.get('#catId').select('Admin',{force: true})
	
		}
		
		})
		cy.get('#btncategoryTransfer').click({force: true})
		
	})	

})