describe('Attendence Process ', function() {
	
	var url = 'https://next.pockethrms.com'
	var username= 'nileshgajare@live.com'
	var userPass = '123456'
	var company= 'BBTest_25';
	var employeeCode = 'CY4'

	var startDate=  '01/04/2020'
	var endDate ='13/04/2020'
	
	let leave = [
    {LeaveType: "Paid Leave", FromDate: "06/04/2020", FromDateDay: "FULL DAY", ToDate: "06/04/2020", ToDateDay: "FULL DAY"},
	{LeaveType: "Paid Leave", FromDate: "07/04/2020", FromDateDay: "FULL DAY", ToDate: "07/04/2020", ToDateDay: "FULL DAY"}
	];
	
	let onDuty = [
    {EntryDate: "08/04/2020", Type: "FULLDAY ONDUTY", Half: "", 	 InDate_HH: "9", InDate_MM: "00", OutDate_HH: "17", OutDate_MM: "00"},
	{EntryDate: "09/04/2020", Type: "HALFDAY ONDUTY", Half: "First", InDate_HH: "9", InDate_MM: "00", OutDate_HH: "13", OutDate_MM: "00"},
	{EntryDate: "10/04/2020", Type: "HALFDAY ONDUTY", Half: "Second",InDate_HH: "13", InDate_MM: "00", OutDate_HH: "17", OutDate_MM: "00"},	
	];
	
	let modifiedPunch = [
    {EntryDate: "01/04/2020", Type: "FULLDAY PRESENT", Half: "", 	 InDate_HH: "9", InDate_MM: "00", OutDate_HH: "17", OutDate_MM: "00"},
	{EntryDate: "02/04/2020", Type: "HALFDAY PRESENT", Half: "First", InDate_HH: "9", InDate_MM: "00", OutDate_HH: "13", OutDate_MM: "00"},
	{EntryDate: "03/04/2020", Type: "HALFDAY PRESENT", Half: "Second",InDate_HH: "13", InDate_MM: "00", OutDate_HH: "17", OutDate_MM: "00"},	
	];
	

	
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
	
	Cypress.Commands.add('navigate_EmployeeAttendanceInOutDetails',()=>{
		cy.wait(1000)
		cy.get('#attendance_detail_tab').click({force: true})
		cy.wait(2000)
		cy.xpath("//div[@id='attendance_detail']//li[2]").click({force: true})
		cy.wait(10000)
	})
	
	Cypress.Commands.add('apply_InOutCoreDetailsFilter',()=>{
		cy.get('#attendanceContentTitle a:nth-child(2)').click({force: true})
		cy.wait(2000)
	
		cy.get('#StartDate').click({force: true}).then(input => {
		    input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(startDate)
		})	
	   
		cy.wait(5000)
	   	cy.get('#EndDate').click({force: true}).then(input => {
		    input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(endDate)
	   })
	    
	   cy.get('#btnFilterEarningDeduction').click({force: true})
	   cy.wait(5000)
	})
	
	Cypress.Commands.add('navigate_EmployeeOnDutyEntry',()=>{
     cy.wait(1000)
		cy.navigate_EmployeeProfile()
		
		cy.get('#attendance_detail_tab').click({force:true});
		cy.wait(2000)
		
		cy.get('#Attendance_OndutyEntry').click({force:true})
		cy.wait(3000)
	})
	
	
	
	it('Pocket HRMS Login', function() {
		cy.visit(url)
		
		cy.get('#Email').click()
		cy.get('#Email').type(username)
		
		cy.get('#Password').click()
		cy.get('#Password').type(userPass)
		
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
				cy.get('[onclick="changeCompanyModal()"]').click({force: true})
				cy.wait(2000)
				cy.get('.radio').find('label').each(function(row, i){
				var num1 = parseFloat(i+1)
				cy.get('.radio:nth-child('+num1+') > label').invoke('text').then((text) => {	
					if(text.trim()==company){
						expect(text).to.eq(company)
						cy.get('.radio:nth-child('+num1+') > label').click({force: true})
						cy.get('#defaultCompanySave').click({force: true})
						cy.wait(2000)
					}	
				})
				})		
			}
		})	 	
	})
	
	it('Navigate to Employee profile', function() {
		cy.wait(1000)
		cy.get('#globalSearch').click({force: true})		
		cy.get('#globalSearch').clear()
		cy.get('#globalSearch').type(employeeCode)
		cy.wait(2000)
		cy.contains('li', employeeCode).click({force: true})
		cy.wait(3000)
	})
		
	it('Verify Add Leave page',function(){
	const { softAssert, softExpect } = chai;
		cy.navigate_EmployeeLeave()	
		cy.delete_EmployeesAllLeaves()
		//cy.wait(10000)
		for(let j=0; j< leave.length; j++){
			
		cy.wait(5000)
		cy.xpath("//div[@id='carouselExampleIndicators']//div[@class='card-body body-bg']//h4").each(function(row, i){	
		var num = parseFloat(i+1)
		cy.log("num: "+num)
		
		cy.xpath("//div[@id='carouselExampleIndicators']//div[@class='card-body body-bg']//h4").eq(i).invoke('text').then((text) => {	
		cy.log("text: "+text)
			if(text.trim()==leave[j].LeaveType){
				expect(text).to.eq(leave[j].LeaveType)	
	
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
				input.val(leave[j].FromDate)
			})
	   
			cy.wait(1000)
			cy.get('#todate').click().then(input => {
		    input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(leave[j].ToDate)
			})
	
		cy.wait(1000)
		cy.get('#drpFromDayType').select(leave[j].FromDateDay,{force: true})
		cy.get('#drpToDayType').select(leave[j].ToDateDay,{force: true})
		//cy.get('#drpFromDayType').select(leaveDateRange[j].FromDateDay)
		//cy.get('#drpToDayType').select(leaveDateRange[j].ToDateDay)
		cy.get('#leaveType').select(leave[j].LeaveType,{force: true})
		
		cy.get('#remarks').click({force: true})
		cy.get('#remarks').clear()
		cy.get('#remarks').type('Test');
		
		cy.wait(3000)
		cy.get('#btnAddLeave').click({force: true})
		cy.wait(3000)
		
		cy.get('#btnclose').click({force: true})
		cy.wait(1000)
		
		
		cy.get(".toast-message").invoke('text').then((text) => {		
			cy.log(text.trim())
			softExpect(text.trim()).to.eq('Leave Updated Successfully');
			
		})

		
		})
		}
		})			
		}) 	
		}		
		})


	it('Navigate to Employee Attendance - In/Out Details', function() {
		cy.navigate_EmployeeAttendanceInOutDetails()
		
	})
	
	it('Apply In Out Core Details Filter', function() {		
		cy.apply_InOutCoreDetailsFilter()
	})
	
	it('Verify On Duty Entry Scanario', function() {
		cy.wait(1000)	
		cy.get('#tblInOutCoreDetail > tbody > tr').each(function(row, i){	
			var num = parseFloat(i+1)
			//cy.wait(2000)	
			cy.get('#tblInOutCoreDetail> tbody>tr:nth-child('+num+')>td:nth-child(3)').invoke('text').then((InTime) => {
			cy.get('#tblInOutCoreDetail> tbody>tr:nth-child('+num+')>td:nth-child(6)').invoke('text').then((Leave) => {	
			cy.get('#tblInOutCoreDetail> tbody>tr:nth-child('+num+')>td:nth-child(2)').invoke('text').then((EntryDate) => {	
			cy.log("EntryDate: "+EntryDate)
			cy.log("InTime: "+InTime)
			cy.log("Leave: "+Leave)
			
			
					
				if(InTime.trim()=='Unswiped' && Leave.trim()=='PL'){
					cy.get('#tblInOutCoreDetail> tbody>tr:nth-child('+num+')>td:nth-child(11)>div>a').click({force: true})
			cy.wait(1000)
			cy.xpath("//div[@class='dropdown-menu dropdown-menu-right dropheight show']//a[@class='dropdown-item dropheight'][contains(text(),'On Duty Entry')]").click({force: true})
			cy.wait(2000)
			
					expect(InTime.trim()).to.eq('Unswiped')
					expect(Leave.trim()).to.eq('PL')						
					
					cy.get(".toast-message").invoke('text').then((text) => {
					cy.log(text.trim())	
					expect(text.trim()).equal('Leave entry found.!')
					cy.get(".toast-message").click({force: true})
				})
				cy.contains('Close').click({force: true})				
				}
				
					
					
		loop:	for(let i = 0; i < onDuty.length; i++) {
			
						
					if(EntryDate.trim()==onDuty[i].EntryDate)
					{
				cy.get('#tblInOutCoreDetail> tbody>tr:nth-child('+num+')>td:nth-child(11)>div>a').click({force: true})
			cy.wait(1000)
			cy.xpath("//div[@class='dropdown-menu dropdown-menu-right dropheight show']//a[@class='dropdown-item dropheight'][contains(text(),'On Duty Entry')]").click({force: true})
			cy.wait(2000)
				
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
						expect(text.trim()).equal('Record saved successfully.!')
						//cy.get(".toast-message").click({force: true})
						cy.contains('Close').click({force: true})
						})

											
			cy.wait(2000)
			
		cy.navigate_EmployeeAttendanceInOutDetails()
	
		cy.apply_InOutCoreDetailsFilter()
	
	
			
						break loop;					
					}	
					}				
				

			cy.wait(2000)
			 })		
			})		
			})
			})
	})
	
	it('Verify On duty Entry', function() {
		const { softAssert, softExpect } = chai;
		
		cy.navigate_EmployeeOnDutyEntry()
		for(let i = 0; i < onDuty.length; i++) {
			
			
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
		
	it('Verify Modified Punch', function() {
		cy.wait(1000)
		cy.get('#attendance_detail_tab').click({force: true})
		cy.wait(2000)
		cy.xpath("//div[@id='attendance_detail']//li[2]").click({force: true})
		cy.wait(15000)
		cy.get('#tblInOutCoreDetail > tbody > tr').each(function(row, i){	
			var num = parseFloat(i+1)
			cy.get('#tblInOutCoreDetail> tbody>tr:nth-child('+num+')>td:nth-child(3)').invoke('text').then((InTime) => {
			cy.get('#tblInOutCoreDetail> tbody>tr:nth-child('+num+')>td:nth-child(4)').invoke('text').then((OutTime) => {	
			cy.get('#tblInOutCoreDetail> tbody>tr:nth-child('+num+')>td:nth-child(2)').invoke('text').then((EntryDate) => {	
			cy.log("EntryDate: "+EntryDate)
			cy.log("InTime: "+InTime)
			cy.log("OutTime: "+OutTime)
	
	loop:	for(let i = 0; i < modifiedPunch.length; i++) {	
	
				if(EntryDate.trim()==modifiedPunch[i].EntryDate)
					{					
					cy.get('#tblInOutCoreDetail> tbody>tr:nth-child('+num+')>td:nth-child(11)>div>a').click({force: true})
					cy.wait(1000)					
					cy.xpath("//div[@class='dropdown-menu dropdown-menu-right dropheight show']//a[@class='dropdown-item dropheight'][contains(text(),'Modified Punch')]").click({force: true})
					cy.wait(2000)
					
					cy.get('#Type').select(modifiedPunch[i].Type,{force: true})
						
					if(modifiedPunch[i].Type=="HALFDAY PRESENT")
					{
						if(modifiedPunch[i].Half=="First")
						{
							cy.xpath("//div[@class='radio form-check-inline']//input[@id='rdFirst']").click({force: true})
						}
						else
						{
							cy.xpath("//div[@class='radio form-check-inline']//input[@id='rdSecond']").click({force: true})
						}
					}	
					
					cy.get('#tmInTimeHourModifiedPunch').click({force: true})
					cy.get('#tmInTimeHourModifiedPunch').clear()
					cy.get('#tmInTimeHourModifiedPunch').type(modifiedPunch[i].InDate_HH)	 
						
					cy.get('#tmInTimeMinModifiedPunch').click({force: true})
					cy.get('#tmInTimeMinModifiedPunch').clear()
					cy.get('#tmInTimeMinModifiedPunch').type(modifiedPunch[i].InDate_MM)	
						
					cy.get('#tmOutTimeHourModifiedPunch').click({force: true})
					cy.get('#tmOutTimeHourModifiedPunch').clear()
					cy.get('#tmOutTimeHourModifiedPunch').type(modifiedPunch[i].OutDate_HH)	
						
					cy.get('#tmOutTimeMinModifiedPunch').click({force: true})						
					cy.get('#tmOutTimeMinModifiedPunch').clear()
					cy.get('#tmOutTimeMinModifiedPunch').type(modifiedPunch[i].OutDate_MM)	
						
					cy.get('#btnSave').click({force: true})
						
					cy.get(".toast-message").invoke('text').then((text) => {
					cy.log(text.trim())	
					expect(text.trim()).equal('Record saved successfully.!')
					cy.get(".toast-message").click({force: true})
					})
				
			
			cy.get('#tblInOutCoreDetail> tbody>tr:nth-child('+num+')>td:nth-child(3)').invoke('text').then((InTime) => {
			cy.get('#tblInOutCoreDetail> tbody>tr:nth-child('+num+')>td:nth-child(4)').invoke('text').then((OutTime) => {	
			cy.get('#tblInOutCoreDetail> tbody>tr:nth-child('+num+')>td:nth-child(2)').invoke('text').then((EntryDate) => {	
			cy.log("EntryDate: "+EntryDate)
			cy.log("InTime: "+InTime)
			cy.log("OutTime: "+OutTime)
			
			expect(EntryDate.trim()).equal(modifiedPunch[i].EntryDate)
			expect(InTime.trim()).equal(modifiedPunch[i].InDate_HH+":"+modifiedPunch[i].InDate_MM)
			expect(OutTime.trim()).equal(modifiedPunch[i].OutDate_HH +":"+modifiedPunch[i].OutDate_MM )
			
						
			})
			})
			})			
			break loop;
			}
			}	
			})
			})
			})
			})
	})
	
	
})