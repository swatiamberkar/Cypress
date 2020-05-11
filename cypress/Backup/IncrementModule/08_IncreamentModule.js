describe('Increment Module', function() {
	var compnaylength;
	var employeeId = 'CY2'
	var Employeecatagorytype=''
	var EmpLengthInMonthlyInput=''
	var company='Test_23';
	
	beforeEach(function(){
        window.console.log('Enter the beforeEach function')
		Cypress.on('uncaught:exception', (err,runnable) => {
			return false;
		});
        Cypress.Cookies.preserveOnce('.AspNetCore.Antiforgery.w5W7x28NAIs','.AspNetCore.Session','1P_JAR','ARRAffinity','FavouriteMenus','XCategory','XCompanyId','XName','XSchemaName','XUserId','XUserName','_ga','_gcl_au','_gid','ai_session','ai_user','new_username')
		cy.wait(2000)
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
	
	/*
	it('Change Company', function() {
		cy.wait(4000)
		cy.visit('http://next.pockethrms.com/identity/Home/Index')
		cy.wait(2000)
		cy.get('[onclick="changeCompanyModal()"]').click({force: true})
		cy.wait(1000)
		cy.get('.radio-primary').find('label').then(listing => {
			compnaylength = Cypress.$(listing).length;
			cy.xpath('//*[@id="modalCompany"]/div/div/div[2]/div['+compnaylength+']/label').click({force: true})
		});		
		cy.wait(1000)
		cy.get('[onclick="changeCompany()"]').click({force: true})		 			
	})
*/

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
	
	
	
it('Search Specific Emp code you want to Increemnt', function() {
		cy.wait(4000)
		cy.get('#globalSearch').type(employeeId)
		cy.wait(4000)
		cy.contains('li', 'Increment test(CY2)').click({force: true})
		cy.get('#basicTab').click({force:true})
		cy.wait(3000)
		cy.get('select[id=CATEGORY]').then($input => {
				 Employeecatagorytype=  $input.val();		 
				 cy.log(Employeecatagorytype);
		})
		
	})

it('check last payroll process', function() {
		cy.visit('http://next.pockethrms.com/payroll/transaction/monthlyinput')	
		cy.wait(2000)
		
		cy.get('#categoryId').select(Employeecatagorytype,{force: true})
		cy.get('#inputMonth').select('January',{force: true})
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
		
		cy.wait(4000)
		cy.get('.theme_dataTable > .table').find('tr').each(function(row, i){
				if(i!=0){
				//console.log(i)
				var num1 = parseFloat(i)
				 cy.get('.theme_dataTable > .table > tbody > tr:nth-child('+num1+') > .th').invoke('text').then((text) => {
					cy.log(text.trim())
					if(text.trim()==employeeId){
								cy.get('.table > tbody > tr:nth-child(2) > td:nth-child(4)').find('input').then(listing => {
											var Input = Cypress.$(listing).length;
											if(Input==2){
												cy.visit('http://next.pockethrms.com/payroll/transaction/payrollprocessing')
												cy.wait(2000)
												cy.contains('button', 'All Employees').click({force: true})
												cy.get('#month').select('January',{force: true})
												cy.get('#deletePayroll').click({force: true})
												cy.wait(6000)	
												cy.get("#errMsg").invoke('text').then((text) => {
													cy.log(text.trim())
												})
											}
                                 })
					}
				})
			
			}
		})
			
		
		
	})	

it('save multiple monthlyinput for specific Emp', function() {
		var monthlyInput='January'
		cy.visit('http://next.pockethrms.com/payroll/transaction/monthlyinput')	
		cy.wait(2000)
		
		cy.get('#categoryId').select(Employeecatagorytype,{force: true})
		cy.get('#inputMonth').select(monthlyInput,{force: true})
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
					if(text.trim()==employeeId){					
						cy.get('.table > tbody > tr:nth-child('+num1+') > td:nth-child(3) > .form-control').click()
						cy.get('.table > tbody > tr:nth-child('+num1+') > td:nth-child(3) > .form-control').clear()
						cy.get('.table > tbody > tr:nth-child('+num1+') > td:nth-child(3) > .form-control').type('5')
						  
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
		cy.get(".toast-message").click({force: true})
		
		
		
		
		
		
		
		
		
		
		
	}) 	
it('Payroll process for multiple monthly input', function() {
		var PayrollProcessMonth='January';
		cy.server()
		cy.wait(200)
		cy.route('POST', 'http://next.pockethrms.com/Payroll/Transaction/PayrollProcessing?prcButton=Process&json=1').as('postComment')
		cy.get('#globalSearch').type(employeeId)
		cy.wait(4000)
		cy.contains('li', 'Increment test(CY2)').click({force: true})
		cy.wait(5000)
		cy.xpath("//a[@id='payroll_detail_tab']").click({force: true})
		cy.wait(1000)
		cy.get('#payrollProcesstab').click({force: true})
		cy.wait(4000)	
		cy.get("select[id='month']").select(PayrollProcessMonth,{force: true})	
		
		
			
		cy.get('#btnProcess').click({force: true})
		cy.wait('@postComment').its('status').should('eq', 200)
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
		cy.wait('@postComment').its('status').should('eq', 200)
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
			
			cy.reload()
			cy.wait(3000)
			cy.get('#globalSearch').type(employeeId)
			cy.wait(4000)
			cy.contains('li', 'Increment Test(CY2)').click({force: true})
			cy.wait(4000)
			cy.xpath("//a[@id='payroll_detail_tab']").click({force: true})
			cy.wait(1000)
			cy.get('#payrollProcesstab').click({force: true})
			cy.wait(1000)
			cy.get("select[id='month']").select(PayrollProcessMonth,{force: true})	
			cy.get('#btnProcess').click({force: true})
			cy.wait('@postComment').its('status').should('eq', 200)
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
			cy.wait('@postComment').its('status').should('eq', 200)
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
		cy.wait('@postComment').its('status').should('eq', 200)
		cy.get(".toast-message").invoke('text').then((text) => {
		cy.log(text.trim())
		expect(text.trim()).equal('Payroll Process Completed Successfully')
		})
	}
		else{
				expect(text.trim()).equal('Payroll Process Completed Successfully')
		}
	
		})
	
	//Salary Summary reports
	cy.wait(2000)
	cy.visit('http://next.pockethrms.com/Reports/Report/index')
	cy.wait(2000)
	cy.get('#payroll_detail_tab').click({force: true})
	cy.wait(2000)
	cy.xpath('//*[@id="payroll_detail"]/div/div[1]/div/div/div/div/ul/li[1]/label/span').click({force: true})
	cy.wait(3000)
	cy.get('#drpfromMonth').select('1')
	cy.get('#drptoMonth').select('1')
	cy.get('#CategoryId').select(Employeecatagorytype,{force: true})
	cy.wait(100)
	
	   cy.get('#select2-multiEmp-container').click({force: true})
		cy.wait(2000)
		cy.get('input[type="search"]').click({force: true})
		cy.get('input[type="search"]').type('CY2')
		cy.wait(2000)
		cy.get('.select2-results__option--highlighted').click({force: true})
	
	cy.get('#btnview').click({force: true})
	cy.wait(2000)
	cy.get('#tblbody').find('tr').then(listing => {
			var Input = Cypress.$(listing).length;
			cy.log("Input: "+Input)
			expect(Input).equal(1)
			
    })
})	

	
it('save monthlyinput for(Feb) specific Emp', function() {
		var monthlyInput='February'
		cy.visit('http://next.pockethrms.com/payroll/transaction/monthlyinput')	
		cy.wait(2000)
		
		cy.get('#categoryId').select(Employeecatagorytype,{force: true})
		cy.get('#inputMonth').select(monthlyInput,{force: true})
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
					if(text.trim()==employeeId){					
						
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
		cy.get(".toast-message").click({force: true})
	}) 
it('Apply increment for February month', function() {
		cy.wait(4000)
		cy.get('#globalSearch').type(employeeId)
		cy.wait(4000)
		cy.contains('li', 'Increment test(CY2)').click({force: true})
		cy.wait(3000)
		cy.get('#payroll_detail_tab').click({force: true})
		cy.wait(1000)
		cy.get('#incrementtab').click({force: true})
		cy.wait(3000)
		cy.xpath("//div[@id='payrollContentTitle']//i[@class='fas fa-plus']").click({force:true})
		cy.wait(3000)
		cy.get('#drpMonth').select('February',{force: true})
		cy.wait(1000)
		cy.get('#txtDate').click({force: true}).then(input => {
		    input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val('01/02/2020')
	    })
		cy.wait(1000)
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
				cy.wait(1000)
				cy.get('.modal-lg > .modal-content > .modal-header > .close > span:nth-child(1)').click({force: true})
				cy.wait(2000)
				cy.xpath("//a[@id='payroll_detail_tab']").click({force: true})
				cy.wait(1000)
				cy.get(".toast-message").click({force: true})
				cy.get('#payrollProcesstab').click({force: true})
				cy.get('#btnProcessDelete').click({force: true})
				cy.get(".toast-message").invoke('text').then((text) => {
				expect(text.trim()).equal('Payroll Process Deleted Successfully')
				cy.log(text.trim())
				})
				cy.wait(10000)
				//cy.get(".toast-message").click({force: true})
				cy.reload()
				cy.wait(10000)
				cy.get('#payroll_detail_tab').click({force: true})
				cy.wait(20000)
		
				cy.get('#incrementtab').click({force: true})
				cy.wait(10000)
				cy.xpath("//div[@id='payrollContentTitle']//i[@class='fas fa-plus']").click({force:true})
				cy.wait(10000)
				//cy.get('a[onclick="addIncrement()"]').eq(0).click({force:true})
				cy.get('#drpMonth').select('February',{force: true})
				cy.wait(1000)
				cy.get('#txtDate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val('01/02/2020')
				})
				cy.wait(1000)
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
		
		cy.wait(1000)
		cy.get('#btnSave').click({force: true})
		cy.wait(700)
		cy.get(".toast-message").invoke('text').then((text) => {
			expect(text.trim()).equal('Increment Saved Successfully.')
			cy.log(text.trim())
		})
		cy.get(".toast-message").click({force: true})
		
	})	

it('Payroll process for february  month', function() {
		var PayrollProcessMonth='February';
		cy.server()      
		cy.route('POST', 'http://next.pockethrms.com/Payroll/Transaction/PayrollProcessing?prcButton=Process&json=1').as('postComment')
		cy.get('#globalSearch').type(employeeId)
		cy.wait(5000)
		cy.xpath('//*[@id="finalSearchResult"]/div/div/ul/li[2]').click({force: true})
		cy.wait(5000)
		cy.xpath("//a[@id='payroll_detail_tab']").click({force: true})
		cy.wait(1000)
		cy.get('#payrollProcesstab').click({force: true})
		cy.wait(1000)
		cy.wait(1000)	
		cy.get("select[id='month']").select(PayrollProcessMonth,{force: true})	
		
		
			
		cy.get('#btnProcess').click({force: true})
		cy.wait('@postComment').its('status').should('eq', 200)
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
		cy.wait('@postComment').its('status').should('eq', 200)
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
			
			cy.reload()
			cy.wait(2000)
		cy.get('#globalSearch').type(employeeId)
		cy.wait(4000)
		cy.contains('li', 'Increment Test(CY2)').click({force: true})
		cy.wait(5000)
		
		
		
		cy.xpath("//a[@id='payroll_detail_tab']").click({force: true})
		cy.wait(1000)
		
		cy.get('#payrollProcesstab').click({force: true})
		
		
		cy.wait(1000)
		cy.get("select[id='month']").select(PayrollProcessMonth,{force: true})	
		cy.get('#btnProcess').click({force: true})
		cy.wait('@postComment').its('status').should('eq', 200)
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
		cy.wait('@postComment').its('status').should('eq', 200)
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
		cy.wait('@postComment').its('status').should('eq', 200)
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
			var PayrollProcessMonth='February'
			cy.get('#salary_detail_tab').click({force: true})
			cy.wait(2000)
			//click on salary slip tab
			cy.xpath('//*[@id="salary_detail"]/div/div[1]/ul/li[3]').click({force: true})
			
			cy.wait(2000)
			cy.get('#drpfromMonth').select(PayrollProcessMonth,{force: true})
			cy.get('[onclick="GetSalaryData()"]').click({force: true})
			cy.wait(3000)
			
			cy.get('#tblEarn').contains('td', '40000.00').should('be.visible');
			cy.get('#tblEarn').contains('td', '10000.00').should('be.visible');
			cy.get('#tblEarn').contains('td', '1500.00').should('be.visible');
		})
	
	

	
it('save monthlyinput for march month specific Emp', function() {
		cy.visit('http://next.pockethrms.com/payroll/transaction/monthlyinput')	
		cy.wait(2000)
		
		cy.get('#categoryId').select(Employeecatagorytype,{force: true})
		cy.get('#inputMonth').select('March',{force: true})
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
					if(text.trim()==employeeId){				
						cy.get('.table > tbody > tr:nth-child('+num1+') > td:nth-child(4) > .form-control').click()	
						cy.get('.table > tbody > tr:nth-child('+num1+') > td:nth-child(4) > .form-control').clear()	
						cy.get('.table > tbody > tr:nth-child('+num1+') > td:nth-child(4) > .form-control').type('3')
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
	
it('Check increament with LOP days', function() { // To check Salary slip with earning details and monthly input LOP days.
		cy.get('#globalSearch').type(employeeId)
		cy.wait(4000)
		cy.xpath('//*[@id="finalSearchResult"]/div/div/ul/li[2]').click({force: true})
		cy.wait(4000)
		cy.get('#payroll_detail_tab').click({force: true})
		cy.wait(1000)
		cy.get('#incrementtab').click({force: true})
		cy.wait(3000)
		cy.xpath("//div[@id='payrollContentTitle']//i[@class='fas fa-plus']").click({force:true})
		cy.get('#drpMonth').select('March',{force: true})
		cy.wait(1000)
		cy.get('#txtDate').click().then(input => {
		    input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val('01/03/2020')
	    })
		
		cy.wait(1000)
		cy.get('[onclick="proceedIncrement()"]').click({force: true}) 
		
		cy.get('#btnSave').then($button => {
			cy.log($button.is(':visible'))
		if ($button.is(':visible')){
		cy.log("Save Button is not Visible")
		}
		else
		{
			cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())
			if(text.trim()=='Payroll already done')	
			{
				cy.xpath("//a[@id='payroll_detail_tab']").click({force: true})
				cy.wait(1000)
				cy.get(".toast-message").click({force: true})
				cy.get('#payrollProcesstab').click({force: true})
				cy.get('#month').select('March',{force: true})
				cy.get('#btnProcessDelete').click({force: true})
				cy.get(".toast-message").invoke('text').then((text) => {
				expect(text.trim()).equal('Payroll Process Deleted Successfully')
				cy.log(text.trim())
				})
				cy.wait(10000)
				//cy.get(".toast-message").click({force: true})
				cy.reload()
				cy.wait(10000)
				cy.get('#payroll_detail_tab').click({force: true})
				cy.wait(20000)
		
				cy.get('#incrementtab').click({force: true})
				cy.wait(10000)
				cy.xpath("//div[@id='payrollContentTitle']//i[@class='fas fa-plus']").click({force:true})
				cy.wait(10000)
				//cy.get('a[onclick="addIncrement()"]').eq(0).click({force:true})
				cy.get('#drpMonth').select('March',{force: true})
				cy.wait(1000)
				cy.get('#txtDate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val('01/02/2020')
				})
				cy.wait(1000)
				cy.get('[onclick="proceedIncrement()"]').click({force: true}) 
			
			}
		})	
	}
	})
		cy.get('#txtBefore').click({force: true})
		cy.get('#txtBefore').clear()
		cy.get('#txtBefore').type('0')
		
		cy.get('#txtAfter').click({force: true})
		cy.get('#txtAfter').clear()
		cy.get('#txtAfter').type('3')
		
		cy.get('#Inctdtr1').click({force: true})
		cy.get('#Inctdtr1').clear()
		cy.get('#Inctdtr1').type('50000')
		
		cy.get('#Inctdtr2').click({force: true})
		cy.get('#Inctdtr2').clear()
		cy.get('#Inctdtr2').type('10000')
		
		cy.get('#Inctdtr3').click({force: true})
		cy.get('#Inctdtr3').clear()
		cy.get('#Inctdtr3').type('1500')
		cy.get('#btnSave').click({force: true})
		cy.get(".toast-message").invoke('text').then((text) => {
			expect(text.trim()).equal('Increment Saved Successfully.')
			cy.log(text.trim())
		})
		cy.get(".toast-message").click({force: true})
		
}) 

it('Payroll process for march  month', function() {
		var PayrollProcessMonth='March';
		cy.server()      
		cy.wait(2000)
		cy.route('POST', 'http://next.pockethrms.com/Payroll/Transaction/PayrollProcessing?prcButton=Process&json=1').as('postComment')
			cy.get('#globalSearch').type(employeeId)
			cy.wait(4000)
			cy.xpath('//*[@id="finalSearchResult"]/div/div/ul/li[2]').click({force: true})
			cy.wait(5000)
			cy.xpath("//a[@id='payroll_detail_tab']").click({force: true})
			cy.wait(2000)
			cy.get('#payrollProcesstab').click({force: true})
			cy.wait(1000)
			cy.wait(1000)	
			cy.get("select[id='month']").select(PayrollProcessMonth,{force: true})	
			
			cy.get('#btnProcess').click({force: true})
			cy.wait('@postComment').its('status').should('eq', 200)
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
			cy.wait('@postComment').its('status').should('eq', 200)
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
			
			cy.reload()
			cy.wait(2000)
			cy.get('#globalSearch').type(employeeId)
			cy.wait(4000)
			cy.contains('li', 'Increment Test(CY2)').click({force: true})
			cy.wait(5000)
			
			cy.xpath("//a[@id='payroll_detail_tab']").click({force: true})
			cy.wait(1000)
			
			cy.get('#payrollProcesstab').click({force: true})
			cy.wait(1000)
			cy.get("select[id='month']").select(PayrollProcessMonth,{force: true})	
			
			cy.get('#btnProcess').click({force: true})
			cy.wait('@postComment').its('status').should('eq', 200)
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
			cy.wait('@postComment').its('status').should('eq', 200)
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
it('Check salary slip for LOP days payroll processed month', function() {
		
		cy.get('#salary_detail_tab').click({force: true})
		cy.wait(2000)
		cy.get('#salSliptab').click({force: true})
		
		cy.wait(2000)
		cy.get('#drpfromMonth').select('March',{force: true})
		cy.get('[onclick="GetSalaryData()"]').click({force: true})
		cy.wait(3000)
		cy.get('#tblEarn').contains('td','3').should('be.visible');
		cy.get('#tblEarn').contains('td', '50000.00').should('be.visible');
		cy.get('#tblEarn').contains('td', '10000.00').should('be.visible');
		cy.get('#tblEarn').contains('td', '1500.00').should('be.visible');
	})
	
it('Save Monthly input for april month',function()
	{
		cy.visit('http://next.pockethrms.com/payroll/transaction/monthlyinput')	
		cy.wait(2000)
		
		cy.get('#categoryId').select(Employeecatagorytype,{force: true})
		cy.get('#inputMonth').select('April',{force: true})
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
		cy.get(".toast-message").click({force: true})
}) 

    
	
it('Loan Entry', function() {
		cy.get('#globalSearch').type(employeeId)
		cy.wait(4000)
		cy.xpath('//*[@id="finalSearchResult"]/div/div/ul/li[2]').click({force: true})
		cy.wait(4000)
		cy.get('#payroll_detail_tab').click({force: true})
		cy.wait(3000)
		cy.get('#loantab').click({force: true})
		cy.wait(3000)
		cy.get('[onclick="addNewLoanEntry()"]').eq(0).click({force: true})
		cy.wait(1000)
		cy.get('#txtloanType').select('CL',{force:true})
		cy.wait(1000)
		cy.get('#LoanDate').click({force:true}).then(input => {
		    input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val('01/04/2020')
	   })
	   
	   
		cy.get('select[name=ApplyMonth]').select('April')
		
		cy.get('input[name=ApplyYear]').click({force: true})
		cy.get('input[name=ApplyYear]').clear()
		cy.get('input[name=ApplyYear]').type('2020')
		cy.get('input[name=LoanAmount]').click({force: true})
		cy.get('input[name=LoanAmount]').clear()
		cy.get('input[name=LoanAmount]').type('15000')
		cy.get('input[name=NoOfMonths]').type(3)
		cy.wait(1000)
		cy.get('#txtRemarks').click({force: true})
		cy.get('#txtRemarks').type('Car loan entry')
		cy.wait(2000)
		cy.get('#txtAmtPerMonth').then($input => {
			expect($input.val()).to.contain('5000')
		})
		cy.wait(1000)
		cy.get('[onclick="return validate()"]').click({force: true})
		cy.wait(2000)
		cy.get(".toast-message").invoke('text').then((text) => {
				cy.log(text.trim())
		})
		cy.get(".toast-message").click({force:true})
	})
	
it('Check increment with Loan Entry.', function() {
		cy.get('#globalSearch').type(employeeId)
		cy.wait(4000)
		cy.xpath('//*[@id="finalSearchResult"]/div/div/ul/li[2]').click({force: true})
        cy.wait(3000)		
		cy.get('#payroll_detail_tab').click({force: true})
		cy.wait(1000)
		cy.get('#incrementtab').click({force: true})
		cy.wait(3000)
		cy.xpath("//div[@id='payrollContentTitle']//i[@class='fas fa-plus']").click({force:true})
		cy.get('#drpMonth').select('April',{force: true})
		cy.wait(1000)
		cy.get('#txtDate').click({force:true}).then(input => {
		    input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val('01/04/2020')
	    })
			cy.wait(1000)
			cy.get('[onclick="proceedIncrement()"]').click({force: true}) 
			cy.get('#btnSave').then($button => {
			cy.log($button.is(':visible'))
			if ($button.is(':visible'))
			{
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
				cy.wait(1000)
				cy.get(".toast-message").click({force: true})
				cy.get('#payrollProcesstab').click({force: true})
				cy.get('#btnProcessDelete').click({force: true})
				cy.get(".toast-message").invoke('text').then((text) => {
				expect(text.trim()).equal('Payroll Process Deleted Successfully')
				cy.log(text.trim())
			})
				cy.wait(10000)
				//cy.get(".toast-message").click({force: true})
				cy.reload()
				cy.wait(10000)
				cy.get('#payroll_detail_tab').click({force: true})
				cy.wait(20000)
		
				cy.get('#incrementtab').click({force: true})
				cy.wait(10000)
				cy.xpath("//div[@id='payrollContentTitle']//i[@class='fas fa-plus']").click({force:true})
				cy.wait(10000)
				//cy.get('a[onclick="addIncrement()"]').eq(0).click({force:true})
				cy.get('#drpMonth').select('February',{force: true})
				cy.wait(1000)
				cy.get('#txtDate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val('01/02/2020')
				})
				cy.wait(1000)
				cy.get('[onclick="proceedIncrement()"]').click({force: true}) 
			
			}
		})

	}
		
	})
		cy.get('#Inctdtr1').click({force: true})
		cy.get('#Inctdtr1').clear()
		cy.get('#Inctdtr1').type('55000')
		
		cy.get('#Inctdtr2').click({force: true})
		cy.get('#Inctdtr2').clear()
		cy.get('#Inctdtr2').type('10000')
		
		cy.get('#Inctdtr3').click({force: true})
		cy.get('#Inctdtr3').clear()
		cy.get('#Inctdtr3').type('1500')
		
		cy.wait(1000)
		cy.get('#btnSave').click({force: true})
		cy.wait(700)
		cy.get(".toast-message").invoke('text').then((text) => {
			expect(text.trim()).equal('Increment Saved Successfully.')
			cy.log(text.trim())
		})
		cy.get(".toast-message").click({force: true})	
	})
	
