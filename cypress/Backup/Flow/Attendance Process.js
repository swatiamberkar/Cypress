describe('Attendence Process ', function() {
	
	var url = 'https://next.pockethrms.com'
	var username= 'nileshgajare@live.com'
	var userPass = '123456'
	var company= 'Test_325';
	var employeeCode = 'CY2'
	
	
	var company='ABC INDIA PVT LTD'
	
	var deviceMachineNo = 1
	var machineName = 'Machine_'+deviceMachineNo
	
	var startDate=  '01/06/2020'
	var endDate ='30/06/2020'
	
	var filePath= 'machinelog17-2.xlsx'
	var sheetName='MachineLog'
	var startingRow ='23'
	var endingRow ='40'
	
	var machineNo ='A'
	var deviceEnrollNo ='B'
	var inOutDate ='C'
	var inTime ='D'
	var outTime ='E'
	
	let leave = [
    {LeaveType: "Paid leave", FromDate: "06/06/2020", FromDateDay: "FULL DAY", ToDate: "06/06/2020", ToDateDay: "FULL DAY"},
	{LeaveType: "Paid leave", FromDate: "07/06/2020", FromDateDay: "FULL DAY", ToDate: "07/06/2020", ToDateDay: "FULL DAY"}
	];
	
	let onDuty = [
    {EntryDate: "02/06/2020", Type: "FULLDAY ONDUTY", Half: "", 	 InDate_HH: "9", InDate_MM: "00", OutDate_HH: "17", OutDate_MM: "00"},
	{EntryDate: "15/06/2020", Type: "HALFDAY ONDUTY", Half: "First", InDate_HH: "9", InDate_MM: "00", OutDate_HH: "13", OutDate_MM: "00"},
	{EntryDate: "16/06/2020", Type: "HALFDAY ONDUTY", Half: "Second",InDate_HH: "13", InDate_MM: "00", OutDate_HH: "17", OutDate_MM: "00"},	
	];
	
	let modifiedPunch = [
    {EntryDate: "01/06/2020", Type: "FULLDAY PRESENT", Half: "", 	 InDate_HH: "9", InDate_MM: "00", OutDate_HH: "17", OutDate_MM: "00"},
	{EntryDate: "03/06/2020", Type: "HALFDAY PRESENT", Half: "First", InDate_HH: "9", InDate_MM: "00", OutDate_HH: "13", OutDate_MM: "00"},
	{EntryDate: "04/06/2020", Type: "HALFDAY PRESENT", Half: "Second",InDate_HH: "13", InDate_MM: "00", OutDate_HH: "17", OutDate_MM: "00"},	
	];

	//Permission Entry
	var ShiftName = 'General'
	var MaxHrsAllowedPerMonth_HH =9;
	var MaxHrsAllowedPerMonth_MM =0;
	var MaxHrsAllowedPerDay_HH  = 3;
	var MaxHrsAllowedPerDay_MM  = 0;
	var MinHrsAllowedPerDay_HH	= 1;
	var MinHrsAllowedPerDay_MM 	= 0;
	var NoOfPermissionsInAMonth = 3;
	
	var MaxHrsPerDay_From_HH =9
	var MaxHrsPerDay_From_MM = 0
	var MaxHrsPerDay_To_HH =12
	var MaxHrsPerDay_To_MM =0
	
	var MinHrsPerDay_From_HH =9
	var MinHrsPerDay_From_MM = 0
	var MinHrsPerDay_To_HH =10
	var MinHrsPerDay_To_MM =0
	

	
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
	
	it('Navigate to Attendance Setting', function() {
		//cy.visit('https://next.pockethrms.com/Settings/Employee/Index?module=organization&submodule=smtpsettings')
		cy.wait(1000)
		cy.get('#globalSearch').click({force: true})		
		cy.get('#globalSearch').clear()
		cy.get('#globalSearch').type('smtp settings')
		cy.wait(2000)
		cy.contains('li', 'smtp settings').click({force: true})
		cy.wait(3000)
		cy.wait(1000)	
		cy.get('#attendance_detail_tab').click({force: true})
		cy.wait(1000)			
	})
	
	it('Device Master', function() {
		
		cy.get('#Attendance_DeviceMaster').click({force: true})
		cy.wait(2000)
		
		cy.get('button').then(($sp) => {
		if ($sp.hasClass('mb-1')) {
		cy.xpath("//button[@class='btn buttons-bg-color btn-facebook mb-1']").click({force: true});
		} else {
		cy.xpath("//div[@id='attendanceContentTitle']//i[@class='fas fa-plus']").click({force: true});
		}
		})
		
		cy.wait(3000)
		cy.get('#MachineNo').click({force: true})
		cy.get('#MachineNo').clear()
		cy.get('#MachineNo').type(deviceMachineNo)
		
		cy.get('#MachineName').click({force: true})
		cy.get('#MachineName').clear()
		cy.get('#MachineName').type(machineName)
		
		cy.get('#Location').click({force: true})
		cy.get('#Location').clear()
		cy.get('#Location').type('Mumbai')
		
		cy.get('#btnSaveDeviceMaster').click({force: true})
		cy.wait(5000)		
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())	
			expect(text.trim()).equal('Machine Details Saved Successfully.!')
		})
	})

	it('Employee Mapping', function() {
		
		cy.get("#Attendance_EmployeeMapping").click({force: true})
		cy.wait(2000)
			
		cy.get('#loadMachineNo').select(machineName,{force: true})
		cy.wait(1000)
		cy.get('#UnMapped').click({force: true})
		cy.wait(5000)
		
	loop:	cy.get('#tablesorter > tbody').find('tr').each(function(row, i){
				var num1 = parseFloat(i+1)
				cy.get('#tablesorter > tbody>tr:nth-child('+num1+')>td:nth-child(2)').invoke('text').then((text) => {	
					if(text.trim()==employeeCode){
						expect(text.trim()).to.eq(employeeCode)
						cy.get('#tablesorter > tbody>tr:nth-child('+num1+')>td:nth-child(4)>.txtEmp').click({force: true})
						cy.get('#tablesorter > tbody>tr:nth-child('+num1+')>td:nth-child(4)>.txtEmp').clear()
						cy.get('#tablesorter > tbody>tr:nth-child('+num1+')>td:nth-child(4)>.txtEmp').type(employeeCode)
						
						cy.get('#tablesorter > tbody>tr:nth-child('+num1+')>td:nth-child(1)>span>.chkEmp').click({force: true})
						cy.get('#btnSaveEmpMapping').click({force: true})
						cy.wait(2000)
						
						cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())	
			expect(text.trim()).equal('Records Saved Successfully.!')
			
		})
		//break loop;
					}	
				})
				})	
				
		
	})
	
	it('Machine Log Import', function() {
		
		var setting = ["In_Time", "Out_Time"];
		for(let time = 0; time < setting.length; time++) {
			
		var settingName = setting[time]
		cy.log("settingName: "+settingName)
		if(settingName =='In_Time')
		{
			var inOutTime =inTime
		}
		else
		{
			var inOutTime =outTime
		}
		 
		
		
		cy.visit('https://next.pockethrms.com/Attendance/Settings/AttendanceImport#')
		cy.wait(2000)	
		cy.get('#excelImport').select('Machine Log Import',{force: true})
		cy.wait(2000)


		cy.get('#SettingName').find('option').then(listing => {
            var len = Cypress.$(listing).length; 
			cy.log(len)			
            if (len == 1 ) {
				cy.get('a[onclick="showNewSetting()"]').click({force: true})
				
				cy.get('#SettingNameNew').click({force: true})
				cy.get('#SettingNameNew').clear()
				cy.get('#SettingNameNew').type(setting[time])
				
				cy.get("input[name='name']").click({force: true})
			}
			else if (len == 2 ) {
				cy.get('a[onclick="showNewSetting()"]').click({force: true})
				
				cy.get('#SettingNameNew').click({force: true})
				cy.get('#SettingNameNew').clear()
				cy.get('#SettingNameNew').type(setting[time])
				
				cy.get("input[name='name']").click({force: true})
			}
			else{
				
			}
		})
		
		
		cy.wait(2000)
		cy.get('#SettingName').select(settingName, {force: true})
		cy.fixture(filePath, 'binary')
		.then(Cypress.Blob.binaryStringToBlob)
		.then(fileContent => {
		cy.get('#file').upload({
		fileContent,
		fileName: filePath,
		mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
		encoding: 'utf8'
		})
		})

		cy.wait(2000)	
		cy.get('#StartingRow').click({force: true})		
		cy.get('#StartingRow').clear()
		cy.get('#StartingRow').type(startingRow)
		
		cy.get('#EndingRow').click({force: true})		
		cy.get('#EndingRow').clear()
		cy.get('#EndingRow').type(endingRow)
		
		cy.get('#MachineNo').select(machineNo, {force: true})
		cy.get('#DeviceEnrollNo').select(deviceEnrollNo, {force: true})
		cy.get('#InOutDate').select(inOutDate, {force: true})
		cy.get('#InOutTime').select(inOutTime, {force: true})
		
		cy.get('#ExcelSheetName').select(sheetName, {force: true})
		
		
		cy.get('#savesetting').click({force: true})
		cy.wait(3000)		
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())	
			expect(text.trim()).equal('Record Saved successfully.!')
			//cy.get(".toast-message").click()
		})
		
		cy.get('#uploadsetting').click({force: true})
		cy.wait(3000)
		
		cy.get(".alert-text").invoke('text').then((text) => {
			cy.log(text.trim())	
			expect(text.trim()).equal('Excel uploaded successfully, it will get processed in background..')
			//cy.get(".toast-message").click()
		})
		cy.wait(3000)
		}
		
	})
	
	it('In Out Import', function() {
		cy.visit('https://next.pockethrms.com/Attendance/Entry/InOutImport')
		cy.wait(2000)

		cy.get('#dtDateFrom').click({force: true}).then(input => {
		    input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(startDate)
	   })	
	   
	   cy.wait(5000)
	   cy.get('#dtDateTo').click({force: true}).then(input => {
		    input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(endDate)
	   })
	   
	   cy.get('#chkWrongEntries').click({force: true})
		cy.wait(1000)
		
	   cy.get('#btnImport').click({force: true})
		cy.wait(3000)
	   
	   cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())	
			expect(text.trim()).equal('Successfully Imported.!')
			//cy.get(".toast-message").click()
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
		
	it('Leave Request',function(){
				
		for(let i = 0; i < leave.length; i++) {
		
		//click on leave tab
		cy.get('#leave_detail_tab').click({force:true});
		cy.wait(2000)
		
		cy.get('#Leave_LeaveEntry').click({force:true})
		cy.wait(3000)
		cy.get('.fa-plus').eq(0).click({force:true})
		cy.wait(2000)
		cy.get('#fromdate').click().then(input => {
		    input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(leave[i].FromDate)
	   })
		cy.wait(1000)
		cy.get('#todate').click().then(input => {
		    input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(leave[i].ToDate)
	   })
		cy.wait(1000)
		cy.get('#drpFromDayType').select(leave[i].FromDateDay,{force: true})
		cy.get('#drpToDayType').select(leave[i].ToDateDay,{force: true})
		cy.get('#leaveType').select(leaveleave,{force: true})
		
		cy.get('#remarks').click({force: true})
		cy.get('#remarks').clear()
		cy.get('#remarks').type('Festival !.');
		
		cy.wait(3000)
		cy.get('#btnAddLeave').click({force: true})
		cy.wait(3000)
		cy.get(".toast-message").invoke('text').then((text) => {
			//expect(text.trim()).equal('Leave Updated Successfully')
			softAssert(text.trim() == 'Leave Updated Successfully' , 'Notification');
			cy.log(text.trim())
		})
		
		}
	})
		
	it('Navigate to Employee Attendance - In/Out Details', function() {
		cy.wait(1000)
		cy.get('#attendance_detail_tab').click({force: true})
		cy.wait(2000)
		cy.get('#employeePunchesTab').click({force: true})
		cy.wait(10000)	
	})
	
	it('Apply In Out Core Details Filter', function() {		
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
			
			cy.get('#tblInOutCoreDetail> tbody>tr:nth-child('+num+')>td:nth-child(11)>div>a').click({force: true})
			cy.wait(1000)
			cy.xpath("//div[@class='dropdown-menu dropdown-menu-right show']//a[@class='dropdown-item'][contains(text(),'On Duty Entry')]").click({force: true})
			cy.wait(2000)
					
				if(InTime.trim()=='Unswiped' && Leave.trim()=='PL'){
					expect(InTime.trim()).to.eq('Unswiped')
					expect(Leave.trim()).to.eq('PL')						
					
					cy.get(".toast-message").invoke('text').then((text) => {
					cy.log(text.trim())	
					expect(text.trim()).equal('Leave entry found.!')
					cy.get(".toast-message").click({force: true})
				})
				cy.contains('Close').click({force: true})				
				}
				
				else if(InTime.trim()=='Unswiped' && Leave.trim()=='-'){
					
					
					
					expect(InTime.trim()).to.eq('Unswiped')
					expect(Leave.trim()).to.eq('-')
					
					
					
		loop:	for(let i = 0; i < onDuty.length; i++) {
						
					if(EntryDate.trim()==onDuty[i].EntryDate)
					{
					
				//	cy.get('#tblInOutCoreDetail> tbody>tr:nth-child('+num+')>td:nth-child(10)>div>a').click({force: true})
				//	cy.wait(1000)					
				//	cy.xpath("//div[@class='dropdown-menu dropdown-menu-right show']//a[@class='dropdown-item'][contains(text(),'On Duty Entry')]").click({force: true})
				//	cy.wait(2000)
				
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
						cy.get(".toast-message").click({force: true})
						})

						break loop;					
					}	
					}				
				}
				
				else{
				//	cy.get(".toast-message").invoke('text').then((text) => {
				//	cy.log(text.trim())	
				//	expect(text.trim()).equal('IN/OUT entry found.!')
				//	cy.get(".toast-message").click({force: true})
				//	})
					
					cy.contains('Close').click({force: true})
				}

			cy.wait(2000)
			 })		
			})		
			})
			})
	})
	
	it('Verify On duty Entry', function() {
		cy.wait(2000)
		cy.get('#ondutyEntryTab').click({force: true})
		cy.wait(3000)	
	
		cy.get('#tblPermi> tbody').find('tr').each(function(row, i){
			var num = parseFloat(i+1)
			cy.get('#tblPermi> tbody>tr:nth-child('+num+')> td:nth-child(1)>span').invoke('text').then((OnDutyEntry) => {
				cy.log("OnDutyEntry: "+OnDutyEntry)
				
				expect(OnDutyEntry.trim()).equal(onDuty[i].EntryDate)				
			})
		})	
	})
		
	it('Verify Modified Punch', function() {
		cy.wait(1000)
		cy.get('#attendance_detail_tab').click({force: true})
		cy.wait(2000)
		cy.get('#employeePunchesTab').click({force: true})
		cy.wait(10000)
		cy.get('#tblInOutCoreDetail > tbody > tr').each(function(row, i){	
			var num = parseFloat(i+1)
			cy.get('#tblInOutCoreDetail> tbody>tr:nth-child('+num+')>td:nth-child(2)').invoke('text').then((InTime) => {
			cy.get('#tblInOutCoreDetail> tbody>tr:nth-child('+num+')>td:nth-child(3)').invoke('text').then((OutTime) => {	
			cy.get('#tblInOutCoreDetail> tbody>tr:nth-child('+num+')>td:nth-child(1)').invoke('text').then((EntryDate) => {	
			cy.log("EntryDate: "+EntryDate)
			cy.log("InTime: "+InTime)
			cy.log("OutTime: "+OutTime)
	
	loop:	for(let i = 0; i < modifiedPunch.length; i++) {						
				if(EntryDate.trim()==modifiedPunch[i].EntryDate)
					{					
					cy.get('#tblInOutCoreDetail> tbody>tr:nth-child('+num+')>td:nth-child(10)>div>a').click({force: true})
					cy.wait(1000)					
					cy.xpath("//div[@class='dropdown-menu dropdown-menu-right show']//a[@class='dropdown-item'][contains(text(),'Modified Punch')]").click({force: true})
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
				
			
			cy.get('#tblInOutCoreDetail> tbody>tr:nth-child('+num+')>td:nth-child(2)').invoke('text').then((InTime) => {
			cy.get('#tblInOutCoreDetail> tbody>tr:nth-child('+num+')>td:nth-child(3)').invoke('text').then((OutTime) => {	
			cy.get('#tblInOutCoreDetail> tbody>tr:nth-child('+num+')>td:nth-child(1)').invoke('text').then((EntryDate) => {	
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
	
	it('Set Permission Entry Type - Single Hour', function() {
		cy.visit('https://next.pockethrms.com/Settings/Employee/Index?module=attendance&submodule=tos_permission')
		cy.wait(1000)	
		cy.get('#attendance_detail_tab').click({force: true})
		cy.wait(1000)	
		cy.get('#genTimeOffSettingTab').click({force: true})
		cy.wait(3000)		
		cy.get('#ddPermissionEntry').select('SINGLE',{force: true})
		cy.wait(1000)		
		cy.get('#btnSaveGeneralTimeOffice').click({force: true})
		cy.wait(2000)	
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
	
	it('Verify Permission Entry with Max Hrs Allowed Per Day ', function() {
		var MaxHrsAllowedPerDay_Hours;
		var MaxHrsAllowedPerDay_Min;
		
		cy.wait(1000)
		cy.get('#attendance_detail_tab').click({force: true})
		cy.wait(2000)
		cy.get('#employeePunchesTab').click({force: true})
		cy.wait(10000)
		
		
		
		for(let num =1 ; num<= NoOfPermissionsInAMonth ; num++)
		{
			cy.get('#tblInOutCoreDetail> tbody>tr:nth-child('+num+')>td:nth-child(5)').invoke('text').then((WorkingHours) => {
			
				cy.get('#tblInOutCoreDetail> tbody>tr:nth-child('+num+')>td:nth-child(11)>div>a').click({force: true})
				cy.wait(1000)					
				cy.xpath("//div[@class='dropdown-menu dropdown-menu-right show']//a[@class='dropdown-item'][contains(text(),'Permission Entry')]").click({force: true})
				cy.wait(2000)
				
					if(num==1)
					{
						MaxHrsAllowedPerDay_Hours =MaxHrsAllowedPerDay_HH
						MaxHrsAllowedPerDay_Min = MaxHrsAllowedPerDay_MM
					}
					else if(num==2)
					{
						MaxHrsAllowedPerDay_Hours =MaxHrsAllowedPerDay_HH - 1
						MaxHrsAllowedPerDay_Min = MaxHrsAllowedPerDay_MM
					}
					else if(num==3)
					{
						MaxHrsAllowedPerDay_Hours =MaxHrsAllowedPerDay_HH + 1
						MaxHrsAllowedPerDay_Min = MaxHrsAllowedPerDay_MM
					}
					
					cy.get('#tmPermiHour').click({force: true})
					cy.get('#tmPermiHour').clear()
					cy.get('#tmPermiHour').type(MaxHrsAllowedPerDay_Hours)	 
						
					cy.get('#tmPermiMin').click({force: true})
					cy.get('#tmPermiMin').clear()
					cy.get('#tmPermiMin').type(MaxHrsAllowedPerDay_Min)	
					
					cy.get('#txtReason').click({force: true})
					cy.get('#txtReason').clear()
					cy.get('#txtReason').type("Test")	
					
					cy.get('#btnSavePermissionEntry').click({force: true})
					
					if(num==3)
					{
					cy.get(".toast-message").invoke('text').then((text) => {
					cy.log(text.trim())	
					expect(text.trim()).equal('Per day Maximum Permission Minutes allowed 180')
					cy.wait(500)	
					cy.get(".toast-message").click({force: true})
					})
					cy.xpath("//div[@class='modal-dialog']//button[@class='btn btn-xs btn-danger waves-effect'][contains(text(),'Close')]").click({force: true})
					}
					else
					{
					cy.get(".toast-message").invoke('text').then((text) => {
					cy.log(text.trim())	
					expect(text.trim()).equal('Record saved successfully.!')
					cy.wait(500)
					cy.get(".toast-message").click({force: true})
					})
					}	
					
			cy.get('#tblInOutCoreDetail> tbody>tr:nth-child('+num+')>td:nth-child(5)').invoke('text').then((WorkingHours) => {
			
			cy.log("WorkingHours: "+WorkingHours)
			
			
			//expect(WorkingHours.trim()).equal(MaxHrsAllowedPerDay_HH+':'+MaxHrsAllowedPerDay_MM)
			})		
		})
		}
	})
	
	it('Verify Permission Entry with Min Hrs Allowed Per Day ', function() {
		var MinHrsAllowedPerDay_Hours;
		var MinHrsAllowedPerDay_Min;
		
		for(let num =1 ; num<= NoOfPermissionsInAMonth ; num++)
		{
			cy.get('#tblInOutCoreDetail> tbody>tr:nth-child('+num+')>td:nth-child(5)').invoke('text').then((WorkingHours) => {
			
				cy.get('#tblInOutCoreDetail> tbody>tr:nth-child('+num+')>td:nth-child(11)>div>a').click({force: true})
				cy.wait(1000)					
				cy.xpath("//div[@class='dropdown-menu dropdown-menu-right show']//a[@class='dropdown-item'][contains(text(),'Permission Entry')]").click({force: true})
				cy.wait(2000)
				
					if(num==1)
					{
						MinHrsAllowedPerDay_Hours =MinHrsAllowedPerDay_HH
						MinHrsAllowedPerDay_Min = MinHrsAllowedPerDay_MM
					}
					else if(num==2)
					{
						MinHrsAllowedPerDay_Hours =MinHrsAllowedPerDay_HH + 1
						MinHrsAllowedPerDay_Min = MinHrsAllowedPerDay_MM
					}
					else if(num==3)
					{
						MinHrsAllowedPerDay_Hours =MinHrsAllowedPerDay_HH - 1
						MinHrsAllowedPerDay_Min = MinHrsAllowedPerDay_MM
					}
					
					cy.get('#tmPermiHour').click({force: true})
					cy.get('#tmPermiHour').clear()
					cy.get('#tmPermiHour').type(MinHrsAllowedPerDay_Hours)	 
						
					cy.get('#tmPermiMin').click({force: true})
					cy.get('#tmPermiMin').clear()
					cy.get('#tmPermiMin').type(MinHrsAllowedPerDay_Min)	
					
					cy.get('#txtReason').click({force: true})
					cy.get('#txtReason').clear()
					cy.get('#txtReason').type("Test")	
					
					cy.get('#btnSavePermissionEntry').click({force: true})
					
					if(num==3)
					{
					cy.get(".toast-message").invoke('text').then((text) => {
					cy.log(text.trim())	
					expect(text.trim()).equal('Per day Minimum Permission Minutes allowed 60')
					cy.wait(500)	
					cy.get(".toast-message").click({force: true})
					})
					cy.xpath("//div[@class='modal-dialog']//button[@class='btn btn-xs btn-danger waves-effect'][contains(text(),'Close')]").click({force: true})
					}
					else
					{
					cy.get(".toast-message").invoke('text').then((text) => {
					cy.log(text.trim())	
					expect(text.trim()).equal('Record saved successfully.!')
					cy.wait(500)
					cy.get(".toast-message").click({force: true})
					})
					}	
					
			cy.get('#tblInOutCoreDetail> tbody>tr:nth-child('+num+')>td:nth-child(5)').invoke('text').then((WorkingHours) => {
			
			cy.log("WorkingHours: "+WorkingHours)
			
			
			//expect(WorkingHours.trim()).equal(MaxHrsAllowedPerDay_HH+':'+MaxHrsAllowedPerDay_MM)
			})		
		})
		}
	})
	
	it('Set Permission Entry Type - From Hour - To Hour', function() {
		cy.visit('https://next.pockethrms.com/Settings/Employee/Index?module=attendance&submodule=tos_permission')
		cy.wait(1000)	
		cy.get('#attendance_detail_tab').click({force: true})
		cy.wait(1000)	
		cy.get('#genTimeOffSettingTab').click({force: true})
		cy.wait(3000)		
		cy.get('#ddPermissionEntry').select('From Hour - To Hour',{force: true})
		cy.wait(1000)
		cy.get('#ddAnyTimePerAllo').select('Yes',{force: true})
		cy.wait(1000)
		cy.get('#btnSaveGeneralTimeOffice').click({force: true})
		cy.wait(2000)	
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
	
	it('Verify Permission Entry with Max Hrs Allowed Per Day ', function() {
		var FromHours_HH;
		var FromHours_MM;
		var ToHours_HH;
		var ToHours_MM;
		
		cy.wait(1000)
		cy.get('#attendance_detail_tab').click({force: true})
		cy.wait(2000)
		cy.get('#employeePunchesTab').click({force: true})
		cy.wait(10000)
		
		for(let num =1 ; num<= 3 ; num++)
		{
			cy.get('#tblInOutCoreDetail> tbody>tr:nth-child('+num+')>td:nth-child(4)').invoke('text').then((WorkingHours) => {
			
				cy.get('#tblInOutCoreDetail> tbody>tr:nth-child('+num+')>td:nth-child(11)>div>a').click({force: true})
				cy.wait(1000)					
				cy.xpath("//div[@class='dropdown-menu dropdown-menu-right show']//a[@class='dropdown-item'][contains(text(),'Permission Entry')]").click({force: true})
				cy.wait(2000)
				
					if(num==1)
					{
						FromHours_HH =MaxHrsPerDay_From_HH
						FromHours_MM = MaxHrsPerDay_From_MM
						ToHours_HH =  MaxHrsPerDay_To_HH
						ToHours_MM = MaxHrsPerDay_To_MM
					}
					else if(num==2)
					{
						FromHours_HH =MaxHrsPerDay_From_HH +1
						FromHours_MM = MaxHrsPerDay_From_MM
						ToHours_HH =  MaxHrsPerDay_To_HH
						ToHours_MM = MaxHrsPerDay_To_MM
					}
					else if(num==3)
					{
						FromHours_HH =MaxHrsPerDay_From_HH - 1
						FromHours_MM = MaxHrsPerDay_From_MM
						ToHours_HH =  MaxHrsPerDay_To_HH
						ToHours_MM = MaxHrsPerDay_To_MM
					}
					
					cy.get('#tmPermiFromHour').click({force: true})
					cy.get('#tmPermiFromHour').clear()
					cy.get('#tmPermiFromHour').type(FromHours_HH)	 
						
					cy.get('#tmPermiFromMin').click({force: true})
					cy.get('#tmPermiFromMin').clear()
					cy.get('#tmPermiFromMin').type(FromHours_MM)	
					
					cy.get('#tmPermiToHour').click({force: true})
					cy.get('#tmPermiToHour').clear()
					cy.get('#tmPermiToHour').type(ToHours_HH)	 
						
					cy.get('#tmPermiToMin').click({force: true})
					cy.get('#tmPermiToMin').clear()
					cy.get('#tmPermiToMin').type(ToHours_MM)	
					
					cy.get('#txtReason').click({force: true})
					cy.get('#txtReason').clear()
					cy.get('#txtReason').type("Test")	
					
					cy.get('#btnSavePermissionEntry').click({force: true})
					
					if(num==3)
					{
					cy.get(".toast-message").invoke('text').then((text) => {
					cy.log(text.trim())	
					expect(text.trim()).equal('Per day Maximum Permission Minutes allowed 180')
					cy.wait(500)	
					cy.get(".toast-message").click({force: true})
					})
					cy.xpath("//div[@class='modal-dialog']//button[@class='btn btn-xs btn-danger waves-effect'][contains(text(),'Close')]").click({force: true})
					}
					else
					{
					cy.get(".toast-message").invoke('text').then((text) => {
					cy.log(text.trim())	
					expect(text.trim()).equal('Record saved successfully.!')
					cy.wait(500)
					cy.get(".toast-message").click({force: true})
					})
					}	
					
			cy.get('#tblInOutCoreDetail> tbody>tr:nth-child('+num+')>td:nth-child(8)').invoke('text').then((WorkingHours) => {
			
			cy.log("WorkingHours: "+WorkingHours)
			
			
			//expect(WorkingHours.trim()).equal(MaxHrsAllowedPerDay_HH+':'+MaxHrsAllowedPerDay_MM)
			})		
		})
		}
	})
	
	it('Verify Permission Entry with Min Hrs Allowed Per Day ', function() {
		var FromHours_HH;
		var FromHours_MM;
		var ToHours_HH;
		var ToHours_MM;
		
		cy.wait(1000)
		cy.get('#attendance_detail_tab').click({force: true})
		cy.wait(2000)
		cy.get('#employeePunchesTab').click({force: true})
		cy.wait(10000)
		
		for(let num =1 ; num<= 3 ; num++)
		{
			cy.get('#tblInOutCoreDetail> tbody>tr:nth-child('+num+')>td:nth-child(4)').invoke('text').then((WorkingHours) => {
			
				cy.get('#tblInOutCoreDetail> tbody>tr:nth-child('+num+')>td:nth-child(11)>div>a').click({force: true})
				cy.wait(1000)					
				cy.xpath("//div[@class='dropdown-menu dropdown-menu-right show']//a[@class='dropdown-item'][contains(text(),'Permission Entry')]").click({force: true})
				cy.wait(2000)
				if(num==1)
					{
						FromHours_HH =MinHrsPerDay_From_HH
						FromHours_MM = MinHrsPerDay_From_MM
						ToHours_HH =  MinHrsPerDay_To_HH
						ToHours_MM = MinHrsPerDay_To_MM
					}
					else if(num==2)
					{
						FromHours_HH =MinHrsPerDay_From_HH -1
						FromHours_MM = MinHrsPerDay_From_MM
						ToHours_HH =  MinHrsPerDay_To_HH
						ToHours_MM = MinHrsPerDay_To_MM
					}
					else if(num==3)
					{
						FromHours_HH =MinHrsPerDay_From_HH + 1
						FromHours_MM = MinHrsPerDay_From_MM
						ToHours_HH =  MinHrsPerDay_To_HH
						ToHours_MM = MinHrsPerDay_To_MM
					}
					
					
					cy.get('#tmPermiFromHour').click({force: true})
					cy.get('#tmPermiFromHour').clear()
					cy.get('#tmPermiFromHour').type(FromHours_HH)	 
						
					cy.get('#tmPermiFromMin').click({force: true})
					cy.get('#tmPermiFromMin').clear()
					cy.get('#tmPermiFromMin').type(FromHours_MM)	
					
					cy.get('#tmPermiToHour').click({force: true})
					cy.get('#tmPermiToHour').clear()
					cy.get('#tmPermiToHour').type(ToHours_HH)	 
						
					cy.get('#tmPermiToMin').click({force: true})
					cy.get('#tmPermiToMin').clear()
					cy.get('#tmPermiToMin').type(ToHours_MM)	
					
					cy.get('#txtReason').click({force: true})
					cy.get('#txtReason').clear()
					cy.get('#txtReason').type("Test")	
					
					cy.get('#btnSavePermissionEntry').click({force: true})
					
					if(num==3)
					{
					cy.get(".toast-message").invoke('text').then((text) => {
					cy.log(text.trim())	
					expect(text.trim()).equal('Per day Maximum Permission Minutes allowed 180')
					cy.wait(500)	
					cy.get(".toast-message").click({force: true})
					})
					cy.xpath("//div[@class='modal-dialog']//button[@class='btn btn-xs btn-danger waves-effect'][contains(text(),'Close')]").click({force: true})
					}
					else
					{
					cy.get(".toast-message").invoke('text').then((text) => {
					cy.log(text.trim())	
					expect(text.trim()).equal('Per day Minimum Permission Minutes allowed 60')
					cy.wait(500)
					cy.get(".toast-message").click({force: true})
					})
					}	
					
			cy.get('#tblInOutCoreDetail> tbody>tr:nth-child('+num+')>td:nth-child(8)').invoke('text').then((WorkingHours) => {
			
			cy.log("WorkingHours: "+WorkingHours)
			
			
			//expect(WorkingHours.trim()).equal(MaxHrsAllowedPerDay_HH+':'+MaxHrsAllowedPerDay_MM)
			})		
		})
		}
	})
	
	
/*	it('Verify Permission Entry with Min Hrs Allowed Per Month ', function() {
		var FromHours_HH;
		var FromHours_MM;
		var ToHours_HH;
		var ToHours_MM;
		
		cy.wait(1000)
		cy.get('#attendance_detail_tab').click({force: true})
		cy.wait(2000)
		cy.get('#employeePunchesTab').click({force: true})
		cy.wait(10000)
		
		for(let num =1 ; num<= 3 ; num++)
		{
			cy.get('#tblInOutCoreDetail> tbody>tr:nth-child('+num+')>td:nth-child(4)').invoke('text').then((WorkingHours) => {
			
				cy.get('#tblInOutCoreDetail> tbody>tr:nth-child('+num+')>td:nth-child(11)>div>a').click({force: true})
				cy.wait(1000)					
				cy.xpath("//div[@class='dropdown-menu dropdown-menu-right show']//a[@class='dropdown-item'][contains(text(),'Permission Entry')]").click({force: true})
				cy.wait(2000)
				if(num==1)
					{
						FromHours_HH =MinHrsPerDay_From_HH
						FromHours_MM = MinHrsPerDay_From_MM
						ToHours_HH =  MinHrsPerDay_To_HH
						ToHours_MM = MinHrsPerDay_To_MM
					}
					else if(num==2)
					{
						FromHours_HH =MinHrsPerDay_From_HH -1
						FromHours_MM = MinHrsPerDay_From_MM
						ToHours_HH =  MinHrsPerDay_To_HH
						ToHours_MM = MinHrsPerDay_To_MM
					}
					else if(num==3)
					{
						FromHours_HH =MinHrsPerDay_From_HH + 1
						FromHours_MM = MinHrsPerDay_From_MM
						ToHours_HH =  MinHrsPerDay_To_HH
						ToHours_MM = MinHrsPerDay_To_MM
					}
					
					
					cy.get('#tmPermiFromHour').click({force: true})
					cy.get('#tmPermiFromHour').clear()
					cy.get('#tmPermiFromHour').type(FromHours_HH)	 
						
					cy.get('#tmPermiFromMin').click({force: true})
					cy.get('#tmPermiFromMin').clear()
					cy.get('#tmPermiFromMin').type(FromHours_MM)	
					
					cy.get('#tmPermiToHour').click({force: true})
					cy.get('#tmPermiToHour').clear()
					cy.get('#tmPermiToHour').type(ToHours_HH)	 
						
					cy.get('#tmPermiToMin').click({force: true})
					cy.get('#tmPermiToMin').clear()
					cy.get('#tmPermiToMin').type(ToHours_MM)	
					
					cy.get('#txtReason').click({force: true})
					cy.get('#txtReason').clear()
					cy.get('#txtReason').type("Test")	
					
					cy.get('#btnSavePermissionEntry').click({force: true})
					
					if(num==3)
					{
					cy.get(".toast-message").invoke('text').then((text) => {
					cy.log(text.trim())	
					expect(text.trim()).equal('Per day Maximum Permission Minutes allowed 180')
					cy.wait(500)	
					cy.get(".toast-message").click({force: true})
					})
					cy.xpath("//div[@class='modal-dialog']//button[@class='btn btn-xs btn-danger waves-effect'][contains(text(),'Close')]").click({force: true})
					}
					else
					{
					cy.get(".toast-message").invoke('text').then((text) => {
					cy.log(text.trim())	
					expect(text.trim()).equal('Per day Minimum Permission Minutes allowed 60')
					cy.wait(500)
					cy.get(".toast-message").click({force: true})
					})
					}	
					
			cy.get('#tblInOutCoreDetail> tbody>tr:nth-child('+num+')>td:nth-child(8)').invoke('text').then((WorkingHours) => {
			
			cy.log("WorkingHours: "+WorkingHours)
			
			
			//expect(WorkingHours.trim()).equal(MaxHrsAllowedPerDay_HH+':'+MaxHrsAllowedPerDay_MM)
			})		
		})
		}
	})
	*/
	
	})