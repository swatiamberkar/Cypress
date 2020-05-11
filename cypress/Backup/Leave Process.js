describe('Attendence Process ', function() {
	
		const Day = Cypress.moment().format('DD')
		const Day1 = parseInt(Day)+1
		const Month = Cypress.moment().format('MM')
		const year = Cypress.moment().format('YYYY')
		const currentDate = Day+'/'+Month+'/'+year
		const tomorrowDate = Day1+'/'+Month+'/'+year
		
	/*	const Day = Cypress.moment().format('DD')
		cy.log("Day: "+Day)
		const Day1 = parseInt(Day)+1
		cy.log("Day1: "+Day1)
		const Month = Cypress.moment().format('MM')
		cy.log("Month: "+Month)
		const year = Cypress.moment().format('YYYY')
		cy.log("year: "+year)
		const currentDate = Day+'/'+Month+'/'+year
		cy.log("currentDate: "+currentDate)
		const tomorrowDate = Day1+'/'+Month+'/'+year
		cy.log("tomorrowDate: "+tomorrowDate)
		*/
	var url = 'https://next.pockethrms.com/'
	var company='SwTest_25'
	var employeeCode = 'CY3'
	let leave ={LeaveType: "Paid Leave", FromDate: "06/02/2020", FromDateDay: "FULL DAY", ToDate: "06/02/2020", ToDateDay: "FULL DAY"};
	 
	let leaveSetting ={LeaveType: "Paid Leave", MaximumLeaveInMonth: "4", 
	FromDate: "04/02/2020", FromDateDay: "FULL DAY", ToDate: "07/02/2020", ToDateDay: "FULL DAY", ToDate1: "08/02/2020", 
	WeekOff_Date1: "16/02/2020", WeekOff_Date2: "23/02/2020", Holiday: "15/02/2020",
	previous_Date: "21/02/2020" };
	
	let leave_ConsecutiveDays = 
	[{LeaveType: "Paid Leave", FromDate: "06/02/2020", FromDateDay: "FULL DAY", ToDate: "06/02/2020", ToDateDay: "FULL DAY"},
	{LeaveType: "Compensentory off", FromDate: "07/02/2020", FromDateDay: "FULL DAY", ToDate: "07/02/2020", ToDateDay: "FULL DAY"} ]
	
	let holiday_LeaveSetting ={LeaveType: "Paid Leave", 
	FromDateBeforeHoliday: "12/02/2020", FromDateDay: "FULL DAY", ToDateAfterHoliday: "14/02/2020", ToDateDay: "FULL DAY", 
	Remark: "Holiday Leave Setting", totalUsedLeave:3};
	
	let weekOff_LeaveSetting ={LeaveType: "Paid Leave", 
	FromDateBeforeWeekOff: "15/02/2020", FromDateDay: "FULL DAY", ToDateAfterWeekOff: "17/02/2020", ToDateDay: "FULL DAY", 
	Remark: "WeekOff Leave Setting", totalUsedLeave:3};
	
	
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
		
	/*	cy.get('#txtMaxOpen').click({force:true})
		cy.get('#txtMaxOpen').clear()
		cy.get('#txtMaxOpen').type('0')
		
		cy.get('#ddInterHolidays').select('- Select -')
		cy.wait(1000)
		
		cy.get('#txtCarry').click({force:true})
		cy.get('#txtCarry').clear()
		cy.get('#txtCarry').type('0')
		
		cy.get('#txtMaxDaysMonth').click({force:true})
		cy.get('#txtMaxDaysMonth').clear()
		cy.get('#txtMaxDaysMonth').type('10')
		
		cy.get('#ddDevi').select('- Select -')
		cy.wait(500)
		cy.get('#leavCrBasedOn').select('-Select-')
		cy.wait(500)
		cy.get('#whSetting').select('- Select -')
		cy.wait(500)
		
		cy.get('#leavCrCalBeforeDays').click({force:true})
		cy.get('#leavCrCalBeforeDays').clear()
		cy.get('#leavCrCalBeforeDays').type('0')
		
		cy.get('#DocumentFSetting').select('- Select -')
		cy.wait(500)
		cy.get('#ddRestrictInTimeSheet').select('- Select -')
		cy.wait(500)
		cy.get('#ddPreviousDateLeaveEntry').select('- Select-')
		cy.wait(500)
		
		cy.get('#ddInterWeekOff').select('- Select -')
		cy.wait(500)
		cy.get('#ddCompOff').select('- Select -')
		cy.wait(500)
		cy.get('#ddMultipleLeaves').select('- Select -')
		cy.wait(500)
		
		cy.get('#ddRestrictedHolidays').select('- Select -')
		cy.wait(500)
		cy.get('#ddShowinSelfservice').select('- Select -')
		cy.wait(500)
		cy.get('#ddAutoApprove').select('- Select -')
		cy.wait(500)
		
		cy.get('#btnSave').click({force:true})
		
		*/
		
		cy.get('#btnDelete').click({force:true})
	})	


