describe("Sandwich Leave Process", () => {

	var url = 'http://next.pockethrms.com';
	var username= 'nileshgajare@live.com';
	var userPass = '123456';  
	var employeeID ='CY8';
	
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
	

	Cypress.Commands.add('navigate_EmployeeProfile',()=>{
		cy.wait(1000)
		cy.get('#globalSearch').click({force: true})		
		cy.get('#globalSearch').clear()
		cy.get('#globalSearch').type(employeeID)
		cy.wait(2000)
		cy.contains('li', employeeID).click({force: true})
		cy.wait(3000)
	})
	
	Cypress.Commands.add('navigate_EmployeeLeave',()=>{
     cy.wait(1000)
		cy.navigate_EmployeeProfile()
		
		cy.get('#leave_detail_tab').click({force:true});
		cy.wait(2000)
		
		cy.get('#Leave_LeaveEntry').click({force:true})
		cy.wait(3000)
	})
	
	Cypress.Commands.add('LeaveopenigforPL',()=>{
			cy.wait(2000)
			cy.navigate_EmployeeProfile()
			cy.wait(1000)
			cy.get('#leave_detail_tab').click({force: true})
			cy.wait(1000)
			cy.get('#Leave_LeaveEntry').click({force: true})
			cy.wait(2000)
			cy.get('.col-lg-3:nth-child(2) > .card > .card-body > .float-right > a > .fas').click({force: true})
			cy.wait(2000)
			cy.get('#LeaveOpen').click({force: true})
			cy.get('#LeaveOpen').clear()		
			cy.get('#LeaveOpen').type('0')
			
			cy.get('#LeaveCredit').click({force: true})
			cy.get('#LeaveCredit').clear()		
			cy.get('#LeaveCredit').type('4')
			cy.get('#CrApp').check({force: true})
			cy.wait(2000)
			cy.get('#saveloader').click({force: true})
		})
	
	it('Leave opening for PL',function() {
		cy.LeaveopenigforPL();
	})
	
	it('Leave opening for Casual Leave',function() {
			cy.get('.col-lg-3:nth-child(4) > .card > .card-body > .float-right > a > .fas').click({force: true})
			cy.wait(2000)
			cy.get('#LeaveOpen').click({force: true})
			cy.get('#LeaveOpen').clear()		
			cy.get('#LeaveOpen').type('0')
			
			cy.get('#LeaveCredit').click({force: true})
			cy.get('#LeaveCredit').clear()		
			cy.get('#LeaveCredit').type('2')
			cy.get('#CrApp').check({force: true})
			cy.wait(2000)
			cy.get('#saveloader').click({force: true})
	})
	
	it('Sandwich Leave Settings with duplicate ',function() {
		cy.wait(1000)
		cy.visit('https://next.pockethrms.com/Settings/Employee/Index?module=leave&submodule=SandwichLeave')
		cy.wait(1000)
		cy.get('#btnInsertRow').click({force: true})
		
		  cy.get('select[name=leav]').eq(0).select('PL',{force: true})
		 
		 cy.get('#btnInsertRow').click({force: true})
		 cy.get('select[name=leav]').eq(1).select('PL',{force: true})
		
		cy.get(".toast-message").invoke('text').then((text) => {
			expect(text.trim()).equal('Duplicate Column are not allowed !!!')		
	    })
		cy.get(".toast-message").click({force: true})
	})
	
	it('Sandwich Leave Settings with different leave type',function() {
			//cy.server()
			//cy.route('POST', 'https://next.pockethrms.com/Leave/Setting/saveSandwichLeave').as('saveSandwichLeave')
		     cy.get('select[name=leav]').eq(1).select('CL',{force: true})
		     cy.get('#btnSave').click({force: true})
			//cy.wait('@saveSandwichLeave').its('status').should('eq', 200)
				cy.wait(2000)
		    cy.get(".toast-message").invoke('text').then((text) => {
				expect(text.trim()).equal('Records saved successfully!!!')
		    })
			cy.get(".toast-message").click({force: true})
	})
	
	it('Add PL On friday and monday',function() {
		
		cy.navigate_EmployeeLeave();
		
		
		//firday leave apply
		cy.get('[title="Add Leave Details"]').eq(0).click({force: true})
		cy.wait(2000)
		 cy.get('#leaveType').select('PL',{force: true})
		 cy.get('#remarks').type('Sandwitchleave test')
		 cy.wait(2000)
		 
		 
		 cy.get('#fromdate').click().then(input => {
		   input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val('10/04/2020')
	   })
	   
	    cy.get('#todate').click().then(input => {
		   input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val('10/04/2020')
	   })
	   
	   cy.wait(1000)
	   cy.get('#drpFromDayType').select('FULL DAY',{force: true})
	   cy.get('#drpToDayType').select('FULL DAY',{force: true})
	   
	   cy.wait(2000)
	   cy.get('#btnAddLeave').click({force: true})
	   cy.wait(2000)
	   cy.get(".toast-message").invoke('text').then((text) => {
			expect(text.trim()).equal('Leave Updated Successfully')
		})
		
		cy.wait(2000)
		
		///moday leave apply
		
		cy.get('#leaveType').select('PL',{force: true})
		 cy.get('#remarks').type('Sandwitchleave test')
		 cy.wait(2000)
		 
		 
		 cy.get('#fromdate').click().then(input => {
		   input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val('13/04/2020')
	   })
	   
	    cy.get('#todate').click().then(input => {
		   input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val('13/04/2020')
	   })
	   
	   cy.wait(1000)
	   cy.get('#drpFromDayType').select('FULL DAY',{force: true})
	   cy.get('#drpToDayType').select('FULL DAY',{force: true})
	   
	   cy.wait(2000)
	   cy.get('#btnAddLeave').click({force: true})
	   cy.wait(2000)
	   cy.get(".toast-message").invoke('text').then((text) => {
			expect(text.trim()).equal('Leave Updated Successfully')
		})
	})
	
	it('Add Casual Leave On friday and monday',function() {
		
		cy.navigate_EmployeeLeave();
		
		
		//firday leave apply
		cy.get('[title="Add Leave Details"]').eq(0).click({force: true})
		cy.wait(2000)
		 cy.get('#leaveType').select('CL',{force: true})
		 cy.get('#remarks').type('Sandwitchleave test')
		 cy.wait(2000)
		 
		 
		 cy.get('#fromdate').click().then(input => {
		   input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val('24/04/2020')
	   })
	   
	    cy.get('#todate').click().then(input => {
		   input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val('24/04/2020')
	   })
	   
	   cy.wait(1000)
	   cy.get('#drpFromDayType').select('FULL DAY',{force: true})
	   cy.get('#drpToDayType').select('FULL DAY',{force: true})
	   
	   cy.wait(2000)
	   cy.get('#btnAddLeave').click({force: true})
	   cy.wait(2000)
	   cy.get(".toast-message").invoke('text').then((text) => {
			expect(text.trim()).equal('Leave Updated Successfully')
		})
		
		cy.wait(2000)
		
		///moday leave apply
		
		cy.get('#leaveType').select('CL',{force: true})
		 cy.get('#remarks').type('Sandwitchleave test')
		 cy.wait(2000)
		 
		 cy.get('#fromdate').click().then(input => {
		   input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val('27/04/2020')
	   })
	   
	    cy.get('#todate').click().then(input => {
		   input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val('27/04/2020')
	   })
	   
	   cy.wait(1000)
	   cy.get('#drpFromDayType').select('FULL DAY',{force: true})
	   cy.get('#drpToDayType').select('FULL DAY',{force: true})
	   
	   cy.wait(2000)
	   cy.get('#btnAddLeave').click({force: true})
	   cy.wait(2000)
	   cy.get(".toast-message").invoke('text').then((text) => {
			expect(text.trim()).equal('Leave Updated Successfully')
		})
	})
	
	
	
	it('Sandwich Leave Process over Casual Leave and PL',function() {
		cy.wait(1000)
		cy.visit('https://next.pockethrms.com/Leave/Setting/SandwichLeaveProcess')
		cy.wait(2000)
		
		cy.get('#select2-multiEmp-container').click({force: true})
		cy.wait(2000)
		cy.get('input[type="search"]').click({force: true})
		cy.get('input[type="search"]').type(employeeID)
		cy.wait(2000)
		cy.get('.select2-results__option--highlighted').click({force: true})
		cy.wait(1000)
		
		
		cy.get('#btnProcess').click({force: true})
		
		cy.get(".toast-message").invoke('text').then((text) => {
			if(text.trim()=='Select From Date')	{
				cy.wait(2000)
				cy.get(".toast-message").eq(0).click({force: true})
					cy.get('#dtDateFrom').click({force: true}).then(input => {
						input[0].dispatchEvent(new Event('input', { bubbles: true }))
						input.val('01/04/2020')
				})	
			}
		})
		
		cy.wait(2000)
		cy.get('#btnProcess').click({force: true})
		cy.get(".toast-message").invoke('text').then((text) => {
			if(text.trim()=='Select To Date')	{
				cy.wait(2000)
				cy.get(".toast-message").eq(0).click({force: true})
					cy.get('#dtDateTo').click({force: true}).then(input => {
						input[0].dispatchEvent(new Event('input', { bubbles: true }))
						input.val('30/04/2020')
				})	
			}
		})
		
		cy.wait(1000)
		cy.get('#btnProcess').click({force: true})	
	})
	
	it('Leave balance check  for CL after Leave Post',function() {
		cy.wait(2000)
		cy.visit('https://next.pockethrms.com/Leave/transaction/LeavePost')
		cy.wait(2000)
		cy.get('#select2-multiEmp-container').click({force: true})
		cy.wait(2000)
		cy.get('input[type="search"]').click({force: true})
		cy.get('input[type="search"]').type(employeeID)
		cy.wait(2000)
		cy.get('.select2-results__option--highlighted').click({force: true})
		
		cy.wait(1000)
		cy.get('#month').select('April',{force: true})
		cy.get('#year').click({force: true})
		cy.get('#year').clear()
		cy.get('#year').type('2020')
		
		cy.wait(1000)
		cy.contains('label','Staff').click({force: true})
		cy.wait(1000)
		cy.get('#btnProcessLeavePost').click({force: true})	
		cy.wait(2000)
		
		cy.get('#tableRow').contains('td', 'PL:3 CL:2 LD:3').should('be.visible');
		cy.get('#tableRow').contains('td', '3').should('be.visible');
	})
	
})	