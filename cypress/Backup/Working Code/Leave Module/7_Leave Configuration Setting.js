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
	
	let holiday_LeaveSetting ={LeaveType: "Paid Leave", 
	FromDateBeforeHoliday: "13/04/2020", FromDateDay: "FULL DAY", ToDateAfterHoliday: "15/04/2020", ToDateDay: "FULL DAY", 
	Remark: "Holiday Leave Setting", totalUsedLeave:3};
	
	let weekOff_LeaveSetting ={LeaveType: "Paid Leave", 
	FromDateBeforeWeekOff: "10/04/2020", FromDateDay: "FULL DAY", ToDateAfterWeekOff: "13/04/2020", ToDateDay: "FULL DAY", 
	Remark: "WeekOff Leave Setting", totalUsedLeave:4};
	
	
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
	

	it('(c) Verify System consider intervening holidays as leave.',function() {
		const { softAssert, softExpect } = chai;
		let weekOff =['should','should not']
		cy.log(weekOff.length)
		for(let j=0; j< weekOff.length; j++){
			cy.navigate_LeaveSetting()
		cy.set_DefaultLeaveConfiguration(holiday_LeaveSetting.LeaveType)
			
			cy.get('#Leave_LeaveConfiguration').click({force:true})
			cy.wait(8000)
			cy.get('#ddLeavType').select(holiday_LeaveSetting.LeaveType)
			cy.wait(2000)
			if(j==0){
				cy.get('#ddInterHolidays').select('should')
			}
			else
			{
				cy.get('#ddInterHolidays').select('should not')
			}
			cy.get('#btnSave').click()
			
			cy.wait(3000)
			cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())
			expect(text.trim()).equal('Data saved successfully.!')		
			})
			
		cy.navigate_EmployeeLeave()
		cy.delete_EmployeesAllLeaves()
		cy.wait(5000)
		
		cy.xpath("//div[@id='carouselExampleIndicators']//div[@class='card-body body-bg']//h4").each(function(row, i){	
		var num = parseFloat(i+1)
		cy.log("num: "+num)
		
		cy.xpath("//div[@id='carouselExampleIndicators']//div[@class='card-body body-bg']//h4").eq(i).invoke('text').then((text) => {	
		cy.log("text: "+text)
			if(text.trim()==holiday_LeaveSetting.LeaveType.trim()){

				expect(text).to.eq(holiday_LeaveSetting.LeaveType.trim())
		
	
		cy.xpath("//div[@id='carouselExampleIndicators']//table/tbody/tr[5]/th[2]").eq(i).invoke('text').then((availableLeave) => {	
		cy.log("availableLeave: "+availableLeave)
		
		
		if(availableLeave <=1)
		{
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
				input.val(holiday_LeaveSetting.FromDateBeforeHoliday)
				
			})
	   
			cy.wait(1000)
			cy.get('#todate').click().then(input => {
		    input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(holiday_LeaveSetting.ToDateAfterHoliday)
			})
	
		cy.wait(1000)
		cy.get('#drpFromDayType').select(holiday_LeaveSetting.FromDateDay,{force: true})
		cy.get('#drpToDayType').select(holiday_LeaveSetting.ToDateDay,{force: true})
		cy.get('#leaveType').select(holiday_LeaveSetting.LeaveType,{force: true})
		
		cy.get('#remarks').click({force: true})
		cy.get('#remarks').clear()
		cy.get('#remarks').type(holiday_LeaveSetting.Remark);
		
		cy.wait(3000)
		cy.get('#btnAddLeave').click({force: true})
		cy.wait(5000)
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())
		
				softExpect(text.trim()).to.eq('Leave Updated Successfully');
				cy.get('#btnclose').click({force: true})
				
		})
		
		
		cy.wait(20000)
				
			
			cy.xpath("//div[@id='carouselExampleIndicators']//table/tbody/tr[1]/th[2]").eq(i).invoke('text').then((openingLeave) => {	
				cy.log("openingLeave: "+openingLeave)
				
				cy.xpath("//div[@id='carouselExampleIndicators']//table/tbody/tr[3]/th[2]").eq(i).invoke('text').then((debitLeave) => {	
				cy.log("debitLeave: "+debitLeave)
				
				cy.xpath("//div[@id='carouselExampleIndicators']//table/tbody/tr[4]/th[2]").eq(i).invoke('text').then((usedLeave) => {	
				cy.log("usedLeave: "+usedLeave)
				
				cy.xpath("//div[@id='carouselExampleIndicators']//table/tbody/tr[5]/th[2]").eq(i).invoke('text').then((availableLeave) => {	
				cy.log("availableLeave: "+availableLeave)
				
				if(j == 0)
				{
				softExpect(parseFloat(usedLeave.trim())).to.eq(holiday_LeaveSetting.totalUsedLeave);
				}
				else if(j == 1)
				{
				softExpect(parseFloat(usedLeave.trim())).to.eq(holiday_LeaveSetting.totalUsedLeave-1);	
				}	
				
				var leaveResult = parseFloat(openingLeave) - parseFloat(usedLeave)  - parseFloat(debitLeave)
				softExpect(parseFloat(leaveResult)).to.eq(parseFloat(availableLeave));				
				})
				})
				})	
				})			
		
			
		cy.get(".mb-lg-0 >div>h5").eq(0).invoke('text').then((leaveType) => {	
				cy.log("leaveType: "+leaveType)
				if('Paid Leave'==holiday_LeaveSetting.LeaveType)
				{
					softExpect(leaveType).to.eq('PL');	
				}
				})
				
				cy.get(".mb-lg-0 >div>p").eq(1).invoke('text').then((leaveDate) => {	
				cy.log("leaveDate: "+leaveDate)
				softExpect(leaveDate).to.eq(holiday_LeaveSetting.FromDateBeforeHoliday+' - '+holiday_LeaveSetting.ToDateAfterHoliday);	
				})
				
				cy.get(".mb-lg-0 >div>p").eq(2).invoke('text').then((leaveDay) => {	
				cy.log("leaveDay: "+leaveDay)
				if(holiday_LeaveSetting.FromDateDay == 'FULL DAY')
				{
				softExpect(leaveDay).to.eq(' FullDay - FullDay');	
				}
				else if(holiday_LeaveSetting.FromDateDay == 'FIRST HALF DAY')
				{
				softExpect(leaveDay).to.eq(' FirstHalf - FirstHalf');	
				}
				else if(holiday_LeaveSetting.FromDateDay == 'SECOND HALF DAY')
				{
				softExpect(leaveDay).to.eq(' SecondHalf - SecondHalf');	
				}	
				})
				
				cy.get(".mb-lg-0 >div>p").eq(3).invoke('text').then((leaveDays) => {	
				cy.log("leaveDays: "+leaveDays)
				if(holiday_LeaveSetting.FromDateDay == 'FULL DAY')
				{
					
				if(j == 0)
				{
				softExpect(parseFloat(leaveDays.trim())).to.eq(holiday_LeaveSetting.totalUsedLeave);
				}
				else if(j == 1)
				{
				softExpect(parseFloat(leaveDays.trim())).to.eq(holiday_LeaveSetting.totalUsedLeave-1);	
				}	
				
				}
				else if(holiday_LeaveSetting.FromDateDay == 'FIRST HALF DAY')
				{
				softExpect(leaveDays).to.eq('0.5');	
				}
				else if(lholiday_LeaveSetting.FromDateDay == 'SECOND HALF DAY')
				{
				softExpect(leaveDays).to.eq('0.5');	
				}	
				})
				
				
			//}
			
	
		})
		}
		})			
		}) 		
		
		}	
		
	})	

	
	it('(i) Verify Intervening Weekoff be considered as Leave.',function() {
		const { softAssert, softExpect } = chai;
		let weekOff =['should','should not']
		cy.log(weekOff.length)
		for(let j=0; j< weekOff.length; j++){
			cy.navigate_LeaveSetting()
		cy.set_DefaultLeaveConfiguration(weekOff_LeaveSetting.LeaveType)
			
			cy.get('#Leave_LeaveConfiguration').click({force:true})
			cy.wait(8000)
			cy.get('#ddLeavType').select(weekOff_LeaveSetting.LeaveType)
			cy.wait(2000)
			if(j==0){
				cy.get('#ddInterWeekOff').select('should')
			}
			else
			{
				cy.get('#ddInterWeekOff').select('should not')
			}
			cy.get('#btnSave').click()
			
			cy.wait(3000)
			cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())
			expect(text.trim()).equal('Data saved successfully.!')		
			})
			
		cy.navigate_EmployeeLeave()
		cy.delete_EmployeesAllLeaves()
		cy.wait(5000)
		
		cy.xpath("//div[@id='carouselExampleIndicators']//div[@class='card-body body-bg']//h4").each(function(row, i){	
		var num = parseFloat(i+1)
		cy.log("num: "+num)
		
		cy.xpath("//div[@id='carouselExampleIndicators']//div[@class='card-body body-bg']//h4").eq(i).invoke('text').then((text) => {	
		cy.log("text: "+text)
			if(text.trim()==weekOff_LeaveSetting.LeaveType.trim()){

				expect(text).to.eq(weekOff_LeaveSetting.LeaveType.trim())
		
	
		cy.xpath("//div[@id='carouselExampleIndicators']//table/tbody/tr[5]/th[2]").eq(i).invoke('text').then((availableLeave) => {	
		cy.log("availableLeave: "+availableLeave)
		
		
		if(availableLeave <=1)
		{
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
				input.val(weekOff_LeaveSetting.FromDateBeforeWeekOff)
				
			})
	   
			cy.wait(1000)
			cy.get('#todate').click().then(input => {
		    input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(weekOff_LeaveSetting.ToDateAfterWeekOff)
			})
	
		cy.wait(1000)
		cy.get('#drpFromDayType').select(weekOff_LeaveSetting.FromDateDay,{force: true})
		cy.get('#drpToDayType').select(weekOff_LeaveSetting.ToDateDay,{force: true})
		cy.get('#leaveType').select(weekOff_LeaveSetting.LeaveType,{force: true})
		
		cy.get('#remarks').click({force: true})
		cy.get('#remarks').clear()
		cy.get('#remarks').type(weekOff_LeaveSetting.Remark);
		
		cy.wait(3000)
		cy.get('#btnAddLeave').click({force: true})
		cy.wait(5000)
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())
		
				softExpect(text.trim()).to.eq('Leave Updated Successfully');
				cy.get('#btnclose').click({force: true})
				
		})
		
		
		cy.wait(20000)
				
			
			cy.xpath("//div[@id='carouselExampleIndicators']//table/tbody/tr[1]/th[2]").eq(i).invoke('text').then((openingLeave) => {	
				cy.log("openingLeave: "+openingLeave)
				
				cy.xpath("//div[@id='carouselExampleIndicators']//table/tbody/tr[3]/th[2]").eq(i).invoke('text').then((debitLeave) => {	
				cy.log("debitLeave: "+debitLeave)
				
				cy.xpath("//div[@id='carouselExampleIndicators']//table/tbody/tr[4]/th[2]").eq(i).invoke('text').then((usedLeave) => {	
				cy.log("usedLeave: "+usedLeave)
				
				cy.xpath("//div[@id='carouselExampleIndicators']//table/tbody/tr[5]/th[2]").eq(i).invoke('text').then((availableLeave) => {	
				cy.log("availableLeave: "+availableLeave)
				
				if(j == 0)
				{
				softExpect(parseFloat(usedLeave.trim())).to.eq(weekOff_LeaveSetting.totalUsedLeave);
				}
				else if(j == 1)
				{
				softExpect(parseFloat(usedLeave.trim())).to.eq(weekOff_LeaveSetting.totalUsedLeave-2);	
				}	
				
				var leaveResult = parseFloat(openingLeave) - parseFloat(usedLeave)  - parseFloat(debitLeave)
				softExpect(parseFloat(leaveResult)).to.eq(parseFloat(availableLeave));				
				})
				})
				})	
				})			
		
			
		cy.get(".mb-lg-0 >div>h5").eq(0).invoke('text').then((leaveType) => {	
				cy.log("leaveType: "+leaveType)
				if('Paid Leave'==weekOff_LeaveSetting.LeaveType)
				{
					softExpect(leaveType).to.eq('PL');	
				}
				})
				
				cy.get(".mb-lg-0 >div>p").eq(1).invoke('text').then((leaveDate) => {	
				cy.log("leaveDate: "+leaveDate)
				softExpect(leaveDate).to.eq(weekOff_LeaveSetting.FromDateBeforeWeekOff+' - '+weekOff_LeaveSetting.ToDateAfterWeekOff);	
				})
				
				cy.get(".mb-lg-0 >div>p").eq(2).invoke('text').then((leaveDay) => {	
				cy.log("leaveDay: "+leaveDay)
				if(weekOff_LeaveSetting.FromDateDay == 'FULL DAY')
				{
				softExpect(leaveDay).to.eq(' FullDay - FullDay');	
				}
				else if(weekOff_LeaveSetting.FromDateDay == 'FIRST HALF DAY')
				{
				softExpect(leaveDay).to.eq(' FirstHalf - FirstHalf');	
				}
				else if(weekOff_LeaveSetting.FromDateDay == 'SECOND HALF DAY')
				{
				softExpect(leaveDay).to.eq(' SecondHalf - SecondHalf');	
				}	
				})
				
				cy.get(".mb-lg-0 >div>p").eq(3).invoke('text').then((leaveDays) => {	
				cy.log("leaveDays: "+leaveDays)
				if(weekOff_LeaveSetting.FromDateDay == 'FULL DAY')
				{
					
				if(j == 0)
				{
				softExpect(parseFloat(leaveDays.trim())).to.eq(weekOff_LeaveSetting.totalUsedLeave);
				}
				else if(j == 1)
				{
				softExpect(parseFloat(leaveDays.trim())).to.eq(weekOff_LeaveSetting.totalUsedLeave-2);	
				}	
				
				}
				else if(weekOff_LeaveSetting.FromDateDay == 'FIRST HALF DAY')
				{
				softExpect(leaveDays).to.eq('0.5');	
				}
				else if(weekOff_LeaveSetting.FromDateDay == 'SECOND HALF DAY')
				{
				softExpect(leaveDays).to.eq('0.5');	
				}	
				})
				
				
			//}
			
	
		})
		}
		})			
		}) 		
		
		}	
		
	})	
	
	
})