it('Payroll process for april month', function() {
		var PayrollProcessMonth='April';
		cy.server()      
		cy.route('POST', 'http://next.pockethrms.com/Payroll/Transaction/PayrollProcessing?prcButton=Process&json=1').as('postComment')
		cy.get('#globalSearch').type(employeeId)
		cy.wait(4000)
		cy.xpath('//*[@id="finalSearchResult"]/div/div/ul/li[2]').click({force: true})
		cy.wait(5000)
		cy.xpath("//a[@id='payroll_detail_tab']").click({force: true})
		cy.wait(1000)
		cy.get('#payrollProcesstab').click({force: true})
		cy.wait(1000)
		cy.wait(1000)	
		cy.get("select[id='month']").select(PayrollProcessMonth,{force: true})	
		
		cy.get('#btnProcess').click({force: true})
		cy.wait('@postComment').its('status').should('eq', 200)
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
		cy.wait('@postComment').its('status').should('eq', 200)
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
			
			cy.reload()
			cy.wait(4000)
		cy.get('#globalSearch').type(employeeId)
		cy.wait(4000)
		cy.contains('li', 'Increment Test(CY2)').click({force: true})
		cy.wait(5000)
		cy.xpath("//a[@id='payroll_detail_tab']").click({force: true})
		cy.wait(2000)
		cy.get('#payrollProcesstab').click({force: true})
		cy.wait(1000)
		cy.get("select[id='month']").select(PayrollProcessMonth,{force: true})	
		cy.get('#btnProcess').click({force: true})
		cy.wait('@postComment').its('status').should('eq', 200)
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
		cy.wait('@postComment').its('status').should('eq', 200)
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
		cy.wait('@postComment').its('status').should('eq', 200)
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

it('Check salary slip for Loan entry payroll processed month', function() {
		
		cy.get('#salary_detail_tab').click({force: true})
		cy.wait(2000)
		cy.get('#salSliptab').click({force: true})
		cy.wait(2000)
		cy.get('#drpfromMonth').select('April',{force: true})
		cy.get('[onclick="GetSalaryData()"]').click({force: true})
		cy.wait(3000)
		cy.get('#tblEarn').contains('td','3').should('be.visible');
		cy.get('#tblEarn').contains('td', '55000.00').should('be.visible');
		cy.get('#tblEarn').contains('td', '10000.00').should('be.visible');
		cy.get('#tblEarn').contains('td', '1500.00').should('be.visible');
		cy.get('#tblDed').contains('td','5000.00').should('be.visible')
	})


it('User Logout', function() {
		cy.wait(1000)
		cy.get('[role="button"]').eq(3).click({force: true})
		cy.wait(1000)
		cy.get('a[href="/Identity/Account/Signout"]').click({force: true})
		cy.wait(2000)
	})	
})	
