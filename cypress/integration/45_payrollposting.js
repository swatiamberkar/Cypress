describe('SelfService payroll posting', function() {
	var employeeId = 'CY24'
	var Employeecatagorytype='';
	var EmpLengthInMonthlyInput='';
	var Emppwd='';
	
	it('successfully page  loads', function() {
		cy.clearLocalStorage() ;
		cy.window().then((win) => {
			win.sessionStorage.clear()
		})
		cy.clearCookies();
		cy.visit('https://next.pockethrms.com/') 
	})
	
	it('Pocket HRMS Login', function() {
		cy.server()
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
		cy.wait(1000)
		cy.get('[type="submit"]').click({force: true})
		cy.wait(6000)
		cy.get('.validation-summary-errors').should('not.exist');
		
	})
	beforeEach(function(){
        window.console.log('Enter the beforeEach function')
		Cypress.on('uncaught:exception', (err,runnable) => {
				return false;
		});
		
		Cypress.Cookies.preserveOnce('.AspNetCore.Antiforgery.w5W7x28NAIs','_gat_gtag_UA_159993745_1','.AspNetCore.Antiforgery.mEZFPqlrlZ8','GetLicenseData','AI_buffer','dataWizardtblData','module','.AspNetCore.Antiforgery.mEZFPqlrlZ8','.AspNetCore.Antiforgery.mEZFPqlrlZ8','__cypress.initial','.AspNetCore.Session','1P_JAR','ARRAffinity','FavouriteMenus','XCategory','XCompanyId','XName','XSchemaName','XUserId','XUserName','_ga','_gid','ai_session','ai_user','new_username','GetLicenseData')
		cy.wait(2000)
    })
	
	it('Change Company', function() {		 
		cy.changeCompany(); 
	})  
	
	Cypress.Commands.add('navigate_CompanayProfile',()=>{
   	    cy.changeCompany();
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
	
	
	
	
	it('Search Specific Emp code you want to selfservice Payroll posting', function() {
		cy.wait(3000)
		cy.get('#globalSearch').type(employeeId)
		cy.wait(3000)
		cy.contains('li', 'Payrollpost test(CY24)').click({force: true})
		cy.wait(2000)
		cy.get('#profile_detail_tab').click({force:true})
		cy.wait(2000)
		cy.get('#basicTab').click({force:true})
		cy.wait(2000)
		cy.get('select[id=CATEGORY]').then($input => {
				Employeecatagorytype=  $input.val();		 
				cy.log(Employeecatagorytype);
		})
			
		cy.wait(2000)
		cy.SaveEarningDeductionfields();
		cy.wait(2000)
		cy.get('#profile_detail_tab').click({force:true})
		cy.wait(2000)
		//dynamic password get
		cy.server()
		cy.get('#Profile_SelfServiceRole').click({force: true})
		cy.wait(2000)
		cy.route('POST', 'https://next.pockethrms.com/Employee/Employee/SelfServiceRole').as('selfservicerole')
		 cy.get('select[name=SelfServiceRole]').select('User',{force: true})
		 cy.wait(2000)
		 cy.get('[onclick="saveSelfServiceRole(this)"]').click({force: true})
		 cy.wait('@selfservicerole').its('status').should('eq', 200) 
		  cy.get("#credentials").invoke('text').then((text) => {
				cy.log(text.trim())
				Emppwd=text.trim().substring(11);
				cy.log(Emppwd);
				cy.writeFile('D:/CypressPocketHRMS/cypress/fixtures/selfservicelogin.json', [{"password":Emppwd}])
		})
		
		
		
		
	})
	
	
	
	it('save monthlyinput for this Emp', function() {
		var monthlyInput='October';
		cy.visit('https://next.pockethrms.com/payroll/transaction/monthlyinput')	
		cy.wait(2000)
		
		cy.get('#categoryId').select(Employeecatagorytype,{force: true})
		cy.get('#inputMonth').select(monthlyInput,{force: true})
		cy.wait(2000)
		cy.get('[value="View"]').click({force: true})
		
		cy.wait(2000)
		cy.get('.theme_dataTable > .table').find('tr').then(listing => {
			var monthlyinputcount = Cypress.$(listing).length;
			//cy.log("i: "+monthlyinputcount)
			if(monthlyinputcount==1)
			{
				cy.get('[value="Edit"]').click({force: true})	
			}
		})
		cy.wait(2000)
		cy.get('.theme_dataTable > .table').find('tr').each(function(row, i){
				if(i!=0){
				//console.log(i)
				var num1 = parseFloat(i)
				 cy.get('.theme_dataTable > .table > tbody > tr:nth-child('+num1+') > .th').invoke('text').then((text) => {
					cy.log(text.trim())
					if(text.trim()==employeeId){					
						cy.get('.table > tbody > tr:nth-child('+num1+') > td:nth-child(4) > .form-control').click()	
						cy.get('.table > tbody > tr:nth-child('+num1+') > td:nth-child(4) > .form-control').clear()	
						cy.get('.table > tbody > tr:nth-child('+num1+') > td:nth-child(4) > .form-control').type('0')
						cy.get('.table > tbody > tr:nth-child('+num1+') > td > .chked').check({force: true})
					}
				})
			
				}
		})
			
		cy.get('[value="Save"]').click({force: true})
		cy.wait(2000)
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())	
		})
    })
	
	it('Payroll process of month (October)',function(){
		var PayrollProcessMonth='October';
		cy.server()      
		cy.route('POST', 'https://next.pockethrms.com/Payroll/Transaction/PayrollProcessing?prcButton=Process&json=1').as('postComment')
		cy.get('#globalSearch').type(employeeId)
		cy.wait(4000)
		cy.contains('li', 'Payrollpost test(CY24)').click({force: true})
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
		cy.contains('li', 'Payrollpost test(CY24)').click({force: true})
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
		    cy.contains('li', 'Payrollpost test(CY24)').click({force: true})
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
	
	
	it('Payroll post after payroll process', function() {
		
		cy.visit('https://next.pockethrms.com/payroll/transaction/webpost')
		cy.wait(2000)
		cy.contains('label', 'Staff').click({force: true})
		cy.get('#Month').select('October',{force: true})
		cy.wait(2000)
		cy.get('[onclick="return validate(this)"]').eq(0).click({force: true})
	})	
		
	it('self services login and check last salary process', function() {
		
		cy.visit('https://selfservice.pockethrms.com/')
		cy.wait(2000)
		
		cy.readFile('D:/CypressPocketHRMS/cypress/fixtures/Company.json').then((text) =>{
        text.forEach(function(entry) {                                          
                var companycode = entry.comapnaycode        
                cy.log('companycode '+ companycode)                
                cy.wait(500)
                cy.get('#company').click({force: true})
				cy.get('#company').clear();
				cy.get('#company').type(companycode.trim())
                
                })
        })
		cy.get('#employeecode').click({force: true})
		cy.get('#employeecode').clear()
		cy.get('#employeecode').type(employeeId.trim())
		
		cy.wait(1000)
		cy.readFile('D:/CypressPocketHRMS/cypress/fixtures/selfservicelogin.json').then((text) =>{
        text.forEach(function(entry) {        
                                                 
                var sslpwd = entry.password        
                cy.log('selfservicepassword:'+ sslpwd)                
                cy.wait(500)
                cy.get('#password').click({force: true})
				cy.get('#password').clear()
				cy.get('#password').type(sslpwd.trim())
                
                })
        })
		cy.wait(2000)
		cy.get('#btnSubmit').click({force: true})
		
		cy.wait(7000)
		cy.get("#lastSalary").invoke('text').then((text) => {
				cy.log(text.trim())
				expect(text.trim()).equal('October 2020')
		})
	})
	
	
	
	it('Delete payroll process (October)', function() {
		cy.wait(2000)
		cy.visit('https://next.pockethrms.com/')
		//cy.get('#Email').click()
		//cy.get('#Email').type('nileshgajare@live.com')
		//cy.get('#Email').should('have.value', 'nileshgajare@live.com')
		cy.get('#Password').click()
		cy.get('#Password').type('123456')
		cy.get('#Password').should('have.value', '123456')
		cy.get('[type="submit"]').click({force: true})
		cy.wait(3000)
		
		cy.navigate_CompanayProfile()

		var PayrollProcessMonth='October';
		
		cy.get('#globalSearch').type(employeeId)
		cy.wait(4000)
		cy.contains('li', 'Payrollpost test(CY24)').click({force: true})
		cy.wait(2000)
		cy.get("#payroll_detail_tab").click({force: true})
		cy.wait(2000)
		cy.get('#Utilities_PayrollProcess').click({force: true})
		cy.wait(2000)	
		cy.get("select[id='month']").select(PayrollProcessMonth,{force: true})
		cy.get('#btnProcessDelete').click({force: true})
		cy.wait(2000)
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())
				expect(text.trim()).equal('Payroll Process Deleted Successfully')
		})
	
	})
	
	
	it('self services login and check last salary process after delete payroll process', function() {
		cy.visit('https://selfservice.pockethrms.com/')
		cy.wait(2000)
		
		cy.readFile('D:/CypressPocketHRMS/cypress/fixtures/Company.json').then((text) =>{
        text.forEach(function(entry) {                                          
                var companycode = entry.comapnaycode        
                cy.log('companycode '+ companycode)                
                cy.wait(500)
                cy.get('#company').click({force: true})
				cy.get('#company').clear();
				cy.get('#company').type(companycode.trim())
                
                })
        })
		cy.get('#employeecode').click({force: true})
		cy.get('#employeecode').clear()
		cy.get('#employeecode').type(employeeId.trim())
		
		cy.wait(1000)
		cy.readFile('D:/CypressPocketHRMS/cypress/fixtures/selfservicelogin.json').then((text) =>{
        text.forEach(function(entry) {        
                                                 
                var sslpwd = entry.password        
                cy.log('selfservicepassword:'+ sslpwd)                
                cy.wait(500)
                cy.get('#password').click({force: true})
				cy.get('#password').clear()
				cy.get('#password').type(sslpwd.trim())
                
                })
        })
		cy.wait(2000)
		cy.get('#btnSubmit').click({force: true})
		cy.wait(7000)
		cy.get('#lastSalary').contains('span', 'October 2020').should('not.exist');
	})
	
	it('Payroll post after delete  payroll process', function() {
		cy.wait(2000)
		cy.visit('https://next.pockethrms.com/')
		//cy.get('#Email').click()
		//cy.get('#Email').type('nileshgajare@live.com')
		//cy.get('#Email').should('have.value', 'nileshgajare@live.com')
		cy.get('#Password').click()
		cy.get('#Password').type('123456')
		cy.get('#Password').should('have.value', '123456')
		cy.get('[type="submit"]').click({force: true})
		cy.wait(2000)
		
		cy.navigate_CompanayProfile()
		cy.visit('https://next.pockethrms.com/payroll/transaction/webpost')
		cy.wait(2000)
		cy.contains('label', 'Staff').click({force: true})
		cy.get('#Month').select('October',{force: true})
		cy.wait(2000)
		cy.get('[onclick="return validate(this)"]').eq(0).click({force: true})
		cy.wait(3000)
		
		cy.get("#errMsg").invoke('text').then((text) => {
			cy.log(text.trim())
			expect(text.trim()).equal('Payroll Not Processed')
		})
		
	})
	
	
	it('Again Payroll process for (October) ', function() {
		var PayrollProcessMonth='October';
		cy.server()      
		cy.route('POST', 'https://next.pockethrms.com/Payroll/Transaction/PayrollProcessing?prcButton=Process&json=1').as('postComment')
		cy.wait(3000)
		cy.get('#globalSearch').type(employeeId)
		cy.wait(3000)
		cy.contains('li', 'Payrollpost test(CY24)').click({force: true})
		cy.wait(2000)
		cy.get("#payroll_detail_tab").click({force: true})
		cy.wait(2000)
		cy.get('#Utilities_PayrollProcess').click({force: true})
		cy.wait(2000)	
		cy.get("select[id='month']").select(PayrollProcessMonth,{force: true})	
		//cy.get('#ItaxProcess').not('[disabled]').check({force: true}).should('be.checked')	
		cy.get('#btnProcess').click({force: true})
		cy.wait('@postComment').its('status').should('eq', 200)
	
		cy.get(".toast-message").invoke('text').then((text) => {
			expect(text.trim()).equal('Payroll Process Completed Successfully')			
		})
		
	})
		
	it('Again Payroll post (octeber)  after payroll process', function() {
		
		cy.visit('https://next.pockethrms.com/payroll/transaction/webpost')
		cy.wait(2000)
		cy.contains('label', 'Staff').click({force: true})
		cy.get('#Month').select('October',{force: true})
		cy.wait(2000)
		cy.get('[onclick="return validate(this)"]').eq(0).click({force: true})
	
	})
	
	it('self services login and check last salary process', function() {
		cy.visit('https://selfservice.pockethrms.com/')
		cy.wait(2000)
		
		cy.readFile('D:/CypressPocketHRMS/cypress/fixtures/Company.json').then((text) =>{
        text.forEach(function(entry) {                                          
                var companycode = entry.comapnaycode        
                cy.log('companycode '+ companycode)                
                cy.wait(500)
                cy.get('#company').click({force: true})
				cy.get('#company').clear();
				cy.get('#company').type(companycode.trim())
                
                })
        })
		cy.get('#employeecode').click({force: true})
		cy.get('#employeecode').clear()
		cy.get('#employeecode').type(employeeId.trim())
		
		cy.wait(1000)
		cy.readFile('D:/CypressPocketHRMS/cypress/fixtures/selfservicelogin.json').then((text) =>{
        text.forEach(function(entry) {        
                                                 
                var sslpwd = entry.password        
                cy.log('selfservicepassword:'+ sslpwd)                
                cy.wait(500)
                cy.get('#password').click({force: true})
				cy.get('#password').clear()
				cy.get('#password').type(sslpwd.trim())
                
                })
        })
		cy.wait(2000)
		cy.get('#btnSubmit').click({force: true})
		
		
		cy.wait(7000)
		cy.get("#lastSalary").invoke('text').then((text) => {
				cy.log(text.trim())
				expect(text.trim()).equal('October 2020')
		})
	})
	
	it('delete Payroll post (octeber)', function() {
		cy.visit('https://next.pockethrms.com/')
		//cy.get('#Email').click()
		//cy.get('#Email').type('nileshgajare@live.com')
		//cy.get('#Email').should('have.value', 'nileshgajare@live.com')
		cy.get('#Password').click()
		cy.get('#Password').type('123456')
		cy.get('#Password').should('have.value', '123456')
		cy.get('[type="submit"]').click({force: true})
		cy.wait(2000)
		
		cy.navigate_CompanayProfile()
		cy.visit('https://next.pockethrms.com/payroll/transaction/webpost')
		cy.wait(2000)
		cy.contains('label', 'Staff').click({force: true})
		cy.get('#Month').select('October',{force: true})
		cy.wait(2000)
		cy.get('[onclick="return validate(this)"]').eq(1).click({force: true})
	
	})
	
	it('self services login and check last salary process after delete payroll post', function() {
		cy.visit('https://selfservice.pockethrms.com/')
		cy.wait(2000)
		
		cy.readFile('D:/CypressPocketHRMS/cypress/fixtures/Company.json').then((text) =>{
        text.forEach(function(entry) {                                          
                var companycode = entry.comapnaycode        
                cy.log('companycode '+ companycode)                
                cy.wait(500)
                cy.get('#company').click({force: true})
				cy.get('#company').clear();
				cy.get('#company').type(companycode.trim())
                
                })
        })
		cy.get('#employeecode').click({force: true})
		cy.get('#employeecode').clear()
		cy.get('#employeecode').type(employeeId.trim())
		
		cy.wait(1000)
		cy.readFile('D:/CypressPocketHRMS/cypress/fixtures/selfservicelogin.json').then((text) =>{
        text.forEach(function(entry) {        
                                                 
                var sslpwd = entry.password        
                cy.log('selfservicepassword:'+ sslpwd)                
                cy.wait(500)
                cy.get('#password').click({force: true})
				cy.get('#password').clear()
				cy.get('#password').type(sslpwd.trim())
                
                })
        })
		cy.wait(2000)
		cy.get('#btnSubmit').click({force: true})
		
		
		cy.wait(7000)
		cy.get('#lastSalary').contains('span', 'October 2020').should('not.exist');
	})
	

	})