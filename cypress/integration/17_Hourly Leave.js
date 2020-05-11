describe('Attendence Process ', function() {
	
		const Day = Cypress.moment().format('DD')
		const Day1 = parseInt(Day)+1
		const Month = Cypress.moment().format('MM')
		const year = Cypress.moment().format('YYYY')
		const currentDate = Day+'/'+Month+'/'+year
		const tomorrowDate = Day1+'/'+Month+'/'+year
		
	var url = 'https://next.pockethrms.com/'
	var company='CTest_25'
	var employeeID = 'CY3'
	var PayrollProcessMonth=''	
	var EmpLengthInMonthlyInput= ''
		
	let hourlyLeave = 
    {LeaveType: "SpecialLeave" , EntryDate: currentDate, InDate_HH: "9", InDate_MM: "00", OutDate_HH: "10", OutDate_MM: "00", Minute: "60"}
	
			 
	
	before(function() {
    	cy.clearCookie('.AspNetCore.Antiforgery.IT8a6MuPYuY', '.AspNetCore.Session','.AspNetCore.Mvc.CookieTempDataProvider','new_username','FavouriteMenus') 
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
		cy.changeCompany() 	
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
	
	Cypress.Commands.add('navigate_LeaveSetting',()=>{
    
			cy.wait(1000)
			cy.visit(url+'Settings/Employee/Index?module=organization&submodule=smtpsettings')
			cy.get('#leave_detail_tab').click({force:true})
			cy.wait(3000)
	})
	
	Cypress.Commands.add('delete_EmployeesAllLeaves',()=>{
		
		cy.get("i").then(($sp) => {
			var result = $sp.hasClass('text-danger')
			cy.log(result)
		if ($sp.hasClass('text-danger')) {
		
		cy.get('.text-danger').then(listing => {
			var leavelength = Cypress.$(listing).length;
			cy.log("leavelength: "+leavelength)
			
			if(leavelength != 0){		
			cy.get('.text-danger').eq(0).click()
			cy.wait(5000)
			}
			
			if(leavelength != 1)
			{
			cy.delete_EmployeesAllLeaves()
			}		
		})   	
		} 
		else {		
		}
		})	
	})
	
	Cypress.Commands.add('delete_EmployeesDebitLeaves',()=>{
	cy.get('div').then(($sp) => {
		if ($sp.is('#debitedLeaves')) {
			
		cy.get('#tableSorter > tbody >tr').then(listing => {
			var rowlength = Cypress.$(listing).length;
			if(rowlength != 0)
			{
				cy.get('#tableSorter > tbody >tr:nth-child(1) >td:nth-child(8) > button').click()
				cy.wait(3000)
			}
			if(rowlength != 1)
			{
			cy.delete_EmployeesDebitLeaves()
			}	
		})
		
		} 
		})	
		
		
		})	
		
	it('Verify From time should be less than to time',function(){
	const { softAssert, softExpect } = chai;
	
		cy.navigate_EmployeeLeave()	
		cy.delete_EmployeesAllLeaves()	
		cy.wait(5000)
				
				cy.xpath("//div[@id='leaveContentTitle']//i[@class='fas fa-plus']").click({force:true})
				cy.wait(2000)
				cy.get('#leaveType').select(hourlyLeave.LeaveType)
				cy.wait(2000)
				
				cy.get('#entryDate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(hourlyLeave.EntryDate)
			})
				
						cy.get('#FromHours').click({force: true})
						cy.get('#FromHours').clear()
						cy.get('#FromHours').type(hourlyLeave.OutDate_HH)	 
						
						cy.get('#FromMins').click({force: true})
						cy.get('#FromMins').clear()
						cy.get('#FromMins').type(hourlyLeave.InDate_MM)	
						
						cy.get('#ToHours').click({force: true})
						cy.get('#ToHours').clear()
						cy.get('#ToHours').type(hourlyLeave.InDate_HH)	
						
						cy.get('#ToMins').click({force: true})
						cy.get('#ToMins').clear()
						cy.get('#ToMins').type(hourlyLeave.OutDate_MM)	
		cy.wait(3000)
		cy.get('#btnAddLeave').click({force: true})
		cy.wait(3000)
		
		cy.get(".toast-message").invoke('text').then((text) => {		
			cy.log(text.trim())
			softExpect(text.trim()).to.eq('From time should be less than to time');
		})	
		
				cy.wait(2000)
				cy.get('#leaveType').select(hourlyLeave.LeaveType)
				cy.wait(2000)
				
				cy.get('#entryDate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(hourlyLeave.EntryDate)
			})
				
						cy.get('#FromHours').click({force: true})
						cy.get('#FromHours').clear()
						cy.get('#FromHours').type(hourlyLeave.InDate_HH)	 
						
						cy.get('#FromMins').click({force: true})
						cy.get('#FromMins').clear()
						cy.get('#FromMins').type(hourlyLeave.InDate_MM)	
						
						cy.get('#ToHours').click({force: true})
						cy.get('#ToHours').clear()
						cy.get('#ToHours').type(hourlyLeave.OutDate_HH)	
						
						cy.get('#ToMins').click({force: true})
						cy.get('#ToMins').clear()
						cy.get('#ToMins').type(hourlyLeave.OutDate_MM)	
		cy.wait(3000)
		cy.get('#btnAddLeave').click({force: true})
		cy.wait(3000)
		
		cy.get(".toast-message").invoke('text').then((text) => {		
			cy.log(text.trim())
			softExpect(text.trim()).to.eq('Hourly Leave Updated Successfully');
		})	
		
		cy.get('#btnclose').click({force: true})
		cy.wait(2000)
		
					
				cy.get(".mb-lg-0 >div>h5").eq(0).invoke('text').then((leaveType) => {	
				cy.log("leaveType: "+leaveType)
				softExpect(leaveType).to.eq(hourlyLeave.LeaveType);	
				})
				
				cy.get(".mb-lg-0 >div>p").eq(1).invoke('text').then((leaveDate) => {	
				cy.log("leaveDate: "+leaveDate)
				softExpect(leaveDate).to.eq(hourlyLeave.EntryDate);	
				})
				
				
				cy.get(".mb-lg-0 >div>p").eq(3).invoke('text').then((leaveMin) => {	
				cy.log("leaveMin: "+leaveMin)
				softExpect(leaveMin).to.eq(hourlyLeave.Minute);	
				})
				
		})
		
	it('If leave is already applied within same time frame then it will not allowed',function(){
	const { softAssert, softExpect } = chai;
	
				
				cy.xpath("//div[@id='leaveContentTitle']//i[@class='fas fa-plus']").click({force:true})
				cy.wait(2000)
			
				cy.get('#leaveType').select(hourlyLeave.LeaveType)
				cy.wait(2000)
				cy.get('#entryDate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(hourlyLeave.EntryDate)
			})
				
						cy.get('#FromHours').click({force: true})
						cy.get('#FromHours').clear()
						cy.get('#FromHours').type(hourlyLeave.InDate_HH)	 
						
						cy.get('#FromMins').click({force: true})
						cy.get('#FromMins').clear()
						cy.get('#FromMins').type(hourlyLeave.InDate_MM)	
						
						cy.get('#ToHours').click({force: true})
						cy.get('#ToHours').clear()
						cy.get('#ToHours').type(hourlyLeave.OutDate_HH)	
						
						cy.get('#ToMins').click({force: true})
						cy.get('#ToMins').clear()
						cy.get('#ToMins').type(hourlyLeave.OutDate_MM)	
		cy.wait(3000)
		cy.get('#btnAddLeave').click({force: true})
		cy.wait(3000)
		
		cy.get(".toast-message").invoke('text').then((text) => {		
			cy.log(text.trim())
			softExpect(text.trim()).to.eq('Entry Alreay Exists Within Same Time Frame');
		})	
		
		cy.get('#btnclose').click({force: true})
		cy.wait(2000)
		
				
		})
		
	it('Navigate to Payroll Process', function() {
		
		cy.visit('https://next.pockethrms.com/payroll/transaction/payrollprocessing')
		cy.waitUntil(() => cy.server().should((server) => {expect(server.status).to.eq(200)}))
		//cy.wait(1000)
	})	
	
	it('Do Payroll Process', function() {	
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
			cy.visit('https://next.pockethrms.com/payroll/transaction/monthlyinput')	
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
					if(text.trim()==employeeID)
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
	
	
	/*	cy.xpath("//span[@class='menu-name'][contains(text(),'Employee')]").click({force: true})
		
		cy.xpath("//u[contains(text(),'"+employeeID+"')]").click({force: true})
		cy.wait(5000)
		cy.get('.page-title').should('contain','Employee Profile')
		cy.wait(2000)
	*/

	cy.wait(1000)
		cy.get('#globalSearch').click({force: true})		
		cy.get('#globalSearch').clear()
		cy.get('#globalSearch').type(employeeID)
		cy.wait(2000)
		cy.contains('li', employeeID).click({force: true})
		cy.wait(3000)		
		
		cy.xpath("//a[@id='payroll_detail_tab']").click({force: true})
		cy.wait(1000)
		cy.get('#Utilities_PayrollProcess').click({force: true})
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
		cy.visit('https://next.pockethrms.com/payroll/transaction/PaysheetLock')	
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
			
		cy.visit('https://next.pockethrms.com/payroll/transaction/payrollprocessing')
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
	
	it('Leave Cannot be Applied,Payroll Completed for Current Month',function(){
	const { softAssert, softExpect } = chai;
		cy.navigate_EmployeeLeave()
				
				cy.xpath("//div[@id='leaveContentTitle']//i[@class='fas fa-plus']").click({force:true})
				cy.wait(2000)
			
				cy.get('#leaveType').select(hourlyLeave.LeaveType,{force: true})
				
				cy.get('#entryDate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(hourlyLeave.EntryDate)
			})
				
						cy.get('#FromHours').click({force: true})
						cy.get('#FromHours').clear()
						cy.get('#FromHours').type(hourlyLeave.InDate_HH)	 
						
						cy.get('#FromMins').click({force: true})
						cy.get('#FromMins').clear()
						cy.get('#FromMins').type(hourlyLeave.InDate_MM)	
						
						cy.get('#ToHours').click({force: true})
						cy.get('#ToHours').clear()
						cy.get('#ToHours').type(hourlyLeave.OutDate_HH)	
						
						cy.get('#ToMins').click({force: true})
						cy.get('#ToMins').clear()
						cy.get('#ToMins').type(hourlyLeave.OutDate_MM)	
		cy.wait(3000)
		cy.get('#btnAddLeave').click({force: true})
		cy.wait(3000)
		
		cy.get(".toast-message").invoke('text').then((text) => {		
			cy.log(text.trim())
			softExpect(text.trim()).to.eq('Leave Cannot be Applied,Payroll Completed for '+PayrollProcessMonth+' Month');
		})	
		
		cy.get('#btnclose').click({force: true})
		cy.wait(2000)				
		})
	
	it('Navigate to Payroll Process', function() {
		
		cy.visit('https://next.pockethrms.com/payroll/transaction/payrollprocessing')
		cy.waitUntil(() => cy.server().should((server) => {expect(server.status).to.eq(200)}))
		//cy.wait(1000)
	})
	
	it('Delete Payroll Process', function() {	
		cy.contains('button', 'Single Employee').click({force: true})	
		
		cy.get('input[type="search"]').click({force: true})
		cy.get('input[type="search"]').type(employeeID)
		cy.wait(1000)
		cy.get('.select2-results__option--highlighted').click({force: true})
		cy.get("select[id='month']").then($input => {
                                 PayrollProcessMonth=  $input.val();
                                 
                                 cy.log("PayrollProcessMonth: "+PayrollProcessMonth);
                        })
						
		cy.get('#deletePayroll').click({force: true})
		
		cy.get(".alert-text").invoke('text').then((text) => {
				cy.log(text.trim())
				expect(text.trim()).equal('Payroll Process Deleted Successfully')
		})
		cy.wait(1000)
		
	
		
		
		
	})
	
	
		
})