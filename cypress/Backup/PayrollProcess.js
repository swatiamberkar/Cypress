describe('Monthly Input', function() {
	//var company ='GreyTest'
	//var employeeID ='TEST-6'
	var PayrollProcessMonth=''
	
	var url = 'https://next.pockethrms.com/'
	var company='SwTest_25'
	var employeeID = 'CY3'
	
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
		
		cy.get('#Email').click()
		cy.get('#Email').type('nileshgajare@live.com')
		
		cy.get('#Password').click()
		cy.get('#Password').type('123456')
		
		cy.get('[type="submit"]').click({force: true})
		
		cy.wait(2000)
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
	
	it('Navigate to Payroll Process', function() {
		
		cy.visit('http://next.pockethrms.com/payroll/transaction/payrollprocessing')
		cy.waitUntil(() => cy.server().should((server) => {expect(server.status).to.eq(200)}))
		//cy.wait(1000)
	})
	
	
/*	
	it('N-TC Verify alert without selection of Single Employee', function() {	
		cy.contains('button', 'Single Employee').click({force: true})	
		cy.get('#processPayroll').click({force: true})
		
		cy.get(".toast-message").invoke('text').then((text) => {
				cy.log(text.trim())
				expect(text.trim()).equal('Select Employee !')
		})	
		cy.wait(1000)
		cy.get(".toast-message").click({force: true})
		cy.wait(1000)
		cy.get('#deletePayroll').click({force: true})
		
		cy.get(".toast-message").invoke('text').then((text) => {
				cy.log(text.trim())
				expect(text.trim()).equal('Select Employee !')
		})	
		cy.wait(1000)
		cy.get(".toast-message").click({force: true})
		cy.wait(1000)
	})
	
	
	it('N-TC Verify alert without selection of Selective Employees', function() {	
		cy.contains('button', 'Selective Employees').click({force: true})	
		cy.get('#processPayroll').click({force: true})
		
		cy.get(".toast-message").invoke('text').then((text) => {
				cy.log(text.trim())
				expect(text.trim()).equal('Please Select any option from selective box')
		})	
		cy.wait(1000)
		cy.get(".toast-message").click({force: true})
		cy.wait(1000)
		cy.get('#deletePayroll').click({force: true})
		
		cy.get(".toast-message").invoke('text').then((text) => {
				cy.log(text.trim())
				expect(text.trim()).equal('Please Select any option from selective box')
		})	
		cy.wait(1000)
		cy.get(".toast-message").click({force: true})
		cy.wait(1000)		
	})
	*/
	
	it('P-TC Verify alert with selection of Single Employee', function() {	
		cy.contains('button', 'Single Employee').click({force: true})	
		
		cy.get('input[type="search"]').click({force: true})
		cy.get('input[type="search"]').type(employeeID)
		cy.wait(1000)
		cy.get('.select2-results__option--highlighted').click({force: true})
		cy.get("select[id='month']").then($input => {
                                 PayrollProcessMonth=  $input.val();
                                 
                                 cy.log("PayrollProcessMonth: "+PayrollProcessMonth);
                        })
						
		cy.get('#processPayroll').click({force: true})
		cy.get(".alert-text").invoke('text').then((text) => {
				cy.log(text.trim())
				
		if(text.trim()=='Oh snap! Sorry Monthly Input Is Not Entered For This Month')
		{
			expect(text.trim()).equal('Oh snap! Sorry Monthly Input Is Not Entered For This Month')
			cy.visit('http://next.pockethrms.com/payroll/transaction/monthlyinput')	
			cy.wait(2000)
			cy.get('[value="View"]').click({force: true})
			cy.wait(1000)	
			cy.get('#inputMonth').select(PayrollProcessMonth,{force: true})
			cy.wait(1000)
			cy.get('[value="View"]').click({force: true})
		
			cy.wait(2000)
			cy.get('.theme_dataTable > .table  > tbody').find('tr').then(listing => {
					 EmpLengthInMonthlyInput = Cypress.$(listing).length;
					cy.log("EmpLength: "+EmpLengthInMonthlyInput)
			})
		
			if(EmpLengthInMonthlyInput=='0')
			{
				cy.get('[value="Edit"]').click({force: true})
			}
		
			cy.get('.theme_dataTable > .table > tbody').find('tr').each(function(row, i){
			var num1 = parseFloat(i)+1
			cy.get('.theme_dataTable > .table > tbody > tr:nth-child('+num1+') > td:nth-child(2)').invoke('text').then((text) => 
				{
					cy.log(text.trim())
					if(text.trim()==employee)
					{					
						cy.get('.table > tbody > tr:nth-child('+num1+') > td:nth-child(3) > .form-control').click()
						cy.get('.table > tbody > tr:nth-child('+num1+') > td:nth-child(3) > .form-control').clear()
						cy.get('.table > tbody > tr:nth-child('+num1+') > td:nth-child(3) > .form-control').type('0')
						  
						cy.get('.table > tbody > tr:nth-child('+num1+') > td:nth-child(4) > .form-control').click()	
						cy.get('.table > tbody > tr:nth-child('+num1+') > td:nth-child(4) > .form-control').clear()	
						cy.get('.table > tbody > tr:nth-child('+num1+') > td:nth-child(4) > .form-control').type('0')

						cy.get('.table > tbody > tr:nth-child('+num1+') > td > .chked').check({force: true})
					}
				})
			})
		
		
			cy.get('[value="Save"]').click({force: true})
			cy.wait(1000)
			cy.get(".toast-message").invoke('text').then((text) => {
			expect(text.trim()).equal('Record Save Successfully !')
			cy.log(text.trim())	
			})
	
	
		cy.xpath("//span[@class='menu-name'][contains(text(),'Employee')]").click({force: true})
		
		cy.xpath("//u[contains(text(),'"+employee+"')]").click({force: true})
		cy.wait(5000)
		cy.get('.page-title').should('contain','Employee Profile')
		cy.wait(2000)	
		
		cy.xpath("//a[@id='payroll_detail_tab']").click({force: true})
		cy.wait(1000)
		cy.get('#payrollProcesstab').click({force: true})
		cy.wait(1000)
		
		cy.get('#btnProcess').click({force: true})
		cy.wait(3000)
		cy.get(".toast-message").invoke('text').then((text) => {
		cy.log(text.trim())
		expect(text.trim()).equal('Payroll Process Completed Successfully')
						
		})			
		}
	else if(text.trim()=='Oh snap! Payroll is Locked for this month')		
	{
		expect(text.trim()).equal('Oh snap! Payroll is Locked for this month')
		cy.visit('http://next.pockethrms.com/payroll/transaction/PaysheetLock')	
			cy.wait(2000)
			cy.get('#Month1').select(PayrollProcessMonth,{force: true})
			cy.xpath("//button[contains(text(),'Next')]").click({force: true})
			
			
			cy.wait(2000)
			cy.xpath("//label[contains(text(),'All Categories')]/input").click({force: true})
			cy.xpath("//button[@id='btnRelease']").click({force: true})
			
			
			/*cy.get('.categorytable > tbody').find('tr').each(function(row, i){
			var num1 = parseFloat(i)+1
			cy.get('.categorytable > tbody > tr:nth-child('+num1+') > td:nth-child(1)> label').invoke('text').then((text) => 
				{
					cy.log(text.trim())
					if(text.trim()==Employeecatagorytype.trim())
					{					
						cy.get('.categorytable > tbody > tr:nth-child('+num1+') > td:nth-child(1)>label>input').click()
						cy.get('.categorytable > tbody > tr:nth-child('+num1+') > td:nth-child(3)>button').click()
						cy.wait(2000)
					}
				})
			})
			*/
			
		cy.visit('http://next.pockethrms.com/payroll/transaction/payrollprocessing')
		cy.wait(1000)
		
		cy.get('input[type="search"]').click({force: true})
		cy.get('input[type="search"]').type(employeeID)
		cy.wait(1000)
		cy.get('.select2-results__option--highlighted').click({force: true})
		cy.get('#processPayroll').click({force: true})
		cy.get(".alert-text").invoke('text').then((text) => {
		
		if(text.trim()=='Oh snap! Already Payroll Processed For This Employee')	{
		expect(text.trim()).equal('Oh snap! Already Payroll Processed For This Employee')
		cy.wait(1000)
		
		cy.get('input[type="search"]').click({force: true})
		cy.get('input[type="search"]').type(employeeID)
		cy.wait(1000)
		cy.get('.select2-results__option--highlighted').click({force: true})
		cy.get('#deletePayroll').click({force: true})
		
		cy.get(".alert-text").invoke('text').then((text) => {
				cy.log(text.trim())
				expect(text.trim()).equal('Payroll Process Deleted Successfully')
		})
		cy.wait(1000)
		
		cy.get('input[type="search"]').click({force: true})
		cy.get('input[type="search"]').type(employeeID)
		cy.wait(1000)
		cy.get('.select2-results__option--highlighted').click({force: true})
		cy.get('#processPayroll').click({force: true})
		cy.get(".alert-text").invoke('text').then((text) => {
				cy.log(text.trim())
				expect(text.trim()).equal('Payroll Process Completed')
		})
		}
		else{
		expect(text.trim()).equal('Payroll Process Completed')
		}			
		})					
	}
	else if(text.trim()=='Oh snap! Already Payroll Processed For This Employee')	{
		expect(text.trim()).equal('Oh snap! Already Payroll Processed For This Employee')
		cy.wait(1000)
		
		cy.get('input[type="search"]').click({force: true})
		cy.get('input[type="search"]').type(employeeID)
		cy.wait(1000)
		cy.get('.select2-results__option--highlighted').click({force: true})
		cy.get('#deletePayroll').click({force: true})
		
		cy.get(".alert-text").invoke('text').then((text) => {
				cy.log(text.trim())
				expect(text.trim()).equal('Payroll Process Deleted Successfully')
		})
		cy.wait(1000)
		
		cy.get('input[type="search"]').click({force: true})
		cy.get('input[type="search"]').type(employeeID)
		cy.wait(1000)
		cy.get('.select2-results__option--highlighted').click({force: true})
		cy.get('#processPayroll').click({force: true})
		cy.get(".alert-text").invoke('text').then((text) => {
				cy.log(text.trim())
				expect(text.trim()).equal('Payroll Process Completed')
		})
	}
	else{
		
				expect(text.trim()).equal('Payroll Process Completed')
	
	}
	
	})
		
		
		
	})
	
	
/*	
	it('Payroll process(Single Employee) with out Emp selection', function() {
		
		cy.contains('button', 'Single Employee').click({force: true})
		
		cy.get('#processPayroll').click({force: true})
		
		cy.get(".toast-message").invoke('text').then((text) => {
				cy.log(text.trim())
				
				if(expect(text.trim()).equal('Select Employee !')){
					
					cy.get('.select2-search__field').click({force: true})
					cy.wait(2000)
					cy.get('input[type="search"]').click({force: true})
					cy.get('input[type="search"]').type('L-024')
					cy.wait(2000)
					cy.get('.select2-results__option--highlighted').click({force: true})
					
				}
        })
		
		
		
	})
	
	it('Payroll process(Single Employee) with out Month', function() {
		
		cy.get('#month').select('')
		cy.get('#processPayroll').click({force: true})
		cy.get('#month').then(($input) => {
			expect($input[0].validationMessage).to.eq('Please select an item in the list.')
		})	
	})
	
	it('Payroll process(Single Employee) with out Year', function() {
		cy.get('#month').select('January',{force: true})
		
		cy.get('#year').click({force: true})
		cy.get('#year').clear()
		
		cy.get('#processPayroll').click({force: true})
		
		cy.wait(4000)
		
		cy.get("#errMsg").invoke('text').then((text) => {
			cy.log(text.trim())
		})
		
	})
	
	it('Delete MonthlyInput of specific month for specific Emp ', function() {
		cy.visit('http://next.pockethrms.com/payroll/transaction/monthlyinput')	
		cy.wait(1000)
		cy.get('#inputMonth').select('May',{force: true})
		
		cy.get('[value="Edit"]').click({force: true})
		cy.wait(2000)
		
		cy.get('.theme_dataTable > .table').find('tr').each(function(row, i){
			if(i!=0){
			//console.log(i)
			var num1 = parseFloat(i)
			 cy.get('.theme_dataTable > .table > tbody > tr:nth-child('+num1+') > .th').invoke('text').then((text) => {
				cy.log(text.trim())
				if(text.trim()=='L-024'){					
				     cy.get('.table > tbody > tr:nth-child('+num1+') > td > .chked').check({force: true})
				}
			})
		
			}
			
		})
		cy.wait(1000)
		cy.get('#btnDelete').click({force: true})
	})
	
	
	it('Payroll process(Single Employee) with no monthlyinput and save monthlyinput  && Payrollprocess', function() {
		cy.visit('http://next.pockethrms.com/payroll/transaction/payrollprocessing')
		cy.wait(1000)
		cy.get('.select2-search__field').click({force: true})
		cy.wait(2000)
		cy.get('input[type="search"]').click({force: true})
		cy.get('input[type="search"]').type('L-024')
		cy.wait(2000)
		cy.get('.select2-results__option--highlighted').click({force: true})
		
		
		cy.get('#month').select('May',{force: true})
		cy.get('#processPayroll').click({force: true})
		
		cy.wait(4000)
		cy.get("#errMsg").invoke('text').then((text) => {
			cy.log(text.trim())
		
			if(expect(text.trim()).equal('Oh snap! Sorry Monthly Input Is Not Entered For This Month')){
				
				cy.visit('http://next.pockethrms.com/payroll/transaction/monthlyinput')	
				cy.wait(2000)
				cy.get('[value="View"]').click({force: true})
				cy.wait(1000)	
				cy.get('#inputMonth').select('May',{force: true})
				cy.wait(1000)
				cy.get('[value="View"]').click({force: true})
			
				cy.wait(2000)
				cy.get('.theme_dataTable > .table').find('tr').each(function(row, i){
					if(i!=0){
					//console.log(i)
					var num1 = parseFloat(i)
					 cy.get('.theme_dataTable > .table > tbody > tr:nth-child('+num1+') > .th').invoke('text').then((text) => {
						cy.log(text.trim())
						if(text.trim()=='L-024'){					
							 cy.get('.table > tbody > tr:nth-child('+num1+') > td:nth-child(3) > .form-control').click()
							 cy.get('.table > tbody > tr:nth-child('+num1+') > td:nth-child(3) > .form-control').clear()
							 cy.get('.table > tbody > tr:nth-child('+num1+') > td:nth-child(3) > .form-control').type('0')
							  
							cy.get('.table > tbody > tr:nth-child('+num1+') > td:nth-child(4) > .form-control').click()	
							cy.get('.table > tbody > tr:nth-child('+num1+') > td:nth-child(4) > .form-control').clear()	
							cy.get('.table > tbody > tr:nth-child('+num1+') > td:nth-child(4) > .form-control').type('0')
							
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
				
				cy.wait(2000)
				cy.visit('http://next.pockethrms.com/payroll/transaction/payrollprocessing')
				cy.wait(1000)
				cy.contains('button', 'Single Employee').click({force: true})
				
				cy.get('.select2-search__field').click({force: true})
				cy.wait(2000)
				cy.get('input[type="search"]').click({force: true})
				cy.get('input[type="search"]').type('L-024')
				cy.wait(2000)
				cy.get('.select2-results__option--highlighted').click({force: true})
				cy.get('#month').select('May',{force: true})
				cy.get('#processPayroll').click({force: true})
					
				cy.wait(6000)	
				cy.get("#succMsg").invoke('text').then((text) => {
					cy.log(text.trim())
				})
				
				}

		})

	})	
		
		
		
	it('Delete  Payroll process(Single Employee) ', function() {
		
		cy.get('.select2-search__field').click({force: true})
		cy.wait(2000)
		cy.get('input[type="search"]').click({force: true})
		cy.get('input[type="search"]').type('L-024')
		cy.wait(2000)
		cy.get('.select2-results__option--highlighted').click({force: true})
		
		cy.get('#month').select('May',{force: true})
		
		cy.get('#deletePayroll').click({force: true})
		
		cy.wait(5000)
		cy.get("#errMsg").invoke('text').then((text) => {
			cy.log(text.trim())
		})

	})	
		
		
		
	
	it('Delete MonthlyInput for All Employee May month', function() {
		cy.visit('http://next.pockethrms.com/payroll/transaction/monthlyinput')	
		cy.wait(2000)
		cy.get('#inputMonth').select('May',{force: true})
		cy.wait(1000)
		cy.get('[value="Edit"]').click({force: true})
		cy.wait(2000)
		
		cy.get('#chkAll').click({force: true})
		cy.wait(1000)
		cy.get('#btnDelete').click({force: true})
		
	})
	
	
	
	it('Payroll process(Selective Employees) with out monthlyinput', function() {
		cy.wait(2000)
		cy.visit('http://next.pockethrms.com/payroll/transaction/payrollprocessing')
		cy.wait(2000)
		cy.contains('button', 'Selective Employees').click({force: true})
		
		
		cy.wait(1000)
		cy.get('#typeSelect1').check('all',{force: true})
		cy.get('[type="checkbox"]').eq(0).should('be.checked')
		cy.get('[type="checkbox"]').eq(1).should('be.checked')
		
		
		//uncheck Admin and Manager catagory
		//cy.get('[type="checkbox"]').eq(1).uncheck({force: true})
		cy.contains('label', 'Admin1').click({force: true})
		cy.contains('label', 'Manager').click({force: true})
		
		cy.get('#month').select('May',{force: true})
		
		cy.get('#processPayroll').click({force: true})
		
		cy.wait(6000)
		
			cy.get("#succMsg").invoke('text').then((text) => {
			cy.log(text.trim())
		
			if(expect(text.trim()).equal('Well done! Payroll Process has been successfully validated and it will run in background process')){
				
				cy.visit('http://next.pockethrms.com/payroll/transaction/monthlyinput')	
				
				cy.wait(2000)
				cy.get('#categoryId').select('Staff',{force: true})
				cy.get('#inputMonth').select('May',{force: true})
				cy.wait(1000)
				cy.get('[value="View"]').click({force: true})
			
				cy.wait(2000)
				cy.get('[value="Save"]').click({force: true})
				cy.wait(1000)
				cy.get(".toast-message").invoke('text').then((text) => {
					cy.log(text.trim())	
				})
				
				cy.wait(2000)
				cy.visit('http://next.pockethrms.com/payroll/transaction/payrollprocessing')
				cy.wait(2000)
				cy.contains('button', 'Selective Employees').click({force: true})
				cy.wait(1000)
				cy.get('#typeSelect1').check('all',{force: true})
				cy.get('[type="checkbox"]').eq(0).should('be.checked')
				cy.get('[type="checkbox"]').eq(1).should('be.checked')
		
				//uncheck Admin and Manager catagory
				//cy.get('[type="checkbox"]').eq(1).uncheck({force: true})
				cy.contains('label', 'Admin1').click({force: true})
				cy.contains('label', 'Manager').click({force: true})
				
				cy.get('#month').select('May',{force: true})
				
				cy.get('#processPayroll').click({force: true})
					
				cy.wait(6000)	
				cy.get("#succMsg").invoke('text').then((text) => {
					cy.log(text.trim())
				})
				
				}

		})

	})
	
	it('Payroll process(All Employees)', function() {
		cy.visit('http://next.pockethrms.com/payroll/transaction/payrollprocessing')
		cy.wait(2000)
		cy.contains('button', 'All Employees').click({force: true})
		cy.get('#month').select('May',{force: true})
		
		cy.get('#processPayroll').click({force: true})
		
		cy.wait(6000)	
		cy.get("#succMsg").invoke('text').then((text) => {
			cy.log(text.trim())
		})
		
		
	})	
	*/
		
 })