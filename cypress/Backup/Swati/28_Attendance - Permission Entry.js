describe('Attendence Process ', function() {
	
	var url = 'https://next.pockethrms.com'
	var username= 'nileshgajare@live.com'
	var userPass = '123456'
	var employeeCode = 'CY4'

	var startDate=  '01/04/2020'
	var endDate ='13/04/2020'
	
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
	

/*	it('Set Permission Entry Type - Single Hour', function() {
		cy.visit('https://next.pockethrms.com/Settings/Employee/Index?module=attendance&submodule=tos_permission')
		cy.wait(1000)	
		cy.get('#attendance_detail_tab').click({force: true})
		cy.wait(1000)	
		cy.get('#Attendance_GeneralTimeOfficeSettings').click({force: true})
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
	
	it('Navigate to Employee Attendance - In/Out Details', function() {
		cy.wait(1000)
		cy.get('#attendance_detail_tab').click({force: true})
		cy.wait(2000)
		cy.xpath("//div[@id='attendance_detail']//li[2]").click({force: true})
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

	
	it('Verify Permission Entry with Max Hrs Allowed Per Day ', function() {
		var MaxHrsAllowedPerDay_Hours;
		var MaxHrsAllowedPerDay_Min;
		
		cy.wait(1000)
		cy.get('#attendance_detail_tab').click({force: true})
		cy.wait(2000)
		cy.xpath("//div[@id='attendance_detail']//li[2]").click({force: true})
		cy.wait(10000)
		
		
		
		for(let num =1 ; num<= NoOfPermissionsInAMonth ; num++)
		{
			cy.get('#tblInOutCoreDetail> tbody>tr:nth-child('+num+')>td:nth-child(5)').invoke('text').then((WorkingHours) => {
			
				cy.get('#tblInOutCoreDetail> tbody>tr:nth-child('+num+')>td:nth-child(11)>div>a').click({force: true})
				cy.wait(1000)					
				cy.xpath("//div[@class='dropdown-menu dropdown-menu-right dropheight show']//a[@class='dropdown-item dropheight'][contains(text(),'Permission Entry')]").click({force: true})
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
				cy.xpath("//div[@class='dropdown-menu dropdown-menu-right dropheight show']//a[@class='dropdown-item dropheight'][contains(text(),'Permission Entry')]").click({force: true})
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
		cy.get('#Attendance_GeneralTimeOfficeSettings').click({force: true})
		cy.wait(3000)		
		cy.get('#ddPermissionEntry').select('From Hour - To Hour',{force: true})
		cy.wait(1000)
		cy.get('#ddAnyTimePerAllo').select('Yes',{force: true})
		cy.wait(1000)
		cy.get('#btnSaveGeneralTimeOffice').click({force: true})
		cy.wait(2000)	
	})
*/
	
	it('Navigate to Employee profile', function() {
		cy.wait(1000)
		cy.get('#globalSearch').click({force: true})		
		cy.get('#globalSearch').clear()
		cy.get('#globalSearch').type(employeeCode)
		cy.wait(2000)
		cy.contains('li', employeeCode).click({force: true})
		cy.wait(3000)
	})
	
	it('Navigate to Employee Attendance - In/Out Details', function() {
		cy.wait(1000)
		cy.get('#attendance_detail_tab').click({force: true})
		cy.wait(2000)
		cy.xpath("//div[@id='attendance_detail']//li[2]").click({force: true})
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
	
	
	it('Verify Permission Entry with Max Hrs Allowed Per Day ', function() {
		var FromHours_HH;
		var FromHours_MM;
		var ToHours_HH;
		var ToHours_MM;
			
		for(let num =1 ; num<= 3 ; num++)
		{
			cy.get('#tblInOutCoreDetail> tbody>tr:nth-child('+num+')>td:nth-child(4)').invoke('text').then((WorkingHours) => {
			
				cy.get('#tblInOutCoreDetail> tbody>tr:nth-child('+num+')>td:nth-child(11)>div>a').click({force: true})
				cy.wait(1000)					
				cy.xpath("//div[@class='dropdown-menu dropdown-menu-right dropheight show']//a[@class='dropdown-item dropheight'][contains(text(),'Permission Entry')]").click({force: true})
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
		cy.xpath("//div[@id='attendance_detail']//li[2]").click({force: true})
		cy.wait(10000)
		
		
		for(let num =1 ; num<= 3 ; num++)
		{
			cy.get('#tblInOutCoreDetail> tbody>tr:nth-child('+num+')>td:nth-child(4)').invoke('text').then((WorkingHours) => {
			
				cy.get('#tblInOutCoreDetail> tbody>tr:nth-child('+num+')>td:nth-child(11)>div>a').click({force: true})
				cy.wait(1000)					
				cy.xpath("//div[@class='dropdown-menu dropdown-menu-right dropheight show']//a[@class='dropdown-item dropheight'][contains(text(),'Permission Entry')]").click({force: true})
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
		
	it('Verify Permission Entry with Min Hrs Allowed Per Month ', function() {
		var FromHours_HH;
		var FromHours_MM;
		var ToHours_HH;
		var ToHours_MM;
		
		cy.wait(1000)
		cy.get('#attendance_detail_tab').click({force: true})
		cy.wait(2000)
		cy.xpath("//div[@id='attendance_detail']//li[2]").click({force: true})
		cy.wait(10000)
		
		for(let num =1 ; num<= 3 ; num++)
		{
			cy.get('#tblInOutCoreDetail> tbody>tr:nth-child('+num+')>td:nth-child(4)').invoke('text').then((WorkingHours) => {
			
				cy.get('#tblInOutCoreDetail> tbody>tr:nth-child('+num+')>td:nth-child(11)>div>a').click({force: true})
				cy.wait(1000)					
				cy.xpath("//div[@class='dropdown-menu dropdown-menu-right dropheight show']//a[@class='dropdown-item dropheight'][contains(text(),'Permission Entry')]").click({force: true})
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
	
	
	})