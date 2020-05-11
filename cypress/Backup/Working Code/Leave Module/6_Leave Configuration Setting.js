describe('Attendence Process ', function() {
	
		const Day = Cypress.moment().format('DD')
		const Day1 = parseInt(Day)+1
		const Month = Cypress.moment().format('MM')
		const year = Cypress.moment().format('YYYY')
		const currentDate = Day+'/'+Month+'/'+year
		const tomorrowDate = Day1+'/'+Month+'/'+year
		
	
	var url = 'https://next.pockethrms.com/'
	var company='CTest_25'
	var employeeCode = 'CY3'
	
	
	let leave_ConsecutiveDays = 
	[{LeaveType: "Paid Leave", FromDate: "06/04/2020", FromDateDay: "FULL DAY", ToDate: "06/04/2020", ToDateDay: "FULL DAY"},
	{LeaveType: "COFF", FromDate: "07/04/2020", FromDateDay: "FULL DAY", ToDate: "07/04/2020", ToDateDay: "FULL DAY"} ]
	
	
	
	
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
	
	
	Cypress.Commands.add('navigate_EmployeeProfile',()=>{
     cy.wait(1000)
		cy.get('#globalSearch').click({force: true})		
		cy.get('#globalSearch').clear()
		cy.get('#globalSearch').type(employeeCode)
		cy.wait(2000)
		cy.contains('li', employeeCode).click({force: true})
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
		
	Cypress.Commands.add('set_DefaultLeaveConfiguration',(LeaveType)=>{
		cy.get('#Leave_LeaveConfiguration').click({force:true})
		cy.wait(8000)
		
		cy.get('#ddLeavType').select(LeaveType)
		cy.wait(2000)
		
		cy.get('#btnDelete').click({force:true})
		cy.wait(3000)
			cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())
			expect(text.trim()).equal('Data deleted successfully.!')		
			})
	})
	
	it('(l) Verify Multiple leaves on consecutive days',function() {
			const { softAssert, softExpect } = chai;
		
			let  multipleLeaves =['should not', 'should']
			
			cy.log("multipleLeaves: "+ multipleLeaves.length)
		for(let j=0; j< multipleLeaves.length; j++){
			
			cy.navigate_LeaveSetting()
			cy.get('#Leave_LeaveConfiguration').click({force:true})
			cy.wait(8000)
			
			
			
			cy.log("leave_ConsecutiveDays: "+leave_ConsecutiveDays.length)
			
		for(let k=0; k< leave_ConsecutiveDays.length; k++){
			
							
			cy.set_DefaultLeaveConfiguration(leave_ConsecutiveDays[k].LeaveType)
			cy.wait(5000)
			
			
			cy.get('#ddLeavType').select(leave_ConsecutiveDays[k].LeaveType)
			cy.wait(2000)
			if(j==0){
				cy.get('#ddMultipleLeaves').select('should not')
			}
			else
			{
				cy.get('#ddMultipleLeaves').select('should')
			}
			cy.get('#btnSave').click()
			
			cy.wait(3000)
			cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())
			//expect(text.trim()).equal('Data saved successfully.!')
			softExpect(text.trim()).to.eq('Data saved successfully.!');	
			
			})
		} // Close K loop
		
			cy.navigate_EmployeeLeave()
			cy.delete_EmployeesAllLeaves()
		
		for(let k=0; k< leave_ConsecutiveDays.length; k++){
		cy.wait(5000)	
		cy.xpath("//div[@id='carouselExampleIndicators']//div[@class='card-body body-bg']//h4").each(function(row, i){	
			var num = parseFloat(i+1)
			cy.log("num: "+num)
		
		cy.xpath("//div[@id='carouselExampleIndicators']//div[@class='card-body body-bg']//h4").eq(i).invoke('text').then((text) => {	
			cy.log("text: "+text)
		if(text.trim()==leave_ConsecutiveDays[k].LeaveType.trim()){

				softExpect(text.trim()).to.eq(leave_ConsecutiveDays[k].LeaveType.trim());	
	
			cy.xpath("//div[@id='carouselExampleIndicators']//table/tbody/tr[5]/th[2]").eq(i).invoke('text').then((availableLeave) => {	
			cy.log("availableLeave: "+availableLeave)
		
		
		if(availableLeave <=1){
			cy.get('.fa-ellipsis-v').eq(i-1).click({force: true})
			cy.wait(3000)
			cy.get('#LeaveOpen').click({force: true})
			cy.get('#LeaveOpen').clear()
			cy.get('#LeaveOpen').type('20');
			
			cy.get('#saveloader').click({force: true})
			cy.wait(10000)
		}
			
				cy.wait(3000)	
				cy.xpath("//div[@id='leaveContentTitle']//i[@class='fas fa-plus']").click()
				cy.wait(2000)
				cy.get('#fromdate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))			
				input.val(leave_ConsecutiveDays[k].FromDate)
				
			})
	   
			cy.wait(1000)
			cy.get('#todate').click().then(input => {
		    input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(leave_ConsecutiveDays[k].ToDate)
			})
	
		cy.wait(1000)
		cy.get('#drpFromDayType').select(leave_ConsecutiveDays[k].FromDateDay,{force: true})
		cy.get('#drpToDayType').select(leave_ConsecutiveDays[k].ToDateDay,{force: true})
		cy.get('#leaveType').select(leave_ConsecutiveDays[k].LeaveType,{force: true})
		
		cy.get('#remarks').click({force: true})
		cy.get('#remarks').clear()
		cy.get('#remarks').type('Festival !.');
		
		cy.wait(3000)
		cy.get('#btnAddLeave').click({force: true})
		cy.wait(5000)
		cy.log("j: "+j)
		cy.log("k: "+k)
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())
			
			if(j==0){
				
			if(k==0){
				softExpect(text.trim()).to.eq('Leave Updated Successfully');	
				cy.get('#btnclose').click({force: true})				
			}
			else{
				softExpect(text.trim()).to.eq('You are not allowed to take different type of Leave in consecutive days.');		
				cy.get('#btnclose').click({force: true})
				//cy.xpath("//button[contains(@class,'btn btn-xs btn-danger')]").click({force: true})
			}
			}
			else{
				softExpect(text.trim()).to.eq('Leave Updated Successfully');
				cy.get('#btnclose').click({force: true})
			}
			
		})
		
		cy.wait(5000)
		
	
		})
		}
		})			
		}) 		
		
		}
		}	
		
	})	


	
	
})