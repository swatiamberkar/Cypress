
describe("Dynamically Generated Tests", () => {
	var url = 'http://next.pockethrms.com'
	var username= 'nileshgajare@live.com'
	var userPass = '123456'  //Attendance_OndutyEntry
	var company='NNTest_25'
	var employeeID ='CY1'

	var lopMonth= 'March'

	
		const Day = Cypress.moment().format('DD')
		const Day1 = parseInt(Day)+1
		const Month = Cypress.moment().format('MM')
		const year = Cypress.moment().format('YYYY')
		const currentDate = Day+'/'+Month+'/'+year
		const tomorrowDate = Day1+'/'+Month+'/'+year
	
	
	let leave ={LeaveType: "LD", FromDate: currentDate, FromDateDay: "FULL DAY", ToDate:tomorrowDate, ToDateDay: "FULL DAY"};
	
	let onDuty = [
    {EntryDate: "05/04/2020", Type: "FULLDAY ONDUTY", Half: "", 	 InDate_HH: "9", InDate_MM: "00", OutDate_HH: "17", OutDate_MM: "00", Remark: "On-Duty"},
	{EntryDate: "11/04/2020", Type: "HALFDAY ONDUTY", Half: "First", InDate_HH: "9", InDate_MM: "00", OutDate_HH: "13", OutDate_MM: "00", Remark: "On-Duty"},
	{EntryDate: "12/04/2020", Type: "HALFDAY ONDUTY", Half: "Second",InDate_HH: "13", InDate_MM: "00", OutDate_HH: "17", OutDate_MM: "00", Remark: "On-Duty"},	
	];
	
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
		Cypress.Cookies.preserveOnce('.AspNetCore.Antiforgery.w5W7x28NAIs','.AspNetCore.Session','1P_JAR','ARRAffinity','FavouriteMenus','XCategory','XCompanyId','XName','XSchemaName','XUserId','XUserName','_ga','_gid','ai_session','ai_user','new_username','GetLicenseData')
		cy.wait(2000)
    })
	

	it('Pocket HRMS Login', function() {
		cy.visit(url) 
		cy.get('#Email').should('be.visible').should('have.css', 'border-radius') 
		cy.get('#Email').should('exist')
		cy.get('#Email').click()
		cy.get('#Email').type(username)
		cy.get('#Password').should('be.visible').should('have.css', 'border-radius') 
		cy.get('#Password').should('exist')
		cy.get('#Password').click()
		cy.get('#Password').type(userPass)	
		cy.get('[type="submit"]').click({force: true})
		
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
	
	Cypress.Commands.add('navigate_EmployeeLOPCreditPage',()=>{
     cy.wait(1000)
		cy.get('#globalSearch').click({force: true})		
		cy.get('#globalSearch').clear()
		cy.get('#globalSearch').type('lop credit')
		cy.wait(2000)
		cy.contains('li', 'lop credit').click({force: true})
		cy.wait(3000)
		cy.get('#searchEmpCodeName').click({force: true})		
		cy.get('#searchEmpCodeName').clear()
		cy.get('#searchEmpCodeName').type(employeeID)
		cy.get('#ESbtnSearch').click({force: true})
		cy.wait(1000)
		cy.get('#tempFnF').click({force: true})
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
		
		cy.get('#leaveEntryTab').click({force:true})
		cy.wait(3000)
	})
	
	Cypress.Commands.add('navigate_EmployeeOnDutyEntry',()=>{
     cy.wait(1000)
		cy.navigate_EmployeeProfile()
		
		cy.get('#attendance_detail_tab').click({force:true});
		cy.wait(2000)
		
		cy.get('#Attendance_OndutyEntry').click({force:true})
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
	
	Cypress.Commands.add('navigate_LeaveConfigurationSetting',()=>{
	cy.wait(1000)
		cy.get('#globalSearch').click({force: true})		
		cy.get('#globalSearch').clear()
		cy.get('#globalSearch').type('leave configuration setting')
		cy.wait(2000)
		cy.contains('li', 'leave configuration setting').click({force: true})
		cy.wait(3000)
		
	})
	
/*	it('Add COff Leave ',function(){
		 cy.wait(1000)
		cy.get('#globalSearch').click({force: true})		
		cy.get('#globalSearch').clear()
		cy.get('#globalSearch').type('leave definition setting')
		cy.wait(2000)
		cy.contains('li', 'leave definition setting').click({force: true})
		cy.wait(3000)
		
		cy.xpath("//div[@id='leaveContentTitle']//i[@class='fas fa-plus']").click({force: true})
		
		cy.wait(2000)
		cy.get('#leavName').click({force: true})		
		cy.get('#leavName').clear()
		cy.get('#leavName').type('COFF')
		
		cy.wait(1000)
		cy.get('#leavDesc').click({force: true})		
		cy.get('#leavDesc').clear()
		cy.get('#leavDesc').type('COFF')
	
		cy.get('#leavCategory').select('COF')
		cy.get('#catall').click({force: true})
		cy.get('#btnLeaveDefinationSave').click({force: true})
		
	})
*/	
	
	it('Add On Duty Entry',function() {
		const { softAssert, softExpect } = chai;
		
		cy.navigate_EmployeeOnDutyEntry()
		for(let i = 0; i < onDuty.length; i++) {
			
			cy.xpath("//div[@id='attendanceContentTitle']//i[@class='fas fa-plus']").click({force:true})
			cy.wait(5000)
		
			cy.get('#dtEntry').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(onDuty[i].EntryDate)
			})
	   
			cy.get('#ddType').select(onDuty[i].Type,{force: true})
						
					if(onDuty[i].Type=="HALFDAY ONDUTY")
					{
						if(onDuty[i].Half=="First")
						{
							cy.xpath("//div[@class='col-sm-12']//input[@id='rdFirst']").click({force: true})
						}
						else
						{
							cy.xpath("//div[@class='col-sm-12']//input[@id='rdSecond']").click({force: true})
						}
					}
					
					
					cy.get('#txtRemarks').click({force: true})
						cy.get('#txtRemarks').clear()
						cy.get('#txtRemarks').type(onDuty[i].Remark)
						
						cy.get('#tmInTimeHour').click({force: true})
						cy.get('#tmInTimeHour').clear()
						cy.get('#tmInTimeHour').type(onDuty[i].InDate_HH)	 
						
						cy.get('#tmInTimeMin').click({force: true})
						cy.get('#tmInTimeMin').clear()
						cy.get('#tmInTimeMin').type(onDuty[i].InDate_MM)	
						
						cy.get('#tmOutTimeHour').click({force: true})
						cy.get('#tmOutTimeHour').clear()
						cy.get('#tmOutTimeHour').type(onDuty[i].OutDate_HH)	
						
						cy.get('#tmOutTimeMin').click({force: true})
						cy.get('#tmOutTimeMin').clear()
						cy.get('#tmOutTimeMin').type(onDuty[i].OutDate_MM)	
						
						cy.get('#btnSaveOnDutyEntry').click({force: true})
						
						cy.get(".toast-message").invoke('text').then((text) => {
						cy.log(text.trim())	
						softExpect(text.trim()).to.eq('Record saved successfully.!');
						//expect(text.trim()).equal('Record saved successfully.!')
						cy.get(".toast-message").click({force: true})
						})
						cy.wait(10000)
	
			
			
			
			cy.get("#tblPermi > tbody >tr >td:nth-child(1)").eq(i).invoke('text').then((fromDate) => {	
			cy.log("fromDate: "+fromDate)
			softExpect(fromDate.trim()).to.eq(onDuty[i].EntryDate);
			})
			
			cy.get("#tblPermi > tbody >tr >td:nth-child(2)").eq(i).invoke('text').then((toDate) => {	
			cy.log("toDate: "+toDate)
			softExpect(toDate.trim()).to.eq(onDuty[i].EntryDate);
			})
			
			cy.get("#tblPermi > tbody >tr >td:nth-child(3)").eq(i).invoke('text').then((inTime) => {	
			cy.log("inTime: "+inTime)
			softExpect(inTime.trim()).to.eq(onDuty[i].InDate_HH+":"+onDuty[i].InDate_MM);
			})
			
			cy.get("#tblPermi > tbody >tr >td:nth-child(5)").eq(i).invoke('text').then((inTime) => {	
			cy.log("inTime: "+inTime)
			softExpect(inTime.trim()).to.eq(onDuty[i].OutDate_HH+":"+onDuty[i].OutDate_MM);
			})
								
		}
	})
	
	
	it('Apply CompOff Credit',function() {
		const { softAssert, softExpect } = chai;
		cy.wait(1000)
		cy.visit('https://next.pockethrms.com/Settings/Employee/Index?module=attendance&submodule=compoffcredit')
		/*cy.get('#globalSearch').click({force: true})		
		cy.get('#globalSearch').clear()
		cy.get('#globalSearch').type('compOff credit')
		cy.wait(2000)
		cy.contains('li', 'compOff credit').click({force: true})*/
		cy.wait(3000)
		
		cy.get('#dtFromDate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val('01/01/2020')
			})
			
			cy.get('#dtToDate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(currentDate)
			})
			
			cy.get('#btnView').click({force: true})
			
			for(let i = 0; i < onDuty.length; i++) {
				
			cy.get("#tablesorter > tbody >tr").each(function(row, k){	
			var num = parseFloat(k+1)
			cy.log("num: "+num)
			
			cy.get("#tablesorter > tbody >tr >td:nth-child(1)").eq(k).invoke('text').then((empID) => {	
			cy.log("empID: "+empID.trim())
				if(empID.trim()==employeeID){
					softExpect(empID.trim()).to.eq(employeeID);
					cy.get("#tablesorter > tbody >tr >td:nth-child(3)").eq(k).invoke('text').then((entryDate) => {	
					cy.log("entryDate: "+entryDate.trim())
					if(entryDate.trim()==onDuty[i].EntryDate){
					softExpect(entryDate.trim()).to.eq(onDuty[i].EntryDate);
					cy.get("#tablesorter > tbody >tr >td:nth-child(6)>input").eq(k).click()
					
				}
							
			})
			
					
				}
							
			})
			
			})
			}
		
		cy.get('#btnSaveCompOffCredit').click({force: true})
			
	})
	
	
	it('Apply Leave as CompOff',function() {
		
	})
	
	it('Verify display Leave against CompOff date in CompOff Credit Page',function() {
	})
	
	it('Verify CompOff Process',function() {
	})
	
/*	it('Verify Activate Elapse & Elapse Expiry Days within Leave Configuration',function() {
		const { softAssert, softExpect } = chai;
		
		let weekOff =[ 'should', 'should not' ]
		cy.log(weekOff.length)
		for(let j=0; j< weekOff.length; j++){
			
			cy.navigate_LeaveConfigurationSetting()		
	
			cy.wait(5000)
			cy.get('#ddLeavType').select('COFF')
			cy.get('#btnDelete').click({force:true})
			cy.wait(5000)
			cy.get('#ddLeavType').select('COFF')
			
			if(j==0){
			cy.get('#ddActivateElpase').select('Yes')
			cy.wait(1000)
			cy.get('#ddElapsExpiryDays').click({force: true})		
			cy.get('#ddElapsExpiryDays').clear()
			cy.get('#ddElapsExpiryDays').type('30')
			}
			else
			{
				cy.get('#ddActivateElpase').select('No')
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

*/
	
})