/*	it('Navigate to Employee Leave',function(){
		cy.navigate_EmployeeLeave()
	})
*/	
	
	it('Set Default Leave Configuration',function(){
	cy.navigate_LeaveSetting()
	cy.set_DefaultLeaveConfiguration('PL')
})

	it('Verify Debit Leave page',function(){
		const { softAssert, softExpect } = chai;
		
		var debitLeave = 
		[{LeaveType: "Paid Leave", FromDate: currentDate,  ToDate: currentDate, halfDay: 'No', Remark: 'One day debit Leave'},
		{LeaveType: "Paid Leave", FromDate: currentDate,  ToDate: tomorrowDate, halfDay: 'No', Remark: 'Two day debit Leave'},
		{LeaveType: "Paid Leave", FromDate: currentDate,  ToDate: currentDate, halfDay: 'Yes', Remark: 'half day debit Leave'}
		]
		
		
		cy.navigate_EmployeeLeave()
		
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
		cy.delete_EmployeesDebitLeaves()
		}
		
		cy.get('#drpLeaveType').select(debitLeave[j].LeaveType, {force: true})
		
		cy.wait(5000)
		cy.get('#tdBalance').invoke('text').then((text) => 
		{
		cy.log("text: "+text)			
		softExpect(text.trim()).to.eq(availableLeave.trim());		
			
		})
		
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
					softExpect(leaveType).to.eq('PL');	
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
				
				if(j == 0)
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


	it('Verify Add Leave page',function(){
	const { softAssert, softExpect } = chai;
		
		
		let leaveDateRange =
		[{LeaveType: "Paid leave", FromDate: currentDate, FromDateDay: "FULL DAY", ToDate: currentDate, ToDateDay: "FULL DAY"},
		 {LeaveType: "Paid leave", FromDate: currentDate, FromDateDay: "FULL DAY", ToDate: currentDate, ToDateDay: "FIRST HALF DAY"},
		 {LeaveType: "Paid leave", FromDate: currentDate, FromDateDay: "FULL DAY", ToDate: currentDate, ToDateDay: "SECOND HALF DAY"},
		 {LeaveType: "Paid leave", FromDate: currentDate, FromDateDay: "FIRST HALF DAY", ToDate: currentDate, ToDateDay: "FULL DAY"},
		 {LeaveType: "Paid leave", FromDate: currentDate, FromDateDay: "FIRST HALF DAY", ToDate: currentDate, ToDateDay: "FIRST HALF DAY"},
		 {LeaveType: "Paid leave", FromDate: currentDate, FromDateDay: "FIRST HALF DAY", ToDate: currentDate, ToDateDay: "SECOND HALF DAY"},
		 {LeaveType: "Paid leave", FromDate: currentDate, FromDateDay: "SECOND HALF DAY", ToDate: currentDate, ToDateDay: "FULL DAY"},
		 {LeaveType: "Paid leave", FromDate: currentDate, FromDateDay: "SECOND HALF DAY", ToDate: currentDate, ToDateDay: "FIRST HALF DAY"},
		 {LeaveType: "Paid leave", FromDate: currentDate, FromDateDay: "SECOND HALF DAY", ToDate: currentDate, ToDateDay: "SECOND HALF DAY"},
		 
		];
		
		
		
		for(let j=0; j< leaveDateRange.length; j++){
		cy.navigate_EmployeeLeave()	
		cy.delete_EmployeesAllLeaves()	
		cy.wait(5000)
		cy.xpath("//div[@id='carouselExampleIndicators']//div[@class='card-body body-bg']//h4").each(function(row, i){	
		var num = parseFloat(i+1)
		cy.log("num: "+num)
		
		cy.xpath("//div[@id='carouselExampleIndicators']//div[@class='card-body body-bg']//h4").eq(i).invoke('text').then((text) => {	
		cy.log("text: "+text)
			if(text.trim()==leaveDateRange[j].LeaveType){
				expect(text).to.eq(leaveDateRange[j].LeaveType)
		
	
		cy.xpath("//div[@id='carouselExampleIndicators']//table/tbody/tr[5]/th[2]").eq(i).invoke('text').then((availableLeave) => {	
		cy.log("availableLeave: "+availableLeave)
		
		
			if(availableLeave.trim() =='0'){
			
			cy.get('.fa-ellipsis-v').eq(i-1).click({force: true})
			
			cy.get('#LeaveOpen').click({force: true})
			cy.get('#LeaveOpen').clear()
			cy.get('#LeaveOpen').type('10');
			
			cy.get('#saveloader').click({force: true})
			cy.wait(5000)	
			}
			
			cy.wait(5000)	
				cy.xpath("//div[@id='leaveContentTitle']//i[@class='fas fa-plus']").click({force:true})
				cy.wait(2000)
				
				cy.get('#fromdate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(leaveDateRange[j].FromDate)
			})
	   
			cy.wait(1000)
			cy.get('#todate').click().then(input => {
		    input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(leaveDateRange[j].ToDate)
			})
	
		cy.wait(1000)
		cy.get('#drpFromDayType').select(leaveDateRange[j].FromDateDay,{force: true})
		cy.get('#drpToDayType').select(leaveDateRange[j].ToDateDay,{force: true})
		//cy.get('#drpFromDayType').select(leaveDateRange[j].FromDateDay)
		//cy.get('#drpToDayType').select(leaveDateRange[j].ToDateDay)
		cy.get('#leaveType').select(leaveDateRange[j].LeaveType,{force: true})
		
		cy.get('#remarks').click({force: true})
		cy.get('#remarks').clear()
		cy.get('#remarks').type('Test');
		
		cy.wait(3000)
		cy.get('#btnAddLeave').click({force: true})
		cy.wait(3000)
		
		cy.get('#btnclose').click({force: true})
		cy.wait(5000)
		
		var fromDate1 = (leaveDateRange[j].FromDate).toString();
		var toDate1 = (leaveDateRange[j].ToDate).toString();	
		var fromDate = new Date(fromDate1);
		var toDate = new Date(toDate1);
		cy.log("fromDate: "+fromDate.toDateString())
		cy.log("toDate: "+toDate.toDateString())

		
		cy.get(".toast-message").invoke('text').then((text) => {		
			cy.log(text.trim())
	
		cy.wait(2000)
		//if(fromDate.getTime() === toDate.getTime())
			if(fromDate.toDateString() === toDate.toDateString()){	
		
			if(leaveDateRange[j].FromDateDay == leaveDateRange[j].ToDateDay){
				softExpect(text.trim()).to.eq('Leave Updated Successfully');
				
				cy.xpath("//div[@id='carouselExampleIndicators']//table/tbody/tr[1]/th[2]").eq(i).invoke('text').then((openingLeave) => {	
				cy.log("openingLeave: "+openingLeave)
				
				cy.xpath("//div[@id='carouselExampleIndicators']//table/tbody/tr[3]/th[2]").eq(i).invoke('text').then((debitLeave) => {	
				cy.log("debitLeave: "+debitLeave)
				
				cy.xpath("//div[@id='carouselExampleIndicators']//table/tbody/tr[4]/th[2]").eq(i).invoke('text').then((usedLeave) => {	
				cy.log("usedLeave: "+usedLeave)
				
				cy.xpath("//div[@id='carouselExampleIndicators']//table/tbody/tr[5]/th[2]").eq(i).invoke('text').then((availableLeave) => {	
				cy.log("availableLeave: "+availableLeave)
				var leaveResult = parseFloat(openingLeave) - parseFloat(usedLeave)  - parseFloat(debitLeave)
				softExpect(parseFloat(leaveResult)).to.eq(parseFloat(availableLeave));				
				})
				})
				})	
				})
				
				cy.get(".mb-lg-0 >div>h5").eq(0).invoke('text').then((leaveType) => {	
				cy.log("leaveType: "+leaveType)
				if('Paid Leave'==leaveDateRange[j].LeaveType)
				{
					softExpect(leaveType).to.eq('PL');	
				}
				})
				
				cy.get(".mb-lg-0 >div>p").eq(1).invoke('text').then((leaveDate) => {	
				cy.log("leaveDate: "+leaveDate)
				softExpect(leaveDate).to.eq(leaveDateRange[j].FromDate+' - '+leaveDateRange[j].ToDate);	
				})
				
				cy.get(".mb-lg-0 >div>p").eq(2).invoke('text').then((leaveDay) => {	
				cy.log("leaveDay: "+leaveDay)
				if(leaveDateRange[j].FromDateDay == 'FULL DAY')
				{
				softExpect(leaveDay).to.eq(' FullDay - FullDay');	
				}
				else if(leaveDateRange[j].FromDateDay == 'FIRST HALF DAY')
				{
				softExpect(leaveDay).to.eq(' FirstHalf - FirstHalf');	
				}
				else if(leaveDateRange[j].FromDateDay == 'SECOND HALF DAY')
				{
				softExpect(leaveDay).to.eq(' SecondHalf - SecondHalf');	
				}	
				})
				
				cy.get(".mb-lg-0 >div>p").eq(3).invoke('text').then((leaveDays) => {	
				cy.log("leaveDays: "+leaveDays)
				if(leaveDateRange[j].FromDateDay == 'FULL DAY')
				{
				softExpect(leaveDays).to.eq('1');
				}
				else if(leaveDateRange[j].FromDateDay == 'FIRST HALF DAY')
				{
				softExpect(leaveDays).to.eq('0.5');	
				}
				else if(leaveDateRange[j].FromDateDay == 'SECOND HALF DAY')
				{
				softExpect(leaveDays).to.eq('0.5');	
				}	
				})
				
				
			}
			else{
				softExpect(text.trim()).to.eq('From Day and To Day type should be same.');
				cy.get('#btnclose').click({force: true})
			}
		}			
		})
		
		
		})
		}
		})			
		}) 	
		}		
		})
	
	
	it('Verify Sick Leave Request with Future date',function(){
		
		
		cy.navigate_EmployeeLeave()
		
		cy.wait(5000)
		cy.xpath("//div[@id='carouselExampleIndicators']//div[@class='card-body body-bg']//h4").each(function(row, i){	
		var num = parseFloat(i+1)
		cy.log("num: "+num)
		
		cy.xpath("//div[@id='carouselExampleIndicators']//div[@class='card-body body-bg']//h4").eq(i).invoke('text').then((text) => {	
		cy.log("text: "+text)
			if(text.trim()=='Sick Leave'){
				expect(text).to.eq('Sick Leave')
		
	
		cy.xpath("//div[@id='carouselExampleIndicators']//table/tbody/tr[5]/th[2]").eq(i).invoke('text').then((availableLeave) => {	
		cy.log("availableLeave: "+availableLeave)
		
		
			if(availableLeave.trim() =='0'){
			
			cy.get('.fa-ellipsis-v').eq(i-1).click({force: true})
			
			cy.get('#LeaveOpen').click({force: true})
			cy.get('#LeaveOpen').clear()
			cy.get('#LeaveOpen').type('10');
			
			cy.get('#saveloader').click({force: true})
			cy.wait(5000)
			
			}
			cy.wait(5000)	
				cy.xpath("//div[@id='leaveContentTitle']//i[@class='fas fa-plus']").click({force:true})
				cy.wait(2000)
				cy.get('#fromdate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(tomorrowDate)
			})
	   
			cy.wait(1000)
			cy.get('#todate').click().then(input => {
		    input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(tomorrowDate)
			})
	
		cy.wait(1000)
		cy.get('#drpFromDayType').select(leave.FromDateDay,{force: true})
		cy.get('#drpToDayType').select(leave.ToDateDay,{force: true})
		cy.get('#leaveType').select('Sick Leave',{force: true})
		
		cy.get('#remarks').click({force: true})
		cy.get('#remarks').clear()
		cy.get('#remarks').type('Sick leave for Future Date');
		
		cy.wait(3000)
		cy.get('#btnAddLeave').click({force: true})
		cy.wait(3000)
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())
			expect(text.trim()).equal('Sorry, Sick Leave can be Availed only for past days.')		
		})
		cy.get('#btnclose').click({force: true})
		//cy.xpath("//button[contains(@class,'btn btn-xs btn-danger')]").click({force: true})
		
		})
		}
		})			
		}) 		
		})
	

	it('Verify Leave Request when Leave Opening balance is 0',function(){
		cy.navigate_LeaveSetting()
		cy.set_DefaultLeaveConfiguration(leave.LeaveType)
		
		cy.navigate_EmployeeLeave()
		cy.delete_EmployeesAllLeaves()
		cy.wait(5000)
		cy.xpath("//div[@id='carouselExampleIndicators']//div[@class='card-body body-bg']//h4").each(function(row, i){	
		var num = parseFloat(i+1)
		cy.log("num: "+num)
		
		cy.xpath("//div[@id='carouselExampleIndicators']//div[@class='card-body body-bg']//h4").eq(i).invoke('text').then((text) => {	
		cy.log("text: "+text)
			if(text.trim()==leave.LeaveType.trim()){
				expect(text).to.eq(leave.LeaveType.trim())
		
	
		cy.xpath("//div[@id='carouselExampleIndicators']//table/tbody/tr[5]/th[2]").eq(i).invoke('text').then((availableLeave) => {	
		cy.log("availableLeave: "+availableLeave)
		
		
			if(availableLeave.trim() !='0'){
			
			cy.get('.fa-ellipsis-v').eq(i-1).click({force: true})
			
			cy.get('#LeaveOpen').click({force: true})
			cy.get('#LeaveOpen').clear()
			cy.get('#LeaveOpen').type('0');
			
			cy.get('#saveloader').click({force: true})
			cy.wait(5000)
			
			}
			cy.wait(5000)	
				cy.xpath("//div[@id='leaveContentTitle']//i[@class='fas fa-plus']").click({force:true})
				cy.wait(2000)
				cy.get('#fromdate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(leave.FromDate)
			})
	   
			cy.wait(1000)
			cy.get('#todate').click().then(input => {
		    input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(leave.ToDate)
			})
	
		cy.wait(1000)
		cy.get('#drpFromDayType').select(leave.FromDateDay,{force: true})
		cy.get('#drpToDayType').select(leave.ToDateDay,{force: true})
		cy.get('#leaveType').select(leave.LeaveType,{force: true})
		
		cy.get('#remarks').click({force: true})
		cy.get('#remarks').clear()
		cy.get('#remarks').type('Festival !.');
		
		cy.wait(3000)
		cy.get('#btnAddLeave').click({force: true})
		cy.wait(3000)
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())
			expect(text.trim()).equal('Leave Opening is 0')		
		})
		cy.get('#btnclose').click({force: true})
		//cy.xpath("//button[contains(@class,'btn btn-xs btn-danger')]").click({force: true})
		
		})
		}
		})			
		}) 		
		})
		
		
	it('Verify Multiple Leave Request for same dates',function(){
		
		cy.navigate_EmployeeLeave()
		cy.delete_EmployeesAllLeaves()
		
		cy.xpath("//div[@id='carouselExampleIndicators']//div[@class='card-body body-bg']//h4").each(function(row, i){	
		var num = parseFloat(i+1)
		cy.log("num: "+num)
		
		cy.xpath("//div[@id='carouselExampleIndicators']//div[@class='card-body body-bg']//h4").eq(i).invoke('text').then((text) => {	
		cy.log("text: "+text)
			if(text.trim()==leave.LeaveType.trim()){
				expect(text).to.eq(leave.LeaveType.trim())
		
	
		cy.xpath("//div[@id='carouselExampleIndicators']//table/tbody/tr[5]/th[2]").eq(i).invoke('text').then((availableLeave) => {	
		cy.log("availableLeave: "+availableLeave)
		
		
			if(availableLeave.trim() <='0'){
			
			cy.get('.fa-ellipsis-v').eq(i-1).click({force: true})
			
			cy.get('#LeaveOpen').click({force: true})
			cy.get('#LeaveOpen').clear()
			cy.get('#LeaveOpen').type('10');
			
			cy.get('#saveloader').click({force: true})
			cy.wait(5000)
			
			}
				
				cy.xpath("//div[@id='leaveContentTitle']//i[@class='fas fa-plus']").click({force:true})
				cy.wait(2000)
				cy.get('#fromdate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(leave.FromDate)
			})
	   
			cy.wait(1000)
			cy.get('#todate').click().then(input => {
		    input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(leave.ToDate)
			})
	
		cy.wait(1000)
		cy.get('#drpFromDayType').select(leave.FromDateDay,{force: true})
		cy.get('#drpToDayType').select(leave.ToDateDay,{force: true})
		cy.get('#leaveType').select(leave.LeaveType,{force: true})
		
		cy.get('#remarks').click({force: true})
		cy.get('#remarks').clear()
		cy.get('#remarks').type('Festival !.');
		
		cy.wait(3000)
		cy.get('#btnAddLeave').click({force: true})
		cy.wait(3000)
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())
			expect(text.trim()).equal('Leave Updated Successfully')	
		cy.get(".toast-message").click()			
		})
		
		cy.wait(5000)
		
		//cy.xpath("//div[@id='leaveContentTitle']//i[@class='fas fa-plus']").click({force:true})
				cy.wait(2000)
				cy.get('#fromdate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(leave.FromDate)
			})
	   
			cy.wait(1000)
			cy.get('#todate').click().then(input => {
		    input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(leave.ToDate)
			})
	
		cy.wait(1000)
		cy.get('#drpFromDayType').select(leave.FromDateDay,{force: true})
		cy.get('#drpToDayType').select(leave.ToDateDay,{force: true})
		cy.get('#leaveType').select(leave.LeaveType,{force: true})
		
		cy.get('#remarks').click({force: true})
		cy.get('#remarks').clear()
		cy.get('#remarks').type('Festival !.');
		
		cy.wait(3000)
		cy.get('#btnAddLeave').click({force: true})
		cy.wait(5000)
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())
			expect(text.trim()).equal('Leave is already applied for the same date')		
		})
		cy.get('#btnclose').click({force: true})
		//cy.xpath("//button[contains(@class,'btn btn-xs btn-danger')]").click({force: true})
		
		})
		}
		})			
		}) 		
		})


	
	it('(a) Verify Maximum Leave in Month Eligibility',function() {
		const { softAssert, softExpect } = chai;
		
			cy.navigate_LeaveSetting()
			//cy.set_DefaultLeaveConfiguration(leaveSetting.LeaveType)
			
			cy.get('#leaveConfig').click({force:true})
			cy.wait(2000)
			cy.get('#ddLeavType').select(leaveSetting.LeaveType)
			cy.wait(2000)
			cy.get('#txtMaxDaysMonth').click({force:true})
			cy.get('#txtMaxDaysMonth').clear()
			cy.wait(2000)
			cy.get('#txtMaxDaysMonth').type(leaveSetting.MaximumLeaveInMonth)
			cy.get('#btnSave').click()
			
			cy.wait(3000)
			cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())
			expect(text.trim()).equal('Data saved successfully.!')		
			})
			
		cy.navigate_EmployeeLeave()
		cy.delete_EmployeesAllLeaves()
		
		cy.xpath("//div[@id='carouselExampleIndicators']//div[@class='card-body body-bg']//h4").each(function(row, i){	
		var num = parseFloat(i+1)
		cy.log("num: "+num)
		
		cy.xpath("//div[@id='carouselExampleIndicators']//div[@class='card-body body-bg']//h4").eq(i).invoke('text').then((text) => {	
		cy.log("text: "+text)
			if(text.trim()==leaveSetting.LeaveType.trim()){

				expect(text).to.eq(leaveSetting.LeaveType.trim())
		
	
		cy.xpath("//div[@id='carouselExampleIndicators']//table/tbody/tr[5]/th[2]").eq(i).invoke('text').then((availableLeave) => {	
		cy.log("availableLeave: "+availableLeave)
		
		
		
			
			cy.get('.fa-ellipsis-v').eq(i-1).click({force: true})
			
			cy.get('#LeaveOpen').click({force: true})
			cy.get('#LeaveOpen').clear()
			cy.get('#LeaveOpen').type(leaveSetting.MaximumLeaveInMonth);
			
			cy.get('#saveloader').click({force: true})
			cy.wait(5000)
			
			
				
				cy.xpath("//div[@id='leaveContentTitle']//i[@class='fas fa-plus']").click({force:true})
				cy.wait(2000)
				cy.get('#fromdate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(leaveSetting.FromDate)
			})
	   
			cy.wait(1000)
			cy.get('#todate').click().then(input => {
		    input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(leaveSetting.ToDate1)
			})
	
		cy.wait(1000)
		cy.get('#drpFromDayType').select(leaveSetting.FromDateDay,{force: true})
		cy.get('#drpToDayType').select(leaveSetting.ToDateDay,{force: true})
		cy.get('#leaveType').select(leaveSetting.LeaveType,{force: true})
		
		cy.get('#remarks').click({force: true})
		cy.get('#remarks').clear()
		cy.get('#remarks').type('Festival !.');
		
		cy.wait(3000)
		cy.get('#btnAddLeave').click({force: true})
		cy.wait(3000)
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())
			softExpect(text.trim()).to.eq('Leave limit is exceeded,Allowed limit is : '+leaveSetting.MaximumLeaveInMonth);	
		})
		cy.get('#btnclose').click({force: true})
		//cy.xpath("//button[contains(@class,'btn btn-xs btn-danger')]").click({force: true})
		cy.wait(5000)
		
		cy.xpath("//div[@id='leaveContentTitle']//i[@class='fas fa-plus']").click({force:true})
				cy.wait(2000)
				cy.get('#fromdate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(leaveSetting.FromDate)
			})
	   
			cy.wait(1000)
			cy.get('#todate').click().then(input => {
		    input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(leaveSetting.ToDate)
			})
	
		cy.wait(1000)
		cy.get('#drpFromDayType').select(leaveSetting.FromDateDay,{force: true})
		cy.get('#drpToDayType').select(leaveSetting.ToDateDay,{force: true})
		cy.get('#leaveType').select(leaveSetting.LeaveType,{force: true})
		
		cy.get('#remarks').click({force: true})
		cy.get('#remarks').clear()
		cy.get('#remarks').type('Festival !.');
		
		cy.wait(3000)
		cy.get('#btnAddLeave').click({force: true})
		cy.wait(5000)
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())
			softExpect(text.trim()).to.eq('Leave Updated Successfully');		
		})
			
		})
		}
		})			
		}) 		
		//})
			
		
	})	

	
	
	it('(d) Verify Leave on Weekoff',function() {
		const { softAssert, softExpect } = chai;
		
		let weekOff =[ 'should', 'should not' ]
		cy.log(weekOff.length)
		for(let j=0; j< weekOff.length; j++){
			
			cy.navigate_LeaveSetting()		
			//cy.set_DefaultLeaveConfiguration(leaveSetting.LeaveType)
			
			cy.get('#leaveConfig').click({force:true})
			cy.wait(10000)
			cy.get('#ddLeavType').select(leaveSetting.LeaveType)
			cy.wait(2000)
			if(j==0){
			cy.get('#whSetting').select('should')
			}
			else
			{
				cy.get('#whSetting').select('should not')
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
			if(text.trim()==leaveSetting.LeaveType.trim()){

				expect(text).to.eq(leaveSetting.LeaveType.trim())
		
	
		cy.xpath("//div[@id='carouselExampleIndicators']//table/tbody/tr[5]/th[2]").eq(i).invoke('text').then((availableLeave) => {	
		cy.log("availableLeave: "+availableLeave)
		
		
		
			cy.get('.fa-ellipsis-v').eq(i-1).click({force: true})
			
			cy.get('#LeaveOpen').click({force: true})
			cy.get('#LeaveOpen').clear()
			cy.get('#LeaveOpen').type('20');
			
			cy.get('#saveloader').click({force: true})
			cy.wait(8000)
			var WeekOff_Date=''
			
			cy.log(j+ " "+WeekOff_Date)
			
			if(j==0){
				WeekOff_Date = leaveSetting.WeekOff_Date1
				cy.log(j+ " "+WeekOff_Date)
				}
				else{
				WeekOff_Date = leaveSetting.WeekOff_Date2
				cy.log(j+ " "+WeekOff_Date)
				}
				
						
				cy.xpath("//div[@id='leaveContentTitle']//i[@class='fas fa-plus']").click({force:true})
				cy.wait(2000)
				cy.get('#fromdate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))			
				input.val(WeekOff_Date)
				
			})
	   
			cy.wait(1000)
			cy.get('#todate').click().then(input => {
		    input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(WeekOff_Date)
			})
	
		cy.wait(1000)
		cy.get('#drpFromDayType').select(leaveSetting.FromDateDay,{force: true})
		cy.get('#drpToDayType').select(leaveSetting.ToDateDay,{force: true})
		cy.get('#leaveType').select(leaveSetting.LeaveType,{force: true})
		
		cy.get('#remarks').click({force: true})
		cy.get('#remarks').clear()
		cy.get('#remarks').type('Festival !.');
		
		cy.wait(3000)
		cy.get('#btnAddLeave').click({force: true})
		cy.wait(5000)
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())
			if(j==0)
			{
				softExpect(text.trim()).to.eq('Leave Updated Successfully');
			}
			else{
				softExpect(text.trim()).to.eq('From Date is Weekly Off.');
				cy.get('#btnclose').click({force: true})
				//cy.xpath("//button[contains(@class,'btn btn-xs btn-danger')]").click({force: true})
			}
		})
		
		cy.wait(5000)
		
	
		})
		}
		})			
		}) 		
		
		}	
		
	})	


	it('(m) Verify Leave on Holiday',function() {
		const { softAssert, softExpect } = chai;
		let weekOff =['should','should not']
		cy.log(weekOff.length)
		for(let j=0; j< weekOff.length; j++){
			cy.navigate_LeaveSetting()
		//cy.set_DefaultLeaveConfiguration(leaveSetting.LeaveType)
			
			cy.get('#leaveConfig').click({force:true})
			cy.wait(8000)
			cy.get('#ddLeavType').select(leaveSetting.LeaveType)
			cy.wait(2000)
			if(j==0){
				cy.get('#ddRestrictedHolidays').select('should')
			}
			else
			{
				cy.get('#ddRestrictedHolidays').select('should not')
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
			if(text.trim()==leaveSetting.LeaveType.trim()){

				expect(text).to.eq(leaveSetting.LeaveType.trim())
		
	
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
				input.val(leaveSetting.Holiday)
				
			})
	   
			cy.wait(1000)
			cy.get('#todate').click().then(input => {
		    input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(leaveSetting.Holiday)
			})
	
		cy.wait(1000)
		cy.get('#drpFromDayType').select(leaveSetting.FromDateDay,{force: true})
		cy.get('#drpToDayType').select(leaveSetting.ToDateDay,{force: true})
		cy.get('#leaveType').select(leaveSetting.LeaveType,{force: true})
		
		cy.get('#remarks').click({force: true})
		cy.get('#remarks').clear()
		cy.get('#remarks').type('Festival !.');
		
		cy.wait(3000)
		cy.get('#btnAddLeave').click({force: true})
		cy.wait(5000)
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())
			if(j==0)
			{	
				softExpect(text.trim()).to.eq('From Date is holiday.');
		cy.get('#btnclose').click({force: true})
				//cy.xpath("//button[contains(@class,'btn btn-xs btn-danger')]").click({force: true})
				
			}
			else{
				softExpect(text.trim()).to.eq('Leave Updated Successfully');
				
			}
		})
		
		cy.wait(5000)
		
	
		})
		}
		})			
		}) 		
		
		}	
		
	})	




	it('(h) Verify Previous Date Leave Entry',function() {
		const { softAssert, softExpect } = chai;
		let weekOff =['should','should not']
		cy.log(weekOff.length)
		for(let j=0; j< weekOff.length; j++){

			cy.navigate_LeaveSetting()
			//cy.set_DefaultLeaveConfiguration(leaveSetting.LeaveType)
			
			cy.get('#leaveConfig').click({force:true})
			cy.wait(8000)
			cy.get('#ddLeavType').select(leaveSetting.LeaveType)
			cy.wait(2000)
			if(j==0){
				cy.get('#ddPreviousDateLeaveEntry').select('should')
			}
			else
			{
				cy.get('#ddPreviousDateLeaveEntry').select('should not')
			}
			cy.get('#btnSave').click()
			
			cy.wait(3000)
			cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())
			//expect(text.trim()).equal('Data saved successfully.!')
			softExpect(text.trim()).to.eq('Data saved successfully.!');		
			})
			
		cy.navigate_EmployeeLeave()
		cy.delete_EmployeesAllLeaves()
		cy.wait(5000)
		
		cy.xpath("//div[@id='carouselExampleIndicators']//div[@class='card-body body-bg']//h4").each(function(row, i){	
		var num = parseFloat(i+1)
		cy.log("num: "+num)
		
		cy.xpath("//div[@id='carouselExampleIndicators']//div[@class='card-body body-bg']//h4").eq(i).invoke('text').then((text) => {	
		cy.log("text: "+text)
			if(text.trim()==leaveSetting.LeaveType.trim()){

				expect(text).to.eq(leaveSetting.LeaveType.trim())
		
	
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
				input.val(leaveSetting.previous_Date)
				
			})
	   
			cy.wait(1000)
			cy.get('#todate').click().then(input => {
		    input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(leaveSetting.previous_Date)
			})
	
		cy.wait(1000)
		cy.get('#drpFromDayType').select(leaveSetting.FromDateDay,{force: true})
		cy.get('#drpToDayType').select(leaveSetting.ToDateDay,{force: true})
		cy.get('#leaveType').select(leaveSetting.LeaveType,{force: true})
		
		cy.get('#remarks').click({force: true})
		cy.get('#remarks').clear()
		cy.get('#remarks').type('Festival !.');
		
		cy.wait(3000)
		cy.get('#btnAddLeave').click({force: true})
		cy.wait(5000)
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())
			if(j==0)
			{
				expect(text.trim()).equal('Past Date Leave Entry is not allowed')
					cy.get('#btnclose').click({force: true})
				//cy.xpath("//button[contains(@class,'btn btn-xs btn-danger')]").click({force: true})
				
			}
			else{
				expect(text.trim()).equal('Leave Updated Successfully')	
			}
		})
		
		cy.wait(5000)
		
	
		})
		}
		})			
		}) 		
		//})
		}	
		
	})	



	it('(l) Verify Multiple leaves on consecutive days',function() {
			const { softAssert, softExpect } = chai;
		
			let  multipleLeaves =['should not', 'should']
			
			cy.log("multipleLeaves: "+ multipleLeaves.length)
		for(let j=0; j< multipleLeaves.length; j++){
			
			cy.navigate_LeaveSetting()
			cy.get('#leaveConfig').click({force:true})
			cy.wait(8000)
			
			cy.log("leave_ConsecutiveDays: "+leave_ConsecutiveDays.length)
		for(let k=0; k< leave_ConsecutiveDays.length; k++){
			
			if(j==0)
			{				
			cy.set_DefaultLeaveConfiguration(leave_ConsecutiveDays[k].LeaveType)
			cy.wait(5000)
			}
			
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



	it('(c) Verify System consider intervening holidays as leave.',function() {
		const { softAssert, softExpect } = chai;
		let weekOff =['should','should not']
		cy.log(weekOff.length)
		for(let j=0; j< weekOff.length; j++){
			cy.navigate_LeaveSetting()
		//cy.set_DefaultLeaveConfiguration(leaveSetting.LeaveType)
			
			cy.get('#leaveConfig').click({force:true})
			cy.wait(8000)
			cy.get('#ddLeavType').select(leaveSetting.LeaveType)
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
		
		
		cy.wait(10000)
				
			
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
		//cy.set_DefaultLeaveConfiguration(leaveSetting.LeaveType)
			
			cy.get('#leaveConfig').click({force:true})
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
		
		
		cy.wait(10000)
				
			
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
				softExpect(parseFloat(usedLeave.trim())).to.eq(weekOff_LeaveSetting.totalUsedLeave-1);	
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
				softExpect(parseFloat(leaveDays.trim())).to.eq(weekOff_LeaveSetting.totalUsedLeave-1);	
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