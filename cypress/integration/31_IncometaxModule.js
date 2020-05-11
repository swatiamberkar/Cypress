describe('ITAX Module', function() {
	 
	var employeeId = 'CY5';
	var Employeecatagorytype=''
	var PayrollProcessMonth=''
	var EmpLengthInMonthlyInput=''  //Salary_SalaryDetails
	var filePath= 'Greytrix SSL VPN.pdf';

	
	beforeEach(function(){
        window.console.log('Enter the beforeEach function')
		Cypress.on('uncaught:exception', (err,runnable) => {
				return false;
		});
		Cypress.Cookies.preserveOnce('.AspNetCore.Antiforgery.w5W7x28NAIs','__cypress.initial','.AspNetCore.Session','1P_JAR','ARRAffinity','FavouriteMenus','XCategory','XCompanyId','XName','XSchemaName','XUserId','XUserName','_ga','_gid','ai_session','ai_user','new_username','GetLicenseData')
		cy.wait(2000)
    })
	
	it('successfully page  loads', function() {
		cy.visit('https://next.pockethrms.com/') 
	})
	
	it('Pocket HRMS Login', function() {
		cy.visit('https://next.pockethrms.com/')
		cy.get('#Email').should('be.visible').should('have.css', 'border-radius') 
		cy.get('#Email').should('exist')
		cy.get('#Email').click()
		cy.get('#Email').type('nileshgajare@live.com')
		//cy.get('#Email').should('have.value', 'nileshgajare@live.com')
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


it('Search Specific Emp code you want to incometax process', function() {
		cy.wait(3000)
		cy.get('#globalSearch').type(employeeId)
		cy.wait(2000)
		cy.contains('li','Incometax test(CY5)').click({force: true})
		cy.get('#basicTab').click({force:true})
		cy.wait(2000)
		cy.get('select[id=CATEGORY]').then($input => {
				Employeecatagorytype=  $input.val();		 
				cy.log(Employeecatagorytype);
		})
		cy.SaveEarningDeductionfields();
	})
		
it('save monthlyinput for specific Emp', function() {
		var monthlyInput='April';
		cy.visit('https://next.pockethrms.com/payroll/transaction/monthlyinput')	
		cy.wait(2000)
		
		cy.get('#categoryId').select(Employeecatagorytype,{force: true})
		cy.get('#inputMonth').select(monthlyInput,{force: true})
		cy.wait(2000)
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
		cy.wait(2000)
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())	
		})
})

	it('Payroll process with incometax  month', function() {
		var PayrollProcessMonth='April';
		cy.server()      
		cy.route('POST', 'https://next.pockethrms.com/Payroll/Transaction/PayrollProcessing?prcButton=Process&json=1').as('postComment')
		//cy.get('#globalSearch').clear()
		cy.get('#globalSearch').type(employeeId)
		cy.wait(2000)
		cy.contains('li', 'Incometax test(CY5)').click({force: true})
		cy.wait(3000)
		
		cy.xpath("//a[@id='payroll_detail_tab']").click({force: true})
		cy.wait(2000)
		cy.get('#Utilities_PayrollProcess').click({force: true})    
		cy.wait(2000)
		cy.wait(2000)	
		cy.get("select[id='month']").select(PayrollProcessMonth,{force: true})	
		cy.get('#ItaxProcess').not('[disabled]').check({force: true}).should('be.checked')	
		cy.get('#btnProcess').click({force: true})
		cy.wait('@postComment').its('status').should('eq', 200)
		//cy.wait(5000)
		cy.get(".toast-message").invoke('text').then((text) => {
		cy.log(text.trim())
				
		if(text.trim()=='Sorry Monthly Input Is Not Entered For This Month')
		{
			expect(text.trim()).equal('Sorry Monthly Input Is Not Entered For This Month')
			cy.visit('https://next.pockethrms.com/payroll/transaction/monthlyinput')	
			cy.wait(2000)
			cy.get('[value="View"]').click({force: true})
			cy.wait(2000)	
			cy.get('#inputMonth').select(PayrollProcessMonth,{force: true})
			cy.wait(2000)
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
			cy.wait(2000)
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
		cy.wait(2000)
		cy.get('#Utilities_PayrollProcess').click({force: true})
		cy.wait(2000)
		cy.get('#ItaxProcess').not('[disabled]').check({force: true}).should('be.checked')
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
			//cy.get('#globalSearch').clear()
		cy.get('#globalSearch').type(employeeId)
		cy.wait(5000)
		cy.contains('li', 'Incometax test(CY5)').click({force: true})
		cy.wait(5000)
		
		cy.xpath("//a[@id='payroll_detail_tab']").click({force: true})
		cy.wait(2000)
		cy.get('#Utilities_PayrollProcess').click({force: true})
		cy.wait(2000)
		cy.get("select[id='month']").select(PayrollProcessMonth,{force: true})	
		cy.get('#ItaxProcess').not('[disabled]').check({force: true}).should('be.checked')
		cy.get('#btnProcess').click({force: true})
		cy.wait(5000)
		cy.get(".toast-message").invoke('text').then((text) => {
		cy.log(text.trim())
		
		if(text.trim()=='Already Payroll Processed For This Employee')	{
		cy.wait(2000)
		cy.get(".toast-message").click({force: true})
		cy.get('#ItaxProcess').not('[disabled]').check({force: true}).should('be.checked')
		cy.get('#btnProcessDelete').click({force: true})
		cy.wait('@postComment').its('status').should('eq', 200)
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())
				expect(text.trim()).equal('Payroll Process Deleted Successfully')
		})
		
		cy.wait(2000)
		cy.get(".toast-message").click({force: true})
		cy.get('#ItaxProcess').not('[disabled]').check({force: true}).should('be.checked')
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
		cy.wait(2000)
		cy.get(".toast-message").click({force: true})
		cy.get('#ItaxProcess').not('[disabled]').check({force: true}).should('be.checked')
		cy.get('#btnProcessDelete').click({force: true})
		cy.wait(2000)
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())
				expect(text.trim()).equal('Payroll Process Deleted Successfully')
		})
		cy.wait(2000)
		cy.get(".toast-message").click({force: true})
		cy.get('#ItaxProcess').not('[disabled]').check({force: true}).should('be.checked')
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

it('Check salary slip for ITAX deduction', function() {
		
		cy.get('#salary_detail_tab').click({force: true})
		cy.wait(2000)
		cy.get('#Salary_SalaryDetails').click({force: true})
		cy.wait(2000)
		cy.get('#drpfromMonth').select('April',{force: true})
		cy.get('[onclick="GetSalaryData()"]').click({force: true})
		//cy.wait(5000)
	//	cy.get('#tblDed').contains('td','4630.00').should('be.visible');
	
	})
	
    it('Search Specific Emp code you want to ITAX', function() {
		cy.wait(5000)
		//cy.get('#globalSearch').clear()
		cy.get('#globalSearch').type(employeeId)
		cy.wait(5000)
		cy.contains('li', 'Incometax test(CY5)').click({force: true})
		cy.get('#basicTab').click({force:true})
		cy.wait(5000)
		cy.get('select[id=CATEGORY]').then($input => {
				 Employeecatagorytype=  $input.val();		 
				 cy.log(Employeecatagorytype);
		})
		
	})
	
it('save monthlyinput for specific Emp', function() {
		var monthlyInput='May'
		cy.visit('https://next.pockethrms.com/payroll/transaction/monthlyinput')	
		cy.wait(2000)
		
		cy.get('#categoryId').select(Employeecatagorytype,{force: true})
		cy.get('#inputMonth').select(monthlyInput,{force: true})
		cy.wait(2000)
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
		cy.wait(2000)
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())	
	    })
})	

