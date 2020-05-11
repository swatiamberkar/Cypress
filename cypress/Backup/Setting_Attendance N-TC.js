describe('Attendence Module ', function() {
	
	var company='GreyTest'
	
	function randonInteger(length) {
	   var result           = '';
	   var characters       = '0123456789';
	   var charactersLength = characters.length;
	   for ( var i = 0; i < length; i++ ) {
		  result += characters.charAt(Math.floor(Math.random() * charactersLength));
	   }
	   return  'Test_'+result;
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
	
	it('Verify Alert of Shift Details without data', function() {
		cy.visit('http://next.pockethrms.com/Settings/Employee/Index?module=organization&submodule=smtpsetting')	
		cy.wait(1000)
		cy.get('#attendance_detail_tab').click({force: true})
		cy.wait(1000)
		cy.get('#shiftDetailsTab').click({force: true})
		cy.wait(1000)	
		cy.get('button').then(($sp) => {
		if ($sp.hasClass('mb-1')) {
		cy.xpath("//button[@class='btn buttons-bg-color btn-facebook mb-1']").click();
		} else {
		cy.xpath("//div[@id='attendanceContentTitle']//i[@class='fa fa-plus']").click();
		}
		})
		cy.get('#btnSaveShift').click()
		cy.wait(2000)
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())	
			expect(text.trim()).equal('Please enter Shift Name.')
			cy.get(".toast-message").click()
		})
		
		cy.get('#insShiftName').type('General')
		cy.get('#btnSaveShift').click()
		cy.wait(2000)
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())	
			expect(text.trim()).equal('Please enter From Time.')
			cy.get(".toast-message").click()
		})
		
		cy.get('#insFromHour').type('9')
		cy.get('#insFromMin').type('00')
		cy.get('#btnSaveShift').click()
		cy.wait(2000)
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())	
			expect(text.trim()).equal('Please enter To Time.')
			cy.get(".toast-message").click()
		})
		
		cy.get('#insToHour').type('17')
		cy.get('#insToMin').type('00')
		cy.get('#btnSaveShift').click()
		cy.wait(2000)
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())	
			expect(text.trim()).equal('Please enter To Time.')
			cy.get(".toast-message").click()
		})
	})
	
	it('Verify Displayed Shift Details', function() {
		
		var shiftName = "gernal_"+randonInteger(2)
		var fromTimeHour= '9'
		var fromTimeMin= '00'
		var toTimeHour= '17'
		var toTimeMin= '00'
		
		cy.visit('http://next.pockethrms.com/Settings/Employee/Index?module=organization&submodule=smtpsetting')	
		cy.wait(1000)
		cy.get('#attendance_detail_tab').click({force: true})
		cy.wait(1000)
		cy.get('#shiftDetailsTab').click({force: true})
		cy.wait(1000)	
		cy.get('button').then(($sp) => {
		if ($sp.hasClass('mb-1')) {
		cy.xpath("//button[@class='btn buttons-bg-color btn-facebook mb-1']").click();
		} else {
		cy.xpath("//div[@id='attendanceContentTitle']//i[@class='fa fa-plus']").click();
		}
		})
		
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
		cy.wait(2000)
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())	
			expect(text.trim()).equal('Settings saved successfully.!')
		})
	})
	
	
	it('General Time Office Settings_with Empty fields', function() {
		
		cy.wait(1000)
		cy.get('#attendance_detail_tab').click({force: true})
		cy.wait(1000)
		cy.get('#genTimeOffSettingTab').click({force: true})
		cy.wait(1000)	
		
        cy.get('#btnSaveGeneralTimeOffice').click({force: true})		
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())	
		})
	})


	it('Verify Alert by Duplicate Shift Name', function() {
		
		var shiftName = "gernal_"+randonInteger(2)
		var fromTimeHour= '9'
		var fromTimeMin= '00'
		var toTimeHour= '17'
		var toTimeMin= '00'
		
		cy.visit('http://next.pockethrms.com/Settings/Employee/Index?module=organization&submodule=smtpsetting')	
		cy.wait(1000)
		cy.get('#attendance_detail_tab').click({force: true})
		cy.wait(1000)
		cy.get('#shiftDetailsTab').click({force: true})
		cy.wait(1000)	
		cy.get('button').then(($sp) => {
		if ($sp.hasClass('mb-1')) {
		cy.xpath("//button[@class='btn buttons-bg-color btn-facebook mb-1']").click();
		} else {
		cy.xpath("//div[@id='attendanceContentTitle']//i[@class='fa fa-plus']").click();
		}
		})
		
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
		cy.wait(2000)
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())	
			expect(text.trim()).equal('Settings saved successfully.!')
		})
	})
	
	
	it('General Time Office Settings_with Empty fields', function() {
		
		cy.wait(1000)
		cy.get('#attendance_detail_tab').click({force: true})
		cy.wait(1000)
		cy.get('#genTimeOffSettingTab').click({force: true})
		cy.wait(1000)	
		
        cy.get('#btnSaveGeneralTimeOffice').click({force: true})		
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())	
		})
	})


	it('General Time Office Settings', function() {
		
		cy.wait(1000)
		cy.get('#attendance_detail_tab').click({force: true})
		cy.wait(1000)
		cy.get('#genTimeOffSettingTab').click({force: true})
		cy.wait(1000)	
		cy.get('#ddLate').select('COMPCODE',{force: true})
		cy.get('#ddPermission').select('COMPCODE',{force: true})
		cy.get('#ddOverTime').select('COMPCODE',{force: true})
		cy.get('#ddLunchTime').select('COMPCODE',{force: true})
		cy.get('#ddPaidHoliday').select('COMPCODE',{force: true})
		cy.get('#ddPaidWeekOff').select('COMPCODE',{force: true})
		cy.get('#ddShift').select('COMPCODE',{force: true})
		cy.get('#ddUnpunch').select('COMPCODE',{force: true})
		cy.get('#ddOnDuty').select('COMPCODE',{force: true})
		cy.get('#ddUserRights').select('CATEGORY',{force: true})
		cy.get('#ddOTCompOff').select('COMPCODE',{force: true})
		cy.get('#ddPermissionEntry').select('SINGLE',{force: true})
		cy.get('#ddPunchImpType').select('SISO',{force: true})
		cy.get('#ddPunchImpPar').select('COMPCODE',{force: true})
		cy.get('#ddPunchImpLog').select('DW',{force: true})
		cy.get('#ddShiftEntInp').select('CM',{force: true})
		cy.get('#ddPayrollPost').select('CM',{force: true})
		cy.get('#ddLeaveEntInp').select('CM',{force: true})
        cy.get('#btnSaveGeneralTimeOffice').click({force: true})		
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())	
		})
	})
	
	it('Late_setting_save', function() {
		
		cy.visit('http://next.pockethrms.com/Settings/Employee/Index?module=organization&submodule=smtpsetting')
		cy.wait(1000)
		
	cy.get('#attendance_detail_tab').click({force: true})
		cy.wait(1000)
	cy.get('#lateTab').click({force: true})
	cy.get('#ddShift').select('General')
    cy.get('#ddGraceHour').type('00')
    cy.get('#ddGraceMin').type('15')
    cy.get('#ddDeduct').select('Y')
   // cy.get('#ddDeduct').click()
    cy.get('#ddDeduct1Min').select('N')
    cy.get('#ddAllFlex').select('N')
    cy.get('#ddLunchLate').select('N')
    cy.get('#ddLateTime').select('N')
    cy.get('#ddEarlyGoing').select('N')
    cy.get('#ddLateRoundingType').select('1')
    cy.get('#ddLateRounding').select('1')
    cy.get('#ddLateRoundingUsed').select('1')
    cy.get('#txtNoPermInMonth').click()
    cy.get('#txtNoPermInMonth').clear()
    cy.get('#txtNoPermInMonth').type('3')
    cy.get('#ddLateShiftHours').select('Y')
    cy.get(' #btnSaveLateSetting').click() 
	cy.get('#chkAll').check({force: true})
 })

	it('Late_setting_Delete', function() {
	cy.get('#attendance_detail_tab').click({force: true})
		cy.wait(1000)
	cy.get('#lateTab').click({force: true})
	cy.get('#ddShift').select('General')
	//Late Setting Delete
    cy.get('#formGeneral > .well > .form-group > .col-sm-4 > #ddShift').select('General')
    cy.get('#formGeneral > .well > .text-center > div > #btnDeleteLateSetting').click()	
	})

