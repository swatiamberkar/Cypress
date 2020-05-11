describe('Attendence Module ', function() {
	
	var company='ABC INDIA PVT LTD'
	var employeeCode = 'A-002'
	var machineNo = 1
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
	
	it('General Time Office Settings', function() {
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
		cy.get('#ddPunchImpLog').select('MD',{force: true})
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
		cy.wait(1000)
		
		cy.readFile('D:/CyPress Demo/cypress/fixtures/Attendance/ShiftDetails.json').then((text) =>{
                 text.forEach(function(entry) {	

		cy.get('#shiftDetailsTab').click({force: true})
		cy.wait(3000)	
		
		
		cy.get("button").then(($sp) => {
			var result = $sp.hasClass('mb-1')
			cy.log(result)
		if ($sp.hasClass('mb-1')) {
		cy.xpath("//button[@class='btn buttons-bg-color btn-facebook mb-1']").click({force: true});
		} else {
		cy.xpath("//div[@id='attendanceContentTitle']//i[@class='fa fa-plus']").click({force: true});
		}
		})
	
		cy.wait(3000)
		cy.get('#insShiftName').click({force: true})
		cy.get('#insShiftName').clear()		
		cy.get('#insShiftName').type(entry.ShiftName)
		
		cy.get('#insFromHour').click({force: true})
		cy.get('#insFromHour').clear()
		cy.get('#insFromHour').type(entry.FromTime_HH)	
		
		cy.get('#insFromMin').click({force: true})
		cy.get('#insFromMin').clear()
		cy.get('#insFromMin').type(entry.FromTime_MM)
		
		cy.wait(1000)
		cy.get('#insToHour').click({force: true})
		cy.get('#insToHour').clear()
		cy.get('#insToHour').type(entry.ToTime_HH)	
		
		cy.get('#insToMin').click({force: true})
		cy.get('#insToMin').clear()
		cy.get('#insToMin').type(entry.ToTime_MM)
		
		cy.wait(1000)
		cy.get('select[id=insStatus]').select(entry.Status,{force: true})	
		
		cy.get('#insShortName').click({force: true})
		cy.get('#insShortName').clear()
		cy.get('#insShortName').type(entry.ReportShortName)
			
		cy.wait(1000)
		cy.get('#ddImportINStart').select(entry.ImportINTimeStartAs_Day,{force: true})
		
		cy.get('#txtImportINStartHour').click({force: true})
		cy.get('#txtImportINStartHour').clear()
		cy.get('#txtImportINStartHour').type(entry.ImportINTimeStartAs_HH)	
		
		cy.get('#txtImportINStartMin').click({force: true})
		cy.get('#txtImportINStartMin').clear()
		cy.get('#txtImportINStartMin').type(entry.ImportINTimeStartAs_MM)
		
		cy.wait(1000)
		cy.get('#ddImportINEnd').select(entry.ImportINTimeEndAs_Day,{force: true})	
		
		cy.get('#txtImportINEndHour').click({force: true})
		cy.get('#txtImportINEndHour').clear()
		cy.get('#txtImportINEndHour').type(entry.ImportINTimeEndAs_HH)	
		
		cy.get('#txtImportINEndMin').click({force: true})
		cy.get('#txtImportINEndMin').clear()
		cy.get('#txtImportINEndMin').type(entry.ImportINTimeEndAs_MM)
		
		cy.wait(1000)
		cy.get('#ddImportOUTStart').select(entry.ImportOutTimeStartAs_Day,{force: true})	
		
		cy.get('#txtImportOUTStartHour').click({force: true})
		cy.get('#txtImportOUTStartHour').clear()
		cy.get('#txtImportOUTStartHour').type(entry.ImportOutTimeStartAs_HH)	
		
		cy.get('#txtImportOUTStartMin').click({force: true})
		cy.get('#txtImportOUTStartMin').clear()
		cy.get('#txtImportOUTStartMin').type(entry.ImportOutTimeStartAs_MM)
		
		cy.wait(1000)
		cy.get('#ddImportOUTEnd').select(entry.ImportOutTimeEndAs_Day,{force: true})	
		
		cy.get('#txtImportOUTEndHour').click({force: true})
		cy.get('#txtImportOUTEndHour').clear()
		cy.get('#txtImportOUTEndHour').type(entry.ImportOutTimeEndAs_HH)	
		
		cy.get('#txtImportOUTEndMin').click({force: true})
		cy.get('#txtImportOUTEndMin').clear()
		cy.get('#txtImportOUTEndMin').type(entry.ImportOutTimeEndAs_MM)
		
		cy.wait(1000)
		cy.get('#ddLunchInStart').select(entry.LunchINStartAs_Day,{force: true})	
		
		cy.get('#txtLunchINStartHour').click({force: true})
		cy.get('#txtLunchINStartHour').clear()
		cy.get('#txtLunchINStartHour').type(entry.LunchINStartAs_HH)	
		
		cy.get('#txtLunchINStartMin').click({force: true})
		cy.get('#txtLunchINStartMin').clear()
		cy.get('#txtLunchINStartMin').type(entry.LunchINStartAs_MM)
		
		cy.wait(1000)
		cy.get('#ddLunchInEnd').select(entry.LunchINEndAs_Day,{force: true})	
		
		cy.get('#txtLunchINEndHour').click({force: true})
		cy.get('#txtLunchINEndHour').clear()
		cy.get('#txtLunchINEndHour').type(entry.LunchINEndAs_HH)	
		
		cy.get('#txtLunchINEndMin').click({force: true})
		cy.get('#txtLunchINEndMin').clear()
		cy.get('#txtLunchINEndMin').type(entry.LunchINEndAs_MM)
	
		cy.wait(1000)
		cy.get('#btnSaveShift').click({force: true})
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
		
	cy.wait(1000)		
	cy.readFile('D:/CyPress Demo/cypress/fixtures/Attendance/Attendance_Late.json').then((text) =>{
                 text.forEach(function(entry) {	
				 
	
	cy.get('#lateTab').click({force: true})
	cy.wait(1000)
	
	cy.get('#ddShift').select(entry.ShiftName,{force: true})
	
	cy.get('#ddGraceHour').click({force: true})
	cy.get('#ddGraceHour').clear()
    cy.get('#ddGraceHour').type(entry.DailyGraceTime_HH)
 
	cy.get('#ddGraceMin').click({force: true})
	cy.get('#ddGraceMin').clear()
    cy.get('#ddGraceMin').type(entry.DailyGraceTime_MM)
 
	cy.wait(1000)
    cy.get('#ddDeduct').select(entry.Deduction,{force: true})
    cy.get('#ddDeduct1Min').select(entry.DeductionFrom1stMinute,{force: true})
    cy.get('#ddAllFlex').select(entry.AllowedFlexTime,{force: true})
    cy.get('#ddLunchLate').select(entry.LunchLateNeedToIncludeInLateReport,{force: true})
    cy.get('#ddLateTime').select(entry.LateTimeAdjustedAsExcessWorkHours,{force: true})
 
	cy.wait(1000)
    cy.get('#ddEarlyGoing').select(entry.EarlyGoingNotAddToLate,{force: true})
    cy.get('#ddLateRoundingType').select(entry.LateRoundingType,{force: true})
    cy.get('#ddLateRounding').select(entry.LateRounding,{force: true})
    cy.get('#ddLateRoundingUsed').select(entry.RoundingUsedFor,{force: true})
	
	cy.wait(1000)
	cy.get('#txtNoPermInMonth').click({force: true})
	cy.get('#txtNoPermInMonth').clear()
    cy.get('#txtNoPermInMonth').type(entry.NoOfPermissionInAMonth)
 
    cy.get('#ddLateShiftHours').select(entry.LateAsPerShiftHours,{force: true})
	//cy.get('#chkAll').check({force: true})
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

	cy.readFile('D:/CyPress Demo/cypress/fixtures/Attendance/Attendance_Permission.json').then((text) =>{
                 text.forEach(function(entry) {	
		
	cy.get('#permissionTab').click({force: true})
	cy.wait(1000)
	
	cy.get('#ddShift').select(entry.ShiftName,{force: true})
	
    cy.get('#txtMaxMtsMonthHour').click({force: true})
	cy.get('#txtMaxMtsMonthHour').clear()
    cy.get('#txtMaxMtsMonthHour').type(entry.MaxHrsAllowedPerMonth_HH)	
	
	cy.get('#txtMaxMtsMonthMin').click({force: true})
	cy.get('#txtMaxMtsMonthMin').clear()
    cy.get('#txtMaxMtsMonthMin').type(entry.MaxHrsAllowedPerMonth_MM)
	
	cy.wait(1000)
	cy.get('#txtMaxMtsDayHour').click({force: true})
	cy.get('#txtMaxMtsDayHour').clear()
    cy.get('#txtMaxMtsDayHour').type(entry.MaxHrsAllowedPerDay_HH)	
	
	cy.get('#txtMaxMtsDayMin').click({force: true})
	cy.get('#txtMaxMtsDayMin').clear()
    cy.get('#txtMaxMtsDayMin').type(entry.MaxHrsAllowedPerDay_MM)
	
	cy.wait(1000)
	cy.get('#txtMinMtsDayHour').click({force: true})
	cy.get('#txtMinMtsDayHour').clear()
    cy.get('#txtMinMtsDayHour').type(entry.MinHrsAllowedPerDay_HH)
	
	cy.get('#txtMinMtsDayMin').click({force: true})
	cy.get('#txtMinMtsDayMin').clear()
    cy.get('#txtMinMtsDayMin').type(entry.MinHrsAllowedPerDay_MM)
 
	cy.wait(1000)
	cy.get('#txtNoPermMonth').click({force: true})
	cy.get('#txtNoPermMonth').clear()
    cy.get('#txtNoPermMonth').type(entry.NoOfPermissionsInaMonth)
	
    cy.get('#ddDedApp').select(entry.DeductionApplicable, {force: true})
    cy.get('#ddDed1stMin').select(entry.DeductionFrom1stMinute, {force: true})
 
	cy.wait(1000)
    cy.get('#ddAdj').select(entry.AdjustedInLeave, {force: true})
    cy.get('#ddAutoPerm').select(entry.AutoPermissionApplicable, {force: true})
	cy.wait(1000)
    cy.get('#ddExcPerm').select(entry.ExceedingPermissionHoursWillBeConsiderAs,{force: true})
	cy.get('#ddPermRoundingType').select(entry.PermissionHourRoundingType, {force: true})
    cy.get('#ddPermRounding').select(entry.PermissionHoursRoundingFor, {force: true})
 
   //cy.get('#chkAll').check({force: true})
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
		
	cy.wait(1000)
	cy.readFile('D:/CyPress Demo/cypress/fixtures/Attendance/Attendance_OT.json').then((text) =>{
                 text.forEach(function(entry) {	
		
   	cy.get('#otTab').click({force: true})
	cy.wait(1000)
    cy.get('#ddExStay').select(entry.ExcessStayConsiderAs,{force: true})
 
	cy.get('#ddShift').select(entry.ShiftName,{force: true})
	
	cy.wait(1000)
	cy.get('#txtOTStartHour').click({force: true})
	cy.get('#txtOTStartHour').clear()
    cy.get('#txtOTStartHour').type(entry.OverTimeWillStartHours_HH)
	
	cy.get('#txtOTStartMin').click({force: true})
	cy.get('#txtOTStartMin').clear()
    cy.get('#txtOTStartMin').type(entry.OverTimeWillStartHours_MM)
	
	cy.get('#txtMinOTHour').click({force: true})
	cy.get('#txtMinOTHour').clear()
    cy.get('#txtMinOTHour').type(entry.MinimumOTHourAllowedPerDay_HH)
 
	cy.get('#txtMinOTMin').click({force: true})
	cy.get('#txtMinOTMin').clear()
    cy.get('#txtMinOTMin').type(entry.MinimumOTHourAllowedPerDay_MM)
	
	cy.wait(1000)
	cy.get('#txtMaxOTHour').click({force: true})
	cy.get('#txtMaxOTHour').clear()
    cy.get('#txtMaxOTHour').type(entry.MaximumOTHourAllowedPerDay_HH)
 
	cy.get('#txtMaxOTMin').click({force: true})
	cy.get('#txtMaxOTMin').clear()
    cy.get('#txtMaxOTMin').type(entry.MaximumOTHourAllowedPerDay_MM)
 
    cy.get('#ddEarlyConsider').select(entry.EarlyComingToShiftConsideredAsOT, {force: true})
	
	cy.get('#txtEarlyOTStartHour').click({force: true})
	cy.get('#txtEarlyOTStartHour').clear()
    cy.get('#txtEarlyOTStartHour').type(entry.EarlyOTIfPunchBefore_HH)
 
	cy.get('#txtEarlyOTStartMin').click({force: true})
	cy.get('#txtEarlyOTStartMin').clear()
    cy.get('#txtEarlyOTStartMin').type(entry.EarlyOTIfPunchBefore_MM)
	
	cy.wait(1000)
	cy.get('#txtOTBreakHour').click({force: true})
	cy.get('#txtOTBreakHour').clear()
    cy.get('#txtOTBreakHour').type(entry.OTBreakHour_HH)
	
	cy.get('#txtOTBreakMin').click({force: true})
	cy.get('#txtOTBreakMin').clear()
    cy.get('#txtOTBreakMin').type(entry.OTBreakHour_MM)
	
	cy.get('#txtEarlyOTBreakHour').click({force: true})
	cy.get('#txtEarlyOTBreakHour').clear()
    cy.get('#txtEarlyOTBreakHour').type(entry.EarlyOTBreakHour_HH)
	
	cy.get('#txtEarlyOTBreakMin').click({force: true})
	cy.get('#txtEarlyOTBreakMin').clear()
    cy.get('#txtEarlyOTBreakMin').type(entry.EarlyOTBreakHour_MM)
 
	cy.wait(1000)
    cy.get('#ddLateComing').select(entry.LateComingHoursDeductionFromOT, {force: true})
 
    cy.get('#ddOTSlip').select(entry.OTSlipIsMandatory, {force: true})
 
    cy.get('#ddOTRoundingType').select(entry.OTRoundingType, {force: true})
 
	cy.wait(1000)
    cy.get('#ddOTRounding').select(entry.OTRounding, {force: true})
 
    cy.get('#ddWeekOff').select(entry.WeekOffWorkingHoursConsiderAsOT, {force: true})
 
    cy.get('#ddApproval').select(entry.OTApprovalESS, {force: true})
 
	cy.wait(1000)
    cy.get('#btnSaveOT').click({force: true})
	cy.wait(3000)		
	cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())	
			expect(text.trim()).equal('Record saved successfully.!')
			//cy.get(".toast-message").click()
		})
		})
		})
 })  




	it('Attendance Setting - OT - CompOff', function() {

	cy.readFile('D:/CyPress Demo/cypress/fixtures/Attendance/Attendance_CompOff.json').then((text) =>{
                 text.forEach(function(entry) {	
				 
		cy.get('#otTab').click({force: true})
		cy.wait(1000)
		cy.get('#ddExStay').select(entry.ExcessStayConsiderAs,{force: true})
		cy.get('#ddShift').select(entry.ShiftName,{force: true})
		
		cy.get('#txtCOMPExHour1').click({force: true})
		cy.get('#txtCOMPExHour1').clear()
		cy.get('#txtCOMPExHour1').type(entry.ExcessStayHoursUpto_HH)
		
		cy.get('#txtCOMPExMin1').click({force: true})
		cy.get('#txtCOMPExMin1').clear()
		cy.get('#txtCOMPExMin1').type(entry.ExcessStayHoursUpto_MM)
		
		cy.get('#txtCOMPExHour2').click({force: true})
		cy.get('#txtCOMPExHour2').clear()
		cy.get('#txtCOMPExHour2').type(entry.ExcessStayHoursUpto_From_HH)
		
		cy.get('#txtCOMPExMin2').click({force: true})
		cy.get('#txtCOMPExMin2').clear()
		cy.get('#txtCOMPExMin2').type(entry.ExcessStayHoursUpto_From_MM)
		
		cy.get('#txtCOMPExHour3').click({force: true})
		cy.get('#txtCOMPExHour3').clear()
		cy.get('#txtCOMPExHour3').type(entry.ExcessStayHoursUpto_To_HH)
		
		cy.get('#txtCOMPExMin3').click({force: true})
		cy.get('#txtCOMPExMin3').clear()
		cy.get('#txtCOMPExMin3').type(entry.ExcessStayHoursUpto_From_MM)
	 
		cy.get('#ddCOMPRoundingType').select(entry.RoundingType, {force: true})
	 
		cy.get('#ddCOMPRounding').select(entry.Rounding, {force: true})
		
		cy.wait(1000)
		cy.get('#btnSave1').click({force: true})
		cy.wait(3000)		
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())	
			expect(text.trim()).equal('Record saved successfully.!')
			//cy.get(".toast-message").click()
		})
		
		})
		})
	 }) 
	 
	 
/*	it('Attendance Setting - Early Going', function() {
		cy.readFile('D:/CyPress Demo/cypress/fixtures/Attendance/Attedance.json').then((text) =>{
                 text.forEach(function(entry) {	
				 
		var shiftName = entry.shiftName
		cy.log('shiftName '+ shiftName)		
		cy.wait(500)
		

   	cy.get('#earlyGoingTab').click({force: true})
	cy.wait(3000)
    cy.get('#ddShift').select(shiftName,{ force: true })
 
	cy.get('#txtGraceHour').click({force: true})
	cy.get('#txtGraceHour').clear()
    cy.get('#txtGraceHour').type('02')
	cy.get('#txtGraceMin').click({force: true})
	cy.get('#txtGraceMin').clear()
    cy.get('#txtGraceMin').type('00')
    cy.get('#chkAll').check('on')
	
	cy.wait(1000)
    cy.get('#btnSaveEarlyGoing').click({force: true})
	cy.wait(5000)		
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())	
			expect(text.trim()).equal('Record saved successfully.!')
			//cy.get(".toast-message").click()
		})
				 
				 })
		})
				 
 
 }) 
	
	*/
	
	
	it('Attendance Setting - Half Day', function() { 
	cy.readFile('D:/CyPress Demo/cypress/fixtures/Attendance/Attendance_HalfDay.json').then((text) =>{
                 text.forEach(function(entry) {	
				 
		
	cy.get('#halfDayTab').click({force: true})
	cy.wait(3000)
    cy.get('#ddShift').select(entry.ShiftName,{ force: true })
	
	cy.get('#txtFirstHalfHour').click({force: true})
	cy.get('#txtFirstHalfHour').clear()
    cy.get('#txtFirstHalfHour').type(entry.FirstHalfEndAs_HH)
	
	cy.get('#txtFirstHalfMin').click({force: true})
	cy.get('#txtFirstHalfMin').clear()
    cy.get('#txtFirstHalfMin').type(entry.FirstHalfEndAs_MM)
	
	cy.get('#txtSecondtHalfHour').click({force: true})
	cy.get('#txtSecondtHalfHour').clear()
    cy.get('#txtSecondtHalfHour').type(entry.SecondHalfStartAs_HH)
	
	cy.get('#txtSecondtHalfMin').click({force: true})
	cy.get('#txtSecondtHalfMin').clear()
    cy.get('#txtSecondtHalfMin').type(entry.SecondHalfStartAs_MM)
	
	cy.get('#txtEmpINHour').click({force: true})
	cy.get('#txtEmpINHour').clear()
    cy.get('#txtEmpINHour').type(entry.EmployeeINTime_HH)
	
	cy.get('#txtEmpINMin').click({force: true})
	cy.get('#txtEmpINMin').clear()
    cy.get('#txtEmpINMin').type(entry.EmployeeINTime_MM)
 
	cy.get('#txtEmpOUTHour').click({force: true})
	cy.get('#txtEmpOUTHour').clear()
    cy.get('#txtEmpOUTHour').type(entry.EmployeeOUTTime_HH)
 
	cy.get('#txtEmpOUTMin').click({force: true})
	cy.get('#txtEmpOUTMin').clear()
    cy.get('#txtEmpOUTMin').type(entry.EmployeeOUTTime_MM)
	cy.wait(1000)
	
	cy.get('#txtWorkHrsHour').click({force: true})
	cy.get('#txtWorkHrsHour').clear()
    cy.get('#txtWorkHrsHour').type(entry.WorkingHoursUpto_FullDay_HH)
 
	cy.get('#txtWorkHrsMin').click({force: true})
	cy.get('#txtWorkHrsMin').clear()
    cy.get('#txtWorkHrsMin').type(entry.WorkingHoursUpto_FullDay_MM)
 
	cy.get('#txtWorkHrs1Hour').click({force: true})
	cy.get('#txtWorkHrs1Hour').clear()
    cy.get('#txtWorkHrs1Hour').type(entry.WorkingHoursUpto_From_HH)
 
	cy.get('#txtWorkHrs1Min').click({force: true})
	cy.get('#txtWorkHrs1Min').clear()
    cy.get('#txtWorkHrs1Min').type(entry.WorkingHoursUpto_From_MM)
	
	cy.get('#txtWorkHrsToHour').click({force: true})
	cy.get('#txtWorkHrsToHour').clear()
    cy.get('#txtWorkHrsToHour').type(entry.WorkingHoursUpto_To_HH)
	
	cy.get('#txtWorkHrsToMin').click({force: true})
	cy.get('#txtWorkHrsToMin').clear()
    cy.get('#txtWorkHrsToMin').type(entry.WorkingHoursUpto_To_MM)
	
	cy.wait(1000)
    cy.get('#btnSaveHalfDay').click({force: true})
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
		cy.get('#ddAutoShiftInput').select('DAYWISE', {force: true})
		cy.wait(1000)
		
		cy.get('#txtNumberOf').click({force: true})
		cy.get('#txtNumberOf').clear()
		cy.get('#txtNumberOf').type('2')
		
		cy.wait(1000)
		cy.get('#btnSaveAutoShift').click({force: true}) 
		cy.wait(5000)		
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())	
			expect(text.trim()).equal('Record saved successfully.!')
			//cy.get(".toast-message").click()
		})		
	 })


	it('Attendance Setting - Auto Shift - Week off', function() {
		cy.get('#ddAutoShiftInput').select('WEEKOFF', {force: true})
		cy.get('#ddWeekOff').select('SUNDAY', {force: true})
		cy.get('#btnSaveAutoShift').click({force: true})
		cy.wait(5000)		
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())	
			expect(text.trim()).equal('Record saved successfully.!')
			//cy.get(".toast-message").click()
		})
	 
	 })

	it('Attendance Setting - Auto Shift - Monthly - Calender', function() {
		cy.get('#ddAutoShiftInput').select('MONTHLY', {force: true})
		cy.get('#ddLeaveEntInp').select('CM', {force: true})
		cy.get('#btnSaveAutoShift').click({force: true})
		cy.wait(5000)		
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())	
			expect(text.trim()).equal('Record saved successfully.!')
			//cy.get(".toast-message").click()
		})
	 })		
	
	
	it('Attendance Setting - Auto Shift - Monthly - Date To Date', function() {
		cy.get('#ddAutoShiftInput').select('MONTHLY', {force: true})
		cy.get('#ddLeaveEntInp').select('DD', {force: true})
		cy.get('#ddLeaveFrom').select('5', {force: true})
		cy.get('#btnSaveAutoShift').click({force: true})
		cy.wait(5000)		
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())	
			expect(text.trim()).equal('Record saved successfully.!')
			//cy.get(".toast-message").click()
		})
 
	})
	
	it('Attendance Setting - Auto Shift - Yearly', function() {
		cy.get('#ddAutoShiftInput').select('YEARLY', {force: true})
		cy.get('#btnSaveAutoShift').click({force: true})
		cy.wait(3000)		
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())	
			expect(text.trim()).equal('Record saved successfully.!')
			//cy.get(".toast-message").click()
		})
	}) 
	
	it('Attendance Setting - Late Wise Leave', function() {
		cy.readFile('D:/CyPress Demo/cypress/fixtures/Attendance/Attedance.json').then((text) =>{
                 text.forEach(function(entry) {	
				 
		var shiftName = entry.shiftName
		cy.log('shiftName '+ shiftName)		
		cy.wait(500)
		
		cy.get('#lateWiseLeaveTab').click({force: true})
		cy.wait(3000)
		
		cy.get('#ddShift').select(shiftName,{force: true})
		cy.get('#ddLogic').select('D', {force: true})
		
		cy.get('#txtLateExceedHour').click({force: true})
		cy.get('#txtLateExceedHour').clear()
		cy.get('#txtLateExceedHour').type('9')
		
		cy.get('#txtLateExceedMin').click({force: true})
		cy.get('#txtLateExceedMin').clear()
		cy.get('#txtLateExceedMin').type('00')
		
		cy.get('#ddConsider').select('F', {force: true})
		cy.get('#ddConsiderFullDay').select('LD', {force: true})
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
		cy.readFile('D:/CyPress Demo/cypress/fixtures/Attendance/Attedance.json').then((text) =>{
                 text.forEach(function(entry) {	
				 
		var shiftName = entry.shiftName
		cy.log('shiftName '+ shiftName)		
		cy.wait(500)
		
		if(shiftName=='General')
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
		cy.wait(4000)
		
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
		cy.get('#ddOnDutyRest').select('No',{force: true})
		cy.get('#ddRegularRest').select('No',{force: true})
		cy.wait(3000)
		cy.get('#ddTimeCondolidationRest').select('No',{force: true})
		cy.get('#ddPayrollPostingRest').select('Yes',{force: true})
		cy.get('#ddWeekOffRest').select('No',{force: true})
		cy.get('#ddHolidayRest').select('No',{force: true})
		
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
		
		 cy.get('#ddConsider').select('H', {force: true})
		 cy.get('#ddConsiderHalfFullDay').select('LD', {force: true})
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
			//cy.get(".toast-message").click()
		})	
	})	
	*/
	
/*	it('Device Master', function() {
		
		cy.get('#deviceMasterTab').click({force: true})
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
		cy.get('#MachineNo').type(machineNo)
		
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
		
					}	
				})
				})	
				
		
	})
	*/
	
})	