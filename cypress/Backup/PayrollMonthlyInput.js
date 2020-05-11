describe('Monthly Input with Payroll Process', function() {
	
	var company ='GreyTest'
	var employee = 'Krishna Nayak'
	var Employeecatagorytype=''
	var PayrollProcessMonth=''
	var EmpLengthInMonthlyInput=''
	

	before(function() {
    	cy.clearCookie('.AspNetCore.Antiforgery.IT8a6MuPYuY', '.AspNetCore.Session','.AspNetCore.Mvc.CookieTempDataProvider','new_username','FavouriteMenus') 
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
		cy.get('#Email').click()
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
        Cypress.Cookies.preserveOnce('.AspNetCore.Antiforgery.w5W7x28NAIs','.AspNetCore.Session','1P_JAR','ARRAffinity','FavouriteMenus','XCategory','XCompanyId','XName','XSchemaName','XUserId','XUserName','_ga','_gcl_au','_gid','ai_session','ai_user','new_username')
        cy.wait(2000)
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
	
	})
	
	it('Select Specific Emp & get the emp Catagory type', function() {
		
		cy.xpath("//span[@class='menu-name'][contains(text(),'Employee')]").click({force: true})
		
		cy.xpath("//u[contains(text(),'"+employee+"')]").click({force: true})
		cy.wait(5000)
		cy.get('.page-title').should('contain','Employee Profile')
		cy.wait(2000)
                
               // cy.get('select[name=CATEGORY]').then($input => {
                                // Employeecatagorytype=  $input.val();
															  
								   cy.get('select[name=CATEGORY] :selected').then($input => {
								  Employeecatagorytype=  $input.text();
                                 
                                 cy.log("Employeecatagorytype: "+Employeecatagorytype);
                        })		
	})
	
	
	it('Verify Process Payroll Button', function() {
		cy.xpath("//a[@id='payroll_detail_tab']").click({force: true})
		cy.wait(1000)
		cy.get('#payrollProcesstab').click({force: true})
		cy.wait(1000)
		//cy.wait(1000)	
		//cy.get("select[id='month']").select('January',{force: true})	
		
		cy.get("select[id='month']").then($input => {
                                 PayrollProcessMonth=  $input.val();
                                 
                                 cy.log("PayrollProcessMonth: "+PayrollProcessMonth);
                        })	
			
				
		cy.get('#btnProcess').click({force: true})
		cy.wait(2500)
		cy.get(".toast-message").invoke('text').then((text) => {
		cy.log(text.trim())
				
		if(text.trim()=='Sorry Monthly Input Is Not Entered For This Month')
		{
			expect(text.trim()).equal('Sorry Monthly Input Is Not Entered For This Month')
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
						
						cy.get('.table > tbody > tr:nth-child('+num1+') > td:nth-child(4)').find('input').then(listing => {
						var Input = Cypress.$(listing).length;
						cy.log("Input: "+Input)
						})
					
					
					
					
					
					
					
					
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
	else if(text.trim()=='Payroll is Locked for this month')		
	{
		expect(text.trim()).equal('Payroll is Locked for this month')
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
			
			
			cy.xpath("//i[@class='dripicons-menu nav-icon']").click({force: true})
			cy.wait(1500)
			cy.xpath("//span[@class='menu-name'][contains(text(),'Employee')]").click({force: true})
		cy.wait(3000)
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
		
		if(text.trim()=='Already Payroll Processed For This Employee')	{
		cy.wait(1000)
		cy.get(".toast-message").click({force: true})
		cy.get('#btnProcessDelete').click({force: true})
		cy.wait(1000)
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())
				expect(text.trim()).equal('Payroll Process Deleted Successfully')
		})
		
		cy.wait(1000)
		cy.get(".toast-message").click({force: true})
		
		cy.get('#btnProcess').click({force: true})
		cy.wait(5000)
		cy.get(".toast-message").invoke('text').then((text) => {
		cy.log(text.trim())
		expect(text.trim()).equal('Payroll Process Completed Successfully')
		})
		}
		else{
		expect(text.trim()).equal('Payroll Process Completed Successfully')
		}			
		})					
	}
	else if(text.trim()=='Already Payroll Processed For This Employee')	{
		expect(text.trim()).equal('Already Payroll Processed For This Employee')
		cy.wait(1000)
		cy.get(".toast-message").click({force: true})
		cy.get('#btnProcessDelete').click({force: true})
		cy.wait(1000)
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())
				expect(text.trim()).equal('Payroll Process Deleted Successfully')
		})
		cy.wait(1000)
		cy.get(".toast-message").click({force: true})
		
		cy.get('#btnProcess').click({force: true})
		cy.wait(3000)
		cy.get(".toast-message").invoke('text').then((text) => {
		cy.log(text.trim())
		expect(text.trim()).equal('Payroll Process Completed Successfully')
		})
	}
	else{
		
				expect(text.trim()).equal('Payroll Process Completed Successfully')
	
	}
	
	})
	
	})
	
	
	})
	