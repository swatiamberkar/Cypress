describe('Increment Module', function() {
	
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
		cy.get('[onclick="changeCompanyModal()"]').invoke('text').then((text) => {
			var comnpanyname=text.trim();
			if(comnpanyname!='Chennai Demo Company')
			 {
				cy.get('[onclick="changeCompanyModal()"]').click({force: true})
				cy.get('[type="radio"]').check('3',{force: true})
				cy.wait(1000)
				cy.get('[onclick="changeCompany()"]').click({force: true})
			 }
		 })			
	})
/*	
	it('Delete Payroll Process  for All Employee February month', function() {
		cy.visit('http://next.pockethrms.com/payroll/transaction/payrollprocessing')
		cy.wait(1000)
		cy.contains('button', 'All Employees').click({force: true})
		cy.get('select[name=month]').select('February')
		cy.get('#ItaxProcess').check('1',{force: true})
		cy.wait(1000)
		cy.get('#deletePayroll').click({force:true})
	})
	
	it('Monthly input for February', function() {
		cy.visit('http://next.pockethrms.com/payroll/transaction/monthlyinput')
		cy.get('#categoryId').select('Staff',{force: true})
		cy.get('#inputMonth').select('February',{force: true})
		cy.get('[value="Edit"]').click({force: true})
		cy.wait(2000)
		cy.get('.theme_dataTable > .table').find('tr').each(function(row, i){
			if(i!=0){
			//console.log(i)
			var num1 = parseFloat(i)
			 cy.get('.theme_dataTable > .table > tbody > tr:nth-child('+num1+') > .th').invoke('text').then((text) => {
				cy.log(text.trim())
				if(text.trim()=='L-031'){					
					 cy.get('.table > tbody > tr:nth-child('+num1+') > td:nth-child(3) > .form-control').click()
					 cy.get('.table > tbody > tr:nth-child('+num1+') > td:nth-child(3) > .form-control').clear()
					 cy.get('.table > tbody > tr:nth-child('+num1+') > td:nth-child(3) > .form-control').type('3')
					  
				}
			})
		
			}
			
		})
		cy.wait(2000)
		cy.get('[value="Save"]').click({force: true})
		cy.wait(1000)
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())	
		})
		cy.get(".toast-message").click({force: true})
	}) */
	
	it('Search Specific Emp code you want to Increemnt', function() {
		cy.wait(3000)
		cy.get('#globalSearch').type('L-030')
		cy.wait(7000)
		cy.get('#finalSearchResult > div > div > ul > li:nth-child(2)').click({force: true})
		cy.wait(4000)
		
		//cy.visit('http://next.pockethrms.com/Employee/employee/Profile?employeeID=571&module=profile&empstatus=1')
	})
	
	
	/*it('Employee Earnings before payroolprocess', function() {
		cy.get('#salary_detail_tab').click({force: true})
		cy.wait(2000)
		cy.contains('li', 'Earning').click({force: true})
		cy.wait(2000)
		
		cy.get('input[name=FB]').click({force: true})
		cy.get('input[name=FB]').clear()
		cy.get('input[name=FB]').type('12000')
		
		cy.get('input[name=FFIELD]').click({force: true})
		cy.get('input[name=FFIELD]').clear()
		cy.get('input[name=FFIELD]').type('1500')
		
		cy.get('input[name=FPROJ]').click({force: true})
		cy.get('input[name=FPROJ]').clear()
		cy.get('input[name=FPROJ]').type('1500')
		
		cy.get('input[name=FHRA]').click({force: true})
		cy.get('input[name=FHRA]').clear()
		cy.get('input[name=FHRA]').type('1000')
		cy.wait(2000)
		cy.get('#btnSaveEarningDetails').click({force: true})
		cy.wait(2000)
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())	
		})
		
	})	
	*/
	it('Monthly Input not given for this employee', function() {
		
		cy.get('#payroll_detail_tab').click({force: true})
		cy.wait(1000)
		cy.get('#incrementtab').click({force: true})
		cy.get('a[onclick="addIncrement()"]').click({force:true})
		cy.get('#drpMonth').select('January',{force: true})
		
		cy.get('#txtDate').click().then(input => {
		    input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val('01/01/2020')
	    })
		
		cy.wait(1000)
		cy.get('[onclick="proceedIncrement()"]').click({force: true})
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())
        })
		cy.get(".toast-message").click({force: true})
	})	
	
	it('Payroll Process for January (Payroll already done) validation check', function() {
		cy.get('#payroll_detail_tab').click({force: true})
		cy.wait(2000)
		cy.get('#payrollProcesstab').click({force: true})
		cy.wait(2000)
		cy.get('#month').select('January',{force: true})
		cy.get('#ItaxProcess').check('1',{force: true})
		cy.wait(1000)
		cy.get('#btnProcess').click({force: true})
		
		cy.get('#incrementtab').click({force: true})
		cy.wait(55000)
		cy.get('a[onclick="addIncrement()"]').click({force:true})
		cy.wait(2000)
		cy.get('#drpMonth').select('January',{force: true})
		cy.get('#txtDate').click().then(input => {
		    input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val('01/01/2020')
	    })
		cy.wait(1000)
		cy.get('[onclick="proceedIncrement()"]').click({force: true})
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())
        })
		cy.get(".toast-message").click({force: true})
		
	})
	
	/*
	it('Effetive month is greater than apply month', function() {
		cy.get('#drpMonth').select('April',{force: true})
		
		cy.get('#txtDate').click().then(input => {
		    input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val('01/04/2020')
	    })
		
		cy.wait(1000)
		cy.get('[onclick="proceedIncrement()"]').click({force: true})
		cy.wait(3000)
		cy.get('#btnSave').click({force: true})
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())
        })
		cy.get(".toast-message").click({force: true})
	})	
	
	
	
	it('Lop Day mismatch', function() {
	cy.get('#drpMonth').select('February',{force: true})
	cy.get('#txtDate').click().then(input => {
		input[0].dispatchEvent(new Event('input', { bubbles: true }))
		input.val('01/02/2020')
	})
	
	cy.wait(1000)
    cy.get('[onclick="proceedIncrement()"]').click({force: true})
	cy.wait(1000)
	cy.get('#txtBefore').click({force: true})
	cy.get('#txtBefore').clear()
	cy.get('#txtBefore').type('0')
	
	cy.get('#txtAfter').click({force: true})
	cy.get('#txtAfter').clear()
	cy.get('#txtAfter').type('6')
	
	cy.wait(2000)
	cy.get('#btnSave').click({force: true})
	cy.get(".toast-message").invoke('text').then((text) => {
		cy.log(text.trim())
    })
	cy.get(".toast-message").click({force: true})
	cy.get('#txtAfter').click({force: true})
	cy.get('#txtAfter').clear()
	cy.get('#txtAfter').type('1')
	cy.wait(1000)
	cy.get('#btnSave').click({force: true})
	cy.get(".toast-message").invoke('text').then((text) => {
		cy.log(text.trim())
    })
	cy.get(".toast-message").click({force: true})
	cy.wait(2000)
	
	cy.get('#Inctdtr1').click({force: true})
	cy.get('#Inctdtr1').clear()
	cy.get('#Inctdtr1').type('2000')
	
	cy.get('#Inctdtr2').click({force: true})
	cy.get('#Inctdtr2').clear()
	cy.get('#Inctdtr2').type('2000')
	
	cy.get('#Inctdtr3').click({force: true})
	cy.get('#Inctdtr3').clear()
	cy.get('#Inctdtr3').type('1500')
	
	cy.get('#Inctdtr4').click({force: true})
	cy.wait(1000)
	cy.get('#Difftr1').eq(0).then($input => {
		expect($input.val()).to.contain('500')
	})
	
	cy.get('#Difftr2').eq(0).then($input => {
		expect($input.val()).to.contain('500')
	})
	
	
	cy.get('#Difftr3').eq(0).then($input => {
		expect($input.val()).to.contain('500')
	})
	})		
		
	it('LOP Days Match and save increment', function() {
		
		cy.get('#txtAfter').click({force: true})
		cy.get('#txtAfter').clear()
		cy.get('#txtAfter').type('3')
		
		cy.wait(1000)
		cy.get('#btnSave').click({force: true})
		cy.wait(1000)
		cy.get(".toast-message").invoke('text').then((text) => {
				cy.log(text.trim())
		})
		cy.get(".toast-message").click({force: true})
		
	})	
	
	it('Payroll Process for February to check increment Amount and LOP Days', function() {
		cy.get('#payrollProcesstab').click({force: true})
		cy.wait(2000)
		cy.get('#month').select('February',{force: true})
		cy.get('#ItaxProcess').check('1',{force: true})
		cy.wait(1000)
		cy.get('#btnProcess').click({force: true})
		cy.wait(55000)	
		
	})
	
	it('Check Salary slip for February', function() {
		cy.get('#salary_detail_tab').click({force: true})
		cy.wait(2000)
		//click on salary slip tab
		cy.xpath('//*[@id="salary_detail"]/div/div[1]/ul/li[3]').click({force: true})
		
		cy.wait(2000)
		cy.get('#drpfromMonth').select('February',{force: true})
		cy.get('[onclick="GetSalaryData()"]').click({force: true})
		cy.wait(3000)
		
		cy.get('#tblEarn').contains('td', '1500.00').should('be.visible');
		cy.get('#tblEarn').contains('td', '2000.00').should('be.visible');
		cy.get('#tblEarn').contains('td', '3.00').should('be.visible');
		
	})	
	
	
	it('Increment mid of the month', function() {
		
		cy.visit('http://next.pockethrms.com/Settings/Employee/Index?module=organization&submodule=smtpsetting')
		
		cy.wait(2000)
		
		cy.get('#payroll_detail_tab').click({force: true})
		cy.wait(2000)
		cy.get('#paySetting').click({force: true})
		cy.get('#monthDay').click({force: true})
		cy.get('#ddlCategory').select('Staff',{force: true})
		
		cy.get('[type="radio"]').check('1')
	})	
		*/
})