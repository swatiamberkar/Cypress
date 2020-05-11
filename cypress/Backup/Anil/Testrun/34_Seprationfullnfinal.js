describe('Sepration FullnFinal', function() {
	
	
	var employeeId = 'CY15';
	var EmpLengthInMonthlyInput=''
	
	
		const Day = Cypress.moment().format('DD')
		const Day1 = parseInt(Day)+1
		const Month = Cypress.moment().format('MM')
		const year = Cypress.moment().format('YYYY')
		const currentDate = Day+'/'+Month+'/'+year
		const tomorrowDate = Day1+'/'+Month+'/'+year
	
	it('successfully page  loads', function() {
		cy.visit('https://next.pockethrms.com/') 
	})
	
	it('Pocket HRMS Login', function() {
		cy.visit('https://next.pockethrms.com/')
		cy.get('#Email').should('be.visible').should('have.css', 'border-radius') 
		cy.get('#Email').should('exist')
		cy.get('#Email').click({force: true})
		cy.get('#Email').type('nileshgajare@live.com')
		cy.get('#Email').should('have.value', 'nileshgajare@live.com')
		cy.get('#Password').should('be.visible').should('have.css', 'border-radius') 
		cy.get('#Password').should('exist')
		cy.get('#Password').click({force: true})
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
	
	Cypress.Commands.add('navigate_EmployeeProfile',()=>{
		cy.wait(1000)
		cy.get('#globalSearch').click({force: true})		
		cy.get('#globalSearch').clear()
		cy.get('#globalSearch').type(employeeId)
		cy.wait(2000)
		cy.contains('li', employeeId).click({force: true})
		cy.wait(3000)
	})
	
	Cypress.Commands.add('SaveEarningDeductionfields',()=>{
                cy.wait(2000)
                cy.server()   
                cy.get('#salary_detail_tab').click({force: true})
                cy.wait(2000)
                cy.get('#Salary_EarningDetails').click({force: true})
                cy.route('POST', 'https://next.pockethrms.com/Employee/Employee/SaveEarningDetails').as('SaveEarningDetails')
                cy.wait(2000)
                
                cy.get('input[name=FB]').click({force: true})
                cy.get('input[name=FB]').clear()                
                cy.get('input[name=FB]').type('40000') 
                
                cy.get('input[name=FPROJ]').click({force: true})        
                cy.get('input[name=FPROJ]').clear()                
                cy.get('input[name=FPROJ]').type('10000')
        
                
                cy.get('input[name=FFIELD]').click({force: true})        
                cy.get('input[name=FFIELD]').clear()                        
            cy.get('input[name=FFIELD]').type('5000')
                        
                cy.wait(1000)
                 cy.get('#btnSaveEarningDetails').click({force: true})
                cy.wait('@SaveEarningDetails').its('status').should('eq', 200)
                cy.get(".toast-message").invoke('text').then((earningtext) => {
                 cy.log(earningtext.trim())
                })
                
                cy.get('#Salary_DeductionDetails').click({force: true})
                cy.wait(1000)
                cy.route('POST', 'https://next.pockethrms.com/Employee/Employee/SaveDeductionDetails').as('SaveDeductionDetails')
                cy.get('input[name=TDS]').click({force: true})
        cy.get('input[name=TDS]').clear()                
                cy.get('input[name=TDS]').type('200')
                
                 cy.get('#btnSaveDeductionDetails').click({force: true})
                cy.wait('@SaveDeductionDetails').its('status').should('eq', 200)
                cy.get(".toast-message").invoke('text').then((earningtext) => {
                 cy.log(earningtext.trim())
                })
                
        })
		
		
		it('Save Salary Details of EMp',function(){
			cy.navigate_EmployeeProfile();
			cy.wait(2000)
			cy.SaveEarningDeductionfields();
		
		 })
	it('Payroll process on pervious month',function(){
		
		
		var PayrollProcessMonth='February';
		cy.server()      
		cy.route('POST', 'https://next.pockethrms.com/Payroll/Transaction/PayrollProcessing?prcButton=Process&json=1').as('postComment')
		cy.get('#globalSearch').type(employeeId)
		cy.wait(4000)
		cy.contains('li', 'SeprationFullnFinal test(CY15)').click({force: true})
		cy.wait(3000)
		cy.get('#payroll_detail_tab').click({force: true})
		cy.wait(1000)
		cy.get('#Utilities_PayrollProcess').click({force: true})
		cy.wait(2000)	
		cy.get("select[id='month']").select(PayrollProcessMonth,{force: true})	
			
		cy.get('#btnProcess').click({force: true})
		cy.wait('@postComment').its('status').should('eq', 200)
		cy.get(".toast-message").invoke('text').then((text) => {
		cy.log(text.trim())
				
		if(text.trim()=='Sorry Monthly Input Is Not Entered For This Month')
		{
			expect(text.trim()).equal('Sorry Monthly Input Is Not Entered For This Month')
			cy.wait(1000)
			cy.visit('https://next.pockethrms.com/payroll/transaction/monthlyinput')	
			cy.wait(2000)
			cy.get('[value="View"]').click({force: true})
			cy.wait(1000)	
			cy.get('#categoryId').select("Staff",{force: true})
			cy.get('#inputMonth').select(PayrollProcessMonth,{force: true})
			cy.wait(1000)
			cy.get('[value="View"]').click({force: true})
		
			cy.wait(2000)
			cy.get('.theme_dataTable > .table  > tbody').find('tr').then(listing => {
					 EmpLengthInMonthlyInput = Cypress.$(listing).length;
					cy.log("EmpLength: "+EmpLengthInMonthlyInput)
			})
		
			if(EmpLengthInMonthlyInput=='0')
			{
				cy.get('[value="Edit"]').click({force: true})
			}
		
			cy.get('.theme_dataTable > .table > tbody').find('tr').each(function(row, i){
			var num1 = parseFloat(i)+1
			cy.get('.theme_dataTable > .table > tbody > tr:nth-child('+num1+') > td:nth-child(2)').invoke('text').then((text) => 
				{
					cy.log(text.trim())
					if(text.trim()==employeeId)
					{					
						cy.get('.table > tbody > tr:nth-child('+num1+') > td:nth-child(4) > .form-control').click()	
						cy.get('.table > tbody > tr:nth-child('+num1+') > td:nth-child(4) > .form-control').clear()	
						cy.get('.table > tbody > tr:nth-child('+num1+') > td:nth-child(4) > .form-control').type('0')

						cy.get('.table > tbody > tr:nth-child('+num1+') > td > .chked').check({force: true})
					}
				})
			})
		
		
			cy.get('[value="Save"]').click({force: true})
			cy.wait(2000)
			cy.get(".toast-message").invoke('text').then((text) => {
			expect(text.trim()).equal('Record Save Successfully !')
			cy.log(text.trim())	
			})
	
		cy.wait(3000)
		cy.get('#globalSearch').type(employeeId)
		cy.wait(4000)
		cy.contains('li', 'SeprationFullnFinal test(CY15)').click({force: true})
		cy.wait(3000)
		cy.get('#payroll_detail_tab').click({force: true})
		cy.wait(1000)
		cy.get('#Utilities_PayrollProcess').click({force: true})
		cy.wait(1000)
		
		cy.get('#btnProcess').click({force: true})
		cy.wait('@postComment').its('status').should('eq', 200)
		cy.get(".toast-message").invoke('text').then((text) => {
		cy.log(text.trim())
		expect(text.trim()).equal('Payroll Process Completed Successfully')
						
		})			
		}
		else if(text.trim()=='Payroll is Locked for this month')		
		{
		expect(text.trim()).equal('Payroll is Locked for this month')
		cy.visit('https://next.pockethrms.com/payroll/transaction/PaysheetLock')	
			cy.wait(2000)
			cy.get('#Month1').select(PayrollProcessMonth,{force: true})
			cy.wait(1000)
			cy.xpath("//button[contains(text(),'Next')]").click({force: true})
			cy.wait(2000)
			cy.xpath("//label[contains(text(),'All Categories')]/input").click({force: true})
			cy.xpath("//button[@id='btnRelease']").click({force: true})
			
			cy.reload()
			cy.wait(2000)
			cy.get('#globalSearch').type(employeeId)
			cy.wait(4000)
		    cy.contains('li', 'SeprationFullnFinal test(CY15)').click({force: true})
		    cy.wait(4000)
		    cy.get('#payroll_detail_tab').click({force: true})
		    cy.wait(1000)
		
		    cy.get('#Utilities_PayrollProcess').click({force: true})
		
		
		cy.wait(1000)
		cy.get("select[id='month']").select(PayrollProcessMonth,{force: true})	
		cy.get('#btnProcess').click({force: true})
		cy.wait('@postComment').its('status').should('eq', 200)
		cy.get(".toast-message").invoke('text').then((text) => {
		cy.log(text.trim())
		
		if(text.trim()=='Already Payroll Processed For This Employee')	{
		cy.wait(1000)
		cy.get(".toast-message").click({force: true})
		cy.get('#btnProcessDelete').click({force: true})
		cy.wait(1000)
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())
				expect(text.trim()).equal('Payroll Process Deleted Successfully')
		})
		
		cy.wait(1000)
		cy.get(".toast-message").click({force: true})
		
		cy.get('#btnProcess').click({force: true})
		cy.wait('@postComment').its('status').should('eq', 200)
		cy.get(".toast-message").invoke('text').then((text) => {
		cy.log(text.trim())
		expect(text.trim()).equal('Payroll Process Completed Successfully')
		})
		}
		else{
		expect(text.trim()).equal('Payroll Process Completed Successfully')
		}			
		})					
	}
		else if(text.trim()=='Already Payroll Processed For This Employee')	{
		expect(text.trim()).equal('Already Payroll Processed For This Employee')
		cy.wait(1000)
		cy.get(".toast-message").click({force: true})
		cy.get('#btnProcessDelete').click({force: true})
		cy.wait(1000)
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())
				expect(text.trim()).equal('Payroll Process Deleted Successfully')
		})
		cy.wait(1000)
		cy.get(".toast-message").click({force: true})
		
		cy.get('#btnProcess').click({force: true})
		cy.wait('@postComment').its('status').should('eq', 200)
		cy.get(".toast-message").invoke('text').then((text) => {
		cy.log(text.trim())
		expect(text.trim()).equal('Payroll Process Completed Successfully')
		})
	}
		else{
		
				expect(text.trim()).equal('Payroll Process Completed Successfully')
	
		}
	
		})
		
	
	
	})
	
	it('Employee Separation for FullnFinal',function(){
		cy.wait(2000)
		cy.server()
		cy.visit('http://next.pockethrms.com/payroll/transaction/separation')
		cy.route('POST', 'https://next.pockethrms.com/Payroll/Transaction/SaveSeparation').as('SaveSeparation')
		cy.wait(1000)
		cy.get('#select2-multiEmp-container').click({force: true})
		cy.wait(2000)
		cy.get('input[type="search"]').click({force: true})
		cy.get('input[type="search"]').type(employeeId)
		cy.wait(2000)
		cy.get('.select2-results__option--highlighted').click({force: true})
		
		cy.wait(1000)
		
		cy.get('#DateofJoining').then($input => {
			expect($input.val()).to.contain('02/02/2019')
		})	
		cy.get('#SeparationType').select('Separation',{force: true})
		
		cy.get('#LastWorkingDate').click().then(input => {
			input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val('30/03/2020')
		})
		
		cy.get('#ResignationDate').click({force: true}).then(input => {
			input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val('13/01/2020')
		})
		
		cy.get('#Reason').click({force: true})
		cy.get('#Reason').type('Test Separation!!!')
		
		cy.wait(1000)
		cy.get('button[onclick="return Validation();"]').click({force: true})
		cy.wait('@SaveSeparation').its('status').should('eq', 200) 
		cy.get(".toast-message").invoke('text').then((text) => {
				expect(text.trim()).equal('Seperation entry saved successfully!')
		})
		
	})	
	
	
	it('Full & Final Settlement',function(){
		cy.visit('https://next.pockethrms.com/payroll/transaction/FullandFinal')
		cy.wait(1000)
		cy.get('#CategoryId').select('Staff',{force: true})
		cy.wait(1000)
		
		cy.get('#select2-multiEmp-container').click({force: true})
		cy.wait(2000)
		cy.get('input[type="search"]').click({force: true})
		cy.get('input[type="search"]').type(employeeId)
		cy.wait(2000)
		cy.get('.select2-results__option--highlighted').click({force: true})
		cy.wait(2000)
		
		
		//Apply month validation
		//cy.get('#monthlyinput').click({force: true})
		//cy.get(".toast-message").invoke('text').then((text) => {
			//if(expect(text.trim()).equal('Please Select Apply Month')){
				//cy.get(".toast-message").click({force: true})
				//cy.wait(1000)
				//cy.get('#month').select('March',{force: true})
			//}        
		//})
		
		
		
		cy.get('#month').select('March',{force: true})
		
		cy.get('#resignationDate').then($input => {
			expect($input.val()).to.contain('13/01/2020')
		})
		
		cy.get('#relievingDate').then($input => {
			expect($input.val()).to.contain('30/03/2020')
		})
		
		cy.get('#settlementDate').then($input => {
			expect($input.val()).to.contain(currentDate)
		})
		
		
		cy.wait(1000)
		cy.get('#noticeperiod').click({force: true})
		cy.get('#noticeperiod').clear()
		cy.get('#noticeperiod').type('30')
		
		
		cy.get('#reportname').click({force: true})
		cy.get('#reportname').clear()
		cy.get('#reportname').type('test report')
		
		cy.get('#notes').click({force: true})
		cy.get('#notes').clear()
		cy.get('#notes').type('test fillnfinal')
		
		
		
		cy.get('[onclick="return validate()"]').click({force: true})
		cy.get(".toast-message").invoke('text').then((text) => {
			if(expect(text.trim()).equal('Please Select Monthly Input')){
				cy.get(".toast-message").click({force: true})
				cy.wait(1000)
				cy.get('#monthlyinput').click({force: true})
			}        
		})
		cy.wait(2000)
		
		cy.get('input[name=WEEKOFF_DAYS]').click({force: true})
		cy.get('input[name=WEEKOFF_DAYS]').clear()
		 cy.get('input[name=WEEKOFF_DAYS]').type('6')
		 
		 
		 cy.get('input[name=NOTICE_PERIOD]').click({force: true})
		cy.get('input[name=NOTICE_PERIOD]').clear()		 
		 cy.get('input[name=NOTICE_PERIOD]').type('45')
		 
		 
		 cy.get('input[name=LEV_ENCASHDAY]').click({force: true})
		cy.get('input[name=LEV_ENCASHDAY]').clear()
		 cy.get('input[name=LEV_ENCASHDAY]').type('3')

		 cy.wait(1000)
		cy.get('[onclick="return validate()"]').click({force: true})
		cy.wait(3000)
		cy.get(".toast-message").invoke('text').then((text) => {
			expect(text.trim()).equal('F&F Processed Successfully')
		})	
	})	
	

	it('Release Emp after the fullnFinal Settlement',function(){
		cy.wait(2000)
		cy.visit('https://next.pockethrms.com/Payroll/Transaction/separationRelease')
		cy.wait(2000)
		cy.get('#select2-multiEmp-container').click({force: true})
		cy.wait(2000)
		cy.get('input[type="search"]').click({force: true})
		cy.get('input[type="search"]').type(employeeId)
		cy.wait(2000)
		cy.get('.select2-results__option--highlighted').click({force: true})
		
		cy.wait(1000)
		cy.get('#ReleaseDate').click({force: true}).then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val('22/04/2020')
		})
		
		cy.get('[onclick="submitForm()"]').click({force: true})
		cy.wait(1000)
		cy.get(".toast-message").invoke('text').then((text) => {
			expect(text.trim()).equal('Full & Final already done!')
		})
		
	})	
	
	
})
	
	
	