it('Payroll process with incometax  month with LOP days', function() {
		var PayrollProcessMonth='May';
		cy.server()  //    http://next.pockethrms.com/Payroll/Transaction/PayrollProcessing?prcButton=Delete&json=1
		cy.route('POST', 'https://next.pockethrms.com/Payroll/Transaction/PayrollProcessing?prcButton=Process&json=1').as('postComment')
		//cy.get('#globalSearch').clear()
		cy.get('#globalSearch').type(employeeId)
		cy.wait(4000)
		cy.contains('li', 'Incometax test(CY5)').click({force: true})
		cy.wait(5000)
		cy.xpath("//a[@id='payroll_detail_tab']").click({force: true})
		cy.wait(2000)
		cy.get('#Utilities_PayrollProcess').click({force: true})
		cy.wait(2000)
		cy.wait(2000)	
		cy.get("select[id='month']").select(PayrollProcessMonth,{force: true})	
		cy.get('#ItaxProcess').not('[disabled]').check({force: true}).should('be.checked')	
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
			cy.wait(2000)	
			cy.get('#inputMonth').select(PayrollProcessMonth,{force: true})
			cy.wait(2000)
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
			cy.wait(2000)
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
		cy.wait(2000)
		cy.get('#Utilities_PayrollProcess').click({force: true})
		cy.wait(2000)
		cy.get('#ItaxProcess').not('[disabled]').check({force: true}).should('be.checked')
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
			//cy.get('#globalSearch').clear()
		cy.get('#globalSearch').type(employeeId)
		cy.wait(4000)
		cy.contains('li', 'Incometax test(CY5)').click({force: true})
		cy.wait(4000)
		
		cy.xpath("//a[@id='payroll_detail_tab']").click({force: true})
		cy.wait(2000)
		cy.get('#Utilities_PayrollProcess').click({force: true})
		cy.wait(2000)
		cy.get("select[id='month']").select(PayrollProcessMonth,{force: true})	
		cy.get('#ItaxProcess').not('[disabled]').check({force: true}).should('be.checked')
		cy.get('#btnProcess').click({force: true})
		cy.wait('@postComment').its('status').should('eq', 200)
		cy.get(".toast-message").invoke('text').then((text) => {
		cy.log(text.trim())
		
		if(text.trim()=='Already Payroll Processed For This Employee')	{
		cy.wait(2000)
		cy.get(".toast-message").click({force: true})
		cy.get('#ItaxProcess').not('[disabled]').check({force: true}).should('be.checked')
		cy.get('#btnProcessDelete').click({force: true})
		
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())
				expect(text.trim()).equal('Payroll Process Deleted Successfully')
		})
		
		cy.wait(2000)
		cy.get(".toast-message").click({force: true})
		cy.get('#ItaxProcess').not('[disabled]').check({force: true}).should('be.checked')
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
		cy.wait(2000)
		cy.get(".toast-message").click({force: true})
		cy.get('#ItaxProcess').not('[disabled]').check({force: true}).should('be.checked')
		cy.get('#btnProcessDelete').click({force: true})
		
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())
				expect(text.trim()).equal('Payroll Process Deleted Successfully')
		})
		cy.wait(2000)
		cy.get(".toast-message").click({force: true})
		cy.get('#ItaxProcess').not('[disabled]').check({force: true}).should('be.checked')
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
it('Check salary slip for ITAX deduction with LOP days', function() {
		var salarymonth='May';
		cy.get('#salary_detail_tab').click({force: true})
		cy.wait(2000)
		cy.get('#Salary_SalaryDetails').click({force: true})
		cy.wait(2000)
		cy.get('#drpfromMonth').select(salarymonth,{force: true})
		cy.get('[onclick="GetSalaryData()"]').click({force: true})
		cy.wait(5000)
		cy.get('#tblEarn').contains('td','3').should('be.visible');
		//cy.get('#tblDed').contains('td','4387.00').should('be.visible');
	
})	
it('save monthlyinput for specific Emp', function() {
		var monthlyInput='June'
		cy.visit('https://next.pockethrms.com/payroll/transaction/monthlyinput')	
		cy.wait(2000)
		
		cy.get('#categoryId').select(Employeecatagorytype,{force: true})
		cy.get('#inputMonth').select(monthlyInput,{force: true})
		cy.wait(2000)
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
		cy.wait(2000)
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())	
		})
})	
it('Check increment with ITAX', function() { // To check Salary slip with earning details and monthly input LOP days.
		cy.wait(3000)
		//cy.get('#globalSearch').clear()
		cy.get('#globalSearch').type(employeeId)
		cy.wait(5000)
		cy.contains('li', 'Incometax test(CY5)').click({force: true})
		cy.wait(2000)
		cy.get('#payroll_detail_tab').click({force: true})
		cy.wait(2000)//#Transaction_Increment
		cy.get('#Transaction_Increment').click({force: true})
		cy.wait(5000)
		cy.get('[onclick="addIncrement()"]').eq(0).click({force: true})
		cy.wait(2000)
		cy.get('#drpMonth').select('June',{force: true})
		cy.wait(2000)
		cy.get('#txtDate').click().then(input => {
		    input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val('01/06/2020')
	    })
		cy.wait(2000)
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
				cy.wait(2000)
				cy.get(".toast-message").click({force: true})
				cy.get('#Utilities_PayrollProcess').click({force: true})
				cy.get('#month').select('June',{force: true})
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
		
				cy.get('#Transaction_Increment').click({force: true})
				cy.wait(10000)
				cy.get('[onclick="addIncrement()"]').eq(0).click({force: true})
				cy.wait(10000)
				//cy.get('a[onclick="addIncrement()"]').eq(0).click({force:true})
				cy.get('#drpMonth').select('June',{force: true})
				cy.wait(2000)
				cy.get('#txtDate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val('01/06/2020')
				})
				cy.wait(2000)
				cy.get('[onclick="proceedIncrement()"]').click({force: true}) 
			
			}
		})	
	}
	})
		cy.get('#Inctdtr1').click({force: true})
		cy.get('#Inctdtr1').clear()
		cy.get('#Inctdtr1').type('90000')
		
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
it('Payroll process with incometax & increment apply month', function() {
		var PayrollProcessMonth='June';
		cy.server()      
		cy.route('POST', 'https://next.pockethrms.com/Payroll/Transaction/PayrollProcessing?prcButton=Process&json=1').as('postComment')
		////cy.get('#globalSearch').clear()
		cy.get('#globalSearch').type(employeeId)
		cy.wait(5000)
		cy.contains('li', 'Incometax test(CY5)').click({force: true})
		cy.wait(5000)
		cy.xpath("//a[@id='payroll_detail_tab']").click({force: true})
		cy.wait(2000)
		cy.get('#Utilities_PayrollProcess').click({force: true})
		cy.wait(2000)
		cy.wait(2000)	
		cy.get("select[id='month']").select(PayrollProcessMonth,{force: true})	
		
		cy.get('#ItaxProcess').not('[disabled]').check({force: true}).should('be.checked')	
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
			cy.wait(2000)	
			cy.get('#inputMonth').select(PayrollProcessMonth,{force: true})
			cy.wait(2000)
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
			cy.wait(2000)
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
			cy.wait(2000)
			cy.get('#Utilities_PayrollProcess').click({force: true})
			cy.wait(2000)
			cy.get('#ItaxProcess').not('[disabled]').check({force: true}).should('be.checked')
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
			//cy.get('#globalSearch').clear()
		cy.get('#globalSearch').type(employeeId)
		cy.wait(5000)
		cy.contains('li', 'Incometax test(CY5)').click({force: true})
		cy.wait(5000)
		
		cy.xpath("//a[@id='payroll_detail_tab']").click({force: true})
		cy.wait(2000)
		cy.get('#Utilities_PayrollProcess').click({force: true})
		cy.wait(2000)
		cy.get("select[id='month']").select(PayrollProcessMonth,{force: true})	
		cy.get('#ItaxProcess').not('[disabled]').check({force: true}).should('be.checked')
		cy.get('#btnProcess').click({force: true})
		cy.wait('@postComment').its('status').should('eq', 200)
		cy.get(".toast-message").invoke('text').then((text) => {
		cy.log(text.trim())
		
		if(text.trim()=='Already Payroll Processed For This Employee')	{
		cy.wait(2000)
		cy.get(".toast-message").click({force: true})
		cy.get('#ItaxProcess').not('[disabled]').check({force: true}).should('be.checked')
		cy.get('#btnProcessDelete').click({force: true})
		cy.wait(2000)
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())
				expect(text.trim()).equal('Payroll Process Deleted Successfully')
		})
		
		cy.wait(2000)
		cy.get(".toast-message").click({force: true})
		cy.get('#ItaxProcess').not('[disabled]').check({force: true}).should('be.checked')
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
		cy.wait(2000)
		cy.get(".toast-message").click({force: true})
		cy.get('#ItaxProcess').not('[disabled]').check({force: true}).should('be.checked')
		cy.get('#btnProcessDelete').click({force: true})
		
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())
				expect(text.trim()).equal('Payroll Process Deleted Successfully')
		})
		cy.wait(2000)
		cy.get(".toast-message").click({force: true})
		cy.get('#ItaxProcess').not('[disabled]').check({force: true}).should('be.checked')
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

