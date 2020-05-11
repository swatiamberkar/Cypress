describe('Seperation Module ', function() {
	
	var employeeId = 'CY14';
	var Employeecatagorytype='';
	
	it('successfully page  loads', function() {
		cy.visit('https://next.pockethrms.com/') 
	})
	
	it('Pocket HRMS Login', function() {
		cy.visit('https://next.pockethrms.com/')
		cy.get('#Email').should('be.visible').should('have.css', 'border-radius') 
		cy.get('#Email').should('exist')
		cy.get('#Email').click({force: true})
		cy.get('#Email').type('nileshgajare@live.com')
		cy.get('#Email').should('have.value', 'nileshgajare@live.com')
		cy.get('#Password').should('be.visible').should('have.css', 'border-radius') 
		cy.get('#Password').should('exist')
		cy.get('#Password').click({force: true})
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
	 
	 it('Separation setting',function(){
		 
		 cy.visit('http://next.pockethrms.com/Settings/Employee/Index?module=payroll&submodule=SeparationSetting')
		 cy.wait(2000)
		 cy.get('#EditMasterDetail').select('No',{force: true})
		 
		 cy.get('#NoOfMonths').click({force: true})
			cy.get('#NoOfMonths').clear()
		cy.get('#NoOfMonths').type('2')	
		 cy.get('#AllowPayroll').select('No',{force: true})
		 cy.wait(1000)
		 
		 //click on save button
		cy.xpath('/html/body/div[2]/div[2]/div[1]/div[2]/div[2]/div/div/div[3]/div/div[2]/div/div[2]/form/div/div/div/div[3]/div/button').click({force: true})
		 
		 
	 })
	
	it('Employee Separation without selecting employee',function(){
		cy.visit('http://next.pockethrms.com/payroll/transaction/separation')
		cy.wait(2000)
		cy.get('button[onclick="return Validation();"]').click({force: true})
		cy.get(".toast-message").invoke('text').then((text) => {
			if(expect(text.trim()).equal('Please select Employee')){
				cy.get(".toast-message").click({force: true})
				cy.wait(2000)
				cy.get('#select2-multiEmp-container').click({force: true})
				cy.wait(2000)
				cy.get('input[type="search"]').click({force: true})
				cy.get('input[type="search"]').type(employeeId)
				cy.wait(2000)
				cy.get('.select2-results__option--highlighted').click({force: true})	
			}        
		})
		cy.get('#DateofJoining').then($input => {
			expect($input.val()).to.contain('01/01/2019')
		})	
		//cy.get(".toast-message").click({force: true})
	})
	
	it('Employee Separation without selecting Type',function(){
		
		cy.get('button[onclick="return Validation();"]').click({force: true})
		cy.get(".toast-message").invoke('text').then((text) => {
			if(expect(text.trim()).equal('Please select Separation Type.')){
				cy.get(".toast-message").click({force: true})
				cy.wait(1000)
				cy.get('#SeparationType').select('Separation',{force: true})	
			}        
		})
	})

	it('Employee Separation without Last Working Date',function(){	
		cy.get('button[onclick="return Validation();"]').click({force: true})
		
		cy.get(".toast-message").invoke('text').then((text) => {
			if(expect(text.trim()).equal('Please select Last Working Date.')){
				cy.get(".toast-message").click({force: true})
				
				cy.get('#LastWorkingDate').click().then(input => {
					input[0].dispatchEvent(new Event('input', { bubbles: true }))
					input.val('01/04/2020')
				})
			}        
		})
		
	})
	
	it('Employee Separation with All input',function(){
		cy.wait(2000)
		cy.server()
		cy.visit('http://next.pockethrms.com/payroll/transaction/separation')
		cy.route('POST', 'https://next.pockethrms.com/Payroll/Transaction/SaveSeparation').as('SaveSeparation')
		cy.wait(1000)
		cy.get('#select2-multiEmp-container').click({force: true})
		cy.wait(2000)
		cy.get('input[type="search"]').click({force: true})
		cy.get('input[type="search"]').type(employeeId)
		cy.wait(2000)
		cy.get('.select2-results__option--highlighted').click({force: true})
		
		cy.wait(1000)
		
		cy.get('#DateofJoining').then($input => {
			expect($input.val()).to.contain('01/01/2019')
		})	
		cy.get('#SeparationType').select('Separation',{force: true})
		
		cy.get('#LastWorkingDate').click().then(input => {
			input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val('20/04/2020')
		})
		
		cy.get('#ResignationDate').click({force: true}).then(input => {
			input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val('13/01/2020')
		})
		
		cy.get('#Reason').click({force: true})
		cy.get('#Reason').type('Test Separation!!!')
		
		cy.wait(1000)
		cy.get('button[onclick="return Validation();"]').click({force: true})
		cy.wait('@SaveSeparation').its('status').should('eq', 200) 
		cy.get(".toast-message").invoke('text').then((text) => {
				expect(text.trim()).equal('Seperation entry saved successfully!')
		})
		
	})	
	
	
	
	it('Check Emp Separation to click on Inactive Employees ',function(){
		
		cy.visit('http://next.pockethrms.com/Employee/Employee/EmployeeList')
		cy.wait(3000)
		
		//cy.get('#withcard').click({force: true})
		
		cy.contains('div', 'Statistics').click({force: true})
		cy.wait(2000)
		cy.contains('div', 'Inactive Employees').click({force: true})
		
		cy.wait(8000)
		cy.get('div[class="media mb-3 mb-lg-0 col-md-3"]>div[class="media-body align-self-center"]>p').invoke('text').then((text) => {
			
		
			cy.log(text.trim())
		});
			
			
		cy.get('div[class="media mb-3 mb-lg-0 col-md-3"]>div[class="media-body align-self-center"]>p').contains('p', 'CY14').should('be.visible');
		
		
	})
	it('Check Seperated employee profile is disabled ',function(){
		cy.wait(2000)
		cy.get('#globalSearch').type('CY14')
		cy.wait(3000)
		cy.contains('li', 'Seprationrelease test(CY14)').click({force: true})
		cy.wait(4000)
		cy.get('#basicTab').click({force:true})
		cy.wait(2000)
		cy.get('#payroll_detail_tab').click({force:true})
		cy.wait(1000)
		cy.get(".toast-message").invoke('text').then((text) => {
				expect(text.trim()).equal('This is separated Employee.!')
		})
		
	})
	it('Emp Separation Release with pervious Date',function(){
		cy.server()
		cy.wait(2000)
		cy.visit('https://next.pockethrms.com/Payroll/Transaction/separationRelease')
		cy.route('POST', 'https://next.pockethrms.com/Payroll/Transaction/SaveSeparationRelease').as('SaveSeparationRelease')
		cy.wait(1000)
		cy.get('#select2-multiEmp-container').click({force: true})
		cy.wait(2000)
		cy.get('input[type="search"]').click({force: true})
		cy.get('input[type="search"]').type(employeeId)
		cy.wait(2000)
		cy.get('.select2-results__option--highlighted').click({force: true})
		
		//valiadtion on release date
		cy.wait(3000)
		
		cy.get('#ReleaseDate').click({force: true}).then(input => {
			input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val('14/04/2020')
		})
		
		cy.get('[onclick="submitForm()"]').click({force: true})
		
		cy.wait(1000)
		cy.get(".toast-message").invoke('text').then((text) => {
			if(expect(text.trim()).equal('Release Date cannot be less than Separation Date!')){
				cy.get(".toast-message").click({force: true})
				
			cy.get('#ReleaseDate').click({force: true}).then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val('23/04/2020')
			})
			}        
		})
		
		
		cy.get('[onclick="submitForm()"]').click({force: true})
		cy.wait('@SaveSeparationRelease').its('status').should('eq', 200)
		cy.get(".toast-message").invoke('text').then((text) => {
			expect(text.trim()).equal('Seperation entry released successfully!')
		})
		
	})
})
	
	
	
	
	