var fs = require('fs');
var Crypto = require('crypto-js')

describe("Dynamically Generated Tests", () => {
	
	
	
	var company='ABC INDIA PVT LTD'
	var employeeID ='A-002'
	//var company='Chennai Demo Company'
	//var employeeID ='L-002'
	var PayslipMonth='8'
	
	var current_FilePath = 'D:\\CyPress Demo\\cypress\\ExcelFiles\\Current_Downloads\\';	
	var exiting_FilePath = 'D:\\CyPress Demo\\cypress\\ExcelFiles\\Exiting_Downloads\\';
	
	var logDetails = 'LogDetails'
	var attendanceMonth ='AttendanceMonth'
	var attendanceSummary = 'AttendanceSummary'
	var monthlyStatus = 'MonthlyStatus'
	var quickViewExcel = 'QuickViewExcel'
	var late = 'LogDetails'
	var attendance = 'MachineWise'
	var shiftDetailReport = "ShiftDetailReport"
	var excessStayEmployee ="ExcessStayEmployee"
	var halfDay ="HalfDay"
	var machineLogExport = "MachineLogExport"
	var unPunchesExport = "UnPunchesExport"
	var invalidPunchesExport = "InvalidPunchesExport"
	
	
	var monthlySummary_FromDate = '01/02/2020'
	var monthlySummary_ToDate = '29/02/2020'
	var attendance_EntryDate = '06/02/2020'
	var shiftDetailReport_FromDate = '01/02/2020'
	var shiftDetailReport_ToDate = '29/02/2020'
	var excessStayEmployee_FromDate = '01/02/2020'
	var excessStayEmployee_ToDate = '29/02/2020'
	var halfDay_FromDate = '01/02/2020'
	var halfDay_ToDate = '29/02/2020'
	
	
 
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
	

	it('successfully loads', function() {
		cy.visit('https://pockethrmsnext.azurewebsites.net/') 
	
	})
	
	it('Pocket HRMS Login', function() {
		cy.get('#Email').should('be.visible').should('have.css', 'border-radius') 
		cy.get('#Email').should('exist')
		cy.get('#Email').click()
		cy.get('#Email').type('administrator@bhagya.com')
		cy.get('#Email').should('have.value', 'administrator@bhagya.com')
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
	
	it('Navigate to Attendance Reports', function() {
		
	cy.xpath("//i[@class='dripicons-menu nav-icon']").click({force: true})
	
	 cy.xpath("//span[contains(text(),'Analytics')]").click({force: true})
 
	 cy.xpath("//a[@class='nav-link']//span[contains(text(),'Reports')]").click({force: true})
	 
	 cy.get('#attendance_detail_tab').click({force: true})
	 cy.wait(1000)
	 cy.get('#attendance_detail_tab').click({force: true})
	 
	})	
	
	it('Verify Alert Notifications of Monthly Summary', function() {
		
		cy.xpath("//span[contains(text(),'Monthly Summary')]").click({force: true})
		cy.wait(2000)
		cy.xpath("//input[@value='Download Excel']").click({force: true})
	
		cy.get(".toast-message").invoke('text').then((text) => {
		cy.log(text.trim())
		expect(text.trim()).equal('Select atleast one Category')
		cy.wait(1000)
		cy.get(".toast-message").click()
		})

		cy.get("#catall").click({force: true})
		cy.wait(2000)
		cy.xpath("//input[@value='Download Excel']").click({force: true})
		
		cy.get(".toast-message").invoke('text').then((text) => {
		cy.log(text.trim())
		expect(text.trim()).equal('check atleast one Radio Button')
		cy.wait(1000)
		cy.get(".toast-message").click()
		})

		cy.get("#LogDetails").click({force: true})
		cy.wait(2000)
		cy.xpath("//input[@value='Download Excel']").click({force: true})
	})
	
	
	it('Delete Excel Report', function() {
		cy.task('deleteFile',{fileName:current_FilePath + logDetails + '.xlsx'})
	})
	
	

	it('Download Excel Report of Monthly Summary - LogDetails', function() {
		cy.visit('https://pockethrmsnext.azurewebsites.net/Reports/Report/Index?module=attendance&submodule=monthly') 
		//cy.xpath("//span[contains(text(),'Monthly Summary')]").click({force: true})
		cy.wait(2000)
		cy.get("#catall").click({force: true})

		
		cy.get('#txtfromdate').click().then(input => {
		    input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(monthlySummary_FromDate)
		})

		cy.wait(2000)
		cy.get('#txttodate').click().then(input => {
		    input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(monthlySummary_ToDate)
	   })

		cy.get("#LogDetails").click({force: true})
		cy.wait(2000)
		cy.xpath("//input[@value='Download Excel']").click({force: true})
	
	})

	it('Convert Excel Report into Txt file & Verify Checksum of Monthly Summary - LogDetails', function() {
		cy.wait(2000)
		cy.task('convertExcelToJson_ExitingFile',{file:logDetails, fileName:exiting_FilePath +'Attendance\\Monthly_Summary\\'+ logDetails +'.xlsx'})
	
		cy.wait(2000)
		cy.task('convertExcelToJson_CurrentFile',{file:logDetails, fileName:current_FilePath + logDetails +'.xlsx'})
	
		// Get & Compare Checksum of Download file Json & Exting file Json
		cy.readFile(exiting_FilePath + logDetails + '.txt').then((text) =>{
		var existing_TxtChecksum = Crypto.MD5(text).toString().trim()
		cy.log("existing_TxtChecksum: "+ existing_TxtChecksum)
		 
		cy.readFile(current_FilePath + logDetails + '.txt').then((text1) =>{
		var current_TxtChecksum = Crypto.MD5(text1).toString().trim()
		cy.log("current_TxtChecksum: "+ current_TxtChecksum)
		 
		expect(existing_TxtChecksum).to.eq(current_TxtChecksum)
		 
		  })
		})		  
		 // Delete Files
		cy.task('deleteFile',{fileName:exiting_FilePath + logDetails + '.txt'})
		cy.task('deleteFile',{fileName:current_FilePath + logDetails + '.txt'})
		cy.task('deleteFile',{fileName:current_FilePath + logDetails + '.xlsx'})
	
	})


	it('Download Excel Report of Monthly Summary - LogDetails with Clear Duplicates', function() {
				cy.visit('https://pockethrmsnext.azurewebsites.net/Reports/Report/Index?module=attendance&submodule=monthly') 

		//cy.xpath("//span[contains(text(),'Monthly Summary')]").click({force: true})
		cy.wait(2000)
		cy.get("#catall").click({force: true})

		
		cy.get('#txtfromdate').click().then(input => {
		    input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(monthlySummary_FromDate)
		})

		cy.wait(2000)
		cy.get('#txttodate').click().then(input => {
		    input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(monthlySummary_ToDate)
	   })

		cy.get("#LogDetails").click({force: true})
		cy.get("#chkClear").click({force: true})
		cy.wait(2000)
		cy.xpath("//input[@value='Download Excel']").click({force: true})
	
	
	})

	it('Convert Excel Report into Txt file & Verify Checksum of Monthly Summary - LogDetails with Clear Duplicates', function() {
		cy.wait(2000)
		cy.task('convertExcelToJson_ExitingFile',{file:logDetails, fileName:exiting_FilePath +'Attendance\\Monthly_Summary\\'+ logDetails +'.xlsx'})
	
		cy.wait(2000)
		cy.task('convertExcelToJson_CurrentFile',{file:logDetails, fileName:current_FilePath + logDetails +'.xlsx'})
	
		// Get & Compare Checksum of Download file Json & Exting file Json
		cy.readFile(exiting_FilePath + logDetails + '.txt').then((text) =>{
		var existing_TxtChecksum = Crypto.MD5(text).toString().trim()
		cy.log("existing_TxtChecksum: "+ existing_TxtChecksum)
		 
		cy.readFile(current_FilePath + logDetails + '.txt').then((text1) =>{
		var current_TxtChecksum = Crypto.MD5(text1).toString().trim()
		cy.log("current_TxtChecksum: "+ current_TxtChecksum)
		 
		expect(existing_TxtChecksum).to.eq(current_TxtChecksum)
		 
		  })
		})		  
		 // Delete Files
		cy.task('deleteFile',{fileName:exiting_FilePath + logDetails + '.txt'})
		cy.task('deleteFile',{fileName:current_FilePath + logDetails + '.txt'})
		cy.task('deleteFile',{fileName:current_FilePath + logDetails + '.xlsx'})
	
	})


	it('Download Excel Report of Monthly Summary - AttendanceMonth', function() {
				cy.visit('https://pockethrmsnext.azurewebsites.net/Reports/Report/Index?module=attendance&submodule=monthly') 
		//cy.xpath("//span[contains(text(),'Monthly Summary')]").click({force: true})
		cy.wait(2000)
		cy.get("#catall").click({force: true})

		
		cy.get('#txtfromdate').click().then(input => {
		    input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(monthlySummary_FromDate)
		})

		cy.wait(2000)
		cy.get('#txttodate').click().then(input => {
		    input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(monthlySummary_ToDate)
	   })

		cy.get("#LogDetails").click({force: true})
		cy.wait(2000)
		cy.xpath("//input[@value='Download Excel']").click({force: true})
	
	
	})

	it('Convert Excel Report into Txt file & Verify Checksum of Monthly Summary - AttendanceMonth', function() {
		cy.wait(2000)
		cy.task('convertExcelToJson_ExitingFile',{file:attendanceMonth, fileName:exiting_FilePath +'Attendance\\Monthly_Summary\\'+ attendanceMonth +'.xlsx'})
	
		cy.wait(2000)
		cy.task('convertExcelToJson_CurrentFile',{file:attendanceMonth, fileName:current_FilePath + attendanceMonth +'.xlsx'})
	
		// Get & Compare Checksum of Download file Json & Exting file Json
		cy.readFile(exiting_FilePath + attendanceMonth + '.txt').then((text) =>{
		var existing_TxtChecksum = Crypto.MD5(text).toString().trim()
		cy.log("existing_TxtChecksum: "+ existing_TxtChecksum)
		 
		cy.readFile(current_FilePath + attendanceMonth + '.txt').then((text1) =>{
		var current_TxtChecksum = Crypto.MD5(text1).toString().trim()
		cy.log("current_TxtChecksum: "+ current_TxtChecksum)
		 
		expect(existing_TxtChecksum).to.eq(current_TxtChecksum)
		 
		  })
		})		  
		 // Delete Files
		cy.task('deleteFile',{fileName:exiting_FilePath + attendanceMonth + '.txt'})
		cy.task('deleteFile',{fileName:current_FilePath + attendanceMonth + '.txt'})
		cy.task('deleteFile',{fileName:current_FilePath + attendanceMonth + '.xlsx'})
	
	})



	it('Download Excel Report of Monthly Summary - AttendanceSummary', function() {
				cy.visit('https://pockethrmsnext.azurewebsites.net/Reports/Report/Index?module=attendance&submodule=monthly') 

		//cy.xpath("//span[contains(text(),'Monthly Summary')]").click({force: true})
		cy.wait(2000)
		cy.get("#catall").click({force: true})

		
		cy.get('#txtfromdate').click().then(input => {
		    input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(monthlySummary_FromDate)
		})

		cy.wait(2000)
		cy.get('#txttodate').click().then(input => {
		    input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(monthlySummary_ToDate)
	   })

		cy.get("#AttendanceSummary").click({force: true})
		cy.wait(2000)
		cy.xpath("//input[@value='Download Excel']").click({force: true})
	
	
	})

	it('Convert Excel Report into Txt file & Verify Checksum of Monthly Summary - AttendanceSummary', function() {
		cy.wait(2000)
		cy.task('convertExcelToJson_ExitingFile',{file:attendanceSummary, fileName:exiting_FilePath +'Attendance\\Monthly_Summary\\'+ attendanceSummary +'.xlsx'})
	
		cy.wait(2000)
		cy.task('convertExcelToJson_CurrentFile',{file:attendanceSummary, fileName:current_FilePath + attendanceSummary +'.xlsx'})
	
		// Get & Compare Checksum of Download file Json & Exting file Json
		cy.readFile(exiting_FilePath + attendanceSummary + '.txt').then((text) =>{
		var existing_TxtChecksum = Crypto.MD5(text).toString().trim()
		cy.log("existing_TxtChecksum: "+ existing_TxtChecksum)
		 
		cy.readFile(current_FilePath + attendanceSummary + '.txt').then((text1) =>{
		var current_TxtChecksum = Crypto.MD5(text1).toString().trim()
		cy.log("current_TxtChecksum: "+ current_TxtChecksum)
		 
		expect(existing_TxtChecksum).to.eq(current_TxtChecksum)
		 
		  })
		})		  
		 // Delete Files
		cy.task('deleteFile',{fileName:exiting_FilePath + attendanceSummary + '.txt'})
		cy.task('deleteFile',{fileName:current_FilePath + attendanceSummary + '.txt'})
		cy.task('deleteFile',{fileName:current_FilePath + attendanceSummary + '.xlsx'})
	
	})
	
	
	
	it('Download Excel Report of Monthly Summary - MonthlyStatus', function() {
				cy.visit('https://pockethrmsnext.azurewebsites.net/Reports/Report/Index?module=attendance&submodule=monthly') 

		//cy.xpath("//span[contains(text(),'Monthly Summary')]").click({force: true})
		cy.wait(2000)
		cy.get("#catall").click({force: true})

		
		cy.get('#txtfromdate').click().then(input => {
		    input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(monthlySummary_FromDate)
		})

		cy.wait(2000)
		cy.get('#txttodate').click().then(input => {
		    input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(monthlySummary_ToDate)
	   })

		cy.get("#MonthlyStatus").click({force: true})
		cy.wait(2000)
		cy.xpath("//input[@value='Download Excel']").click({force: true})
	
	
	})

	it('Convert Excel Report into Txt file & Verify Checksum of Monthly Summary - MonthlyStatus', function() {
		cy.wait(2000)
		cy.task('convertExcelToJson_ExitingFile',{file:monthlyStatus, fileName:exiting_FilePath +'Attendance\\Monthly_Summary\\'+ monthlyStatus +'.xlsx'})
	
		cy.wait(2000)
		cy.task('convertExcelToJson_CurrentFile',{file:monthlyStatus, fileName:current_FilePath + monthlyStatus +'.xlsx'})
	
		// Get & Compare Checksum of Download file Json & Exting file Json
		cy.readFile(exiting_FilePath + monthlyStatus + '.txt').then((text) =>{
		var existing_TxtChecksum = Crypto.MD5(text).toString().trim()
		cy.log("existing_TxtChecksum: "+ existing_TxtChecksum)
		 
		cy.readFile(current_FilePath + monthlyStatus + '.txt').then((text1) =>{
		var current_TxtChecksum = Crypto.MD5(text1).toString().trim()
		cy.log("current_TxtChecksum: "+ current_TxtChecksum)
		 
		expect(existing_TxtChecksum).to.eq(current_TxtChecksum)
		 
		  })
		})		  
		 // Delete Files
		cy.task('deleteFile',{fileName:exiting_FilePath + monthlyStatus + '.txt'})
		cy.task('deleteFile',{fileName:current_FilePath + monthlyStatus + '.txt'})
		cy.task('deleteFile',{fileName:current_FilePath + monthlyStatus + '.xlsx'})
	
	})
	
	
	
	it('Download Excel Report of Monthly Summary - QuickViewExcel with Present Employee Details', function() {
		cy.visit('https://pockethrmsnext.azurewebsites.net/Reports/Report/Index?module=attendance&submodule=monthly') 
		cy.xpath("//span[contains(text(),'Monthly Summary')]").click({force: true})
		cy.wait(5000)
		cy.get("#catall").click({force: true})

		
		cy.get('#txtfromdate').click().then(input => {
		    input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(monthlySummary_FromDate)
		})

		cy.wait(2000)
		cy.get('#txttodate').click().then(input => {
		    input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(monthlySummary_ToDate)
	   })

		cy.get("#QuickViewExcel").click({force: true})
		cy.wait(1000)
		cy.get("#ddType").select('Present Employee Details', {force: true})
		cy.wait(1000)
		cy.xpath("//input[@value='Download Excel']").click({force: true})
	
	})

	it('Convert Excel Report into Txt file & Verify Checksum of Monthly Summary - QuickViewExcel with Present Employee Details', function() {
		cy.wait(2000)
		cy.task('convertExcelToJson_ExitingFile',{file:quickViewExcel, fileName:exiting_FilePath +'Attendance\\Monthly_Summary\\'+ quickViewExcel +'1.xlsx'})
	
		cy.wait(2000)
		cy.task('convertExcelToJson_CurrentFile',{file:quickViewExcel, fileName:current_FilePath + quickViewExcel +'.xlsx'})
	
		// Get & Compare Checksum of Download file Json & Exting file Json
		cy.readFile(exiting_FilePath + quickViewExcel + '.txt').then((text) =>{
		var existing_TxtChecksum = Crypto.MD5(text).toString().trim()
		cy.log("existing_TxtChecksum: "+ existing_TxtChecksum)
		 
		cy.readFile(current_FilePath + quickViewExcel + '.txt').then((text1) =>{
		var current_TxtChecksum = Crypto.MD5(text1).toString().trim()
		cy.log("current_TxtChecksum: "+ current_TxtChecksum)
		 
		expect(existing_TxtChecksum).to.eq(current_TxtChecksum)
		 
		  })
		})		  
		 // Delete Files
		cy.task('deleteFile',{fileName:exiting_FilePath + quickViewExcel + '.txt'})
		cy.task('deleteFile',{fileName:current_FilePath + quickViewExcel + '.txt'})
		cy.task('deleteFile',{fileName:current_FilePath + quickViewExcel + '.xlsx'})
	
	})
	
	
	
	it('Download Excel Report of Monthly Summary - QuickViewExcel with Shift Schedule Details', function() {
		
		cy.xpath("//span[contains(text(),'Monthly Summary')]").click({force: true})
		cy.wait(5000)
		cy.get("#catall").click({force: true})

		
		cy.get('#txtfromdate').click().then(input => {
		    input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(monthlySummary_FromDate)
		})

		cy.wait(2000)
		cy.get('#txttodate').click().then(input => {
		    input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(monthlySummary_ToDate)
	   })

		cy.get("#QuickViewExcel").click({force: true})
		cy.wait(1000)
		cy.get("#ddType").select('Shift Schedule Details', {force: true})
		cy.wait(1000)
		cy.xpath("//input[@value='Download Excel']").click({force: true})
	
	})

	it('Convert Excel Report into Txt file & Verify Checksum of Monthly Summary - QuickViewExcel with Shift Schedule Details', function() {
		cy.wait(2000)
		cy.task('convertExcelToJson_ExitingFile',{file:quickViewExcel, fileName:exiting_FilePath +'Attendance\\Monthly_Summary\\'+ quickViewExcel +'2.xlsx'})
	
		cy.wait(2000)
		cy.task('convertExcelToJson_CurrentFile',{file:quickViewExcel, fileName:current_FilePath + quickViewExcel +'.xlsx'})
	
		// Get & Compare Checksum of Download file Json & Exting file Json
		cy.readFile(exiting_FilePath + quickViewExcel + '.txt').then((text) =>{
		var existing_TxtChecksum = Crypto.MD5(text).toString().trim()
		cy.log("existing_TxtChecksum: "+ existing_TxtChecksum)
		 
		cy.readFile(current_FilePath + quickViewExcel + '.txt').then((text1) =>{
		var current_TxtChecksum = Crypto.MD5(text1).toString().trim()
		cy.log("current_TxtChecksum: "+ current_TxtChecksum)
		 
		expect(existing_TxtChecksum).to.eq(current_TxtChecksum)
		 
		  })
		})		  
		 // Delete Files
		cy.task('deleteFile',{fileName:exiting_FilePath + quickViewExcel + '.txt'})
		cy.task('deleteFile',{fileName:current_FilePath + quickViewExcel + '.txt'})
		cy.task('deleteFile',{fileName:current_FilePath + quickViewExcel + '.xlsx'})
	
	})
	
	
	
	it('Download Excel Report of Monthly Summary - QuickViewExcel with Leave Employee Details', function() {
				cy.visit('https://pockethrmsnext.azurewebsites.net/Reports/Report/Index?module=attendance&submodule=monthly') 

		cy.xpath("//span[contains(text(),'Monthly Summary')]").click({force: true})
		cy.wait(5000)
		cy.get("#catall").click({force: true})

		
		cy.get('#txtfromdate').click().then(input => {
		    input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(monthlySummary_FromDate)
		})

		cy.wait(2000)
		cy.get('#txttodate').click().then(input => {
		    input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(monthlySummary_ToDate)
	   })

		cy.get("#QuickViewExcel").click({force: true})
		cy.wait(1000)
		cy.get("#ddType").select('Leave Employee Details', {force: true})
		cy.wait(1000)
		cy.xpath("//input[@value='Download Excel']").click({force: true})
	
	})

	it('Convert Excel Report into Txt file & Verify Checksum of Monthly Summary - QuickViewExcel with Leave Employee Details', function() {
		cy.wait(2000)
		cy.task('convertExcelToJson_ExitingFile',{file:quickViewExcel, fileName:exiting_FilePath +'Attendance\\Monthly_Summary\\'+ quickViewExcel +'3.xlsx'})
	
		cy.wait(2000)
		cy.task('convertExcelToJson_CurrentFile',{file:quickViewExcel, fileName:current_FilePath + quickViewExcel +'.xlsx'})
	
		// Get & Compare Checksum of Download file Json & Exting file Json
		cy.readFile(exiting_FilePath + quickViewExcel + '.txt').then((text) =>{
		var existing_TxtChecksum = Crypto.MD5(text).toString().trim()
		cy.log("existing_TxtChecksum: "+ existing_TxtChecksum)
		 
		cy.readFile(current_FilePath + quickViewExcel + '.txt').then((text1) =>{
		var current_TxtChecksum = Crypto.MD5(text1).toString().trim()
		cy.log("current_TxtChecksum: "+ current_TxtChecksum)
		 
		expect(existing_TxtChecksum).to.eq(current_TxtChecksum)
		 
		  })
		})		  
		 // Delete Files
		cy.task('deleteFile',{fileName:exiting_FilePath + quickViewExcel + '.txt'})
		cy.task('deleteFile',{fileName:current_FilePath + quickViewExcel + '.txt'})
		cy.task('deleteFile',{fileName:current_FilePath + quickViewExcel + '.xlsx'})
	
	})
	
	
	
	
	it('Download Excel Report of Late', function() {
				cy.visit('https://pockethrmsnext.azurewebsites.net/Reports/Report/Index?module=attendance&submodule=monthly') 

		cy.xpath("//span[contains(text(),'Late')]").click({force: true})
		cy.wait(5000)
		cy.get("#catall").click({force: true})

		
		cy.get('#latefromdate').click().then(input => {
		    input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(monthlySummary_FromDate)
		})

		cy.wait(2000)
		cy.get('#latetodate').click().then(input => {
		    input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(monthlySummary_ToDate)
	   })
		cy.xpath("//input[@value='Download Excel']").click({force: true})
	
	})


	it('Convert Excel Report into Txt file & Verify Checksum of Late', function() {
		cy.wait(2000)
		cy.task('convertExcelToJson_ExitingFile',{file:late, fileName:exiting_FilePath +'Attendance\\'+ late +'.xlsx'})
	
		cy.wait(2000)
		cy.task('convertExcelToJson_CurrentFile',{file:late, fileName:current_FilePath + late +'.xlsx'})
	
		// Get & Compare Checksum of Download file Json & Exting file Json
		cy.readFile(exiting_FilePath + late + '.txt').then((text) =>{
		var existing_TxtChecksum = Crypto.MD5(text).toString().trim()
		cy.log("existing_TxtChecksum: "+ existing_TxtChecksum)
		 
		cy.readFile(current_FilePath + late + '.txt').then((text1) =>{
		var current_TxtChecksum = Crypto.MD5(text1).toString().trim()
		cy.log("current_TxtChecksum: "+ current_TxtChecksum)
		 
		expect(existing_TxtChecksum).to.eq(current_TxtChecksum)
		 
		  })
		})		  
		 // Delete Files
		cy.task('deleteFile',{fileName:exiting_FilePath + late + '.txt'})
		cy.task('deleteFile',{fileName:current_FilePath + late + '.txt'})
		cy.task('deleteFile',{fileName:current_FilePath + late + '.xlsx'})
	
	})
	
	
	
	//Report not working - downloading blank
	it('Download Excel Report of Machine Wise - Present Employees', function() {
				cy.visit('https://pockethrmsnext.azurewebsites.net/Reports/Report/Index?module=attendance&submodule=monthly') 

		cy.xpath("//span[contains(text(),'Machine Wise')]").click({force: true})
		cy.wait(5000)
		cy.get("#catall").click({force: true})

		
		cy.get('#latefromdate').click().then(input => {
		    input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(monthlySummary_FromDate)
		})

		cy.wait(2000)
		cy.get('#latetodate').click().then(input => {
		    input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(monthlySummary_ToDate)
	   })
		cy.xpath("//input[@value='Download Excel']").click({force: true})
	
	})

	it('Convert Excel Report into Txt file & Verify Checksum of Machine Wise - Present Employees', function() {
		cy.wait(2000)
		cy.task('convertExcelToJson_ExitingFile',{file:late, fileName:exiting_FilePath +'Attendance\\'+ late +'.xlsx'})
	
		cy.wait(2000)
		cy.task('convertExcelToJson_CurrentFile',{file:late, fileName:current_FilePath + late +'.xlsx'})
	
		// Get & Compare Checksum of Download file Json & Exting file Json
		cy.readFile(exiting_FilePath + late + '.txt').then((text) =>{
		var existing_TxtChecksum = Crypto.MD5(text).toString().trim()
		cy.log("existing_TxtChecksum: "+ existing_TxtChecksum)
		 
		cy.readFile(current_FilePath + late + '.txt').then((text1) =>{
		var current_TxtChecksum = Crypto.MD5(text1).toString().trim()
		cy.log("current_TxtChecksum: "+ current_TxtChecksum)
		 
		expect(existing_TxtChecksum).to.eq(current_TxtChecksum)
		 
		  })
		})		  
		 // Delete Files
		cy.task('deleteFile',{fileName:exiting_FilePath + late + '.txt'})
		cy.task('deleteFile',{fileName:current_FilePath + late + '.txt'})
		cy.task('deleteFile',{fileName:current_FilePath + late + '.xlsx'})
	
	})


	it('Download Excel Report of Attendance - Present Employees', function() {
				cy.visit('https://pockethrmsnext.azurewebsites.net/Reports/Report/Index?module=attendance&submodule=monthly') 

		cy.xpath("//li[@class='list-group-item']//span[contains(text(),'Attendance')]").click({force: true})
		cy.wait(5000)
		cy.get("#catall").click({force: true})

		
		cy.get('#enterydate').click().then(input => {
		    input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(attendance_EntryDate)
		})

		cy.wait(2000)
		cy.xpath("//input[@value='Download Excel']").click({force: true})
	
	})

	it('Convert Excel Report into Txt file & Verify Checksum of Machine Wise - Present Employees', function() {
		cy.wait(2000)
		cy.task('convertExcelToJson_ExitingFile',{file:attendance, fileName:exiting_FilePath +'Attendance\\'+ attendance +'_Attendance_PresentEmployees.xlsx'})
	
		cy.wait(2000)
		cy.task('convertExcelToJson_CurrentFile',{file:attendance, fileName:current_FilePath + attendance +'.xlsx'})
	
		// Get & Compare Checksum of Download file Json & Exting file Json
		cy.readFile(exiting_FilePath + attendance + '.txt').then((text) =>{
		var existing_TxtChecksum = Crypto.MD5(text).toString().trim()
		cy.log("existing_TxtChecksum: "+ existing_TxtChecksum)
		 
		cy.readFile(current_FilePath + attendance + '.txt').then((text1) =>{
		var current_TxtChecksum = Crypto.MD5(text1).toString().trim()
		cy.log("current_TxtChecksum: "+ current_TxtChecksum)
		 
		expect(existing_TxtChecksum).to.eq(current_TxtChecksum)
		 
		  })
		})		  
		 // Delete Files
		cy.task('deleteFile',{fileName:exiting_FilePath + attendance + '.txt'})
		cy.task('deleteFile',{fileName:current_FilePath + attendance + '.txt'})
		cy.task('deleteFile',{fileName:current_FilePath + attendance + '.xlsx'})
	
	})
	


	it('Download Excel Report of Attendance - Leave Employees', function() {
				cy.visit('https://pockethrmsnext.azurewebsites.net/Reports/Report/Index?module=attendance&submodule=monthly') 

		cy.xpath("//li[@class='list-group-item']//span[contains(text(),'Attendance')]").click({force: true})
		cy.wait(5000)
		cy.get("#catall").click({force: true})

		
		cy.get('#enterydate').click().then(input => {
		    input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(attendance_EntryDate)
		})

		cy.get("#chkleave").click({force: true})
		cy.wait(2000)
		cy.xpath("//input[@value='Download Excel']").click({force: true})
	
	})

	it('Convert Excel Report into Txt file & Verify Checksum of Attendance - Leave Employees', function() {
		cy.wait(2000)
		cy.task('convertExcelToJson_ExitingFile',{file:attendance, fileName:exiting_FilePath +'Attendance\\'+ attendance +'_Attendance_LeaveEmployees.xlsx'})
	
		cy.wait(2000)
		cy.task('convertExcelToJson_CurrentFile',{file:attendance, fileName:current_FilePath + attendance +'.xlsx'})
	
		// Get & Compare Checksum of Download file Json & Exting file Json
		cy.readFile(exiting_FilePath + attendance + '.txt').then((text) =>{
		var existing_TxtChecksum = Crypto.MD5(text).toString().trim()
		cy.log("existing_TxtChecksum: "+ existing_TxtChecksum)
		 
		cy.readFile(current_FilePath + attendance + '.txt').then((text1) =>{
		var current_TxtChecksum = Crypto.MD5(text1).toString().trim()
		cy.log("current_TxtChecksum: "+ current_TxtChecksum)
		 
		expect(existing_TxtChecksum).to.eq(current_TxtChecksum)
		 
		  })
		})		  
		 // Delete Files
		cy.task('deleteFile',{fileName:exiting_FilePath + attendance + '.txt'})
		cy.task('deleteFile',{fileName:current_FilePath + attendance + '.txt'})
		cy.task('deleteFile',{fileName:current_FilePath + attendance + '.xlsx'})
	
	})	
	
	
	it('Download Excel Report of Shift Detail Report', function() {
				cy.visit('https://pockethrmsnext.azurewebsites.net/Reports/Report/Index?module=attendance&submodule=monthly') 

		cy.xpath("//span[contains(text(),'Shift Detail Report')]").click({force: true})
		cy.wait(5000)
		cy.get("#catall").click({force: true})

		cy.xpath("//input[@name='dtFrom']").click().then(input => {
		    input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(shiftDetailReport_FromDate)
		})

		cy.xpath("//input[@name='dtTo']").click().then(input => {
		    input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(shiftDetailReport_ToDate)
		})
		cy.wait(2000)
		cy.xpath("//input[@value='Excel Download']").click({force: true})
	
	})

	it('Convert Excel Report into Txt file & Verify Checksum of Shift Detail Report', function() {
		cy.wait(2000)
		cy.task('convertExcelToJson_ExitingFile',{file:shiftDetailReport, fileName:exiting_FilePath +'Attendance\\'+ shiftDetailReport +'.xlsx'})
	
		cy.wait(2000)
		cy.task('convertExcelToJson_CurrentFile',{file:shiftDetailReport, fileName:current_FilePath + shiftDetailReport +'.xlsx'})
	
		// Get & Compare Checksum of Download file Json & Exting file Json
		cy.readFile(exiting_FilePath + shiftDetailReport + '.txt').then((text) =>{
		var existing_TxtChecksum = Crypto.MD5(text).toString().trim()
		cy.log("existing_TxtChecksum: "+ existing_TxtChecksum)
		 
		cy.readFile(current_FilePath + shiftDetailReport + '.txt').then((text1) =>{
		var current_TxtChecksum = Crypto.MD5(text1).toString().trim()
		cy.log("current_TxtChecksum: "+ current_TxtChecksum)
		 
		expect(existing_TxtChecksum).to.eq(current_TxtChecksum)
		 
		  })
		})		  
		 // Delete Files
		cy.task('deleteFile',{fileName:exiting_FilePath + shiftDetailReport + '.txt'})
		cy.task('deleteFile',{fileName:current_FilePath + shiftDetailReport + '.txt'})
		cy.task('deleteFile',{fileName:current_FilePath + shiftDetailReport + '.xlsx'})
	
	})	
	
	
	it('Download Excel Report of Excess Stay Employee', function() {
				cy.visit('https://pockethrmsnext.azurewebsites.net/Reports/Report/Index?module=attendance&submodule=monthly') 

		cy.xpath("//span[contains(text(),'Excess Stay Employee')]").click({force: true})
		cy.wait(5000)
		cy.get("#catall").click({force: true})

		cy.xpath("//input[@name='dtFrom']").click({force: true}).then(input => {
		    input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(excessStayEmployee_FromDate)
		})
		cy.wait(2000)
		cy.xpath("//input[@name='dtTo']").click({force: true}).then(input => {
		    input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(excessStayEmployee_ToDate)
		})
		cy.wait(2000)
		cy.xpath("//input[@value='Excel Download']").click({force: true})
	
	})

	it('Convert Excel Report into Txt file & Verify Checksum of Excess Stay Employee', function() {
		cy.wait(2000)
		cy.task('convertExcelToJson_ExitingFile',{file:excessStayEmployee, fileName:exiting_FilePath +'Attendance\\'+ excessStayEmployee +'.xlsx'})
	
		cy.wait(2000)
		cy.task('convertExcelToJson_CurrentFile',{file:excessStayEmployee, fileName:current_FilePath + excessStayEmployee +'.xlsx'})
	
		// Get & Compare Checksum of Download file Json & Exting file Json
		cy.readFile(exiting_FilePath + excessStayEmployee + '.txt').then((text) =>{
		var existing_TxtChecksum = Crypto.MD5(text).toString().trim()
		cy.log("existing_TxtChecksum: "+ existing_TxtChecksum)
		 
		cy.readFile(current_FilePath + excessStayEmployee + '.txt').then((text1) =>{
		var current_TxtChecksum = Crypto.MD5(text1).toString().trim()
		cy.log("current_TxtChecksum: "+ current_TxtChecksum)
		 
		expect(existing_TxtChecksum).to.eq(current_TxtChecksum)
		 
		  })
		})		  
		 // Delete Files
		cy.task('deleteFile',{fileName:exiting_FilePath + excessStayEmployee + '.txt'})
		cy.task('deleteFile',{fileName:current_FilePath + excessStayEmployee + '.txt'})
		cy.task('deleteFile',{fileName:current_FilePath + excessStayEmployee + '.xlsx'})
	
	})	
	
	
	
	it('Download PDF Report of Excess Stay Employee', function() {
				cy.visit('https://pockethrmsnext.azurewebsites.net/Reports/Report/Index?module=attendance&submodule=monthly') 

		cy.xpath("//span[contains(text(),'Excess Stay Employee')]").click({force: true})
		cy.wait(5000)
		cy.get("#catall").click({force: true})

		cy.xpath("//input[@name='dtFrom']").click({force: true}).then(input => {
		    input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(excessStayEmployee_FromDate)
		})
		cy.wait(2000)
		cy.xpath("//input[@name='dtTo']").click({force: true}).then(input => {
		    input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(excessStayEmployee_ToDate)
		})
		cy.wait(2000)
		cy.xpath("//input[@value='PDF Download']").click({force: true})
	
	})

	it('Convert PDF Report into Txt file & Verify Checksum of Excess Stay Employee', function() {
		cy.wait(2000)
		cy.task('convertPDFToJson_ExitingFile',{file:excessStayEmployee, fileName:exiting_FilePath +'Attendance\\'+ excessStayEmployee +'.pdf'})
	
		cy.wait(2000)
		cy.task('convertPDFToJson_CurrentFile',{file:excessStayEmployee, fileName:current_FilePath + excessStayEmployee +'.pdf'})
	
		// Get & Compare Checksum of Download file Json & Exting file Json
		cy.readFile(exiting_FilePath + excessStayEmployee + '.txt').then((text) =>{
		var existing_TxtChecksum = Crypto.MD5(text).toString().trim()
		cy.log("existing_TxtChecksum: "+ existing_TxtChecksum)
		 
		 cy.readFile(current_FilePath + excessStayEmployee + '.txt').then((text1) =>{
		var current_TxtChecksum = Crypto.MD5(text1).toString().trim()
		 cy.log("current_TxtChecksum: "+ current_TxtChecksum)
		 
		 expect(existing_TxtChecksum).to.eq(current_TxtChecksum)
		 
		  })
		})		
	 
	 
		// Delete Files
		cy.task('deleteFile',{fileName:exiting_FilePath + excessStayEmployee + '.txt'})
		cy.task('deleteFile',{fileName:current_FilePath + excessStayEmployee + '.txt'})
		cy.task('deleteFile',{fileName:current_FilePath + excessStayEmployee + '.pdf'})
	
	})	
	
	
	it('Download Excel Report of Half Day', function() {
				cy.visit('https://pockethrmsnext.azurewebsites.net/Reports/Report/Index?module=attendance&submodule=monthly') 

		cy.xpath("//span[contains(text(),'Half Day')]").click({force: true})
		cy.wait(5000)
		cy.get("#catall").click({force: true})

		cy.xpath("//input[@name='dtFrom']").click({force: true}).then(input => {
		    input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(halfDay_FromDate)
		})
		cy.wait(2000)
		cy.xpath("//input[@name='dtTo']").click({force: true}).then(input => {
		    input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(halfDay_ToDate)
		})
		cy.wait(2000)
		cy.xpath("//input[@value='Download Excel']").click({force: true})
	
	})

	it('Convert Excel Report into Txt file & Verify Checksum of Half Day', function() {
		cy.wait(2000)
		cy.task('convertExcelToJson_ExitingFile',{file:halfDay, fileName:exiting_FilePath +'Attendance\\'+ halfDay +'.xlsx'})
	
		cy.wait(2000)
		cy.task('convertExcelToJson_CurrentFile',{file:halfDay, fileName:current_FilePath + halfDay +'.xlsx'})
	
		// Get & Compare Checksum of Download file Json & Exting file Json
		cy.readFile(exiting_FilePath + halfDay + '.txt').then((text) =>{
		var existing_TxtChecksum = Crypto.MD5(text).toString().trim()
		cy.log("existing_TxtChecksum: "+ existing_TxtChecksum)
		 
		cy.readFile(current_FilePath + halfDay + '.txt').then((text1) =>{
		var current_TxtChecksum = Crypto.MD5(text1).toString().trim()
		cy.log("current_TxtChecksum: "+ current_TxtChecksum)
		 
		expect(existing_TxtChecksum).to.eq(current_TxtChecksum)
		 
		  })
		})		
		
		 // Delete Files
		cy.task('deleteFile',{fileName:exiting_FilePath + halfDay + '.txt'})
		cy.task('deleteFile',{fileName:current_FilePath + halfDay + '.txt'})
		cy.task('deleteFile',{fileName:current_FilePath + halfDay + '.xlsx'})
	
	})	
	
	
	
	it('Download Excel Report of Machine Log Export', function() {
				cy.visit('https://pockethrmsnext.azurewebsites.net/Reports/Report/Index?module=attendance&submodule=monthly') 

		cy.xpath("//span[contains(text(),'Machine Log Export')]").click({force: true})
		cy.wait(5000)
		//cy.get("#catall").click({force: true})

		cy.xpath("//input[@name='dtFrom']").click({force: true}).then(input => {
		    input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(halfDay_FromDate)
		})
		cy.wait(2000)
		cy.xpath("//input[@name='dtTo']").click({force: true}).then(input => {
		    input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(halfDay_ToDate)
		})
		cy.wait(2000)
		cy.xpath("//input[@value='Download Excel']").click({force: true})
	
	})

	it('Convert Excel Report into Txt file & Verify Checksum of Machine Log Export', function() {
		cy.wait(2000)
		cy.task('convertExcelToJson_ExitingFile',{file:machineLogExport, fileName:exiting_FilePath +'Attendance\\'+ machineLogExport +'.xlsx'})
	
		cy.wait(2000)
		cy.task('convertExcelToJson_CurrentFile',{file:machineLogExport, fileName:current_FilePath + machineLogExport +'.xlsx'})
	
		// Get & Compare Checksum of Download file Json & Exting file Json
		cy.readFile(exiting_FilePath + machineLogExport + '.txt').then((text) =>{
		var existing_TxtChecksum = Crypto.MD5(text).toString().trim()
		cy.log("existing_TxtChecksum: "+ existing_TxtChecksum)
		 
		cy.readFile(current_FilePath + machineLogExport + '.txt').then((text1) =>{
		var current_TxtChecksum = Crypto.MD5(text1).toString().trim()
		cy.log("current_TxtChecksum: "+ current_TxtChecksum)
		 
		expect(existing_TxtChecksum).to.eq(current_TxtChecksum)
		 
		  })
		})		
		
		 // Delete Files
		cy.task('deleteFile',{fileName:exiting_FilePath + machineLogExport + '.txt'})
		cy.task('deleteFile',{fileName:current_FilePath + machineLogExport + '.txt'})
		cy.task('deleteFile',{fileName:current_FilePath + machineLogExport + '.xlsx'})
	
	})	
	
	
	it('Download Excel Report of UnPunches Export', function() {
				cy.visit('https://pockethrmsnext.azurewebsites.net/Reports/Report/Index?module=attendance&submodule=monthly') 

		cy.xpath("//span[contains(text(),'UnPunches Export')]").click({force: true})
		cy.wait(5000)
		cy.get("#catall").click({force: true})

		cy.xpath("//input[@name='FromDate']").click({force: true}).then(input => {
		    input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(halfDay_FromDate)
		})
		cy.wait(2000)
		cy.xpath("//input[@name='ToDate']").click({force: true}).then(input => {
		    input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(halfDay_ToDate)
		})
		cy.wait(2000)
		cy.xpath("//input[@value='Download']").click({force: true})
	
	})

	it('Convert Excel Report into Txt file & Verify Checksum of UnPunches Export', function() {
		cy.wait(2000)
		cy.task('convertExcelToJson_ExitingFile',{file:unPunchesExport, fileName:exiting_FilePath +'Attendance\\'+ unPunchesExport +'.xlsx'})
	
		cy.wait(2000)
		cy.task('convertExcelToJson_CurrentFile',{file:unPunchesExport, fileName:current_FilePath + unPunchesExport +'.xlsx'})
	
		// Get & Compare Checksum of Download file Json & Exting file Json
		cy.readFile(exiting_FilePath + unPunchesExport + '.txt').then((text) =>{
		var existing_TxtChecksum = Crypto.MD5(text).toString().trim()
		cy.log("existing_TxtChecksum: "+ existing_TxtChecksum)
		 
		cy.readFile(current_FilePath + unPunchesExport + '.txt').then((text1) =>{
		var current_TxtChecksum = Crypto.MD5(text1).toString().trim()
		cy.log("current_TxtChecksum: "+ current_TxtChecksum)
		 
		expect(existing_TxtChecksum).to.eq(current_TxtChecksum)
		 
		  })
		})		
		
		 // Delete Files
		cy.task('deleteFile',{fileName:exiting_FilePath + unPunchesExport + '.txt'})
		cy.task('deleteFile',{fileName:current_FilePath + unPunchesExport + '.txt'})
		cy.task('deleteFile',{fileName:current_FilePath + unPunchesExport + '.xlsx'})
	
	})	
	
	
	
	it('Download Excel Report of Invalid Punches Export', function() {
				cy.visit('https://pockethrmsnext.azurewebsites.net/Reports/Report/Index?module=attendance&submodule=monthly') 

		cy.xpath("//span[contains(text(),'Invalid Punches Export')]").click({force: true})
		cy.wait(5000)
		cy.get("#catall").click({force: true})

		cy.xpath("//input[@id='latefromdate']").click({force: true}).then(input => {
		    input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(halfDay_FromDate)
		})
		cy.wait(2000)
		cy.xpath("//input[@id='latetodate']").click({force: true}).then(input => {
		    input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(halfDay_ToDate)
		})
		cy.wait(2000)
		cy.xpath("//input[@value='Download']").click({force: true})
	
	})

	it('Convert Excel Report into Txt file & Verify Checksum of Invalid Punches Export', function() {
		cy.wait(2000)
		cy.task('convertExcelToJson_ExitingFile',{file:invalidPunchesExport, fileName:exiting_FilePath +'Attendance\\'+ invalidPunchesExport +'.xlsx'})
	
		cy.wait(2000)
		cy.task('convertExcelToJson_CurrentFile',{file:invalidPunchesExport, fileName:current_FilePath + invalidPunchesExport +'.xlsx'})
	
		// Get & Compare Checksum of Download file Json & Exting file Json
		cy.readFile(exiting_FilePath + invalidPunchesExport + '.txt').then((text) =>{
		var existing_TxtChecksum = Crypto.MD5(text).toString().trim()
		cy.log("existing_TxtChecksum: "+ existing_TxtChecksum)
		 
		cy.readFile(current_FilePath + invalidPunchesExport + '.txt').then((text1) =>{
		var current_TxtChecksum = Crypto.MD5(text1).toString().trim()
		cy.log("current_TxtChecksum: "+ current_TxtChecksum)
		 
		expect(existing_TxtChecksum).to.eq(current_TxtChecksum)
		 
		  })
		})		
		
		 // Delete Files
		cy.task('deleteFile',{fileName:exiting_FilePath + invalidPunchesExport + '.txt'})
		cy.task('deleteFile',{fileName:current_FilePath + invalidPunchesExport + '.txt'})
		cy.task('deleteFile',{fileName:current_FilePath + invalidPunchesExport + '.xlsx'})
	
	})	
	
	
})

