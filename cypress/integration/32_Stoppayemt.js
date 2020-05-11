describe("Stop Payment", () => {

	var url = 'http://next.pockethrms.com';
	var username= 'nileshgajare@live.com';
	var userPass = '123456';  
	var employeeID ='CY12';
	 
	 var Employeecatagorytype=''
	var EmpLengthInMonthlyInput=''
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
	
	Cypress.Commands.add('SaveEarningDeductionfields',()=>{
                cy.wait(2000)
                cy.server()   
                cy.get('#salary_detail_tab').click({force: true})
                cy.wait(2000)
                cy.get('#Salary_EarningDetails').click({force: true})
                cy.route('POST', 'https://next.pockethrms.com/Employee/Employee/SaveEarningDetails').as('SaveEarningDetails')
                cy.wait(2000)
                
                cy.get('input[name=FB]').click({force: true})
                cy.get('input[name=FB]').clear()                
                cy.get('input[name=FB]').type('40000') 
                
                cy.get('input[name=FPROJ]').click({force: true})        
                cy.get('input[name=FPROJ]').clear()                
                cy.get('input[name=FPROJ]').type('10000')
        
                
                cy.get('input[name=FFIELD]').click({force: true})        
                cy.get('input[name=FFIELD]').clear()                        
            cy.get('input[name=FFIELD]').type('5000')
                        
                cy.wait(1000)
                 cy.get('#btnSaveEarningDetails').click({force: true})
                cy.wait('@SaveEarningDetails').its('status').should('eq', 200)
                cy.get(".toast-message").invoke('text').then((earningtext) => {
                 cy.log(earningtext.trim())
                })
                
                cy.get('#Salary_DeductionDetails').click({force: true})
                cy.wait(1000)
                cy.route('POST', 'https://next.pockethrms.com/Employee/Employee/SaveDeductionDetails').as('SaveDeductionDetails')
                cy.get('input[name=TDS]').click({force: true})
        cy.get('input[name=TDS]').clear()                
                cy.get('input[name=TDS]').type('200')
                
                 cy.get('#btnSaveDeductionDetails').click({force: true})
                cy.wait('@SaveDeductionDetails').its('status').should('eq', 200)
                cy.get(".toast-message").invoke('text').then((earningtext) => {
                 cy.log(earningtext.trim())
                })
                
        })
	
	it('change Emp Stop Payment to YES',function() {
		cy.navigate_EmployeeProfile();
		cy.wait(2000)
		cy.SaveEarningDeductionfields();
		cy.get('#profile_detail_tab').click({force: true})
		cy.wait(2000)
		cy.get('#employeeTab').click({force: true})
		cy.wait(2000)
		cy.get('#STOPPAYMENT').select('Yes',{force: true})
		cy.wait(1000)
		cy.get('#empProfileSave').click({force: true})
		cy.wait(3000)
	    cy.get(".toast-message").invoke('text').then((text) => {
			expect(text.trim()).equal('Record Saved Successfully.')
		})
	})
	
	
	it('Payroll Process the Emp aganist stop payment is YES',function() {
		cy.wait(1000)
		cy.get('#payroll_detail_tab').click({force: true})
		cy.wait(2000)
		cy.get('#Utilities_PayrollProcess').click({force: true})
		cy.get('#month').select('August',{force: true})
		cy.wait(1000)
		cy.get('#btnProcess').click({force: true})
		cy.wait(2000)
		cy.get(".toast-message").invoke('text').then((text) => {
			expect(text.trim()).equal('Employee is under stop payment')
		})
	})
	
	
	it('change Emp Stop Payment to NO',function() {
		cy.get('#profile_detail_tab').click({force: true})
		cy.wait(2000)
		cy.get('#employeeTab').click({force: true})
		cy.wait(2000)
		cy.get('#STOPPAYMENT').select('No',{force: true})
		cy.wait(1000)
		cy.get('#empProfileSave').click({force: true})
		cy.wait(2000)
	    cy.get(".toast-message").invoke('text').then((text) => {
			expect(text.trim()).equal('Record Saved Successfully.')
		})
	})

it('Search Specific Emp code you want to stop', function() {
		cy.wait(4000)
		cy.get('#globalSearch').type(employeeID)
		cy.wait(5000)
		cy.contains('li', 'Stoppayment test(CY12)').click({force: true})
		cy.get('#basicTab').click({force:true})
		cy.wait(3000)
		cy.get('select[id=CATEGORY]').then($input => {
				 Employeecatagorytype=  $input.val();		 
				 cy.log(Employeecatagorytype);
		})
		
	})


	it('payroll process for the April',function() {
		var PayrollProcessMonth='April';
		cy.server()      
		cy.route('POST', 'https://next.pockethrms.com/Payroll/Transaction/PayrollProcessing?prcButton=Process&json=1').as('postComment')
		cy.get('#globalSearch').type(employeeID)
		cy.wait(5000)
		cy.contains('li', 'Stoppayment test(CY12)').click({force: true})
		cy.wait(5000)
		cy.get('#payroll_detail_tab').click({force: true})
		//cy.xpath("//a[@id='payroll_detail_tab']").click({force: true})
		cy.wait(1000)
		cy.get('#Utilities_PayrollProcess').click({force: true})
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
			cy.visit('https://next.pockethrms.com/payroll/transaction/monthlyinput')	
			cy.wait(2000)
			cy.get('[value="View"]').click({force: true})
			cy.wait(1000)	
			cy.get('#categoryId').select(Employeecatagorytype,{force: true})
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
					if(text.trim()==employeeID)
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
		
		cy.xpath("//u[contains(text(),'"+employeeID+"')]").click({force: true})
		cy.wait(5000)
		cy.get('.page-title').should('contain','Employee Profile')
		cy.wait(2000)	
		cy.get('#payroll_detail_tab').click({force: true})
		//cy.xpath("//a[@id='payroll_detail_tab']").click({force: true})
		cy.wait(1000)
		cy.get('#Utilities_PayrollProcess').click({force: true})
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
		cy.visit('https://next.pockethrms.com/payroll/transaction/PaysheetLock')	
			cy.wait(2000)
			cy.get('#Month1').select(PayrollProcessMonth,{force: true})
			cy.xpath("//button[contains(text(),'Next')]").click({force: true})
			
			
			cy.wait(2000)
			cy.xpath("//label[contains(text(),'All Categories')]/input").click({force: true})
			cy.xpath("//button[@id='btnRelease']").click({force: true})
			
			cy.reload()
			cy.wait(2000)
		cy.get('#globalSearch').type(employeeID)
		cy.wait(5000)
		cy.contains('li', 'Stoppayment test(CY12)').click({force: true})
		cy.wait(5000)
		
		
		cy.get('#payroll_detail_tab').click({force: true})
		//cy.xpath("//a[@id='payroll_detail_tab']").click({force: true})
		cy.wait(1000)
		
		cy.get('#Utilities_PayrollProcess').click({force: true})
		
		
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
	
	
	it('Add stop payment of EMP(Augest)',function() {
		cy.navigate_EmployeeProfile();
		cy.wait(1000)
		cy.get('#payroll_detail_tab').click({force: true})
		cy.server()
		cy.wait(2000)
		cy.get('#Utilities_StopPayment').click({force: true})
		cy.route('POST', 'https://next.pockethrms.com/Payroll/Settings/StopPayment').as('StopPayment')
		cy.wait(1000)
		cy.get('[title="Add Stop Payment"]').eq(0).click({force: true})
		cy.wait(1000)
		
		cy.get('#StopMonth').select('April',{force: true})	
	    cy.get('#StopType').select('HoldForFAndF',{force: true})
		cy.get('#StopYear').click({force: true})
		cy.get('#StopYear').clear()
		cy.get('#StopYear').type('2020')
		cy.wait(2000)
		cy.get('#btnSubmit').click({force: true})
		cy.get(".toast-message").invoke('text').then((text) => {
			if(text.trim()=='Payroll already processed for this month.')	{
				cy.wait(2000)
				cy.get(".toast-message").eq(0).click({force: true})
				cy.get('#StopMonth').select('August',{force: true})
			}
		})
		
	
		
		
		cy.wait(2000)
		cy.get('#btnSubmit').click({force: true})
		cy.wait('@StopPayment').its('status').should('eq', 200)
		cy.get(".toast-message").invoke('text').then((text) => {
		  expect(text.trim()).equal('Records Saved Successfully!!!')
		})
		
	
	})
	
	/*it('Check payslip is downloading after add stop payment',function() {
		cy.wait(1000)
		var PayrollProcessMonth='Augest'
			cy.get('#salary_detail_tab').click({force: true})
			cy.wait(2000)
			//click on salary slip tab
			cy.get('#Salary_SalaryDetails').click({force: true})
			cy.wait(1000)
			
			cy.get('#drpfromMonth').select('August',{force: true})
			
			cy.get('[title="Salary Summary Export"]').eq(0).click({force: true})
			cy.wait(100)
	//	validation msg check here
		cy.get(".toast-message").invoke('text').then((text) => {
			expect(text.trim()).equal('Employee Transaction Data Not Found')
		})	
	
	})*/
	
	it('Release the stop payment (Augest)',function() {
		cy.wait(1000)
		cy.get('#payroll_detail_tab').click({force: true})
		cy.wait(2000)
		cy.get('#Utilities_StopPayment').click({force: true})
		cy.wait(2000)
		//cy.get('[title="click for Release"]').click({force: true})
		cy.contains('label','Release').click({force: true})
		cy.wait(2000)
		cy.get(".toast-message").invoke('text').then((text) => {
			expect(text.trim()).equal('Stoppayment released successfully.!')
		})
		
	})	
		
	
	
	
}) 	