describe('EmployeeProfile Module ', function() {
	
	var company ='GreyTest'
	var selectedDepartment ='';
	
	before(function() {
            cy.clearCookie('.AspNetCore.Antiforgery.w5W7x28NAIs','.AspNetCore.Session','1P_JAR','ARRAffinity','FavouriteMenus','XCategory','XCompanyId','XName','XSchemaName','XUserId','XUserName','_ga','_gid','ai_session','ai_user','new_username') 
                cy.getCookie('.AspNetCore.Antiforgery.IT8a6MuPYuY').should('be.null')
                cy.getCookie('.AspNetCore.Session').should('be.null')
                cy.getCookie('new_username').should('be.null')
                cy.getCookie('FavouriteMenus').should('be.null')
                cy.getCookie('.AspNetCore.Antiforgery.IT8a6MuPYuY').should('be.null')
				
				
	})		
				
				
	it('successfully loads', function() {
		cy.visit('http://next.pockethrms.com/') 
	})
	
	it('Pocket HRMS Login', function() {
		cy.visit('http://next.pockethrms.com/')
		cy.get('#Email').should('be.visible').should('have.css', 'border-radius') 
		cy.get('#Email').should('exist')
		//cy.get('#Email').click()
		cy.xpath('//input[@id="Email"]').click()
		cy.get('#Email').type('administrator@bhagya.com')
		cy.get('#Email').should('have.value', 'administrator@bhagya.com')
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
                Cypress.Cookies.preserveOnce('.AspNetCore.Antiforgery.w5W7x28NAIs','.AspNetCore.Session','1P_JAR','ARRAffinity','FavouriteMenus','XCategory','XCompanyId','XName','XSchemaName','XUserId','XUserName','_ga','_gid','ai_session','ai_user','new_username')
                cy.wait(2000)
				cy.reload()
		cy.wait(2000)
		//selectedDepartment = selectedDepartment
    })

	
	
	it('Change Company', function() {
		 
		 cy.get('.col-sm-12 > .page-title-box > .float-right > .breadcrumb > .breadcrumb-item').invoke('text').then((text) => {
		//cy.log(text.trim())
				 
			if(text.trim()==company){
				expect(text.trim()).to.eq(company) 
			}
			else{
				cy.get('.col-sm-12 > .page-title-box > .float-right > .breadcrumb > .breadcrumb-item').click()
				cy.wait(2000)
				cy.get('.modal-dialog > .modal-content > .modal-body > .radio').find('label').each(function(row, i){
				
				console.log(i)
				var num1 = parseFloat(i+1)
				cy.get('.modal-dialog > .modal-content > .modal-body > .radio:nth-child('+num1+') > label').invoke('text').then((text) => {
				//cy.log(text.trim())
			if(text.trim()==company){
				expect(text).to.eq(company)
				cy.get('.modal-dialog > .modal-content > .modal-body > .radio:nth-child('+num1+') > label').click()
				cy.get('#defaultCompanySave').click()
				cy.wait(2000)
				
			}	
			})
			
		})		
	}
	})	 
	cy.wait(10000)
	})
	
	
	it('Search Specific Emp code you want to update', function() {
		var employee = 'Krishna Nayak'
		//cy.wait(2000)
		//cy.get('#globalSearch').type('TEST-6')
		//cy.wait(2000)
		//cy.xpath('//*[@id="finalSearchResult"]/div/div/ul/li[2]').click()
		//cy.wait(4000)
		//cy.url().clear()
		//cy.visit('http://next.pockethrms.com/Employee/employee/Profile?employeeID=570&module=profile&empstatus=1#') 
		//cy.wait(5000)
				
		cy.xpath("//span[@class='menu-name'][contains(text(),'Employee')]").click({force: true})
		
		cy.xpath("//u[contains(text(),'"+employee+"')]").click({force: true})
		cy.wait(10000)
		cy.get('.page-title').should('contain','Employee Profile')
		
		cy.go('back')
		
		cy.get('.xmt-2').each(function(row, i){
				
		console.log(i)
		var num = parseFloat(i)
		cy.get('.preventToggle').eq(num).invoke('text').then((text) => {
		cy.log(text.trim())
				
		if(text.trim()==employee){
		expect(text.trim()).to.eq(employee)
		cy.get('.d-inline-block').eq(num).click()
		cy.wait(2000)	
			}	
			})				
		})	
		cy.contains('Edit Profile').click({force: true})
		
		
		
	})
	
	
	/*
	it('Basic Details Update', function() {
		
		cy.wait(2000)
		cy.get('input[name=FNAME]').click({force: true})
		cy.get('input[name=FNAME]').clear()
		cy.get('input[name=FNAME]').type('Krishna')

		
		cy.get('input[name=LNAME]').click({force: true})
		cy.get('input[name=LNAME]').clear()
		cy.get('input[name=LNAME]').type('Nayak')
		
		cy.get('.form-group [type="radio"]').check('Female', { force: true }).should('be.checked')
		
		cy.get('select[name=PTLOCATION]').select('Andhra Pradesh')
		
		cy.wait(2000)
		cy.get('#DATEOFBIRTH').click().then(input => {
		    input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val('01/12/1997')
	   })
		
		cy.wait(1000)
		cy.get('#DATEOFJOINING').click().then(input => {
		    input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val('02/04/2019')
	   })
		
		
		cy.get('select[name=ESILOCATION]').select('Mumbai')
		cy.get('select[name=METRO]').select('Non-Metro')
		cy.get('select[name=ESIDISPENSARY]').select('Mumbai')
		
		cy.wait(2000)
		cy.get('[onclick="submitForm()"]').click({force: true})
		cy.get(".toast-message").invoke('text').then((text) => {
				//expect(text.trim()).equal('Records Saved Successfully.!')
				cy.log(text.trim())
		})
		
	})
	

	
		
		
	it('Employee Details Update', function() {
		cy.readFile('D:/CyPress Demo/cypress/fixtures/EmployeeProfile.json').then((text) =>{
                 text.forEach(function(entry) {
		cy.wait(2000)
		cy.get('#employeeTab').click({force: true})
		cy.wait(10000)
		//cy.get('input[name=FATHERNAME]').click({force: true})
		cy.get('input[name=FATHERNAME]').clear()
		cy.get('input[name=FATHERNAME]').type(entry.FatherName)
		cy.get('select[name=DEPARTMENT]').select(entry.Department)
		
		//cy.get('select[name=DEPARTMENT] option').eq(1).invoke('val').then((val)=>{
		//cy.get('select[name=DEPARTMENT]').select(val)
		
		
			//cy.get('select[name=DEPARTMENT] option').eq(1).invoke('text').then((text) => {		
			//var selectedDepartment = text.trim();
			//cy.log(selectedDepartment)
			//cy.wrap({ name: selectedDepartment }).its('name').should('eq', 'IT')  
		//})	
		
		//cy.window().its('selectedDepartment').should('eq', 'Jane Lane')  
		//})
		
	
		//cy.get('select#firstDate > option')
		//.eq(1) // The second option, because the first is a heading
	//.click()
		
		//cy.get('select[name=DEPARTMENT]').select(entry.Department,{force: true})
		
		cy.get('select[name=DESIGNATION]').select(entry.Designation)
		cy.get('select[name=MARITALSTATUS]').select(entry.MaritalStatus)
		
		cy.get('input[name=CONFIRMATIONPERIOD]').clear()
		cy.get('input[name=CONFIRMATIONPERIOD]').type(entry.ConfirmationPeriodMonth)
		
		cy.get('#RETIREMENTAGE').clear()
		cy.get('#RETIREMENTAGE').type(entry.RetirementAge)
		
		cy.wait(2000)
		cy.get('#DATEOFANNIVERSARY').click().then(input => {
			input[0].dispatchEvent(new Event('input', { bubbles: true }))
            input.val(entry.DateOfAnniversary)
        })
	
		//cy.get('input[name=PFACCNO]').click({force: true})
		cy.get('input[name=PFACCNO]').clear()
		cy.get('input[name=PFACCNO]').type(entry.PfAccountNo)
		
		//cy.get('input[name=ESINO]').click({force: true})
		cy.get('input[name=ESINO]').clear()
		cy.get('input[name=ESINO]').type(entry.EsiNo)
		
		cy.get('select[name=GRADE]').select(entry.Grade)
		
		cy.get('input[name=CHILDREN]').click({force: true})
		//cy.get('input[name=CHILDREN]').clear()
		//cy.get('input[name=CHILDREN]').type(entry.NoOfChildren)
		
		//cy.get('select[name=COSTCENTRE]').select(entry.CostCentre) 
		cy.get('select[name=BRANCH]').select(entry.Branch)
		
		//cy.get('input[name=PANNO]').click({force: true})
		//cy.get('input[name=PANNO]').clear()
		//cy.get('input[name=PANNO]').type('ASDASE8569A')
		
		//cy.get('input[name=UANNUMBER]').click({force: true})
		cy.get('input[name=UANNUMBER]').clear()
		cy.get('input[name=UANNUMBER]').type(entry.UanNumber)
		 cy.get('#EMPPF').then($input => {
				expect($input.val()).to.contain(entry.EmpPf)
	   })
	   
		cy.get('#PENSIONFUND').then($input => {
				expect($input.val()).to.contain(entry.PensionFund)
	    })
		
		cy.get('select[name=STOPPAYMENT]').select(entry.StopPayment)
		
		cy.get('select[name=BANKNAME]').select(entry.BankName)
		cy.get('select[name=LOCATION]').select(entry.Location)
		cy.get('select[name=PAYMODE]').select(entry.PayMode)
		
		//cy.get('.form-group [type="radio"]').check(entry.Payrollprocess).should('be.checked')
		
		cy.get('#SENIORCITIZEN').select(entry.SeniorCitizen)
		
		cy.get('[onclick="submitEmployeeForm()"]').click({force: true})
		cy.get(".toast-message").invoke('text').then((text) => {
				//expect(text.trim()).equal('Records Saved Successfully.!')
				cy.log(text.trim())
		})
		
				 })
		})
	})

	
	
	
	it('Personal Details Update', function() {
		
		cy.readFile('D:/CyPress Demo/cypress/fixtures/EmployeeProfile.json').then((text) =>{
                 text.forEach(function(entry) {
					 
		cy.wait(2000)
		cy.get('#personalTab').click({force: true})
		cy.wait(10000)
		
		cy.get('input[name=PERSONALEMAIL]').click({force: true})
		cy.get('input[name=PERSONALEMAIL]').clear()
		cy.get('input[name=PERSONALEMAIL]').type('greytrixtest@gmail.com')
		
		cy.get('input[name=REMARKS]').click({force: true})
		cy.get('input[name=REMARKS]').clear()
		cy.get('input[name=REMARKS]').type(entry.Remarks)
		
		cy.get('input[name=PHONENO]').click({force: true})
		cy.get('input[name=PHONENO]').clear()
		cy.get('input[name=PHONENO]').type(entry.Phone)
		cy.get('select[name=BLOODGRP]').select(entry.BloodGroup,{force: true})
		
		cy.get('input[name=ADDRESS1]').click({force: true})
		cy.get('input[name=ADDRESS1]').clear()
		cy.get('input[name=ADDRESS1]').type(entry.Address1)
		
		cy.get('input[name=ADDRESS2]').click({force: true})
		cy.get('input[name=ADDRESS2]').clear()
		cy.get('input[name=ADDRESS2]').type(entry.Address2)
		
		cy.get('input[name=PLACE]').click({force: true})
		cy.get('input[name=PLACE]').clear()
		cy.get('input[name=PLACE]').type(entry.Place)
		
		
		cy.get('input[name=CITY]').click({force: true})
		cy.get('input[name=CITY]').clear()
		cy.get('input[name=CITY]').type(entry.City)
		
		cy.get('input[name=PINCODE]').click({force: true})
		cy.get('input[name=PINCODE]').clear()
		cy.get('input[name=PINCODE]').type(entry.PinCode)
		
		
		cy.get('input[name=EMAIL]').click({force: true})
		cy.get('input[name=EMAIL]').clear()
		cy.get('input[name=EMAIL]').type('check@gmail.com')
		
		cy.get('select[name=PRINTCHEQUE]').select(entry.PrintCheque,{force: true})
		
		cy.get('input[name=BANKACCNO]').click({force: true})
		cy.get('input[name=BANKACCNO]').clear()
		cy.get('input[name=BANKACCNO]').type(entry.BankAccountNumber)
		
		
		cy.get('input[name=BANKBRANCHCODE]').click({force: true})
		cy.get('input[name=BANKBRANCHCODE]').clear()
		cy.get('input[name=BANKBRANCHCODE]').type(entry.BankBranchCode)
		
		
		cy.get('input[name=CORR_ADDRESS1]').click({force: true})
		cy.get('input[name=CORR_ADDRESS1]').clear()
		cy.get('input[name=CORR_ADDRESS1]').type(entry.CorrespondenceAddress1)
		
		
		cy.get('input[name=CORR_ADDRESS2]').click({force: true})
		cy.get('input[name=CORR_ADDRESS2]').clear()
		cy.get('input[name=CORR_ADDRESS2]').type(entry.CorrespondenceAddress2)
		
		
		
		cy.get('input[name=CORR_PLACE]').click({force: true})
		cy.get('input[name=CORR_PLACE]').clear()
		cy.get('input[name=CORR_PLACE]').type(entry.CorrespondencePlace)
		
		
		cy.get('input[name=CORR_CITY]').click({force: true})
		cy.get('input[name=CORR_CITY]').clear()
		cy.get('input[name=CORR_CITY]').type(entry.CorrespondenceCity)
		
		cy.get('input[name=CORR_PHONE]').click({force: true})
		cy.get('input[name=CORR_PHONE]').clear()
		cy.get('input[name=CORR_PHONE]').type(entry.CorrespondencePhone)
		
		cy.get('input[name=CORR_PINCODE]').click({force: true})
		cy.get('input[name=CORR_PINCODE]').clear()
		cy.get('input[name=CORR_PINCODE]').type(entry.CorrespondencePinCode)
		
		
		cy.get('input[name=PERSONALMOBILENO]').click({force: true})
		cy.get('input[name=PERSONALMOBILENO]').clear()
		cy.get('input[name=PERSONALMOBILENO]').type(entry.PersonalMobileNo)
		
		
		cy.get('input[name=OFFICEMOBILENO]').click({force: true})
		cy.get('input[name=OFFICEMOBILENO]').clear()
		cy.get('input[name=OFFICEMOBILENO]').type(entry.OfficeMobileNo)
		
		
		cy.get('input[name=OFFICEEXTNO]').click({force: true})
		cy.get('input[name=OFFICEEXTNO]').clear()
		cy.get('input[name=OFFICEEXTNO]').type(entry.OfficeExtensionNo)
		
		cy.get('#HANDICAP').select(entry.Handicap,{force: true})
		cy.wait(2000)
		cy.get('[onclick="submitPersonalForm()"]').click({force: true})
		cy.get(".toast-message").invoke('text').then((text) => {
				expect(text.trim()).equal('Record Saved Successfully.')
				cy.log(text.trim())			
		})
		
		cy.get('input[name=PERSONALEMAIL]').invoke('val').then((val) => {
			expect(val.trim()).equal('greytrixtest@gmail.com')
		})
		
		cy.get('input[name=REMARKS]').invoke('val').then((val) => {
			expect(val.trim()).equal(entry.Remarks)
		})
		
		cy.get('input[name=PHONENO]').invoke('val').then((val) => {
			expect(val.trim()).equal(entry.Phone)
		})
		

		
		
		
		})
		})
		
	})		
  
  
	
	
	
	it('Add Family Details', function() {
		cy.wait(2000)
		cy.contains('Family Details').click({force: true})
		cy.wait(10000)
		cy.get('[title="Add Family Details"]').click({force: true})
		cy.wait(1000)
		
		cy.get('#Name').click({force: true})
		cy.get('#Name').clear()
		cy.get('#Name').type('Roshan pawar')
		
		cy.get('#Address').click({force: true})
		cy.get('#Address').clear()
		cy.get('#Address').type('Cuttack')
		
		cy.get('#Relation').select('Brother')
		
		
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
		cy.contains('Family Details').click({force: true})
		cy.wait(10000)
		cy.get('#dLabel1').click({force: true})
		cy.contains('Edit').click({force: true})
		cy.wait(1000)
		
		//cy.get('#Name').type('Aman')
		//cy.get('#Address').type('Mumbai')
		//cy.get('#Relation').type('Father')
		//cy.get('#dateOfBirth').type('04/03/1994')
		//cy.get('#age').type('25')
		//cy.get('#aadhaarcard').type('2885 3775 4018')
		
		
		
		cy.get('#Name').then($input => {
			expect($input.val()).to.contain('Roshan Pawar')
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
		cy.contains('Family Details').click({force: true})
		cy.wait(10000)
		cy.get('#dLabel1').click({force: true})
		cy.contains('Delete').click({force: true})
		cy.wait(5000)
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())
			expect(text.trim()).to.contain('Record Deleted Successfully.')
				
		})
	})
	
	
	
	it('Add Academic Details', function() {	
		cy.wait(2000)
		cy.get('#academicTab').click({force: true})
		
		cy.wait(10000)
		
		cy.get('[title="Add Academic Details"]').eq(0).click({force: true})
		cy.wait(1000)
		
		cy.get('#DegreeName').click({force: true})
		cy.get('#DegreeName').clear()
		cy.get('#DegreeName').type('Bsc IT')
		
		
		cy.get('#YearOfPassing').click({force: true})
		cy.get('#YearOfPassing').clear()
		cy.get('#YearOfPassing').type('2011')
		
		
		cy.get('#InstitutionName').click({force: true})
		cy.get('#InstitutionName').clear()
		cy.get('#InstitutionName').type('Greytrix')
		
		
		cy.get('#Grade_Class').click({force: true})
		cy.get('#Grade_Class').clear()
		cy.get('#Grade_Class').type('A+')
		
		
		cy.get('#BoardUniversityName').click({force: true})
		cy.get('#BoardUniversityName').clear()
		cy.get('#BoardUniversityName').type('DY Patil University')
		
		cy.get('#Stream').click({force: true})
		cy.get('#Stream').clear()
		cy.get('#Stream').type('Computer Science')
		
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
		cy.get('#academicTab').eq(0).click({force: true})
			cy.wait(10000)
		cy.get('#dLabel1').click({force: true})
		cy.contains('Edit').click({force: true})
		cy.wait(1000)
		
		cy.get('#DegreeName').then($input => {
			expect($input.val()).to.contain('Bsc It')
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
			expect($input.val()).to.contain('Dy Patil University')
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
		cy.get('#academicTab').eq(0).click({force: true})
		cy.wait(10000)
		cy.get('#dLabel1').click({force: true})
		cy.contains('Delete').click({force: true})
		//window:alert
		cy.wait(5000)
		cy.get(".toast-message").invoke('text').then((text) => {
				cy.log(text.trim())
				expect(text.trim()).to.contain('Record Deleted Successfully.')
		})
	
	})
	
	
	
	
	it('Add Emergency Contacts', function() {	
		cy.wait(1000)
		cy.get('#emergencyTab').click({force: true})
		cy.wait(10000)
		
		cy.get('[title="Add Emergency Contacts"]').eq(0).click({force: true})
		cy.wait(1000)
		
		cy.get('#Name').click({force: true})
		cy.get('#Name').clear()
		cy.get('#Name').type('rakesh')
		
		cy.get('#Address').click({force: true})
		cy.get('#Address').type('MIDC Main Rd, Indira Nagar, Turbhe, Navi Mumbai')
			
		cy.get('#Relation').click({force: true})
		cy.get('#Relation').type('testreleation')
		cy.get('#ContactNumber').click({force: true})
		cy.get('#ContactNumber').type('7788548413')
		
		cy.get('[onclick="CheckValid()"]').click({force: true})
		cy.wait(5000)
		cy.get(".toast-message").invoke('text').then((text) => {
			
				cy.log(text.trim())
				expect(text.trim()).to.contain('Successfully Added Records')
		})
	})	

	it('Edit Emergency Contacts', function() {	
		cy.wait(2000)
		cy.get('#emergencyTab').click({force: true})
		cy.wait(10000)
		cy.get('#dLabel1').eq(0).click({force: true})
		cy.contains('Edit').click({force: true})
		cy.wait(1000)
		
		cy.get('#Name').then($input => {
			expect($input.val()).to.contain('Rakesh')
		})
		
		cy.get('#Address').then($input => {
			expect($input.val()).to.contain('MIDC Main Rd, Indira Nagar, Turbhe, Navi Mumbai')
		})
		
		cy.get('#Relation').then($input => {
			expect($input.val()).to.contain('Testreleation')
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
		cy.get('#emergencyTab').click({force: true})
		cy.wait(10000)
		cy.get('#dLabel1').eq(0).click({force: true})
		cy.contains('Delete').click({force: true})
	
		cy.wait(5000)
		cy.get(".toast-message").invoke('text').then((text) => {
				cy.log(text.trim())
				expect(text.trim()).to.contain('Record Deleted Successfully.')
		})
	
	})
	
	
	
	
	
	it('Add Language ', function() {	
		cy.wait(2000)
		cy.get('#languageTab').click({force: true})
		
	cy.wait(10000)
		
		cy.get('[title="Add Language Known"]').eq(0).click({force: true})
		cy.wait(1000)
		
		cy.get('#Language').click({force: true})
		cy.get('#Language').type('odia')
		
		cy.get('#IsRead').not('[disabled]').check().should('be.checked')
		cy.get('#IsWrite').not('[disabled]').check().should('be.checked')
		cy.get('#IsSpeak').not('[disabled]').check().should('be.checked')
		
		cy.wait(1000)
		cy.get('[onclick="return validate()"]').click({force: true})
		cy.get(".toast-message").invoke('text').then((text) => {
				cy.log(text.trim())
				expect(text.trim()).to.contain('Successfully Added Records')
		})
	})	
	
	
	it('Edit Language ', function() {	
		
		cy.wait(2000)
		cy.get('#languageTab').click({force: true})
	cy.wait(10000)
		cy.get('[data-toggle="dropdown"]').eq(0).click({force: true})
		cy.contains('Edit').click({force: true})
		cy.wait(2000)
		
		cy.get('#Language').then($input => {
			expect($input.val()).to.contain('Odia')
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
		cy.get('#languageTab').click({force: true})
cy.wait(10000)
		cy.get('[data-toggle="dropdown"]').eq(0).click({force: true})
		cy.contains('Delete').click({force: true})
		
		cy.wait(5000)
		cy.get(".toast-message").invoke('text').then((text) => {
				cy.log(text.trim())
				expect(text.trim()).to.contain('Record Deleted Successfully.')
		})
	})





	it('Add Nominee Details', function() {	
	cy.wait(2000)
		cy.get('#nomineeTab').click({force: true})
			cy.wait(10000)
		cy.get('[title="Add Nominee Details"]').eq(0).click({force: true})
		cy.wait(1000)
		
		cy.get('#Name').click({force: true})
		cy.get('#Name').type('testNominee')
		
		cy.get('#Address').click({force: true})
		cy.get('#Address').type('MIDC Main Rd, Indira Nagar, Turbhe, Navi Mumbai ')
		
		cy.get('#Relation').click({force: true})
		cy.get('#Relation').type('mother')
		
		cy.get('#AmountPaidToNominee').click({force: true})
		cy.get('#AmountPaidToNominee').clear()
		cy.get('#AmountPaidToNominee').type('5')
		
		
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
		cy.wait(2000)
		cy.get('[onclick="submitForm()"]').click({force: true})
		cy.get(".toast-message").invoke('text').then((text) => {
				cy.log(text.trim())
				expect(text.trim()).to.contain('Successfully Added Records')
		})
	})
	
	it('Edit Nominee Details', function() {	
		cy.wait(2000)
		cy.get('#nomineeTab').click({force: true})
cy.wait(10000)
		cy.get('[data-toggle="dropdown"]').eq(0).click({force: true})
		cy.contains('Edit').click({force: true})
		cy.wait(1000)
		
		cy.get('#Name').then($input => {
			expect($input.val()).to.contain('Testnominee')
		})
		
		cy.get('#Address').then($input => {
			expect($input.val()).to.contain('Midc Main Rd, Indira Nagar, Turbhe, Navi Mumbai')
		})
		
		cy.get('#Relation').then($input => {
			expect($input.val()).to.contain('Mother')
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
		cy.get('#nomineeTab').click({force: true})
		cy.wait(10000)
		cy.get('[data-toggle="dropdown"]').eq(0).click({force: true})
		cy.contains('Delete').click({force: true})
		
		cy.wait(5000)
		cy.get(".toast-message").invoke('text').then((text) => {
				cy.log(text.trim())
				expect(text.trim()).to.contain('Record Deleted Successfully.')
				
		})
	})
	
	
	*/
	
	
	it('Add Training Details', function() {	
		cy.wait(2000)
		cy.get('#trainingTab').click({force: true})
		cy.wait(10000)
		cy.get('[title="Add Training Details"]').eq(0).click({force: true})
		cy.wait(1000)
		
		cy.get('#TrainingName').click({force: true})
		cy.get('#TrainingName').type('MVC')
		
		
		 cy.wait(2000)
		cy.get('#DateOfCompletion').click().then(input => {
		   input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val('11/12/2013')
	   })

		
		
		cy.get('#CertificationNumber').click({force: true})
		cy.get('#CertificationNumber').type('mvcfg78u')
		
		cy.get('#Institute').click({force: true})
		cy.get('#Institute').type('SeedInfotech')
		
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
		cy.get(".toast-message").invoke('text').then((text) => {
				cy.log(text.trim())
				expect(text.trim()).to.contain('Successfully Added Records')
		})
	})
	
	it('Edit Training Details', function() {	
		cy.wait(2000)
		cy.get('#trainingTab').click({force: true})
	cy.wait(10000)
		cy.get('[data-toggle="dropdown"]').eq(0).click({force: true})
		cy.contains('Edit').click({force: true})
		cy.wait(1000)
		
		cy.get('#TrainingName').then($input => {
			expect($input.val()).to.contain('Mvc')
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
			expect($input.val()).to.contain('Computer Science')
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
		cy.wait(1000)
		cy.get('[onclick="return validate()"]').click({force: true})
		cy.get(".toast-message").invoke('text').then((text) => {
				cy.log(text.trim())
				expect(text.trim()).to.contain('Successfully Added Records')
		})
	})
	
	it('Delete Training Details', function() {	
	cy.wait(1000)	
	cy.get('#trainingTab').click({force: true})
cy.wait(10000)
		cy.get('[data-toggle="dropdown"]').eq(0).click({force: true})
		cy.contains('Delete').click({force: true})
		cy.wait(2000)
		cy.get(".toast-message").invoke('text').then((text) => {
				cy.log(text.trim())
				expect(text.trim()).to.contain('Record Deleted Successfully.')
		})
	})
	
	
	
	it('Add Employment History', function() {	
		cy.wait(1000)	
		cy.get('#employmentHistoryTab').click({force: true})
		cy.wait(10000)
		cy.get('[title="Add Employment History"]').eq(0).click({force: true})
		cy.wait(1000)
		
		cy.get('#CompanyName').click({force: true})
		cy.get('#CompanyName').type('sage software solutions (p) ltd')
		
		cy.get('#Position').click({force: true})
		cy.get('#Position').type('salesman')
		
		cy.wait(2000)
		cy.get('#txtFromdt').click().then(input => {
		   input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val('06/12/2011')
	   })
		 cy.wait(1000)
		cy.get('#txtTodt').then(input => {
			input.val('18/12/2013')
	   })
	   cy.wait(2000)
	   cy.get('#totexp').then(input => {
			input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val('2 Year')
	   })
	   
		cy.wait(2000)
		cy.get('#totexp').then($input => {
			cy.log($input.val())
		})
		cy.get('#LastCTCDrawn').click({force: true})
		cy.get('#LastCTCDrawn').type('20000')
		
		cy.get('#LastTakeHomeDrawn').click({force: true})
		cy.get('#LastTakeHomeDrawn').type('18000')
		
		cy.get('#LeavingReason').click({force: true})
		cy.get('#LeavingReason').type('testreason')
		
		cy.get('#Others').click({force: true})
		cy.get('#Others').type('No other data!!')
		
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
		cy.get('#employmentHistoryTab').click({force: true})
	cy.wait(10000)
		cy.get('[data-toggle="dropdown"]').eq(0).click({force: true})
		cy.contains('Edit').click({force: true})
		cy.wait(2000)
		
		cy.get('#CompanyName').then($input => {
			expect($input.val()).to.contain('Sage Software Solutions (P) Ltd')
		})
	
		cy.get('#Position').then($input => {
			expect($input.val()).to.contain('Salesman')
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
		cy.get('#employmentHistoryTab').click({force: true})
	cy.wait(10000)
		cy.get('[data-toggle="dropdown"]').eq(0).click({force: true})
		cy.contains('Delete').click({force: true})
		cy.wait(5000)
		cy.get(".toast-message").invoke('text').then((text) => {
				cy.log(text.trim())
				expect(text.trim()).to.contain('Record Deleted Successfully.')
		})
	})


	
})