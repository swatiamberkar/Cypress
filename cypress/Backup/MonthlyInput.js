describe('Monthly Input', function() {
	var url = 'http://next.pockethrms.com'
	var username= 'nileshgajare@live.com'
	var userPass = '123456'
	var company='NextPocketHRMS Test Company'
	
	//var employeeID ='c013'
	
	
	//var company ='GreyTest'
	before(function() {
    	cy.clearCookie('.AspNetCore.Antiforgery.w5W7x28NAIs','.AspNetCore.Session','1P_JAR','ARRAffinity','FavouriteMenus','XCategory','XCompanyId','XName','XSchemaName','XUserId','XUserName','_ga','_gid','ai_session','ai_user','new_username') 
		cy.getCookie('.AspNetCore.Antiforgery.IT8a6MuPYuY').should('be.null')
		cy.getCookie('.AspNetCore.Session').should('be.null')
		cy.getCookie('new_username').should('be.null')
		cy.getCookie('FavouriteMenus').should('be.null')
		cy.getCookie('.AspNetCore.Antiforgery.IT8a6MuPYuY').should('be.null')
	})
	
	beforeEach(function(){
        window.console.log('Enter the beforeEach function')
		Cypress.on('uncaught:exception', (err,runnable) => {
			return false;
		});
		Cypress.Cookies.preserveOnce('.AspNetCore.Antiforgery.w5W7x28NAIs','.AspNetCore.Session','1P_JAR','ARRAffinity','FavouriteMenus','XCategory','XCompanyId','XName','XSchemaName','XUserId','XUserName','_ga','_gid','ai_session','ai_user','new_username')
		cy.wait(2000)
    })
	
	

	it('Pocket HRMS Login', function() {
		cy.visit(url) 
		cy.get('#Email').should('be.visible').should('have.css', 'border-radius') 
		cy.get('#Email').should('exist')
		cy.get('#Email').click()
		cy.get('#Email').type(username)
		cy.get('#Password').should('be.visible').should('have.css', 'border-radius') 
		cy.get('#Password').should('exist')
		cy.get('#Password').click()
		cy.get('#Password').type(userPass)	
		cy.get('[type="submit"]').click({force: true})
		
	})
	
	it('Change Company', function() {		 
		cy.get('[onclick="changeCompanyModal()"]').invoke('text').then((text) => 
		{				 
			if(text.trim()==company){
				expect(text.trim()).to.eq(company) 
			}
			else{
				cy.get('[onclick="changeCompanyModal()"]').click()
				cy.wait(2000)
				cy.get('.radio').find('label').each(function(row, i){
				var num1 = parseFloat(i+1)
				cy.get('.radio:nth-child('+num1+') > label').invoke('text').then((text) => {	
					if(text.trim()==company){
						expect(text).to.eq(company)
						cy.get('.radio:nth-child('+num1+') > label').click()
						cy.get('#defaultCompanySave').click()
						cy.wait(2000)
					}	
				})
				})		
			}
		})	 	
	
	})
	
	
	it('View Monthly input Without selection of Month and year', function() {
		
		cy.visit('http://next.pockethrms.com/payroll/transaction/monthlyinput')	
		cy.get('[value="View"]').click({force: true})
		cy.wait(1000)	
		cy.get('#inputMonth').focus()
		cy.get('#inputMonth').then($input => {
			expect($input.val()).to.contain('')
		})
		cy.get('#inputMonth').then(($input) => {
			expect($input[0].validationMessage).to.eq('Please select an item in the list.')
		})
		
		cy.wait(1000)
		cy.get('#inputMonth').select('January',{force: true})
		
		cy.get('#year').click({force: true})
		cy.get('#year').clear()
		cy.get('[value="View"]').click({force: true})
		
	})
	
	
	it('save monthlyinput for specific Emp', function() {
		
		cy.visit('http://next.pockethrms.com/payroll/transaction/monthlyinput')	
		cy.wait(2000)
		cy.get('[value="View"]').click({force: true})
		cy.wait(1000)	
		cy.get('#inputMonth').select('May',{force: true})
		cy.wait(1000)
		cy.get('[value="View"]').click({force: true})
		
		cy.wait(2000)
		cy.get('.theme_dataTable > .table').find('tr').each(function(row, i){
			cy.log("i: "+i)
			if(i==0)
			{
				cy.get('[value="Edit"]').click({force: true})
				
			}
			
				else{
				//console.log(i)
				var num1 = parseFloat(i)
				 cy.get('.theme_dataTable > .table > tbody > tr:nth-child('+num1+') > .th').invoke('text').then((text) => {
					cy.log(text.trim())
					if(text.trim()=='L-039'){					
						 cy.get('.table > tbody > tr:nth-child('+num1+') > td:nth-child(3) > .form-control').click()
						 cy.get('.table > tbody > tr:nth-child('+num1+') > td:nth-child(3) > .form-control').clear()
						 cy.get('.table > tbody > tr:nth-child('+num1+') > td:nth-child(3) > .form-control').type('0')
						  
						cy.get('.table > tbody > tr:nth-child('+num1+') > td:nth-child(4) > .form-control').click()	
						cy.get('.table > tbody > tr:nth-child('+num1+') > td:nth-child(4) > .form-control').clear()	
						cy.get('.table > tbody > tr:nth-child('+num1+') > td:nth-child(4) > .form-control').type('2')

						 cy.get('.table > tbody > tr:nth-child('+num1+') > td > .chked').check({force: true})
					}
				})
			
				}	
				
		})
		
		cy.get('[value="Save"]').click({force: true})
		cy.wait(1000)
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())	
		})
		
	})
	
	
	
	it('check MonthlyInput for the specific Emp and Edit',function() {
		
		cy.get('[value="Edit"]').click({force: true})
		
		cy.wait(2000)
	 cy.get('.theme_dataTable > .table').find('tr').each(function(row, i){
			if(i!=0){
			//console.log(i)
			var num1 = parseFloat(i)
			 cy.get('.theme_dataTable > .table > tbody > tr:nth-child('+num1+') > .th').invoke('text').then((text) => {
				//cy.log(text.trim())
				if(text.trim()=='L-039'){					
					 cy.get('.table > tbody > tr:nth-child('+num1+') > td:nth-child(3) > .form-control').then($input => {
						expect($input.val()).to.contain('3')
						})
					  
					cy.get('.table > tbody > tr:nth-child('+num1+') > td:nth-child(4) > .form-control').then($input => {
						expect($input.val()).to.contain('2')
						})
				
					cy.get('.table > tbody > tr:nth-child('+num1+') > td:nth-child(3) > .form-control').click()
					 cy.get('.table > tbody > tr:nth-child('+num1+') > td:nth-child(3) > .form-control').clear()
					 cy.get('.table > tbody > tr:nth-child('+num1+') > td:nth-child(3) > .form-control').type('2')
					  
					cy.get('.table > tbody > tr:nth-child('+num1+') > td:nth-child(4) > .form-control').click()	
					cy.get('.table > tbody > tr:nth-child('+num1+') > td:nth-child(4) > .form-control').clear()	
					cy.get('.table > tbody > tr:nth-child('+num1+') > td:nth-child(4) > .form-control').type('1')
				
				
				}
			})
		
			}
			
	  })
		cy.wait(1000)
		cy.get('[value="Save"]').click({force: true})
		cy.wait(1000)
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())	
				
		})
	})
	
	
	it('Delete MonthlyInput of specific month for specific Emp ', function() {
		cy.get('[value="Edit"]').click({force: true})
		cy.wait(2000)
		
		cy.get('.theme_dataTable > .table').find('tr').each(function(row, i){
			if(i!=0){
			//console.log(i)
			var num1 = parseFloat(i)
			 cy.get('.theme_dataTable > .table > tbody > tr:nth-child('+num1+') > .th').invoke('text').then((text) => {
				cy.log(text.trim())
				if(text.trim()=='L-039'){					
				     cy.get('.table > tbody > tr:nth-child('+num1+') > td > .chked').check({force: true})
				}
			})
		
			}
			
		})
		cy.wait(1000)
		cy.get('#btnDelete').click({force: true})
	})
	
	
	it('Delete Payroll Process  for All Employee January month', function() {
		cy.visit('http://next.pockethrms.com/payroll/transaction/payrollprocessing')
		cy.wait(1000)
		cy.contains('button', 'All Employees').click({force: true})
		cy.get('select[name=month]').select('January')
		cy.get('#ItaxProcess').check('1',{force: true})
		cy.wait(1000)
		cy.get('#deletePayroll').click({force:true})
	})
	
	it('Delete MonthlyInput for All Employee January month', function() {
		cy.visit('http://next.pockethrms.com/payroll/transaction/monthlyinput')	
		cy.wait(2000)
		cy.get('#inputMonth').select('January',{force: true})
		cy.wait(1000)
		cy.get('[value="Edit"]').click({force: true})
		cy.wait(2000)
		
		cy.get('#chkAll').click({force: true})
		cy.wait(1000)
		cy.get('#btnDelete').click({force: true})
		
	})
	
})