/*
	it('PermissionSetting_Save', function() {
	cy.visit('http://next.pockethrms.com/Settings/Employee/Index?module=organization&submodule=smtpsetting')
		cy.wait(1000)
		
	cy.get('#attendance_detail_tab').click({force: true})
		cy.wait(1000)
		
	cy.get('#permissionTab').click({force: true})
  
	cy.get('#ddShift').select('General')
	
    cy.get(' #txtMaxMtsMonthHour').click()
	cy.get(' #txtMaxMtsMonthHour').clear()
    cy.get(' #txtMaxMtsMonthHour').type('00')
	cy.get(' #txtMaxMtsMonthMin').click()
	cy.get(' #txtMaxMtsMonthMin').clear()
    cy.get(' #txtMaxMtsMonthMin').type('60')
	cy.get('#txtMaxMtsDayHour').click()
	cy.get('#txtMaxMtsDayHour').clear()
    cy.get('#txtMaxMtsDayHour').type('00')
	cy.get('#txtMaxMtsDayHour').click()
	cy.get('#txtMaxMtsDayHour').clear()
    cy.get(' #txtMaxMtsDayMin').type('00')
	cy.get(' #txtMinMtsDayHour').click()
	cy.get(' #txtMinMtsDayHour').clear()
    cy.get(' #txtMinMtsDayHour').type('00')
	cy.get('#txtMinMtsDayMin').click()
	cy.get('#txtMinMtsDayMin').clear()
    cy.get('#txtMinMtsDayMin').type('00')
	cy.get('#txtNoPermMonth').click()
	cy.get('#txtNoPermMonth').clear()
    cy.get('#txtNoPermMonth').type('4')
	cy.get('#ddDedApp').select('N')
 
    cy.get('#ddDed1stMin').select('Y')
 
    cy.get(' #ddDed1stMin').select('N')
 
    cy.get(' #ddAdj').select('Y')
 
    cy.get(' #ddAdj').select('N')
 
    cy.get(' #ddAutoPerm').select('Y')
 
    cy.get(' #ddAutoPerm').select('N')
 
    cy.get(' #ddExcPerm').select('Y')
 
    cy.get(' #ddExcPerm').select('N')
 
    cy.get(' #ddPermRoundingType').select('1')
 
    cy.get(' #ddPermRoundingType').select('2')
 
    cy.get(' #ddPermRounding').select('1')
 
    cy.get(' #ddPermRounding').select('2')
	cy.get('#chkAll').check({force: true})
    cy.get('#btnSavePermissionSetting').click({force: true})
	})	
	//delete
	it('PermissionSetting_Delete', function() {	
	cy.wait(2000)
	cy.get('#ddShift').select('General')
	cy.get('#chkAll').check({force: true})
    cy.get('#btnDeletePermissionSetting').click()
    //cy.get('body > #toast-container > .toast > .toast-message').click()
 }) */
