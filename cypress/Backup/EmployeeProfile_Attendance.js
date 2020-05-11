describe('Attendence Process ', function() {
	
		
	//var company='ABC INDIA PVT LTD'
	//var employeeID ='A-002'
	var company='NextPocketHRMS Test Company'
	var employeeID ='c015'
	var month_TimeConsolidation = "March"
	
	let onDuty = [
    {EntryDate: "15/03/2020", Type: "FULLDAY ONDUTY", Half: "", 	 InDate_HH: "9", InDate_MM: "00", OutDate_HH: "17", OutDate_MM: "00", Remark: "On-Duty"},
	{EntryDate: "22/03/2020", Type: "HALFDAY ONDUTY", Half: "First", InDate_HH: "9", InDate_MM: "00", OutDate_HH: "13", OutDate_MM: "00", Remark: "On-Duty"},
	{EntryDate: "29/03/2020", Type: "HALFDAY ONDUTY", Half: "Second",InDate_HH: "13", InDate_MM: "00", OutDate_HH: "17", OutDate_MM: "00", Remark: "On-Duty"},	
	];
	
	let holiday = [
    {holiday_Date: "14/04/2020", Description: "Dr. Babasaheb Ambedkar Jyanti"},
	];
	
	const Day = Cypress.moment().format('DD')
		const Day1 = parseInt(Day)+1
		const Month = Cypress.moment().format('MM')
		const year = Cypress.moment().format('YYYY')
		const currentDate = Day+'/'+Month+'/'+year
		const tomorrowDate = Day1+'/'+Month+'/'+year
	
	
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
	
	Cypress.Commands.add('navigate_EmployeeProfile',()=>{
		cy.wait(1000)
		cy.get('#globalSearch').click({force: true})		
		cy.get('#globalSearch').clear()
		cy.get('#globalSearch').type(employeeID)
		cy.wait(2000)
		cy.contains('li', employeeID).click({force: true})
		cy.wait(3000)
	})
	
	Cypress.Commands.add('navigate_EmployeeAttendance',()=>{
     cy.wait(1000)
		cy.navigate_EmployeeProfile()
		
		cy.get('#attendance_detail_tab').click({force:true});
		cy.wait(2000)
	})
	
	Cypress.Commands.add('navigate_EmployeeAttendance_ShiftDetails',()=>{
     cy.wait(1000)
		cy.navigate_EmployeeAttendance()
		
		cy.get('#shidtDetailsTab').click({force: true})
		cy.wait(2000)
	})
	
	Cypress.Commands.add('navigate_EmployeeOnDutyEntry',()=>{
     cy.wait(1000)
		cy.navigate_EmployeeProfile()
		
		cy.get('#attendance_detail_tab').click({force:true});
		cy.wait(2000)
		
		cy.get('#ondutyEntryTab').click({force:true})
		cy.wait(3000)
	})
	
	Cypress.Commands.add('navigate_Setting',()=>{
     cy.wait(1000)
	 cy.get('#globalSearch').click({force: true})		
		cy.get('#globalSearch').clear()
		cy.get('#globalSearch').type('smtp settings')
		cy.wait(2000)
		cy.contains('li', 'smtp settings').click({force: true})
		cy.wait(3000)
	})
	
	Cypress.Commands.add('navigate_LeaveFinancialSetting',()=>{
	cy.wait(1000)
		cy.get('#globalSearch').click({force: true})		
		cy.get('#globalSearch').clear()
		cy.get('#globalSearch').type('leave financial setting')
		cy.wait(2000)
		cy.contains('li', 'leave financial setting').click({force: true})
		cy.wait(3000)
	})
	
	it('successfully loads', function() {
		cy.visit('http://next.pockethrms.com/') 
	})
	
	it('Pocket HRMS Login', function() {
		cy.get('#Email').should('be.visible').should('have.css', 'border-radius') 
		cy.get('#Email').should('exist')
		cy.get('#Email').click()
		//cy.get('#Email').type('administrator@bhagya.com')
		cy.get('#Email').type('nileshgajare@live.com')
		cy.get('#Password').should('be.visible').should('have.css', 'border-radius') 
		cy.get('#Password').should('exist')
		cy.get('#Password').click()
		cy.get('#Password').type('123456')
		cy.get('#Password').should('have.value', '123456')
		
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
	
/*	it('Shift Details - Verify Validation of Add Auto Shift Page', function() {
		const { softAssert, softExpect } = chai;
		cy.navigate_EmployeeAttendance_ShiftDetails()
		
		cy.xpath("//i[@class='fas fa-plus font-16']").click({force: true})
		cy.wait(1000)
		
		cy.get('#btnSaveAutoShift').click({force: true})
		
		cy.get(".toast-message").invoke('text').then((text) => {
			softExpect(text.trim()).to.eq('Select Shift Schedule');
	})
	
	it('Shift Details - Add Auto Shift', function() {
		const { softAssert, softExpect } = chai;
		
		cy.navigate_EmployeeAttendance_ShiftDetails()
		
		cy.xpath("//i[@class='fas fa-plus font-16']").click({force: true})
		cy.wait(1000)
		cy.get('#autoShiftSelect').select('General', {force: true})
		
		cy.get('#AutoShiftEffectiveDate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))			
				input.val(currentDate)
		})
		
			cy.get('#LeaveAuthId').select('No', {force: true})
			cy.get('#EarlyAuthId').select('No', {force: true})
			cy.get('#OTAuthId').select('No', {force: true})	
			
		cy.get('#btnSaveAutoShift').click({force: true})
		
		cy.get(".toast-message").invoke('text').then((text) => {
			softExpect(text.trim()).to.eq('Records Saved Successfully!!!');
	})
		cy.get('#AutoShiftDiv').should('contain','Autoshift Present with shift - General With Effective Date - '+currentDate)		
		
	})
	
	*/
	
	/*	it('Shift Details - Update Auto Shift', function() {
		const { softAssert, softExpect } = chai;
		
		cy.navigate_EmployeeAttendance_ShiftDetails()  
		
		cy.xpath("//div[@id='AutoShiftDiv']//i[@class='fas fa-edit text-info font-16']").click()
		cy.wait(1000)
		//cy.get('#autoShiftSelect').select('General', {force: true})
		
		cy.get('#AutoShiftEffectiveDate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))			
				input.val(tomorrowDate)
		})
		
		//	cy.get('#LeaveAuthId').select('No', {force: true})
		//	cy.get('#EarlyAuthId').select('No', {force: true})
		//	cy.get('#OTAuthId').select('No', {force: true})	
			
		cy.get('#btnSaveAutoShift').click()
		cy.wait(2000)
		cy.get(".toast-message").invoke('text').then((text) => {
			softExpect(text.trim()).to.eq('Records Saved Successfully!!!');
	})
		cy.get('#AutoShiftDiv').should('contain','Autoshift Present with shift - General With Effective Date - '+tomorrowDate)		
		
	})
	*/

/*	it('Shift Details - Delete Auto Shift', function() {
		const { softAssert, softExpect } = chai;
		
		cy.navigate_EmployeeAttendance_ShiftDetails()  
		
		cy.xpath("//div[@id='AutoShiftDiv']//a[1]").click()
		cy.wait(1000)
		
		cy.get(".toast-message").invoke('text').then((text) => {
			softExpect(text.trim()).to.eq('Auto Shift Deleted Successfully!!!');
	})
		cy.get('#AutoShiftDiv').should('contain','No Auto Shift found')		
		
	})
	
	
	it('Shift Details - Verify Validation of Shift Schedule Page', function() {
		const { softAssert, softExpect } = chai;
		cy.navigate_EmployeeAttendance_ShiftDetails()
		
		cy.xpath("//div[@id='attendanceContentTitle']//i[@class='fas fa-plus']").click({force: true})
		cy.wait(1000)
		
		cy.get('#btnSave').click({force: true})
		
		cy.get(".toast-message").invoke('text').then((text) => {
			softExpect(text.trim()).to.eq('Select Shift Name');
		})
	})
	
	
	it('Shift Details - Add Shift Schedule', function() {
		const { softAssert, softExpect } = chai;
		cy.navigate_EmployeeAttendance_ShiftDetails()
		
		cy.xpath("//div[@id='attendanceContentTitle']//i[@class='fas fa-plus']").click({force: true})
		cy.wait(1000)
		cy.get('#ShiftName').select('General', {force: true})
		
		cy.get('#dateRange').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))			
				input.val('01/01/2020')
		})
		
		cy.get('#dateRange').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))			
				input.val(currentDate)
		})
		
		cy.get('#btnSave').click({force: true})
		
		cy.get(".toast-message").invoke('text').then((text) => {
			softExpect(text.trim()).to.eq('Records Saved Successfully!!!');
		})
	})
	*/
	
	/* it('Shift Details - Update Shift Schedule', function() {
		const { softAssert, softExpect } = chai;
		cy.navigate_EmployeeAttendance_ShiftDetails()
		
		cy.xpath("//i[@class='fas fa-edit text-info font-16']").click({force: true})
		cy.wait(1000)
		cy.get('#ShiftName').select('Second', {force: true})
		
		cy.get('#dateRange').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))			
				input.val('01/01/2020')
		})
		
		cy.get('#dateRange').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))			
				input.val(currentDate)
		})
		
		cy.get('#btnSave').click({force: true})
		
		cy.get(".toast-message").invoke('text').then((text) => {
			softExpect(text.trim()).to.eq('Records Saved Successfully!!!');
		})
		cy.xpath("//h4[@class='mt-0 mb-2 font-16']").invoke('text').then((ScheduleDate) => {	
			cy.log("ScheduleDate: "+ScheduleDate)
		softExpect(ScheduleDate.trim()).to.eq('01/01/2020 - '+ currentDate);
		})
		
		cy.xpath("//li[@class='list-inline-item mr-2']").should('contain','Second')
		
	})
	
	
	it('Onduty Entry - Add On Duty Entry',function() {
		const { softAssert, softExpect } = chai;
		
		cy.navigate_EmployeeOnDutyEntry()
		for(let i = 0; i < onDuty.length; i++) {
			
			cy.xpath("//div[@id='attendanceContentTitle']//i[@class='fas fa-plus']").click({force:true})
			cy.wait(2000)
		
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
						
						cy.get("#tblPermi> tbody >tr").each(function(row, k){	
		var num = parseFloat(k+1)
		cy.log("num: "+num)
			
			
			
			cy.get("#tblPermi > tbody >tr >td:nth-child(1)").eq(k).invoke('text').then((fromDate) => {	
			cy.log("fromDate: "+fromDate)
			softExpect(fromDate.trim()).to.eq(onDuty[i].EntryDate);
			})
			
			cy.get("#tblPermi > tbody >tr >td:nth-child(2)").eq(k).invoke('text').then((toDate) => {	
			cy.log("toDate: "+toDate)
			softExpect(toDate.trim()).to.eq(onDuty[i].EntryDate);
			})
			
			cy.get("#tblPermi > tbody >tr >td:nth-child(3)").eq(k).invoke('text').then((inTime) => {	
			cy.log("inTime: "+inTime)
			softExpect(inTime.trim()).to.eq(onDuty[i].InDate_HH+":"+onDuty[i].InDate_MM);
			})
			
			cy.get("#tblPermi > tbody >tr >td:nth-child(4)").eq(k).invoke('text').then((inTime) => {	
			cy.log("inTime: "+inTime)
			softExpect(inTime.trim()).to.eq(onDuty[i].OutDate_HH+":"+onDuty[i].OutDate_MM);
			})
			
			cy.get("#tblPermi > tbody >tr >td:nth-child(5)").eq(k).invoke('text').then((leaveType) => {	
			cy.log("leaveType: "+leaveType)
				
					softExpect(leaveType).to.eq('COFF');		
			})
			
			cy.get("#tblPermi > tbody >tr >td:nth-child(6)").eq(k).invoke('text').then((leaveDays) => {	
				cy.log("leaveDays: "+leaveDays)
				if(i == 0)
				{
				softExpect(leaveDays.trim()).to.eq('1');
				}
				else if(i == 1)
				{
				softExpect(leaveDays.trim()).to.eq('2');	
				}
				else if(i == 2)
				{
				softExpect(leaveDays.trim()).to.eq('0.5');	
				}	
				
				})
				
						})						
		}
	})
*/

/*	it('Weekly Off - Set Weekly Off Entry Category Wise in Leave Financial Year',function() {
		const { softAssert, softExpect } = chai;
		//cy.navigate_Setting()
		
		cy.navigate_LeaveFinancialSetting()
		 cy.xpath("//div[@id='card_635']//div[2]//a[1]//i[1]").click({force: true})	
		 cy.wait(1000)
		 cy.get('#ddWeekOff').select('Category')
		 cy.get('#btnSaveFinSet').click({force: true})
		 
		 cy.get(".toast-message").invoke('text').then((text) => {
			softExpect(text.trim()).to.eq('Records Saved Successfully!!!');
			cy.wait(2000)
			 cy.get(".toast-message").click()
			})
		  
	})	

	it('Weekly Off - Set Weekly Off for Staff',function() {
		const { softAssert, softExpect } = chai;
			
		 cy.get("#weeklyOff").click({force: true})	
		 cy.wait(1000)
		 cy.get('#ddDynamic').select('Staff')
		  cy.wait(1000)
		 cy.get('#btnSave').click({force: true})
		 cy.get(".toast-message").invoke('text').then((text) => {
			softExpect(text.trim()).to.eq('Data saved successfully.!');
			cy.wait(2000)
			 cy.get(".toast-message").click()
		})	 
			cy.get('#ddDynamic').select('Staff')
		  cy.wait(1000)
		   cy.xpath("//div[@id='card_635']//div[2]//a[1]//i[1]").click({force: true})	
		  
	})
	
	it('Weekly Off - Verify Weekly Off for Staff',function() {
		cy.navigate_EmployeeAttendance()
		cy.get("#weeklyOffTab").click({force: true})	
		 cy.wait(1000)
		 cy.xpath("//div[@id='card_635']//div[2]//a[1]//i[1]").click({force: true})	
		
	})
	
	it('Weekly Off - Set Weekly Off for Admin',function() {
		cy.navigate_LeaveFinancialSetting()
		const { softAssert, softExpect } = chai;
			
		 cy.get("#weeklyOff").click({force: true})	
		 cy.wait(1000)
		 cy.get('#ddDynamic').select('Admin')
		  cy.wait(1000)
		 cy.get('#btnSave').click({force: true})
		 cy.get(".toast-message").invoke('text').then((text) => {
			softExpect(text.trim()).to.eq('Data saved successfully.!');
			cy.wait(2000)
			 cy.get(".toast-message").click()
		})	  
		cy.get('#ddDynamic').select('Admin')
		  cy.wait(1000)
		   cy.xpath("//div[@id='card_635']//div[2]//a[1]//i[1]").click({force: true})	
	})
	
	it('Weekly Off - Verify Weekly Off for Admin',function() {
		cy.navigate_EmployeeAttendance()
		cy.get("#weeklyOffTab").click({force: true})	
		 cy.wait(1000)
		 cy.xpath("//div[@id='card_635']//div[2]//a[1]//i[1]").click({force: true})	
		
	})
	
	it('Holiday - Set Holiday Entry Category Wise in Leave Financial Year',function() {
		const { softAssert, softExpect } = chai;
		//cy.navigate_Setting()
		cy.wait(1000)
		cy.get('#globalSearch').click({force: true})		
		cy.get('#globalSearch').clear()
		cy.get('#globalSearch').type('leave financial setting')
		cy.wait(2000)
		cy.contains('li', 'leave financial setting').click({force: true})
		cy.wait(3000)
		
		 cy.xpath("//div[@id='card_635']//div[2]//a[1]//i[1]").click({force: true})	
		 cy.wait(1000)
		 cy.get('#ddHoli').select('Category')
		 cy.get('#btnSaveFinSet').click({force: true})
		 
		 cy.get(".toast-message").invoke('text').then((text) => {
			softExpect(text.trim()).to.eq('Records Saved Successfully!!!');
			cy.wait(2000)
			 cy.get(".toast-message").click()
			})
		  
	})	

	
	it('Holiday - Set Holiday for Staff',function() {
		const { softAssert, softExpect } = chai;
		
		for(let i = 0; i < holiday.length; i++) {
			
		 cy.get("#holiday").click({force: true})	
		 cy.wait(1000)
		  cy.get('#ddDynamic').select('Staff')
		  
		 cy.xpath("//div[@id='leaveContentTitle']//i[@class='fa fa-plus']").click({force: true})
		 
		 cy.get('#HolidayDate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(holiday[i].holiday_Date)
			})
			
			cy.get('#HolidayReason').click({force: true})		
		cy.get('#HolidayReason').clear()
		cy.get('#HolidayReason').type(holiday[i].Description)
		
			
			cy.get('#chkOptional').select('No')
			 cy.get("#btnSaveFinSet").click({force: true})	
			cy.wait(1000)
		 
			cy.get(".toast-message").invoke('text').then((text) => {
			softExpect(text.trim()).to.eq('Records Saved Successfully!!!');
			cy.wait(2000)
			 cy.get(".toast-message").click()
			})
		}
	})

	it('Holiday - Verify Holiday for Staff',function() {
		cy.navigate_EmployeeAttendance()
		cy.get("#holidayTab").click({force: true})	
		 cy.wait(1000)
		 cy.xpath("//div[@id='card_635']//div[2]//a[1]//i[1]").click({force: true})	
		
	})	
	
	it('Holiday - Set Holiday for Admin',function() {
		const { softAssert, softExpect } = chai;
		cy.navigate_LeaveFinancialSetting()
		for(let i = 0; i < holiday.length; i++) {
			
		 cy.get("#holiday").click({force: true})	
		 cy.wait(1000)
		  cy.get('#ddDynamic').select('Admin')
		  
		 cy.xpath("//div[@id='leaveContentTitle']//i[@class='fa fa-plus']").click({force: true})
		 
		 cy.get('#HolidayDate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(holiday[i].holiday_Date)
			})
			
			cy.get('#HolidayReason').click({force: true})		
		cy.get('#HolidayReason').clear()
		cy.get('#HolidayReason').type(holiday[i].Description)
		
			
			cy.get('#chkOptional').select('No')
			 cy.get("#btnSaveFinSet").click({force: true})	
			cy.wait(1000)
		 
			cy.get(".toast-message").invoke('text').then((text) => {
			softExpect(text.trim()).to.eq('Records Saved Successfully!!!');
			cy.wait(2000)
			 cy.get(".toast-message").click()
			})
		}
	})

	it('Holiday - Verify Holiday for Admin',function() {
		cy.navigate_EmployeeAttendance()
		cy.get("#holidayTab").click({force: true})	
		 cy.wait(1000)
		 cy.xpath("//div[@id='card_635']//div[2]//a[1]//i[1]").click({force: true})	
		
	})	
	*/
	
	it('Time Consolidation - Delete for Month Wise',function() {
		const { softAssert, softExpect } = chai;
		cy.navigate_EmployeeAttendance()
		cy.get("#timeConsolidationTab").click({force: true})	
		cy.wait(1000)
		cy.get('#ddMonth').select(month_TimeConsolidation)
		cy.get("#btnDelete").click({force: true})	
		
		cy.get(".toast-message").invoke('text').then((text) => {
			softExpect(text.trim()).to.eq('Deleted Successfully!!');
			cy.wait(2000)
			cy.get(".toast-message").click()
		})
		
	})
	
	it('Time Consolidation - Process for Month Wise',function() {
		const { softAssert, softExpect } = chai;
		//cy.navigate_EmployeeAttendance()
		cy.get("#timeConsolidationTab").click({force: true})	
		cy.wait(1000)
		cy.get('#ddMonth').select(month_TimeConsolidation)
		cy.get("#btnProcess").click({force: true})	
		
		cy.get(".toast-message").invoke('text').then((text) => {
			softExpect(text.trim()).to.eq('Process Over.!');
			cy.wait(2000)
			cy.get(".toast-message").click()
		})
		
	})	
	
	it('Time Consolidation - Process from Payroll Posting',function() {
		const { softAssert, softExpect } = chai
		cy.wait(1000)
		cy.get('#globalSearch').click({force: true})		
		cy.get('#globalSearch').clear()
		cy.get('#globalSearch').type('Payroll Posting')
		cy.wait(2000)
		cy.contains('li', 'Payroll Posting').click({force: true})
		cy.wait(3000)
		
		cy.get('#ddMonth').select(month_TimeConsolidation)
		cy.get("#catall").click({force: true})	
		cy.wait(1000)
		
		cy.get("#btnProcessPayrollPosting").click({force: true})	
		cy.wait(3000)
		
	})
	
	it('Time Consolidation - Post from Payroll Posting',function() {
		cy.get("#btnPostPayrollPosting").click({force: true})
	})
	
	it('Annual Muster Roll - Download Excel file',function() {
		const { softAssert, softExpect } = chai;
		cy.navigate_EmployeeAttendance()
		cy.get("#leaveMusterTab").click({force: true})	
		cy.wait(1000)
		cy.xpath("//div[@id='attendanceContentTitle']//i[@class='fas fa-download']").click({force: true})
		cy.wait(2000)
		//cy.task('convertExcelToJson_CurrentFile',{file:separation, fileName:current_FilePath + separation +'.xlsx'})
	
	})
	
	
})