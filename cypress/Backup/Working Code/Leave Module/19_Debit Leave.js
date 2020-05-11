describe('Attendence Process ', function() {
	
		const Day = Cypress.moment().format('DD')
		const Day1 = parseInt(Day)+1
		const Month = Cypress.moment().format('MM')
		const year = Cypress.moment().format('YYYY')
		const currentDate = Day+'/'+Month+'/'+year
		const tomorrowDate = Day1+'/'+Month+'/'+year
		
	var url = 'https://next.pockethrms.com/'
	var employeeCode = 'CY3'
	let leave ={LeaveType: "Paid Leave", FromDate: "06/02/2020", FromDateDay: "FULL DAY", ToDate: "06/02/2020", ToDateDay: "FULL DAY"};
	 
	 var debitLeave = 
		[{LeaveType: "Paid Leave", FromDate: currentDate,  ToDate: currentDate, halfDay: 'No', Remark: 'One day debit Leave'},
		{LeaveType: "Paid Leave", FromDate: currentDate,  ToDate: tomorrowDate, halfDay: 'No', Remark: 'Two day debit Leave'},
		{LeaveType: "Paid Leave", FromDate: currentDate,  ToDate: currentDate, halfDay: 'Yes', Remark: 'half day debit Leave'}
		]
	
	
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
		cy.changeCompany(); 	
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
	})	

	
	it('Set Default Leave Configuration',function(){
	cy.navigate_LeaveSetting()
	cy.set_DefaultLeaveConfiguration('PL')
})

	it('Verify Debit Leave page',function(){
		const { softAssert, softExpect } = chai;
	
		cy.navigate_EmployeeLeave()
		cy.delete_EmployeesAllLeaves()
		for(let j=0; j< debitLeave.length; j++){
			
		cy.xpath("//div[@id='carouselExampleIndicators']//div[@class='card-body body-bg']//h4").each(function(row, i){	
		var num = parseFloat(i+1)
		cy.log("num: "+num)
			
			cy.xpath("//div[@id='carouselExampleIndicators']//div[@class='card-body body-bg']//h4").eq(i).invoke('text').then((text) => {	
			cy.log("text: "+text)
			if(text.trim()==debitLeave[j].LeaveType){
				expect(text).to.eq(debitLeave[j].LeaveType)
				
			cy.xpath("//div[@id='carouselExampleIndicators']//table/tbody/tr[5]/th[2]").eq(i).invoke('text').then((availableLeave) => {	
			cy.log("availableLeave: "+availableLeave)
			
		
		cy.xpath("//div[@id='leaveContentTitle']//i[@class='fas fa-plus']").click({force:true})
		cy.wait(2000)
		cy.xpath("//a[contains(text(),'Debit Leave')]").click({force:true})
		cy.wait(2000)
		
		if(j!= 0)
		{
		//cy.delete_EmployeesDebitLeaves()
		}
		
		cy.get('#drpLeaveType').select(debitLeave[j].LeaveType, {force: true})
		
		cy.wait(3000)
	/*	cy.get('#tdBalance').invoke('text').then((text) => 
		{
		cy.log("text: "+text)			
		softExpect(text.trim()).to.eq(availableLeave.trim());		
			
		})
		*/
		
			cy.get('#txtLeaveDate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(debitLeave[j].FromDate)
			})
	   
			cy.wait(1000)
			cy.get('#ToLeaveDate').click().then(input => {
		    input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(debitLeave[j].ToDate)
			})
		
		cy.get('#txtRemarks').click({force:true})
		cy.get('#txtRemarks').clear()
		cy.get('#txtRemarks').type(debitLeave[j].Remark)
		
		if(debitLeave[j].halfDay == 'Yes')
		{
			cy.get('#dayType').click({force:true})		
		}
		
		cy.get('#btnAddLeaveDebit').click({force:true})
		cy.wait(2000)
		
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())
			softExpect(text.trim()).to.eq('Records Added Successfully!!!');
		})
		
		cy.get("#tableSorter > tbody >tr").each(function(row, k){	
		var num = parseFloat(k+1)
		cy.log("num: "+num)
			
			cy.get("#tableSorter > tbody >tr >td:nth-child(1)").eq(k).invoke('text').then((empCode) => {	
			cy.log("empCode: "+empCode)
			softExpect(empCode.trim()).to.eq(employeeCode);
			})
			
			cy.get("#tableSorter > tbody >tr >td:nth-child(3)").eq(k).invoke('text').then((fromDate) => {	
			cy.log("fromDate: "+fromDate)
			softExpect(fromDate.trim()).to.eq(debitLeave[j].FromDate);
			})
			
			cy.get("#tableSorter > tbody >tr >td:nth-child(4)").eq(k).invoke('text').then((toDate) => {	
			cy.log("toDate: "+toDate)
			softExpect(toDate.trim()).to.eq(debitLeave[j].ToDate);
			})
			
			cy.get("#tableSorter > tbody >tr >td:nth-child(5)").eq(k).invoke('text').then((leaveType) => {	
				cy.log("leaveType: "+leaveType)
				if('Paid Leave'==debitLeave[j].LeaveType)
				{
					softExpect(leaveType.trim()).to.eq('PL');	
				}
			})
			
			cy.get("#tableSorter > tbody >tr >td:nth-child(6)").eq(k).invoke('text').then((leaveDays) => {	
				cy.log("leaveDays: "+leaveDays)
				if(j == 0)
				{
				softExpect(leaveDays.trim()).to.eq('1');
				}
				else if(j == 1)
				{
				softExpect(leaveDays.trim()).to.eq('2');	
				}
				else if(j == 2)
				{
				softExpect(leaveDays.trim()).to.eq('0.5');	
				}	
				})
				
		
		cy.get("#tableSorter > tbody >tr >td:nth-child(7)").eq(k).invoke('text').then((remark) => {	
			cy.log("remark: "+remark)
			softExpect(remark.trim()).to.eq(debitLeave[j].Remark);
			})
			
			cy.delete_EmployeesDebitLeaves()
			
			cy.get('#btnclose').click({force:true})
			cy.wait(2000)
			
			
			//cy.reload()
			cy.get('#leave_detail_tab').click({force:true});
			cy.wait(2000)
		
			//cy.get('#leaveEntryTab').click({force:true})
			//cy.wait(3000)
		
			
			cy.xpath("//div[@id='carouselExampleIndicators']//table/tbody/tr[1]/th[2]").eq(i).invoke('text').then((openingLeave) => {	
				cy.log("openingLeave: "+openingLeave)
				
				cy.xpath("//div[@id='carouselExampleIndicators']//table/tbody/tr[3]/th[2]").eq(i).invoke('text').then((debitLeave) => {	
				cy.log("debitLeave: "+debitLeave)
				
				cy.xpath("//div[@id='carouselExampleIndicators']//table/tbody/tr[4]/th[2]").eq(i).invoke('text').then((usedLeave) => {	
				cy.log("usedLeave: "+usedLeave)
				
				cy.xpath("//div[@id='carouselExampleIndicators']//table/tbody/tr[5]/th[2]").eq(i).invoke('text').then((availableLeave) => {	
				cy.log("availableLeave: "+availableLeave)
				
			/*	if(j == 0)
				{
				softExpect(debitLeave.trim()).to.eq('1');
				}
				else if(j == 1)
				{
				softExpect(debitLeave.trim()).to.eq('2');	
				}
				else if(j == 2)
				{
				softExpect(debitLeave.trim()).to.eq('0.5');	
				}	
				
				*/
				
				var leaveResult = parseFloat(openingLeave) - parseFloat(usedLeave)  - parseFloat(debitLeave)
				softExpect(parseFloat(leaveResult)).to.eq(parseFloat(availableLeave));				
				})
				})
				})	
				})			
		})
			})		
			}
			
			})
			
		})
		cy.wait(5000)
		}
		
			
})


	
	
	
})