it('OT_Save', function() {
	cy.visit('http://next.pockethrms.com/Settings/Employee/Index?module=organization&submodule=smtpsetting')
	cy.wait(1000)	
	cy.get('#attendance_detail_tab').click({force: true})
	cy.get('#otTab').click()	
    cy.get('#ddExStay').select('OT')
    cy.get('#ddShift').select('General')
	cy.get('#txtOTStartHour').click()
	cy.get('#txtOTStartHour').clear
    cy.get('#txtOTStartHour').type('4')
	cy.get('#txtOTStartMin').click()
	cy.get('#txtOTStartMin').clear()
    cy.get('#txtOTStartMin').type('00')
	cy.get('#txtMinOTHour').click()
	cy.get('#txtMinOTHour').clear()
    cy.get('#txtMinOTHour').type('1')
	cy.get('#txtMinOTMin').click()
	cy.get('#txtMinOTMin').click()
    cy.get('#txtMinOTMin').type('00')
	cy.get('#txtMaxOTHour').click()
	cy.get('#txtMaxOTHour').click()
    cy.get('#txtMaxOTHour').type('4')
	
    cy.get('#txtMaxOTMin').type('00')
 
    cy.get('#ddEarlyConsider').select('Y')
 
    cy.get('#txtEarlyOTStartHour').type('9')
	cy.get('#txtEarlyOTStartMin').click()
	cy.get('#txtEarlyOTStartMin').clear()
    cy.get('#txtEarlyOTStartMin').type('30')
	cy.get('#txtOTBreakHour').click()
	cy.get('#txtOTBreakHour').clear()
    cy.get('#txtOTBreakHour').type('00')
	cy.get('#txtOTBreakMin').click()
	cy.get('#txtOTBreakMin').clear()
    cy.get('#txtOTBreakMin').type('10')
	cy.get('#txtEarlyOTBreakHour').click()
	cy.get('#txtEarlyOTBreakHour').clear()
    cy.get('#txtEarlyOTBreakHour').type('00')
	cy.get('#txtEarlyOTBreakMin').click()
	cy.get('#txtEarlyOTBreakMin').clear()
    cy.get('#txtEarlyOTBreakMin').type('00')
    cy.get('#ddLateComing').select('Y')
    cy.get('#ddOTSlip').select('Y')
    cy.get('#ddOTSlip').select('N')
    cy.get('#ddOTRoundingType').select('1')
    cy.get('#ddOTRounding').select('1')
    cy.get('#ddWeekOff').select('Y')
    cy.get('#ddApproval').select('Y')
    cy.get('#btnSaveOT').click()
	
})
	it('OT_Delete', function() {
	//delete
	cy.wait(2000)
	cy.get('#ddExStay').select('OT')
    cy.get('#ddShift').select('General')
    cy.get('#btnDeleteOT').click()
 })  
