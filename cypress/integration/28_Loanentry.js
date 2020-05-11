describe('Loan Details with payroll process', function() {
	
	var Employeecatagorytype='';
	var compnaylength;
	
	beforeEach(function(){
        window.console.log('Enter the beforeEach function')
		Cypress.on('uncaught:exception', (err,runnable) => {
			return false;
		});
        Cypress.Cookies.preserveOnce('.AspNetCore.Antiforgery.w5W7x28NAIs','.AspNetCore.Session','1P_JAR','ARRAffinity','FavouriteMenus','XCategory','XCompanyId','XName','XSchemaName','XUserId','XUserName','_ga','_gcl_au','_gid','ai_session','ai_user','new_username')
		cy.wait(2000)
    })
	
	
	it('successfully loads', function() {
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
	
	
	it('Change Company', function() {		 
		cy.changeCompany();
	
	}) 

	
	it('Pick the emp Catagory type', function() {
		cy.wait(2000)
		cy.get('#globalSearch').type('CY1')
		cy.wait(4000)
		cy.contains('li','Loan test(CY1)').click({force: true})
		cy.wait(3000)
		cy.get('#profile_detail_tab').click({force: true})
		cy.wait(1000)
		cy.get('#basicTab').click({force: true})
		cy.wait(1000)
		
		cy.get('select[name=CATEGORY]').then($input => {
				 Employeecatagorytype=  $input.val();		 
				 //cy.log(Employeecatagorytype);
		})
	})
	
	it('save monthlyinput for specific Emp for january month', function() {
		cy.visit('https://next.pockethrms.com/payroll/transaction/monthlyinput')	
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
		
		
		cy.wait(2000)
		cy.get('.theme_dataTable > .table').find('tr').each(function(row, i){
				if(i!=0){
				//console.log(i)
				var num1 = parseFloat(i)
				 cy.get('.theme_dataTable > .table > tbody > tr:nth-child('+num1+') > .th').invoke('text').then((text) => {
					cy.log(text.trim())
					if(text.trim()=='CY1'){					
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
		
	})
	
	it('Search Specific Emp code you want to loan entry', function() {
		cy.wait(2000)
		cy.get('#globalSearch').type('CY1')
		cy.wait(3000)
		cy.contains('li', 'Loan test(CY1)').click({force: true})
		cy.wait(4000)
	})
	
	it('Loan Entry', function() {
		cy.server()
		cy.route('POST', 'https://next.pockethrms.com/payroll/Transaction/Loan').as('postComment')
		cy.get('#payroll_detail_tab').click({force: true})
		cy.wait(3000)
		cy.get('#Transaction_Loan').click({force: true})
		cy.wait(1000)
		cy.get('[onclick="addNewLoanEntry()"]').eq(0).click({force: true})
		cy.wait(1000)
		cy.get('select[name=LoanCode]').select('CL',{force: true})
		cy.wait(1000)
		cy.get('#LoanDate').click().then(input => {
		    input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val('01/01/2020')
	   })
		cy.get('select[name=ApplyMonth]').select('January')
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
		
		cy.wait('@postComment').its('status').should('eq', 200)		
		cy.log('test wait sucessed!')
		//cy.wait(2000)
		cy.get(".toast-message").invoke('text').then((text) => {
				cy.log(text.trim())
		})
		cy.get(".toast-message").click({force:true})
		
	})
	
	it('Loan Deviation with low amount', function() {
		cy.wait(5000)
		cy.get('[data-toggle="dropdown"]').eq(4).click({force: true})
		cy.wait(1000)
	    cy.get('.card-body > div > .show > .dropdown-menu > .dropdown-item:nth-child(2)').click()
	    cy.wait(1000)
		cy.get('input[name=amount]').eq(2).click({force: true})
		cy.get('input[name=amount]').eq(2).clear()
		cy.get('input[name=amount]').eq(2).type('3000')
		cy.wait(1000)
		cy.get('#btnSave').click({force: true})
		cy.wait(1000)
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())
			expect(text.trim()).equal('Repayment amount 13000 is not tallying with loan amount')
				
		})
		cy.get(".toast-message").click({force:true})
	})
	
	it('Loan Deviation with high amount', function() {
		cy.wait(1000)
		cy.get('input[name=amount]').eq(2).click({force: true})
		cy.get('input[name=amount]').eq(2).clear()
		cy.get('input[name=amount]').eq(2).type('7000')
		cy.wait(1000)
		cy.get('#btnSave').click({force: true})		
		cy.wait(2000)
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())
			expect(text.trim()).equal('Repayment amount 17000 is not tallying with loan amount')	
		})
		//cy.wait(1000)
		//cy.get('[data-dismiss="modal"]').eq(1).click({force: true})
	})	
		
	it('Loan Deviation with same amount', function() {

		cy.get('input[name=amount]').eq(2).click({force: true})
		cy.get('input[name=amount]').eq(2).clear()
		cy.get('input[name=amount]').eq(2).type('3000')
		cy.get('#btnInsert').click({force: true})
		cy.wait(1000)
		cy.get('input[name=amount]').eq(3).click({force: true})
		cy.get('input[name=amount]').eq(3).clear()
		cy.get('input[name=amount]').eq(3).type('2000')
		cy.get('#btnInsert').click({force: true})
		cy.wait(2000)
		if(cy.get('#tblLoanDeviation').contains('td', '5'))
		{
			cy.get('#btnDelete').click({force: true})
			cy.wait(2000)
			cy.get('#btnSave').click({force: true})		
		}
		cy.wait(2000)
		cy.get(".toast-message").click({force:true})
		cy.wait(3000)
		cy.get('[data-dismiss="modal"]').eq(1).click({force: true})
		cy.wait(2000)
	})		
	
	/*
	it('Employee Earnings before payrollprocess', function() {
		cy.reload()
		cy.wait(2000)
		cy.get('#salary_detail_tab').click({force: true})
		cy.wait(2000)
		cy.get('#earntab').click({force: true})
		cy.wait(2000)
		
		//cy.get('input[name=FB]').click({force: true})
		//cy.get('input[name=FB]').clear()
		//cy.get('input[name=FB]').type('20000')
		
		//cy.get('input[name=FFIELD]').click({force: true})
		//cy.get('input[name=FFIELD]').clear()
		//cy.get('input[name=FFIELD]').type('1500')
		
		//cy.get('input[name=FPROJ]').click({force: true})
		//cy.get('input[name=FPROJ]').clear()
		//cy.get('input[name=FPROJ]').type('1500')
		
		
		//cy.get('input[name=FHRA]').click({force: true})
		//cy.get('input[name=FHRA]').clear()
		//cy.get('input[name=FHRA]').type('1000') 
		
		cy.wait(1000)
		cy.get('#btnSaveEarningDetails').click({force: true})
		
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())	
		})
		
		cy.wait(2000)
	})
	*/
	
	
	it('Payroll Process for January', function() {
			cy.get('#payroll_detail_tab').click({force: true})
			cy.wait(2000)
			cy.get('#Utilities_PayrollProcess').click({force: true})
			cy.wait(2000)
			cy.get('#month').select('January',{force: true})
			//cy.get('#ItaxProcess').check('1',{force: true})
			cy.wait(1000)
			cy.get('#btnProcess').click({force: true})
			cy.wait(30000)	
	})	
		
	it('Loan Fore Close  with pervious date', function() {
		cy.reload()
	    cy.wait(2000)
		cy.get('#payroll_detail_tab').click({force: true})
		cy.wait(2000)
		cy.get('#Transaction_Loan').click({force: true})
		cy.wait(2000)
		cy.get('[data-toggle="dropdown"]').eq(4).click({force: true})
		cy.wait(2000)
	    cy.get('.card-body > div > .show > .dropdown-menu > .dropdown-item:nth-child(3)').click()
		cy.wait(2000)
		cy.get('#FCDate').then(input => {
			input.val('17/07/2019')
	   })
		
		cy.wait(1000)
		cy.get('#btnForceClose').click({force: true})
		cy.on('window:alert', (str) => {
			cy.log(str)
			//expect(str).to.equal('Fore Close Date should be greater than Loan Date')
			//expect(str.trim()).should('have.text', 'Fore Close Date should be greater than Loan Date')
			expect(str.trim()).equal('Fore Close Date should be greater than Loan Date')
		})
	})		
		
	it('Loan Fore Close with next month after payroll process', function() {
		
	  cy.get('#FCDate').then(input => {
			input.val('07/02/2020')
	   })
		cy.wait(2000)
		cy.get('#btnForceClose').click({force: true})
	})	
	
	it('Salary slip data check with Home loan decuduction of January', function() {
		
		cy.wait(2000)
		cy.get('#salary_detail_tab').click({force: true})
		cy.wait(2000)
		//cy.contains('li', 'Salary Slip').click({force: true})
		cy.get('#Salary_SalaryDetails').click({force: true})
		cy.wait(3000)
		cy.get('#drpfromMonth').select('January',{force: true})
		cy.get('[onclick="GetSalaryData()"]').click({force: true})
		cy.wait(2000)
		cy.get('#tblDed').contains('td', '5000.00').should('be.visible');
	
  })
  
	it('Loan Deviation after Loan Fore Close', function() {
		
		cy.get('#payroll_detail_tab').click({force: true})
		cy.wait(1000)
		cy.get('#Transaction_Loan').click({force: true})
		cy.wait(2000)
		
		cy.get('[data-toggle="dropdown"]').eq(4).click({force: true})
		cy.wait(1000)
		
	    cy.get('.card-body > div > .show > .dropdown-menu > .dropdown-item:nth-child(2)').click()
		
		cy.wait(2000)
	    cy.wait(2000)
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())
			expect(text.trim()).equal('Loan fore closed.!')
		})
		cy.wait(1000)
		cy.get('#btnSave').should('be.disabled')
		cy.get('[data-dismiss="modal"]').eq(1).click({force: true})
		
	})	
	
	
	it('save monthlyinput for specific Emp for February month', function() {
		cy.visit('https://next.pockethrms.com/payroll/transaction/monthlyinput')	
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
					if(text.trim()=='CY1'){					
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
		
	})
	
	
	
	
 	it('Payroll Process  after Loan Fore Close (February)', function() { 
		cy.get('#globalSearch').type('CY1')
		cy.wait(3000)
		cy.contains('li', 'Loan test(CY1)').click({force: true})
		cy.wait(3000)
		
		//take next month of loanfore close tp payroll process
			cy.get('#payroll_detail_tab').click({force: true})
			cy.wait(2000)
			cy.get('#Utilities_PayrollProcess').click({force: true})
			cy.wait(2000)
			cy.get('#month').select('February',{force: true})
			//cy.get('#ItaxProcess').check('1',{force: true})
			cy.wait(1000)
			cy.get('#btnProcess').click({force: true})
			cy.wait(28000)
		
	}) 

	
	it('Salary slip data check withcar	loan decuduction of February', function() {
		
		cy.wait(2000)
		cy.get('#salary_detail_tab').click({force: true})
		cy.wait(2000)
		//cy.contains('li', 'Salary Slip').click({force: true})
		cy.get('#Salary_SalaryDetails').click({force: true})
		cy.wait(3000)
		cy.get('#drpfromMonth').select('February',{force: true})
		cy.get('[onclick="GetSalaryData()"]').click({force: true})
		cy.wait(2000)
		cy.get('#tblDed').contains('td', '5000.00').should('not.exist');
	
  })
  
	it('Loan Fore Close Reverse', function() {
		cy.reload()
		cy.wait(2000)
		cy.get('#payroll_detail_tab').click({force: true})
		cy.wait(2000)
		cy.get('#Transaction_Loan').click({force: true})
		cy.wait(2000)
		cy.get('[data-toggle="dropdown"]').eq(4).click({force: true})
		cy.wait(2000)
	   cy.get('.card-body > div > .dropdown > .dropdown-menu > .dropdown-item:nth-child(3)').click()
		cy.wait(2000)
		cy.get('#btnForceCloseReverse').click({force: true})
		
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())
		})	 		
	})	
	
	
	it('Delete payroll process of February ', function() { 
			cy.get('#payroll_detail_tab').click({force: true})
			cy.wait(2000)
			cy.get('#Utilities_PayrollProcess').click({force: true})
			cy.wait(2000)
			cy.get('#month').select('February',{force: true})
			//cy.get('#ItaxProcess').check('1',{force: true})
			cy.wait(1000)
			cy.get('#btnProcessDelete').click({force: true})
			cy.wait(2000)
	
	}) 
	
	
	it('Payroll Process  after Loan Fore Close reverse of February', function() {  
		//take  month of loan fore reverse close to payroll process	
		cy.get('#payroll_detail_tab').click({force: true})
			cy.wait(2000)
			cy.get('#Utilities_PayrollProcess').click({force: true})
			cy.wait(2000)
			cy.get('#month').select('February',{force: true})
			//cy.get('#ItaxProcess').check('1',{force: true})
			cy.wait(1000)
			cy.get('#btnProcess').click({force: true})
			cy.wait(28000)
	}) 
	
	it('Salary slip data check with Home loan decuduction of February', function() {
		cy.wait(2000)
		cy.get('#salary_detail_tab').click({force: true})
		cy.wait(2000)
		//cy.contains('li', 'Salary Slip').click({force: true})
		cy.get('#Salary_SalaryDetails').click({force: true})
		cy.wait(3000)
		cy.get('#drpfromMonth').select('February',{force: true})
		cy.get('[onclick="GetSalaryData()"]').click({force: true})
		cy.wait(2000)
		cy.get('#tblDed').contains('td', '5000.00').should('be.visible');
	
  })
	
	it('User Logout', function() {
		cy.wait(1000)
		cy.get('[role="button"]').eq(3).click({force: true})
		cy.wait(1000)
		cy.get('a[href="/Identity/Account/Signout"]').click({force: true})
		cy.wait(2000)
	})
	
})