it('Check salary slip for ITAX deduction with incremented amount', function() {
		var salarymonth='June';
		cy.get('#salary_detail_tab').click({force: true})
		cy.wait(2000)
		cy.get('#Salary_SalaryDetails').click({force: true})
		//click on salary slip tab
		//cy.get('#drpfromMonth').select('March',{force:true})
		//cy.get('input[onclick="GetSalaryData()"]').click({force:true})
		//cy.xpath('//*[@id="salary_detail"]/div/div[1]/ul/li[3]').click({force: true})
		
		cy.wait(2000)
		cy.get('#drpfromMonth').select('June',{force: true})
		cy.get('[onclick="GetSalaryData()"]').click({force: true})
		cy.wait(5000)
	//	cy.get('#tblEarn').contains('td', '90000.00').should('be.visible');
	//	cy.get('#tblEarn').contains('td', '10000.00').should('be.visible');
	//	cy.get('#tblEarn').contains('td', '1500.00').should('be.visible');
	//	cy.get('#tblDed').contains('td','4387.00').should('be.visible');
	
})	
it('save monthlyinput for specific Emp', function() {
		var monthlyInput='July'
		cy.visit('https://next.pockethrms.com/payroll/transaction/monthlyinput')	
		cy.wait(2000)
		
		cy.get('#categoryId').select(Employeecatagorytype,{force: true})
		cy.get('#inputMonth').select(monthlyInput,{force: true})
		cy.wait(2000)
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
		cy.wait(3000)
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())	
		})
})
it('Declaration Entry for ITAX process', function() {
		cy.wait(5000)
		//cy.get('#globalSearch').clear()
		cy.get('#globalSearch').type(employeeId)
		cy.wait(5000)
		cy.contains('li', 'Incometax test(CY5)').click({force: true})
		//cy.reload()
		cy.wait(5000)
		cy.server()      
		cy.route('POST', 'https://next.pockethrms.com/ITax/Transaction/SaveTaxDeclaration').as('TaxDeclaration')
		cy.get('#itax_detail_tab').click({force:true})
		cy.wait(2000)
		cy.get('#IncomeTax_IncomeTaxDeclaration').click({force:true}) //#IncomeTax_IncomeTaxDeclaration
		//cy.get('button[class="btn-primary"]').contains(text(),).click({force:true})
		cy.contains('button', 'Proceed').click({force: true})
		cy.wait(2000)
		cy.get('#drpEffMonth').select('July',{force:true})
		cy.wait(2000)
		cy.get('#tblData > tbody > tr:nth-child(2) > td:nth-child(4) > input').clear()
		cy.get('#tblData > tbody > tr:nth-child(4) > td:nth-child(4) > input').clear()
		cy.get('#tblData > tbody > tr:nth-child(6) > td:nth-child(4) > input').clear()
		cy.get('#tblData > tbody > tr:nth-child(2) > td:nth-child(4) > input').type('2000')
		cy.get('#tblData > tbody > tr:nth-child(4) > td:nth-child(4) > input').type('7000')
		cy.get('#tblData > tbody > tr:nth-child(6) > td:nth-child(4) > input').type('10000')
		
		cy.wait(2000)
		cy.get('[onclick="return validateTaxDec(this)"]').eq(0).click({force: true})
		cy.wait('@TaxDeclaration').its('status').should('eq', 200)
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())
			expect(text.trim()).equal('Income Tax Declaration Saved Successfully !')
		})
		
})
it('Payroll process with ITAX declaration entry', function() {
		var PayrollProcessMonth='July';
		cy.server()      
		cy.route('POST', 'https://next.pockethrms.com/Payroll/Transaction/PayrollProcessing?prcButton=Process&json=1').as('postComment')
		//cy.get('#globalSearch').clear()
		cy.get('#globalSearch').type(employeeId)
		cy.wait(5000)
		cy.contains('li', 'Incometax test(CY5)').click({force: true})
		cy.wait(5000)
		cy.xpath("//a[@id='payroll_detail_tab']").click({force: true})
		cy.wait(2000)
		cy.get('#Utilities_PayrollProcess').click({force: true})
		cy.wait(2000)
		cy.wait(2000)	
		cy.get("select[id='month']").select(PayrollProcessMonth,{force: true})	
		
		cy.get('#ItaxProcess').not('[disabled]').check({force: true}).should('be.checked')	
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
			cy.wait(2000)	
			cy.get('#inputMonth').select(PayrollProcessMonth,{force: true})
			cy.wait(2000)
			cy.get('[value="View"]').click({force: true})
		
			cy.wait(5000)
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
			cy.wait(2000)
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
			cy.wait(2000)
			cy.get('#Utilities_PayrollProcess').click({force: true})
			cy.wait(2000)
			cy.get('#ItaxProcess').not('[disabled]').check({force: true}).should('be.checked')
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
			//cy.get('#globalSearch').clear()
			cy.get('#globalSearch').type(employeeId)
			cy.wait(3000)
			cy.contains('li', 'Incometax test(CY5)').click({force: true})
			cy.wait(5000)
			
			cy.xpath("//a[@id='payroll_detail_tab']").click({force: true})
			cy.wait(2000)
			cy.get('#Utilities_PayrollProcess').click({force: true})
			cy.wait(2000)
			cy.get("select[id='month']").select(PayrollProcessMonth,{force: true})	
			cy.get('#ItaxProcess').not('[disabled]').check({force: true}).should('be.checked')
			cy.get('#btnProcess').click({force: true})
			cy.wait('@postComment').its('status').should('eq', 200)
			cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())
			
			if(text.trim()=='Already Payroll Processed For This Employee')	{
			cy.wait(2000)
			cy.get(".toast-message").click({force: true})
			cy.get('#ItaxProcess').not('[disabled]').check({force: true}).should('be.checked')
			cy.get('#btnProcessDelete').click({force: true})
			cy.wait(2000)
			cy.get(".toast-message").invoke('text').then((text) => {
				cy.log(text.trim())
					expect(text.trim()).equal('Payroll Process Deleted Successfully')
			})
			
			cy.wait(2000)
			cy.get(".toast-message").click({force: true})
			cy.get('#ItaxProcess').not('[disabled]').check({force: true}).should('be.checked')
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
			cy.wait(5000)
			cy.get(".toast-message").click({force: true})
			cy.get('#ItaxProcess').not('[disabled]').check({force: true}).should('be.checked')
			cy.get('#btnProcessDelete').click({force: true})
			cy.wait(5000)
			cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())
				expect(text.trim()).equal('Payroll Process Deleted Successfully')
		})
			cy.wait(5000)
			cy.get(".toast-message").click({force: true})
			cy.get('#ItaxProcess').not('[disabled]').check({force: true}).should('be.checked')
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

it('Check salary slip for ITAX declaration entry', function() {
		
		cy.get('#salary_detail_tab').click({force: true})
		cy.wait(2000)
		cy.get('#Salary_SalaryDetails').click({force: true})
		
		cy.wait(2000)
		cy.get('#drpfromMonth').select('July',{force: true})
		cy.get('[onclick="GetSalaryData()"]').click({force: true})
		cy.wait(5000)
		cy.get('#tblEarn').contains('td', '90000.00').should('be.visible');
		cy.get('#tblEarn').contains('td', '10000.00').should('be.visible');
		cy.get('#tblEarn').contains('td', '1500.00').should('be.visible');
		//cy.get('#tblDed').contains('td','4387.00').should('be.visible');
	
})	


})