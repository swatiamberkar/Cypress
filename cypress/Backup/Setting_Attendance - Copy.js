describe('Attendence Module ', function() {
	
	var company='Test_77'
	var firstShift ='General'
	var secondshift = 'Secondshift'
	var employeeCode = 'test01'
	var machineNo = randomInteger(2)
	var machineName = 'Machine_'+machineNo
	
	function randomInteger(length) {
	   var result           = '';
	   var characters       = '0123456789';
	   var charactersLength = characters.length;
	   for ( var i = 0; i < length; i++ ) {
		  result += characters.charAt(Math.floor(Math.random() * charactersLength));
	   }
	   return result;
	}
	
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
		cy.visit('http://next.pockethrms.com/') 
	})
	
	it('Pocket HRMS Login', function() {
		cy.visit('http://next.pockethrms.com/')
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
	
	it('Navigate to Attendance', function() {
		cy.xpath("//span[@class='menu-name'][contains(text(),'Settings')]").click({force: true})
		cy.wait(1000)
		cy.get('#attendance_detail_tab').click({force: true})
		cy.wait(2000)			
	})
	
/*	it('General Time Office Settings', function() {
		cy.get('#genTimeOffSettingTab').click({force: true})
		cy.wait(3000)
		cy.get('#ddLate').select('COMPCODE',{force: true})
		cy.get('#ddPermission').select('COMPCODE',{force: true})
		cy.get('#ddOverTime').select('COMPCODE',{force: true})
		cy.wait(1000)
		cy.get('#ddLunchTime').select('COMPCODE',{force: true})
		cy.get('#ddPaidHoliday').select('COMPCODE',{force: true})
		cy.get('#ddPaidWeekOff').select('COMPCODE',{force: true})
		cy.get('#ddShift').select('COMPCODE',{force: true})
		cy.get('#ddUnpunch').select('COMPCODE',{force: true})
		cy.wait(1000)
		cy.get('#ddOnDuty').select('COMPCODE',{force: true})
		cy.get('#ddUserRights').select('CATEGORY',{force: true})
		cy.get('#ddOTCompOff').select('COMPCODE',{force: true})
		cy.get('#ddPermissionEntry').select('SINGLE',{force: true})
		cy.wait(1000)
		cy.get('#ddPunchImpType').select('SISO',{force: true})
		cy.get('#ddPunchImpPar').select('COMPCODE',{force: true})
		cy.get('#ddPunchImpLog').select('DW',{force: true})
		cy.get('#ddShiftEntInp').select('CM',{force: true})
		cy.wait(1000)
		cy.get('#ddPayrollPost').select('CM',{force: true})
		cy.get('#ddLeaveEntInp').select('CM',{force: true})
        cy.get('#btnSaveGeneralTimeOffice').click({force: true})
		cy.wait(6000)		
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())	
			expect(text.trim()).equal('Record saved successfully !')
			//cy.get(".toast-message").click()
		})
	})
		
	it('Add Shift Details', function() {
		
		cy.readFile('D:/CyPress Demo/cypress/fixtures/Attedance.json').then((text) =>{
                 text.forEach(function(entry) {	
				 
		var shiftName = entry.shiftName
		cy.log('shiftName '+ shiftName)		
		cy.wait(500)
		
		if(shiftName=='Genaral')
		{
		var fromTimeHour= '8'
		var fromTimeMin= '00'
		var toTimeHour= '16'
		var toTimeMin= '00'
		}
		else
		{
		var fromTimeHour= '16'
		var fromTimeMin= '30'
		var toTimeHour= '22'
		var toTimeMin= '30'
		}
		
		cy.get('#shiftDetailsTab').click({force: true})
		cy.wait(3000)	
		cy.get('button').then(($sp) => {
		if ($sp.hasClass('mb-1')) {
		cy.xpath("//button[@class='btn buttons-bg-color btn-facebook mb-1']").click();
		} else {
		cy.xpath("//div[@id='attendanceContentTitle']//i[@class='fa fa-plus']").click();
		}
		})
		cy.wait(3000)	
		cy.get('#insShiftName').type(shiftName)
		
		cy.get('#insFromHour').click({force: true})
		cy.get('#insFromHour').clear()
		cy.get('#insFromHour').type(fromTimeHour)
		cy.get('#insFromMin').type(fromTimeMin)
		
		cy.get('#insToHour').click({force: true})
		cy.get('#insToHour').clear()
		cy.get('#insToHour').type(toTimeHour)
		cy.get('#insToMin').type(toTimeMin)
		
		cy.get('select[id=insStatus]').select('1')
		
		cy.get('#ddImportINStart').select('C')
		cy.get('#txtImportINStartHour').type('7')
		cy.get('#txtImportINStartMin').type('00')
		
		cy.get('#ddImportINEnd').select('C')
		cy.get('#txtImportINEndHour').type('11')
		cy.get('#txtImportINEndMin').type('59')
		
		cy.get('#ddImportOUTStart').select('C')
		cy.get('#txtImportOUTStartHour').type('12')
		cy.get('#txtImportOUTStartMin').type('01')
		
		
		cy.get('#ddImportOUTEnd').select('C')
		cy.get('#txtImportOUTEndHour').type('24')
		cy.get('#txtImportOUTEndMin').type('00')
		
		
		cy.get('#ddLunchInStart').select('C')
		cy.get('#txtLunchINStartHour').type('1')
		cy.get('#txtLunchINStartMin').type('00')
		
		
		cy.get('#ddLunchInEnd').select('C')
		cy.get('#txtLunchINEndHour').type('2')
		cy.get('#txtLunchINEndMin').type('00')
	
		cy.get('#btnSaveShift').click()
		cy.wait(5000)
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())	
			expect(text.trim()).equal('Settings saved successfully.!')
			//cy.get(".toast-message").click()
		})
		})
		 })
	})	
	
	it('Navigate to Attendance Setting', function() {
		cy.get('#attendance_detail_tab').click({force: true})
		cy.wait(1000)		
	})
	
	it('Attendance Setting - Late ', function() {	
	cy.readFile('D:/CyPress Demo/cypress/fixtures/Attedance.json').then((text) =>{
                 text.forEach(function(entry) {	
				 
		var shiftName = entry.shiftName
		cy.log('shiftName '+ shiftName)		
		cy.wait(500)
		
	cy.get('#lateTab').click({force: true})
	cy.wait(1000)
	
	cy.get('#ddShift').select(shiftName,{force: true})
	
	 cy.get('#ddGraceHour').click({force: true})
	 cy.get('#ddGraceHour').clear()
    cy.get('#ddGraceHour').type('00')
 
	cy.get('#ddGraceMin').click({force: true})
	cy.get('#ddGraceMin').clear()
    cy.get('#ddGraceMin').type('15')
 
    cy.get('#ddDeduct').select('Y')
 
    cy.get('#ddDeduct1Min').select('Y')
 
    cy.get('#ddAllFlex').select('Y')
 
    cy.get('#ddLunchLate').select('Y')
 
    cy.get('#ddLateTime').select('Y')
 
    cy.get('#ddEarlyGoing').select('Y')
 
    cy.get('#ddLateRoundingType').select('1')
 
    cy.get('#ddLateRounding').select('1')
 
    cy.get('#ddLateRoundingUsed').select('1')
 
	cy.get('#txtNoPermInMonth').click({force: true})
	cy.get('#txtNoPermInMonth').clear()
    cy.get('#txtNoPermInMonth').type('3')
 
    cy.get('#ddLateShiftHours').select('Y')
	cy.get('#chkAll').check({force: true})
	cy.wait(1000)
    cy.get('#btnSaveLateSetting').click({force: true}) 
	cy.wait(5000)		
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())	
			expect(text.trim()).equal('Record saved successfully.!')
			//cy.get(".toast-message").click()
		})
		
				 })
	})
	
	 })

	it('Attendance Setting - Permission', function() {

cy.readFile('D:/CyPress Demo/cypress/fixtures/Attedance.json').then((text) =>{
                 text.forEach(function(entry) {	
				 
		var shiftName = entry.shiftName
		cy.log('shiftName '+ shiftName)		
		cy.wait(500)
		
	cy.get('#permissionTab').click({force: true})
	cy.wait(1000)
	
	cy.get('#ddShift').select(shiftName,{force: true})
	
    cy.get('#txtMaxMtsMonthHour').click({force: true})
	cy.get('#txtMaxMtsMonthHour').clear()
    cy.get('#txtMaxMtsMonthHour').type('00')
	
	cy.get('#txtMaxMtsMonthMin').click({force: true})
	cy.get('#txtMaxMtsMonthMin').clear()
    cy.get('#txtMaxMtsMonthMin').type('60')
	
	cy.get('#txtMaxMtsDayHour').click({force: true})
	cy.get('#txtMaxMtsDayHour').clear()
    cy.get('#txtMaxMtsDayHour').type('00')
	
	cy.get('#txtMaxMtsDayMin').click({force: true})
	cy.get('#txtMaxMtsDayMin').clear()
    cy.get('#txtMaxMtsDayMin').type('00')
	
	cy.get('#txtMinMtsDayHour').click({force: true})
	cy.get('#txtMinMtsDayHour').clear()
    cy.get('#txtMinMtsDayHour').type('00')
 
	cy.get('#txtMinMtsDayMin').click({force: true})
	cy.get('#txtMinMtsDayMin').clear()
    cy.get('#txtMinMtsDayMin').type('00')
 
	cy.get('#txtNoPermMonth').click({force: true})
	cy.get('#txtNoPermMonth').clear()
    cy.get('#txtNoPermMonth').type('4')
 
    cy.get('#ddDedApp').select('N')
    cy.get('#ddDed1stMin').select('Y')
 
    cy.get('#ddDed1stMin').select('N')
 
    cy.get('#ddAdj').select('Y')
 
    cy.get('#ddAdj').select('N')
 
    cy.get('#ddAutoPerm').select('Y')
 
    cy.get('#ddAutoPerm').select('N')
 
    cy.get('#ddExcPerm').select('Y')
 
    cy.get('#ddExcPerm').select('N')
 
    cy.get('#ddPermRoundingType').select('1')
 
    cy.get('#ddPermRoundingType').select('2')
 
    cy.get('#ddPermRounding').select('1')
 
    cy.get('#ddPermRounding').select('2')
   cy.get('#chkAll').check({force: true})
   cy.wait(1000)
    cy.get('#btnSavePermissionSetting').click({force: true})
	cy.wait(5000)		
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())	
			expect(text.trim()).equal('Record saved successfully.!')
			//cy.get(".toast-message").click()
		})
				 })
})
 })

	it('Attendance Setting - OT', function() {
		cy.readFile('D:/CyPress Demo/cypress/fixtures/Attedance.json').then((text) =>{
                 text.forEach(function(entry) {	
				 
		var shiftName = entry.shiftName
		cy.log('shiftName '+ shiftName)		
		cy.wait(500)
		
   	cy.get('#otTab').click({force: true})
	cy.wait(1000)
    cy.get('#ddExStay').select('OT',{force: true})
 
   cy.get('#ddShift').select(shiftName,{force: true})
	
	cy.get('#txtOTStartHour').click({force: true})
	cy.get('#txtOTStartHour').clear()
    cy.get('#txtOTStartHour').type('4')
	
	cy.get('#txtOTStartMin').click({force: true})
	cy.get('#txtOTStartMin').clear()
    cy.get('#txtOTStartMin').type('00')
	
	cy.get('#txtMinOTHour').click({force: true})
	cy.get('#txtMinOTHour').clear()
    cy.get('#txtMinOTHour').type('1')
 
	cy.get('#txtMinOTMin').click({force: true})
	cy.get('#txtMinOTMin').clear()
    cy.get('#txtMinOTMin').type('00')
	
	cy.get('#txtMaxOTHour').click({force: true})
	cy.get('#txtMaxOTHour').clear()
    cy.get('#txtMaxOTHour').type('4')
 
	cy.get('#txtMaxOTMin').click({force: true})
	cy.get('#txtMaxOTMin').clear()
    cy.get('#txtMaxOTMin').type('00')
 
    cy.get('#ddEarlyConsider').select('Y')
	
	cy.get('#txtEarlyOTStartHour').click({force: true})
	cy.get('#txtEarlyOTStartHour').clear()
    cy.get('#txtEarlyOTStartHour').type('9')
 
	cy.get('#txtEarlyOTStartMin').click({force: true})
	cy.get('#txtEarlyOTStartMin').clear()
    cy.get('#txtEarlyOTStartMin').type('30')
	
	cy.get('#txtOTBreakHour').click({force: true})
	cy.get('#txtOTBreakHour').clear()
    cy.get('#txtOTBreakHour').type('00')
	
	cy.get('#txtOTBreakMin').click({force: true})
	cy.get('#txtOTBreakMin').clear()
    cy.get('#txtOTBreakMin').type('10')
	
	cy.get('#txtEarlyOTBreakHour').click({force: true})
	cy.get('#txtEarlyOTBreakHour').clear()
    cy.get('#txtEarlyOTBreakHour').type('00')
	
	cy.get('#txtEarlyOTBreakMin').click({force: true})
	cy.get('#txtEarlyOTBreakMin').clear()
    cy.get('#txtEarlyOTBreakMin').type('00')
 
    cy.get('#ddLateComing').select('Y')
 
    cy.get('#ddOTSlip').select('Y')
 
    cy.get('#ddOTSlip').select('N')
 
    cy.get('#ddOTRoundingType').select('1')
 
    cy.get('#ddOTRounding').select('1')
 
    cy.get('#ddWeekOff').select('Y')
 
    cy.get('#ddApproval').select('Y')
 
	cy.wait(1000)
    cy.get('#btnSaveOT').click()
	cy.wait(5000)		
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())	
			expect(text.trim()).equal('Record saved successfully.!')
			//cy.get(".toast-message").click()
		})
				 })
		})
 })  

	it('Attendance Setting - OT - CompOff', function() {

cy.readFile('D:/CyPress Demo/cypress/fixtures/Attedance.json').then((text) =>{
                 text.forEach(function(entry) {	
				 
		var shiftName = entry.shiftName
		cy.log('shiftName '+ shiftName)		
		cy.wait(500)
		
		cy.get('#ddExStay').select('CompOff',{force: true})
		cy.get('#ddShift').select(shiftName,{force: true})
		 cy.get('#txtCOMPExHour1').clear()
		cy.get('#txtCOMPExHour1').type('5')
		cy.get('#txtCOMPExMin1').clear()
		cy.get('#txtCOMPExMin1').type('00')
		cy.get('#txtCOMPExHour2').clear()
		cy.get('#txtCOMPExHour2').type('8')
		cy.get('#txtCOMPExMin2').clear()
		cy.get('#txtCOMPExMin2').type('00')
		cy.get('#txtCOMPExHour3').clear()
		cy.get('#txtCOMPExHour3').type('10')
		cy.get('#txtCOMPExMin3').clear()
		cy.get('#txtCOMPExMin3').type('00')
	 
		cy.get('#ddCOMPRoundingType').select('1')
	 
		cy.get('#ddCOMPRoundingType').select('2')
	 
		cy.get('#ddCOMPRounding').select('1')
	 
		cy.get('#ddCOMPRounding').select('2')
		
		cy.wait(1000)
		cy.get('#btnSave1').click()
		cy.wait(5000)		
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())	
			expect(text.trim()).equal('Record saved successfully.!')
			//cy.get(".toast-message").click()
		})
		
				 })
})
	 }) 
	 
	it('Attendance Setting - Early Going', function() {
		cy.readFile('D:/CyPress Demo/cypress/fixtures/Attedance.json').then((text) =>{
                 text.forEach(function(entry) {	
				 
		var shiftName = entry.shiftName
		cy.log('shiftName '+ shiftName)		
		cy.wait(500)
		

   	cy.get('#earlyGoingTab').click({force: true})
 
    cy.get('#ddShift').select(shiftName,{ force: true })
 
	cy.get('#txtGraceHour').click({force: true})
	cy.get('#txtGraceHour').clear()
    cy.get('#txtGraceHour').type('02')
	cy.get('#txtGraceMin').click({force: true})
	cy.get('#txtGraceMin').clear()
    cy.get('#txtGraceMin').type('00')
    cy.get('#chkAll').check('on')
	
	cy.wait(1000)
    cy.get('#btnSaveEarlyGoing').click()
	cy.wait(5000)		
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())	
			expect(text.trim()).equal('Record saved successfully.!')
			//cy.get(".toast-message").click()
		})
				 
				 })
		})
				 
 
 }) 
	
	it('Attendance Setting - Half Day', function() { 
cy.readFile('D:/CyPress Demo/cypress/fixtures/Attedance.json').then((text) =>{
                 text.forEach(function(entry) {	
				 
		var shiftName = entry.shiftName
		cy.log('shiftName '+ shiftName)		
		cy.wait(500)
		
	cy.get('#halfDayTab').click({force: true})
    cy.get('#ddShift').select(shiftName,{ force: true })
    cy.get('#txtFirstHalfHour').type('0')
    cy.get('#txtFirstHalfMin').type('1')
    cy.get('#txtSecondtHalfHour').type('0')
    cy.get('#txtSecondtHalfMin').type('1')
    cy.get('#txtEmpINHour').type('3')
    cy.get('#txtEmpINHour').click()
 
    //cy.get('.card > .card-body > #formGeneral > .well > .form-group:nth-child(4)').click()
 
    cy.get('#txtEmpINHour').type('00')
  
    cy.get('#txtEmpINMin').type('15')
 
    cy.get('#txtEmpOUTHour').type('1')
 
    cy.get('#txtEmpOUTMin').type('00')
 
    cy.get('#txtWorkHrsHour').type('00')
 
   // cy.get('.well > .form-group:nth-child(6) > .col-sm-9 > .row > .col-sm-3:nth-child(1)').click()
 
    cy.get('#txtWorkHrsHour').type('9')
 
    cy.get('#txtWorkHrsMin').type('00')
 
    cy.get('#txtWorkHrs1Hour').type('9')
 
    cy.get('#txtWorkHrs1Min').type('00')
 
    cy.get('#txtWorkHrsToHour').type('1')
	
	cy.wait(1000)
    cy.get('#btnSaveHalfDay').click()
	cy.wait(5000)		
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())	
			expect(text.trim()).equal('Record saved successfully.!')
			//cy.get(".toast-message").click()
		})
 
				 })
})
 })
 
	it('Attendance Setting - Auto Shift - Day wise', function() {
		cy.get('#autoShiftTab').click({force: true})
		cy.wait(2000)
		//cy.get('#formGeneral > div > div.table-responsive > table > tbody > tr.T0003 > td:nth-child(2) > select').select('General',{force: true})
		cy.get('#ddAutoShiftInput').select('DAYWISE')
		cy.wait(1000)
		cy.get('#txtNumberOf').type('2')
		cy.wait(1000)
		cy.get('#btnSaveAutoShift').click() 
		cy.wait(5000)		
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())	
			expect(text.trim()).equal('Record saved successfully.!')
			//cy.get(".toast-message").click()
		})		
	 })

	it('Attendance Setting - Auto Shift - Week off', function() {
		cy.get('#ddAutoShiftInput').select('WEEKOFF')
		cy.get('#ddWeekOff').select('SUNDAY')
		cy.get('#btnSaveAutoShift').click()
		cy.wait(5000)		
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())	
			expect(text.trim()).equal('Record saved successfully.!')
			//cy.get(".toast-message").click()
		})
	 
	 })

	it('Attendance Setting - Auto Shift - Monthly - Calender', function() {
		cy.get('#ddAutoShiftInput').select('MONTHLY')
		cy.get('#ddLeaveEntInp').select('CM')
		cy.get('#btnSaveAutoShift').click()
		cy.wait(5000)		
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())	
			expect(text.trim()).equal('Record saved successfully.!')
			//cy.get(".toast-message").click()
		})
	 })		
	
	it('Attendance Setting - Auto Shift - Monthly - Date To Date', function() {
		cy.get('#ddAutoShiftInput').select('MONTHLY')
		cy.get('#ddLeaveEntInp').select('DD')
		cy.get('#ddLeaveFrom').select('5')
		cy.get('#btnSaveAutoShift').click()
		cy.wait(5000)		
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())	
			expect(text.trim()).equal('Record saved successfully.!')
			//cy.get(".toast-message").click()
		})
 
	})
	
	it('Attendance Setting - Auto Shift - Yearly', function() {
		cy.get('#ddAutoShiftInput').select('YEARLY')
		cy.get('#btnSaveAutoShift').click()
		cy.wait(3000)		
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())	
			expect(text.trim()).equal('Record saved successfully.!')
			//cy.get(".toast-message").click()
		})
	}) 
	
	it('Attendance Setting - Late Wise Leave', function() {
		cy.readFile('D:/CyPress Demo/cypress/fixtures/Attedance.json').then((text) =>{
                 text.forEach(function(entry) {	
				 
		var shiftName = entry.shiftName
		cy.log('shiftName '+ shiftName)		
		cy.wait(500)
		
		cy.get('#lateWiseLeaveTab').click({force: true})
		cy.wait(1000)
		
		cy.get('#ddShift').select(shiftName,{force: true})
		cy.get('#ddLogic').select('D')
		
		cy.get('#txtLateExceedHour').click({force: true})
		cy.get('#txtLateExceedHour').clear()
		cy.get('#txtLateExceedHour').type('9')
		
		cy.get('#txtLateExceedMin').click({force: true})
		cy.get('#txtLateExceedMin').clear()
		cy.get('#txtLateExceedMin').type('00')
		
		cy.get('#ddConsider').select('F')
		cy.get('#ddConsiderFullDay').select('LD')
		cy.get('#chkAll').check('on')
		cy.get('#btnSaveLateWiseLeave').click({force: true})
		cy.wait(5000)		
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())	
			expect(text.trim()).equal('Record saved successfully.!')
			//cy.get(".toast-message").click()
		})		
				 })
		})
	})
	
	it('Attendance Setting - Import Time', function() {
		cy.readFile('D:/CyPress Demo/cypress/fixtures/Attedance.json').then((text) =>{
                 text.forEach(function(entry) {	
				 
		var shiftName = entry.shiftName
		cy.log('shiftName '+ shiftName)		
		cy.wait(500)
		
		cy.get('#importTimeTab').click({force: true})
		cy.wait(1000)
		
		cy.get('#ddShift').select(shiftName,{force: true})
		
		cy.get('#ddImportINStart').select('C')
		cy.get('#txtImportINStartHour').type('7')
		cy.get('#txtImportINStartMin').type('00')
		
		cy.get('#ddImportINEnd').select('C')
		cy.get('#txtImportINEndHour').type('11')
		cy.get('#txtImportINEndMin').type('59')
		
		cy.get('#ddImportOUTStart').select('C')
		cy.get('#txtImportOUTStartHour').type('12')
		cy.get('#txtImportOUTStartMin').type('01')
		
		
		cy.get('#ddImportOUTEnd').select('C')
		cy.get('#txtImportOUTEndHour').type('24')
		cy.get('#txtImportOUTEndMin').type('00')
		
		
		cy.get('#ddLunchInStart').select('C')
		cy.get('#txtLunchINStartHour').type('1')
		cy.get('#txtLunchINStartMin').type('00')
		
		
		cy.get('#ddLunchInEnd').select('C')
		cy.get('#txtLunchINEndHour').type('2')
		cy.get('#txtLunchINEndMin').type('00')
	
		cy.wait(2000)
		cy.get('#btnSaveImportTime').click({force: true})
		cy.wait(5000)		
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())	
			expect(text.trim()).equal('Record saved successfully.!')
			//cy.get(".toast-message").click()
		})
				 })
		})
	})	

	it('Attendance Setting - Payroll Component', function() {
		cy.get('#payrollComponentTab').click({force: true})
		cy.wait(1000)
		
		cy.wait(1000)
		cy.get('#ddTime').select('WORK DAYS',{force: true})
		cy.get('#ddPayroll').select('AB',{force: true})
		cy.get('#btnAdd').click({force: true})
		cy.wait(1000)
		cy.get('input[type="checkbox"]').check({force: true})
		
		cy.wait(3000)
		cy.get('#btnSavePayrollComp').click({force: true})
		cy.get(".toast-message").invoke('text').then((text) => {
				cy.log(text.trim())
		 })
		 cy.wait(5000)		
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())	
			expect(text.trim()).equal('Record saved successfully.!')
			//cy.get(".toast-message").click()
		})
	})		
		
	it('Attendance Setting - Incentives setting', function() {
	cy.get('#incentiveTab').click({force: true})
	cy.wait(4000)
	
	cy.get('#ddDynamic').select('Staff',{force: true})

    cy.get('#txtMaxIncen').click({force: true})
	cy.get('#txtMaxIncen').clear()
	 cy.get('#txtMaxIncen').type('4000')
	 
	cy.get('#txtPerDayDed').click({force: true})
	cy.get('#txtPerDayDed').clear()
	cy.get('#txtPerDayDed').type('100')
	 
	  cy.get('#txtFoodWorkHours1').click({force: true})
	 cy.get('#txtFoodWorkHours1').clear()
	 cy.get('#txtFoodWorkHours1').type('4')
	 
	  cy.get('#txtFoodWorkAmt1').click({force: true})
	 cy.get('#txtFoodWorkAmt1').clear()
	 cy.get('#txtFoodWorkAmt1').type('300')
	 
	 
	  cy.get('#txtFoodWorkHours2').click({force: true})
	 cy.get('#txtFoodWorkHours2').clear()
	 cy.get('#txtFoodWorkHours2').type('8')
	 
	cy.get('#txtFoodWorkAmt2').click({force: true})
	cy.get('#txtFoodWorkAmt2').clear()
	cy.get('#txtFoodWorkAmt2').type('600')

	 
	 cy.get('#txtShiftWorkHours1').click({force: true})
	 cy.get('#txtShiftWorkHours1').clear()
	 cy.get('#txtShiftWorkHours1').type('6')
	
	 
	 cy.get('#txtShiftWorkHours1').click({force: true})
	 cy.get('#txtShiftWorkHours1').clear()
	 cy.get('#txtShiftWorkHours1').type('6')
	 
	  cy.get('#txtShiftWorkAmt1').click({force: true})
	cy.get('#txtShiftWorkAmt1').clear()
	 cy.get('#txtShiftWorkAmt1').type('500')

	cy.get('#txtShiftWorkHours2').click({force: true})
	cy.get('#txtShiftWorkHours2').clear()
	cy.get('#txtShiftWorkHours2').type('8')

	  cy.get('#txtShiftWorkAmt2').click({force: true})
	cy.get('#txtShiftWorkAmt2').clear()
	 cy.get('#txtShiftWorkAmt2').type('800')

	 cy.get('#txtExtraOTHour').click({force: true})
	cy.get('#txtExtraOTHour').clear()
	cy.get('#txtExtraOTHour').type('3')

	cy.get('#txtExtraOTMin').click({force: true})
	cy.get('#txtExtraOTMin').clear()
	cy.get('#txtExtraOTMin').type('30')
	cy.wait(1000)
	cy.get('#btnSaveCustom').click({force: true})
	cy.wait(5000)		
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())	
			expect(text.trim()).equal('Record saved successfully.!')
			//cy.get(".toast-message").click()
		})

	})
	
	it('Attendance Setting - Auto Assign Shift Import', function() {
		cy.readFile('D:/CyPress Demo/cypress/fixtures/Attedance.json').then((text) =>{
                 text.forEach(function(entry) {	
				 
		var shiftName = entry.shiftName
		cy.log('shiftName '+ shiftName)		
		cy.wait(500)
		
		if(shiftName=='Genaral')
		{
		var fromTimeHour= '8'
		var fromTimeMin= '00'
		var toTimeHour= '16'
		var toTimeMin= '00'
		}
		else
		{
		var fromTimeHour= '16'
		var fromTimeMin= '30'
		var toTimeHour= '22'
		var toTimeMin= '30'
		}
		
		
		cy.get('#autoShiftImportTimeTab').click({force: true})
		cy.wait(2000)
		
		cy.get('#ddShift').select(shiftName,{force: true})
		cy.wait(1000)
	 
		cy.get('#ddImportINStart').select('Current Date',{force: true})
		cy.get('#ddImportINEnd').select('Current Date',{force: true})
		
		cy.get('#txtImportINStartHour').click({force: true})
		cy.get('#txtImportINStartHour').clear()
	    cy.get('#txtImportINStartHour').type(fromTimeHour)
		
		cy.get('#txtImportINStartMin').click({force: true})
		cy.get('#txtImportINStartMin').clear()
	    cy.get('#txtImportINStartMin').type(fromTimeMin)
		
		cy.get('#txtImportINEndHour').click({force: true})
		cy.get('#txtImportINEndHour').clear()
	    cy.get('#txtImportINEndHour').type(toTimeHour)
	
		cy.get('#txtImportINEndMin').click({force: true})
		cy.get('#txtImportINEndMin').clear()
	    cy.get('#txtImportINEndMin').type(toTimeMin)
		
		cy.wait(2000)
		cy.get('#btnSaveASIT').click({force: true})
		cy.wait(5000)		
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())	
			expect(text.trim()).equal('Record saved successfully.!')
			//cy.get(".toast-message").click()
		})
				 })
		})
	})
		
	it('Attendance Setting - Additional Setting', function() {
		
		cy.get('#additionaltab').click({force: true})
		cy.wait(2000)
		cy.get('#ddOnDutyRest').select('Yes',{force: true})
		cy.get('#ddRegularRest').select('Yes',{force: true})
		cy.wait(3000)
		cy.get('#ddTimeCondolidationRest').select('Yes',{force: true})
		cy.get('#ddPayrollPostingRest').select('Yes',{force: true})
		cy.get('#ddWeekOffRest').select('Yes',{force: true})
		cy.get('#ddHolidayRest').select('Yes',{force: true})
		
		cy.wait(2000)
		
		cy.get('#btnSaveAddSett').click({force: true})
		cy.wait(5000)		
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())	
			expect(text.trim()).equal('Data saved successfully.!')
			//cy.get(".toast-message").click()
		})
	
	})
	
	
	it('Attendance Setting - Late Mark', function() {
		
		cy.get('#lateMarkTab').click({force: true})
		cy.wait(2000)
		
		cy.get('#txtLatePara1').click({force: true})
		cy.get('#txtLatePara1').clear()
		cy.get('#txtLatePara1').type('3')
		
		cy.get('#txtLatePara2').click({force: true})
		cy.get('#txtLatePara2').clear()
		cy.get('#txtLatePara2').type('3')
		
		 cy.get('#ddConsider').select('H')
		 cy.get('#ddConsiderHalfFullDay').select('LD')
		 cy.wait(1000)
		 
		 cy.get('#btnSaveLateMark').click({force: true})
		 
		 //delete
		 //cy.wait(2000)
		 //cy.get('#btnDeleteLateMark').click({force: true})
		 cy.wait(5000)		
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())	
			expect(text.trim()).equal('Record saved successfully.!')
			//cy.get(".toast-message").click()
		})
	})

*/
/*	it('Attendance Setting - CompOff Credit', function() {
		cy.get('#compOffCreditTab').click({force: true})
		cy.wait(2000)
		
		cy.get('#select2-multiEmp-container').click({force: true})
		cy.wait(2000)
		cy.get('input[type="search"]').click({force: true})
		cy.get('input[type="search"]').type(employeeCode)
		cy.wait(2000)
		cy.get('.select2-results__option--highlighted').click({force: true})
		
		cy.wait(2000)
		cy.get('#dtFromDate').then(input => {
			input.val('20/01/2020');
	   })
		cy.wait(2000)
		cy.get('#dtToDate').click().then(input => {
		    input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val('22/01/2020')
	   })
	   cy.wait(5000)		
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())	
			expect(text.trim()).equal('Record saved successfully.!')
			cy.get(".toast-message").click()
		})	
	})	
	*/
	
	
	it('Device Master', function() {
		
		cy.get('#deviceMasterTab').click({force: true})
		cy.wait(2000)
		
		cy.get('button').then(($sp) => {
		if ($sp.hasClass('mb-1')) {
		cy.xpath("//button[@class='btn buttons-bg-color btn-facebook mb-1']").click();
		} else {
		cy.xpath("//div[@id='attendanceContentTitle']//i[@class='fas fa-plus']").click();
		}
		})
		
		cy.wait(3000)
		cy.get('#MachineNo').type(machineNo)
		
		cy.get('#MachineName').type(machineName)
		
		cy.get('#Location').type('Mumbai')
		cy.get('#btnSaveDeviceMaster').click({force: true})
		cy.wait(5000)		
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())	
			expect(text.trim()).equal('Machine Details Saved Successfully.!')
		})
	})


	it('Employee Mapping', function() {
		
		cy.xpath("//div[@id='attendance_detail']//span[contains(text(),'Employee Mapping')]").click({force: true})
		cy.wait(2000)
			
		cy.get('#loadMachineNo').select(machineName,{force: true})
		cy.wait(1000)
		cy.get('#UnMapped').click({force: true})
		cy.wait(5000)
		
		cy.get('#tablesorter > tbody').find('tr').each(function(row, i){
				var num1 = parseFloat(i+1)
				cy.get('#tablesorter > tbody>tr:nth-child('+num1+')>td:nth-child(2)').invoke('text').then((text) => {	
					if(text.trim()==employeeCode){
						expect(text.trim()).to.eq(employeeCode)
						cy.get('#tablesorter > tbody>tr:nth-child('+num1+')>td:nth-child(4)>.txtEmp').type(employeeCode)
						cy.get('#tablesorter > tbody>tr:nth-child('+num1+')>td:nth-child(1)>span>.chkEmp').click()
						cy.get('#btnSaveEmpMapping').click()
						cy.wait(2000)
						
						cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())	
			expect(text.trim()).equal('Records Saved Successfully.!')
		})
		
					}	
				})
				})	
				
		
	})
	
})	