describe('Attendence Process ', function() {
	
	var url = 'https://next.pockethrms.com'
	var username= 'nileshgajare@live.com'
	var userPass = '123456'
	var company= 'BBTest_25';
	var employeeCode = 'CY4'
	
	var deviceMachineNo = 1
	var machineName = 'Machine_'+deviceMachineNo
	
	var startDate=  '01/04/2020'
	var endDate ='13/04/2020'
	
	var filePath= 'machinelog13_4.xlsx'
	var sheetName='MachineLog'
	var startingRow ='2'
	var endingRow ='19'
	
	var machineNo ='A'
	var deviceEnrollNo ='B'
	var inOutDate ='C'
	var inTime ='D'
	var outTime ='E'

	
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
		cy.changeCompany();	 
	
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
	
	it('Add Shift Schedule', function() {
		const { softAssert, softExpect } = chai;
		cy.wait(1000)
		cy.get('#attendance_detail_tab').click({force: true})
		cy.wait(2000)
		cy.get('#Attendance_ShiftDetails').click({force: true})
		cy.wait(5000)
		cy.xpath("//div[@id='attendanceContentTitle']//i[@class='fas fa-plus']").click({force: true})
		cy.wait(3000)
		cy.get('#ShiftName').select('General')		
		cy.wait(1000)
		
			cy.get('#dateRange').click().then(input => {
		    input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val('01/04/2020 to 30/06/2020')
			})
			
			
			cy.wait(1000)
			cy.xpath("//button[@id='btnSave']//span[@id='btnSaveText']").click({force:true})
			cy.wait(2000)
		
			cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())
			softExpect(text.trim()).to.eq('Records Saved Successfully!!!');
		})
		
		cy.wait(10000)
		cy.xpath("//div[@id='attendanceContentTitle']//i[@class='fas fa-plus']").click({force: true})
		cy.wait(3000)
		cy.get('#ShiftName').select('General')		
		cy.wait(1000)
		
			cy.get('#dateRange').click().then(input => {
		    input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val('01/07/2020 to 30/09/2020')
			})
			
			
			cy.wait(1000)
			cy.xpath("//button[@id='btnSave']//span[@id='btnSaveText']").click({force:true})
			cy.wait(2000)
		
			cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())
			softExpect(text.trim()).to.eq('Records Saved Successfully!!!');
		})
		
		cy.wait(10000)
		cy.xpath("//div[@id='attendanceContentTitle']//i[@class='fas fa-plus']").click({force: true})
		cy.wait(3000)
		cy.get('#ShiftName').select('General')		
		cy.wait(1000)
		
			cy.get('#dateRange').click().then(input => {
		    input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val('01/10/2020 to 31/12/2020')
			})
			
			cy.wait(1000)
			cy.xpath("//button[@id='btnSave']//span[@id='btnSaveText']").click({force:true})
			cy.wait(2000)
		
			cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())
			softExpect(text.trim()).to.eq('Records Saved Successfully!!!');
		})
		
		cy.wait(10000)
		cy.xpath("//div[@id='attendanceContentTitle']//i[@class='fas fa-plus']").click({force: true})
		cy.wait(3000)
		cy.get('#ShiftName').select('General')		
		cy.wait(1000)
		
			cy.get('#dateRange').click().then(input => {
		    input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val('01/01/2021 to 31/03/2021')
			})
			
			
			cy.wait(1000)
			cy.xpath("//button[@id='btnSave']//span[@id='btnSaveText']").click({force:true})
			cy.wait(2000)
		
			cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())
			softExpect(text.trim()).to.eq('Records Saved Successfully!!!');
		})
		cy.wait(5000)
	})
		
	it('Navigate to Attendance Setting', function() {
		cy.visit('https://next.pockethrms.com/Settings/Employee/Index?module=organization&submodule=smtpsettings')
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
			
		cy.get('#loadMachineNo').select(machineName)
		
		cy.wait(1000)
	/*	cy.get('#allCheck').click()
		cy.wait(3000)
		cy.get('#btnDeleteEmpMapping').click({force: true})
		cy.wait(3000)
		cy.get(".toast-message").click()
	*/	
		
		cy.get('#UnMapped').click({force: true})
		cy.wait(5000)
		
			cy.get('#tablesorter > tbody>tr:nth-child(4)>td:nth-child(4)>.txtEmp').click({force: true})
						cy.get('#tablesorter > tbody>tr:nth-child(4)>td:nth-child(4)>.txtEmp').clear()
						cy.get('#tablesorter > tbody>tr:nth-child(4)>td:nth-child(4)>.txtEmp').type(employeeCode)
						
						cy.get('#tablesorter > tbody>tr:nth-child(4)>td:nth-child(1)>span>.chkEmp').click({force: true})
						cy.get('#btnSaveEmpMapping').click({force: true})
						cy.wait(2000)
						
						
						cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())	
			expect(text.trim()).equal('Records Saved Successfully.!')
			
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
		cy.wait(15000)
		}
		
	})
	
	it('In Out Import', function() {
		cy.visit('https://next.pockethrms.com/Attendance/Entry/InOutImport')
		cy.wait(15000)

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
	
})