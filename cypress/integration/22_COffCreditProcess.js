
describe("Dynamically Generated Tests", () => {
	var url = 'http://next.pockethrms.com'
	var username= 'nileshgajare@live.com'
	var userPass = '123456'  //Attendance_OndutyEntry
	var employeeID ='CY2';

	var lopMonth= 'March';
	var onDutyMonth= 'April';
	
		const Day = Cypress.moment().format('DD')
		const Day1 = parseInt(Day)+1
		const Month = Cypress.moment().format('MM')
		const year = Cypress.moment().format('YYYY')
		const currentDate = Day+'/'+Month+'/'+year
		const tomorrowDate = Day1+'/'+Month+'/'+year
	
	
	//let leave ={LeaveType: "LD", FromDate: currentDate, FromDateDay: "FULL DAY", ToDate:tomorrowDate, ToDateDay: "FULL DAY"};
	let leave = [
    {LeaveType: "Paid Leave", FromDate: "06/04/2020", FromDateDay: "FULL DAY", ToDate: "06/04/2020", ToDateDay: "FULL DAY"},
    {LeaveType: "Paid Leave", FromDate: "07/04/2020", FromDateDay: "FULL DAY", ToDate: "07/04/2020", ToDateDay: "FULL DAY"}
        ];

	let onDuty = [
    {EntryDate: "05/04/2020", Type: "FULLDAY ONDUTY", Half: "", 	 InDate_HH: "9", InDate_MM: "00", OutDate_HH: "17", OutDate_MM: "00", Remark: "On-Duty"},
	{EntryDate: "11/04/2020", Type: "HALFDAY ONDUTY", Half: "First", InDate_HH: "9", InDate_MM: "00", OutDate_HH: "13", OutDate_MM: "00", Remark: "On-Duty"},
	{EntryDate: "12/04/2020", Type: "HALFDAY ONDUTY", Half: "Second",InDate_HH: "13", InDate_MM: "00", OutDate_HH: "17", OutDate_MM: "00", Remark: "On-Duty"},	
	];
	
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
		cy.wait(4000)
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
		cy.get('#globalSearch').type('Leave Configuration')
		cy.wait(2000)
		cy.contains('li', 'Leave Configuration').click({force: true})
		cy.wait(3000)
		
	})
	
	Cypress.Commands.add('LeaveopenigforCOFF',()=>{
			cy.wait(2000)
			cy.navigate_EmployeeProfile()
			cy.wait(1000)
			cy.get('#leave_detail_tab').click({force: true})
			cy.wait(1000)
			cy.get('#Leave_LeaveEntry').click({force: true})
			cy.wait(2000)
			cy.get('.col-lg-3:nth-child(3) > .card > .card-body > .float-right > a > .fas').click()
			cy.wait(1000)
			cy.get('#LeaveOpen').click({force: true})
			cy.get('#LeaveOpen').clear()		
			cy.get('#LeaveOpen').type('10')
			
			cy.get('#LeaveCredit').click({force: true})
			cy.get('#LeaveCredit').clear()		
			cy.get('#LeaveCredit').type('10')
			cy.get('#CrApp').check({force: true})
			cy.wait(2000)
			cy.get('#saveloader').click({force: true})
		})
	
	
	it('Leave opening for COFF',function() {
		cy.LeaveopenigforCOFF();
	})
	
	it('Add Shift Details',function() {
		
		cy.get('#attendance_detail_tab').click({force: true})
		cy.wait(2000)
		cy.get('#Attendance_ShiftDetails').click({force: true})
		cy.wait(2000)
		cy.get('[title="Add Shift Schedule"]').eq(0).click({force: true})
		cy.wait(2000)
		cy.get('#ShiftName').select('General',{force: true})
		cy.wait(1000)
		cy.get('#dateRange').click().then(input => {
			input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val('01/04/2020 to 30/06/2020')
		})
		
		cy.wait(1000)
		cy.get('[onclick="saveShiftSchedule()"]').click({force: true})
		cy.wait(1000)
	})
	
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
	
			cy.xpath("//div[@id='attendanceContentTitle']//i[@class='fas fa-filter']").click({force: true})
			cy.get('#ddMonth1').select(onDutyMonth,{force: true})
			cy.xpath("//button[contains(text(),'Search')]").click({force: true})
			cy.wait(5000)
			
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
	
	
	it('Verify Activate Elapse & Elapse Expiry Days within Leave Configuration',function() {	
			cy.navigate_LeaveConfigurationSetting()		
			cy.wait(3000)
			cy.get('#ddLeavType').select('COFF')
			cy.wait(2000)
			cy.get('#btnDelete').click({force:true})
			cy.wait(3000)
			cy.get('#ddLeavType').select('COFF')
			
			cy.get('#txtMaxDaysMonth').click({force:true})
			cy.get('#txtMaxDaysMonth').clear()
			cy.get('#txtMaxDaysMonth').type('5')
			
			cy.wait(1000)
			cy.get('#ddActivateElpase').select('Yes',{force:true})
			
			cy.get('#ddElapsExpiryDays').click({force:true})
			cy.get('#ddElapsExpiryDays').clear()
			cy.get('#ddElapsExpiryDays').type('40')
			cy.wait(1000)
			cy.get('#btnSave').click()
			
			cy.wait(3000)
			cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())
			expect(text.trim()).equal('Data saved successfully.!')		
			})
			
		cy.navigate_EmployeeLeave()
		cy.delete_EmployeesAllLeaves()
		cy.wait(3000)
	})	
	
	it('Apply CompOff Credit',function() {
		const { softAssert, softExpect } = chai;
		cy.wait(1000)
		cy.visit('https://next.pockethrms.com/Settings/Employee/Index?module=attendance&submodule=compoffcredit')
		cy.wait(2000)
		
		cy.get('#leave_detail_tab').click({force: true})
		cy.wait(1000)
		cy.get('#Leave_CompOffCredit').click({force: true})
		cy.wait(2000)
		
		
				cy.get('#select2-multiEmp-container').click({force: true})
				cy.wait(2000)
				cy.get('input[type="search"]').click({force: true})
				cy.get('input[type="search"]').type(employeeID)
				cy.wait(2000)
				cy.get('.select2-results__option--highlighted').click({force: true})
		cy.wait(1000)
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
		
		
		 cy.get('select[name=dayType_2]').select('Half Day',{force: true})
		  cy.get('select[name=dayType_3]').select('Half Day',{force: true})
		 
		 cy.wait(2000)
		cy.get('#btnSaveCompOffCredit').click({force: true})
			
	})
	
	
	it('Apply Leave as CompOff for more days',function() {
		cy.navigate_EmployeeLeave()
		
		cy.get('[title="Add Leave Details"]').eq(0).click({force: true})
		cy.wait(2000)
		 cy.get('#leaveType').select('COFF',{force: true})
		 cy.get('#remarks').type('COFF test')
		 cy.wait(2000)
		 cy.get('.ClsCompOff').eq(1).check({force: true})
		 
		 cy.get('#fromdate').click().then(input => {
		   input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val('08/04/2020')
	   })
	   
	    cy.get('#todate').click().then(input => {
		   input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val('08/04/2020')
	   })
	   
	   cy.wait(1000)
	   cy.get('#drpFromDayType').select('FULL DAY',{force: true})
	   cy.get('#drpToDayType').select('FULL DAY',{force: true})
	   
	   cy.wait(2000)
	   cy.get('#btnAddLeave').click({force: true})
	   cy.wait(1000)
	   cy.get(".toast-message").invoke('text').then((text) => {
			expect(text.trim()).equal('Invalid No.Of Days Found.!')
			cy.log(text.trim())
		}) 
		
       cy.get('.ClsCompOff').eq(1).uncheck({force: true})		
	})
	
	it('Apply Leave as CompOff for first half but coff not available for first half',function() {
					
	 cy.get('.ClsCompOff').eq(0).check({force: true})
		 
		 cy.get('#fromdate').click().then(input => {
		   input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val('08/04/2020')
	   })
	   
	    cy.get('#todate').click().then(input => {
		   input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val('08/04/2020')
	   })
	   
	   cy.wait(1000)
	   cy.get('#drpFromDayType').select('FIRST HALF DAY',{force: true})
	   cy.get('#drpToDayType').select('FIRST HALF DAY',{force: true})
	   
	   cy.wait(2000)
	    cy.get('#btnAddLeave').click({force: true})
	   cy.wait(1000)
	   cy.get(".toast-message").invoke('text').then((text) => {
			expect(text.trim()).equal('Invalid No.Of Days Found.!')
			cy.log(text.trim())
		}) 
		
		cy.get('.ClsCompOff').eq(0).uncheck({force: true})	
	})
	
	
	it('add COFF for the full dyas',function() {
		
		cy.wait(2000)
		 cy.get('#leaveType').select('COFF',{force: true})
		 cy.get('#remarks').type('COFF test')
		 cy.wait(2000)
		 cy.get('.ClsCompOff').eq(0).check({force: true})
		 
		 cy.get('#fromdate').click().then(input => {
		   input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val('06/04/2020')
	   })
	   
	    cy.get('#todate').click().then(input => {
		   input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val('06/04/2020')
	   })
	   
	   cy.wait(1000)
	   cy.get('#drpFromDayType').select('FULL DAY',{force: true})
	   cy.get('#drpToDayType').select('FULL DAY',{force: true})
	   
	   cy.wait(2000)
	   cy.get('#btnAddLeave').click({force: true})
	   cy.wait(3000)
	   cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())
		}) 
			
	})
	

	it('add COFF for the firsthalfday dyas',function() {
		cy.wait(2000)
		cy.get('#leaveType').select('COFF',{force: true})
		 cy.get('#remarks').type('COFF test')
		 
		 cy.wait(2000)
		 
		cy.get('.ClsCompOff').eq(0).check({force: true})
		 
		 cy.get('#fromdate').click().then(input => {
		   input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val('13/04/2020')
	   })
	   
	    cy.get('#todate').click().then(input => {
		   input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val('13/04/2020')
	   })
	   
	   cy.wait(1000)
	   cy.get('#drpFromDayType').select('FIRST HALF DAY',{force: true})
	   cy.get('#drpToDayType').select('FIRST HALF DAY',{force: true})
	   
	   cy.wait(2000)
	    cy.get('#btnAddLeave').click({force: true})
	   cy.wait(1000)
	   cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())
		}) 
	})
	
	
	
	it('add COFF for the secondhalfday dyas',function() {
		cy.wait(2000)
		cy.get('#leaveType').select('COFF',{force: true})
		 cy.get('#remarks').type('COFF test')
		 
		 cy.wait(2000)
		cy.get('.ClsCompOff').eq(0).check({force: true})
		 
		 cy.get('#fromdate').click().then(input => {
		   input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val('14/04/2020')
	   })
	   
	    cy.get('#todate').click().then(input => {
		   input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val('14/04/2020')
	   })
	   
	   cy.wait(1000)
	   cy.get('#drpFromDayType').select('SECOND HALF DAY',{force: true})
	   cy.get('#drpToDayType').select('SECOND HALF DAY',{force: true})
	   
	   cy.wait(2000)
	    cy.get('#btnAddLeave').click({force: true})
	   cy.wait(1000)
	   cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())
		}) 
	})
		
	
	it('Verify display Leave against CompOff date in CompOff Credit Page',function() {
		
		cy.wait(1000)
		cy.visit('https://next.pockethrms.com/Settings/Employee/Index?module=attendance&submodule=compoffcredit')
		cy.wait(2000)
		
		cy.get('#leave_detail_tab').click({force: true})
		cy.wait(1000)
		cy.get('#Leave_CompOffCredit').click({force: true})
		cy.wait(2000)
		
		cy.get('#select2-multiEmp-container').click({force: true})
		cy.wait(2000)
		cy.get('input[type="search"]').click({force: true})
		cy.get('input[type="search"]').type(employeeID)
		cy.wait(2000)
		cy.get('.select2-results__option--highlighted').click({force: true})
		cy.wait(1000)
		cy.get('#dtFromDate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val('01/01/2020')
			})
			
			cy.get('#dtToDate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(currentDate)
			})
			
			cy.get('#btnView').click({force: true})
			
			cy.wait(3000)
			cy.get('#tablesorter').contains('td', '05/04/2020').should('be.visible');
			cy.get('#tablesorter').contains('td', '9:00').should('be.visible');
			cy.get('#tablesorter').contains('td', '17:00').should('be.visible');
			cy.get('#tablesorter').contains('td', 'Full Day').should('be.visible');
			cy.get('#tablesorter').contains('td', '06/04/2020').should('be.visible');
			
			cy.get('#tablesorter').contains('td', '11/04/2020').should('be.visible');
			cy.get('#tablesorter').contains('td', '9:00').should('be.visible');
			cy.get('#tablesorter').contains('td', '13:00').should('be.visible');
			cy.get('#tablesorter').contains('td', 'Half Day').should('be.visible');
			cy.get('#tablesorter').contains('td', '13/04/2020').should('be.visible');
			
			cy.get('#tablesorter').contains('td', '12/04/2020').should('be.visible');
			cy.get('#tablesorter').contains('td', '13:00').should('be.visible');
			cy.get('#tablesorter').contains('td', '17:00').should('be.visible');
			cy.get('#tablesorter').contains('td', 'Half Day').should('be.visible');
			cy.get('#tablesorter').contains('td', '14/04/2020').should('be.visible');
	})
	
	
	
	
	it('Comp Off Process',function() {
		cy.wait(1000)
		cy.visit('https://next.pockethrms.com/Attendance/Entry/CompOffProcess')
		cy.wait(2000)
		
		cy.get('.select2-selection--multiple').click({force: true})
		cy.wait(2000)
		cy.get('input[type="search"]').click({force: true})
		cy.get('input[type="search"]').type(employeeID)
		cy.wait(2000)
		cy.get('.select2-results__option--highlighted').click({force: true})
		cy.wait(1000)
		
		
		cy.get('#btnCompOffId').click({force: true})
		
		cy.get(".toast-message").invoke('text').then((text) => {
			if(text.trim()=='Please Select any one Category.')	{
				cy.wait(2000)
				cy.get(".toast-message").eq(0).click({force: true})
				cy.contains('label','Admin').click({force: true})
			}
		})
		
		
		
		cy.wait(2000)
		cy.get('#btnCompOffId').click({force: true})
		cy.get(".toast-message").invoke('text').then((text) => {
			if(text.trim()=='Select From Date.')	{
				cy.wait(2000)
				cy.get(".toast-message").eq(0).click({force: true})
					cy.get('#dtDateFrom').click({force: true}).then(input => {
						input[0].dispatchEvent(new Event('input', { bubbles: true }))
						input.val('01/04/2020')
				})	
			}
		})
		
		
		cy.wait(2000)
		cy.get('#btnCompOffId').click({force: true})
		cy.get(".toast-message").invoke('text').then((text) => {
			if(text.trim()=='Select To Date.!')	{
				cy.wait(2000)
				cy.get(".toast-message").eq(0).click({force: true})
					cy.get('#dtDateTo').click({force: true}).then(input => {
						input[0].dispatchEvent(new Event('input', { bubbles: true }))
						input.val('30/04/2020')
				})	
			}
		})
		
		cy.wait(1000)
		cy.get('#btnCompOffId').click({force: true})
		
	
	})
	
	it('Leave Opening for COFF',function() {
		cy.wait(1000)
		cy.visit('https://next.pockethrms.com/Leave/Setting/LeaveOpening')
		cy.wait(3000)
		cy.get('#Category').select('Admin',{force: true})
		cy.get('#leavType').select('COFF',{force: true})
		cy.wait(4000)
		
		cy.get('#tableSorter').contains('td', '2');
		
		cy.wait(1000)
		cy.get('[onclick="return Validate();"]').click({force: true})
	})	
	
	
})