it('Coff_Save and delete ', function() {
	cy.visit('http://next.pockethrms.com/Settings/Employee/Index?module=organization&submodule=smtpsetting')
	cy.wait(1000)	
	cy.get('#attendance_detail_tab').click({force: true})
	cy.get('#otTab').click()	
		cy.get('#ddExStay').select('CompOff')
		cy.get(' #ddShift').select('General')
		 cy.get(' #txtCOMPExHour1').clear()
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
		cy.get('#btnSave1').click()
	})
	it('General Time Office Settings_Delete', function() { 
		cy.get('#ddExStay').select('CompOff')
		cy.get(' #ddShift').select('General')
	    cy.get('#btnDelete1').click()
		
	 }) 

   it('EarlyGoing_Save', function() {
	cy.get('#attendance_detail_tab').click({force: true})
	cy.get('#earlyGoingTab').click()
    cy.get('#ddShift').select('General')
    cy.get('#txtGraceHour').type('00')
    cy.get('#chkAll').check('on')
    cy.get('#btnSaveEarlyGoing').click()
   })
	it('EarlyGoing_Save and delete ', function() {
	//delete
	cy.wait(2000)
	cy.get('#ddShift').select('General')
    cy.get('#btnDeleteEarlyGoing').click()
	})
	it('HalfDay_Save and delete', function() {    
	cy.get('#attendance_detail_tab').click({force: true})
	cy.get('#halfDayTab').click()	
    cy.get('#ddShift').select('General')
    cy.get(' #txtFirstHalfHour').type('0')
    cy.get('#txtFirstHalfMin').type('1')
    cy.get('#txtFirstHalfMin').type('0')
    cy.get('#txtSecondtHalfHour').type('1')
    cy.get(' #txtEmpINHour').type('3')
    cy.get('#txtEmpINHour').click()
 
    cy.get('.card > .card-body > #formGeneral > .well > .form-group:nth-child(4)').click()
 
    cy.get('#txtEmpINHour').type('00')
  
    cy.get('#txtEmpINMin').type('15')
 
    cy.get('#txtEmpOUTHour').type('1')
 
    cy.get('#txtEmpOUTMin').type('00')
 
    cy.get('#txtWorkHrsHour').type('00')
 
    cy.get('.well > .form-group:nth-child(6) > .col-sm-9 > .row > .col-sm-3:nth-child(1)').click()
 
    cy.get('#txtWorkHrsHour').type('9')
 
    cy.get('#txtWorkHrsMin').type('00')
 
    cy.get('#txtWorkHrs1Hour').type('9')
 
    cy.get('#txtWorkHrs1Min').type('00')
 
    cy.get('#txtWorkHrsToHour').type('1')
  
    cy.get('#btnSaveHalfDay').click()
	})
	
	it('HalfDay_Save and delete', function() {    
	cy.wait(3000)
    cy.get('#ddShift').select('General')
	cy.get('#btnDeleteHalfDay').click()
	})
 
	it('AutoShift_Daywise', function() {
		cy.get('#autoShiftTab').click()
		cy.get('.table-sm > tbody > .General > td > .form-control').select('General')
		cy.get('.table-sm > tbody > .T00024 > td > .form-control').select('General')
		cy.get('.table-sm > tbody > .T00023 > td > .form-control').select('General')
		cy.get('#ddAutoShiftInput').select('DAYWISE')
		cy.get('#txtNumberOf').type('2')
		cy.get('#btnSaveAutoShift').click() 	
	 })


	it('AutoShift_Weekoff', function() {
		cy.get('#ddAutoShiftInput').select('WEEKOFF')
		cy.get('#ddWeekOff').select('SUNDAY')
		cy.get('#btnSaveAutoShift').click()
	 
	 })


	it('Monthly_Calender', function() {
		cy.get('#ddAutoShiftInput').select('MONTHLY')
		cy.get('#ddLeaveEntInp').select('CM')
		cy.get('#btnSaveAutoShift').click()
	 })		
	
	it('Monthly_DateToDate', function() {
		cy.get('#ddAutoShiftInput').select('MONTHLY')
		cy.get('#ddLeaveEntInp').select('DD')
		cy.get('#ddLeaveFrom').select('5')
		cy.get('#btnSaveAutoShift').click()
 
	})
	
	it('AutoShift_Yearly', function() {
		cy.get('#ddAutoShiftInput').select('YEARLY')
		cy.get('#btnSaveAutoShift').click()
	}) 
	
	it('Late Wise Leave save and delete ', function() {
		
		cy.get('#lateWiseLeaveTab').click()
		cy.wait(1000)
		cy.get('#ddShift').select('General')
		cy.get('#ddLogic').select('D')
		cy.get('#txtLateExceedHour').click({force: true})
		cy.get('#txtLateExceedHour').clear()
		cy.get('#txtLateExceedHour').type('9')
		cy.get('#ddConsider').select('F')
		cy.get('#chkAll').check('on')
		cy.get('#btnSaveLateWiseLeave').click({force: true})
	})
		it('Late Wise Leave delete ', function() {
		//delete
		cy.wait(1000)
		cy.get('#ddShift').select('General')
		cy.wait(1000)
		cy.get('#btnDeleteLateWiseLeave').click({force: true})
		
	})
	
	it('Import Time save and delete ', function() {
		cy.get('#importTimeTab').click({force: true})
		cy.wait(1000)
		
		cy.get('#ddShift').select('General')
		
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

	})
	it('Import Time delete ', function() {
		cy.wait(1000)
		cy.get('#ddShift').select('General')
		cy.wait(1000)
		cy.get('#btnDeleteImportTime').click({force: true})
	})	

	it('Auto Assign Shift Import', function() {
		
		cy.get('#autoShiftImportTimeTab').click({force: true})
		cy.wait(2000)
		cy.get('#ddShift').select('General',{force: true})
		cy.wait(1000)
		cy.get('#ddImportINStart').select('Current Date',{force: true})
		cy.get('#ddImportINEnd').select('Current Date',{force: true})
		cy.get('#txtImportINStartHour').click({force: true})
		cy.get('#txtImportINStartHour').clear()
	    cy.get('#txtImportINStartHour').type('9')
		cy.get('#txtImportINStartMin').click({force: true})
		cy.get('#txtImportINStartMin').clear()
	    cy.get('#txtImportINStartMin').type('30')
		cy.get('#txtImportINEndHour').click({force: true})
		cy.get('#txtImportINEndHour').clear()
	    cy.get('#txtImportINEndHour').type('18')
		cy.get('#txtImportINEndMin').click({force: true})
		cy.get('#txtImportINEndMin').clear()
	    cy.get('#txtImportINEndMin').type('30')
		cy.wait(2000)
		cy.get('#btnSaveASIT').click({force: true})
	})
	
	
	it('Additional Setting', function() {
		cy.get('#additionaltab').click({force: true})
		cy.wait(2000)
		cy.get('#ddOnDutyRest').select('Yes',{force: true})
		cy.get('#ddRegularRest').select('Yes',{force: true})
		
		cy.get('#ddTimeCondolidationRest').select('Yes',{force: true})
		cy.get('#ddPayrollPostingRest').select('Yes',{force: true})
		cy.get('#ddWeekOffRest').select('Yes',{force: true})
		cy.get('#ddHolidayRest').select('Yes',{force: true})
		cy.wait(2000)
		cy.get('#btnSaveAddSett').click({force: true})
	})
	
	it('Late Mark save and delete ', function() {
		
		cy.xpath('//*[@id="AttendanceSettignSubMenus"]/li[13]/label').click({force: true})
		cy.wait(1000)
		
		cy.get('#txtLatePara1').click({force: true})
		cy.get('#txtLatePara1').clear()
		cy.get('#txtLatePara1').type('3')
		
		cy.get('#txtLatePara2').click({force: true})
		cy.get('#txtLatePara2').clear()
		cy.get('#txtLatePara2').type('3')
		
		 cy.get('#ddConsider').select('H')
		 cy.get('#ddConsiderHalfFullDay').select('PL')
		 cy.wait(1000)
		 
		 cy.get('#btnSaveLateMark').click({force: true})
	})
	it('Late Mark delete ', function() {	 
		 //delete
		 cy.wait(2000)
		 cy.get('#btnDeleteLateMark').click({force: true})
	})
		
})	