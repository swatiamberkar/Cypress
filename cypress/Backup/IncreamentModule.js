describe('Increment Module', function() {
	var company='Test_45'
	//var Employeecatagorytype;
	//var company ='GreyTest'
	var employeeId = 'cy01'
	var Employeecatagorytype=''
	var PayrollProcessMonth=''
	var EmpLengthInMonthlyInput=''
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
	
	it('successfully page  loads', function() {
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
	
	/* it('Payroll for december',function(){
		cy.visit('http://next.pockethrms.com/payroll/transaction/monthlyinput')	
		cy.wait(2000)
		
		cy.get('#categoryId').select(Employeecatagorytype,{force: true})
		cy.get('#inputMonth').select('December',{force: true})
		cy.get('#year').clear()
		cy.get('#year').type('2019')
		cy.wait(1000)
		cy.get('[value="View"]').click({force: true})
		
		cy.wait(2000)
		cy.get('.theme_dataTable > .table').find('tr').then(listing => {
			var monthlyinputcount = Cypress.$(listing).length;
			//cy.log("i: "+monthlyinputcount)
			if(monthlyinputcount==1)
			{
				cy.get('[value="Edit"]').click({force: true})
				
			}
		})
		
		
		cy.wait(2000)
		cy.get('.theme_dataTable > .table').find('tr').each(function(row, i){
				if(i!=0){
				//console.log(i)
				var num1 = parseFloat(i)
				 cy.get('.theme_dataTable > .table > tbody > tr:nth-child('+num1+') > .th').invoke('text').then((text) => {
					cy.log(text.trim())
					if(text.trim()=='cy01'){					
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
		cy.visit('http://next.pockethrms.com/payroll/transaction/payrollprocessing')
		
		cy.wait(2000)
		cy.contains('button', 'All Employees').click({force: true})
		cy.get('#month').select('December',{force: true})
		cy.get('#year').clear()
		cy.get('#year').type('2019')
		cy.get('#processPayroll').click({force: true})
		
		cy.wait(6000)	
		cy.get("#succMsg").invoke('text').then((text) => {
			cy.log(text.trim())
		})
		
		
	}) */
	it('Search Specific Emp code you want to Increemnt', function() {
		cy.wait(3000)
		cy.get('#globalSearch').type(employeeId)
		cy.wait(3000)
		cy.get('#finalSearchResult > div > div > ul > li:nth-child(2)').eq(0).click({force: true})
		cy.get('#basicTab').click({force:true})
		cy.wait(3000)
		cy.get('select[id=CATEGORY]').then($input => {
				 Employeecatagorytype=  $input.val();		 
				 cy.log(Employeecatagorytype);
		})
		
	})
/*	it('save monthlyinput for specific Emp', function() {
		cy.visit('http://next.pockethrms.com/payroll/transaction/monthlyinput')	
		cy.wait(2000)
		
		cy.get('#categoryId').select(Employeecatagorytype,{force: true})
		cy.get('#inputMonth').select('February',{force: true})
		cy.wait(1000)
		cy.get('[value="View"]').click({force: true})
		
		cy.wait(2000)
		cy.get('.theme_dataTable > .table').find('tr').then(listing => {
			var monthlyinputcount = Cypress.$(listing).length;
			//cy.log("i: "+monthlyinputcount)
			if(monthlyinputcount==1)
			{
				cy.get('[value="Edit"]').click({force: true})
				
			}
		})
		
		cy.wait(2000)
		cy.get('.theme_dataTable > .table').find('tr').each(function(row, i){
				if(i!=0){
				//console.log(i)
				var num1 = parseFloat(i)
				 cy.get('.theme_dataTable > .table > tbody > tr:nth-child('+num1+') > .th').invoke('text').then((text) => {
					cy.log(text.trim())
					if(text.trim()=='cy02'){					
						
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
		
	}) */
	/*it('Delete payroll for increment apply month',function(){     //feb month
		
		cy.get('#globalSearch').type(employeeId)
		cy.wait(3000)
		cy.get('#finalSearchResult > div > div > ul > li:nth-child(2)').eq(0).click({force: true})
		
		cy.xpath("//a[@id='payroll_detail_tab']").click({force: true})
		cy.wait(1000)
		cy.get('#payrollProcesstab').click({force: true})
		cy.wait(1000)
		
		cy.get('#btnProcess').click({force: true})
		cy.wait(2500)
		cy.get(".toast-message").invoke('text').then((text) => {
		cy.log(text.trim())
		cy.get('#btnProcessDelete').click({force: true})
		cy.wait(1000)
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())
				expect(text.trim()).equal('Payroll Process Deleted Successfully')
		})
		cy.wait(1000)
		cy.get(".toast-message").click({force: true})
		
		
	}) */
	
	
	it('Apply increament for February month', function() {
		Cypress.config('responseTimeout', 40000);
		cy.server()
		cy.route('GET', '*').as('getComment')
		cy.route('POST', '*').as('postComment')
		
		cy.get('#payroll_detail_tab').click({force: true})
		//cy.wait(1000)
		
		cy.waitUntil(() => cy.server().should((server) => {expect(server.method).to.eq('GET')}))
		cy.waitUntil(() => cy.server().should((server) => {expect(server.status).to.eq(200)}))
		
		cy.get('@getComment')
		.should((xhr) => {
		expect(xhr.url).to.match('/Payroll/Transaction/loadIncrementArrear')
		})
	
	
	
		cy.waitUntil(() => cy.server().should((server) => {expect(server.body.url).to.eq('/Payroll/Transaction/loadIncrementArrear')}))
		//cy.waitUntil(() => cy.server().Request.should('contain', '/Payroll/Transaction/loadIncrementArrear'))
		
		
		//cy.wait('@getComment').its('status').should('eq', 200)
		
		//cy.wait('@postComment')
		
		cy.get('#incrementtab').click({force: true})
		
		cy.waitUntil(() => cy.server().should((server) => {expect(server.method).to.eq('GET')}))
		cy.waitUntil(() => cy.server().should((server) => {expect(server.status).to.eq(200)}))
		//cy.wait(3000)
		//cy.wait('@getComment').its('status').should('eq', 200)
		//cy.wait('@postComment')
		
		cy.xpath("//div[@id='payrollContentTitle']//i[@class='fas fa-plus']").click({force:true})
		
		cy.waitUntil(() => cy.server().should((server) => {expect(server.method).to.eq('GET')}))
		cy.waitUntil(() => cy.server().should((server) => {expect(server.status).to.eq(200)}))
		
		cy.get('#drpMonth').select('February',{force: true})
		
		cy.waitUntil(() => cy.server().should((server) => {expect(server.method).to.eq('GET')}))
		cy.waitUntil(() => cy.server().should((server) => {expect(server.status).to.eq(200)}))
		//cy.wait(1000)
		//cy.wait('@getComment').its('status').should('eq', 200)
		//cy.wait('@postComment')
		
		cy.get('#txtDate').click().then(input => {
		    input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val('01/02/2020')
	    })
		
		cy.waitUntil(() => cy.server().should((server) => {expect(server.method).to.eq('GET')}))
		cy.waitUntil(() => cy.server().should((server) => {expect(server.status).to.eq(200)}))
		//cy.wait(1000)
		//cy.wait('@getComment').its('status').should('eq', 200)
		//cy.wait('@postComment')
		
		cy.get('[onclick="proceedIncrement()"]').click({force: true}) 
		

		cy.get('#btnSave').then($button => {
			cy.log($button.is(':visible'))
	if ($button.is(':visible')){

	cy.log("Save Button is not Visible")
		
		}
		else
		{
			//Increment Saved Successfully.
		cy.get(".toast-message").invoke('text').then((text) => {
		
			cy.log(text.trim())
			if(text.trim()=='Payroll already done')	
			{
				cy.xpath("//a[@id='payroll_detail_tab']").click({force: true})
				
				
				cy.waitUntil(() => cy.server().should((server) => {expect(server.method).to.eq('GET')}))
				cy.waitUntil(() => cy.server().should((server) => {expect(server.status).to.eq(200)}))
				//cy.wait(1000)
				//cy.wait('@getComment').its('status').should('eq', 200)
				//cy.wait('@postComment')
		
				cy.get(".toast-message").click({force: true})
				cy.get('#payrollProcesstab').click({force: true})
				cy.get('#btnProcessDelete').click({force: true})
				cy.get(".toast-message").invoke('text').then((text) => {
				expect(text.trim()).equal('Payroll Process Deleted Successfully')
				cy.log(text.trim())
				})
				
				
				
				//cy.wait(10000)
				//cy.get(".toast-message").click({force: true})
				cy.reload()
				
				cy.waitUntil(() => cy.server().should((server) => {expect(server.method).to.eq('GET')}))
				cy.waitUntil(() => cy.server().should((server) => {expect(server.status).to.eq(200)}))
				//cy.wait(10000)
				//cy.wait('@getComment').its('status').should('eq', 200)
				//cy.wait('@postComment')
				
				cy.get('#payroll_detail_tab').click({force: true})
				
				cy.waitUntil(() => cy.server().should((server) => {expect(server.method).to.eq('GET')}))
				cy.waitUntil(() => cy.server().should((server) => {expect(server.status).to.eq(200)}))
				//cy.wait(10000)
				//cy.wait('@getComment').its('status').should('eq', 200)
				//cy.wait('@postComment')
		
				cy.get('#incrementtab').click({force: true})
				
				cy.waitUntil(() => cy.server().should((server) => {expect(server.method).to.eq('GET')}))
				cy.waitUntil(() => cy.server().should((server) => {expect(server.status).to.eq(200)}))
				//cy.wait(10000)
				//cy.wait('@getComment').its('status').should('eq', 200)
				//cy.wait('@postComment')
				
				cy.xpath("//div[@id='payrollContentTitle']//i[@class='fas fa-plus']").click({force:true})
				
				cy.waitUntil(() => cy.server().should((server) => {expect(server.method).to.eq('GET')}))
				cy.waitUntil(() => cy.server().should((server) => {expect(server.status).to.eq(200)}))
				//cy.wait(10000)
				//cy.wait('@getComment').its('status').should('eq', 200)
				//cy.wait('@postComment')
				
				//cy.get('a[onclick="addIncrement()"]').eq(0).click({force:true})
				cy.get('#drpMonth').select('February',{force: true})
				
				cy.waitUntil(() => cy.server().should((server) => {expect(server.method).to.eq('GET')}))
				cy.waitUntil(() => cy.server().should((server) => {expect(server.status).to.eq(200)}))
				//cy.wait(10000)
				//cy.wait('@getComment').its('status').should('eq', 200)
				//cy.wait('@postComment')
				
				cy.get('#txtDate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val('01/02/2020')
				})
		
				cy.waitUntil(() => cy.server().should((server) => {expect(server.method).to.eq('GET')}))
				cy.waitUntil(() => cy.server().should((server) => {expect(server.status).to.eq(200)}))
				//cy.wait(10000)
				//cy.wait('@getComment').its('status').should('eq', 200)
				//cy.wait('@postComment')
				
				
				cy.get('[onclick="proceedIncrement()"]').click({force: true}) 
			
			}
		})
			
	
		}
		
		})
		
		
		cy.get('#Inctdtr1').click({force: true})
		cy.get('#Inctdtr1').clear()
		cy.get('#Inctdtr1').type('40000')
		
		cy.get('#Inctdtr2').click({force: true})
		cy.get('#Inctdtr2').clear()
		cy.get('#Inctdtr2').type('10000')
		
		cy.get('#Inctdtr3').click({force: true})
		cy.get('#Inctdtr3').clear()
		cy.get('#Inctdtr3').type('1500')
		
		cy.waitUntil(() => cy.server().should((server) => {expect(server.method).to.eq('GET')}))
		cy.waitUntil(() => cy.server().should((server) => {expect(server.status).to.eq(200)}))
				//cy.wait(10000)
				//cy.wait('@getComment').its('status').should('eq', 200)
				//cy.wait('@postComment')
				
		
		cy.get('#btnSave').click({force: true})
		
		cy.waitUntil(() => cy.server().should((server) => {expect(server.method).to.eq('GET')}))
		cy.waitUntil(() => cy.server().should((server) => {expect(server.status).to.eq(200)}))
				//cy.wait(10000)
				//cy.wait('@getComment').its('status').should('eq', 200)
				//cy.wait('@postComment')
		
		cy.get(".toast-message").invoke('text').then((text) => {
			expect(text.trim()).equal('Increment Saved Successfully.')
			cy.log(text.trim())
		})
		cy.get(".toast-message").click({force: true})
		
	})	

	
	
	it('Payroll process for February month', function() {
	
		cy.xpath("//a[@id='payroll_detail_tab']").click({force: true})
		cy.wait(1000)
		cy.get('#payrollProcesstab').click({force: true})
		cy.wait(1000)
		//cy.wait(1000)	
		//cy.get("select[id='month']").select('February',{force: true})	
		
		cy.get("select[id='month']").then($input => {
                                 PayrollProcessMonth=  $input.val();
                                 
                                 cy.log("PayrollProcessMonth: "+PayrollProcessMonth);
                        })	
			
				
		cy.get('#btnProcess').click({force: true})
		cy.wait(5000)
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
			})*/
			
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


	it('Check salary slip for payroll processed month', function() {
		
		cy.get('#salary_detail_tab').click({force: true})
		cy.wait(2000)
		//click on salary slip tab
		cy.xpath('//*[@id="salary_detail"]/div/div[1]/ul/li[3]').click({force: true})
		
		cy.wait(2000)
		cy.get('#drpfromMonth').select('February',{force: true})
		cy.get('[onclick="GetSalaryData()"]').click({force: true})
		cy.wait(3000)
		
		cy.get('#tblEarn').contains('td', '40000.00').should('be.visible');
		cy.get('#tblEarn').contains('td', '10000.00').should('be.visible');
		cy.get('#tblEarn').contains('td', '1500.00').should('be.visible');
	})
	
	
	it('Check increament with LOP days', function() { // To check Salary slip with earning details and monthly input LOP days.
		
	})
	it('sd', function() {
		
	})
})
	
	
	