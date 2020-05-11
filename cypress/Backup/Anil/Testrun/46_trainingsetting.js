describe('Training details', function() {
    
	    var imagfilePath= 'input.png';
		var filepathref='Greytrix SSL VPN.pdf';
	    const Day = Cypress.moment().format('DD')
		const Day1 = parseInt(Day)+1
		const Month = Cypress.moment().format('MM')
		const year = Cypress.moment().format('YYYY')
		const currentDate = Day+'/'+Month+'/'+year
		
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
		//cy.get('.validation-summary-errors').should('not.exist');
		//cy.wait(2000)
		//cy.visit('https://next.pockethrms.com/identity/Home/Dashboard')
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
	
	it('Training Location', function() {
		cy.visit('https://next.pockethrms.com/Settings/Employee/Index?module=Training&submodule=TrainingLocation')
		cy.wait(2000)
		cy.get('[title="Add Training Location"]').eq(0).click({force: true})
		cy.wait(2000)
		
		cy.get('#submitbutton').click({force: true})
		cy.wait(1000)
		  cy.get(".toast-message").invoke('text').then((text) => {
			if(text.trim()=='Please Enter Location.!')	{
			cy.wait(1000)
			cy.get(".toast-message").eq(0).click({force: true})
			   cy.get('#Location').click({force:true})
				cy.get('#Location').clear()
				cy.get('#Location').type('Mumbai')
			}
		 })
		 cy.get('#Address').click({force:true})
		 cy.get('#Address').clear()
		cy.get('#Address').type('Navi Mumbai')	
		cy.wait(1000)
		cy.get('#submitbutton').click({force: true})
		cy.wait(2000)
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())	
		   expect(text.trim()).equal('Record Saved Successfully !')	
	   })
		
	})	
	
	
	it('Trainer Info', function() {
		cy.visit('https://next.pockethrms.com/Settings/Employee/Index?module=Training&submodule=TrainerInfo')
		cy.wait(2000)
		cy.get('[title="Add New TrainerInfo"]').eq(0).click({force: true})
		cy.wait(2000)
		
		cy.get('#btnSbmt').click({force: true})
		cy.wait(1000)
		  cy.get(".toast-message").invoke('text').then((text) => {
			if(text.trim()=='Please Select Employee')	{
			cy.wait(1000)
			cy.get(".toast-message").eq(0).click({force: true})
			  cy.get('#select2-multiEmp-container').click({force: true})
			  cy.wait(2000)
		       cy.get('input[type="search"]').click({force: true})
		       cy.get('input[type="search"]').type('CY1')
		       cy.wait(2000)
		       cy.get('.select2-results__option--highlighted').click({force: true})
			}
		 })
		 
		 cy.wait(2000)
		cy.get('#btnSbmt').click({force: true})
		  cy.get(".toast-message").invoke('text').then((text) => {
			if(text.trim()=='Please Enter Skill')	{
			cy.wait(1000)
			cy.get(".toast-message").eq(0).click({force: true})
				cy.get('#skills').click({force:true})
				cy.get('#skills').clear()
				cy.get('#skills').type('AspDotMvcCore')
			}
		 })
		 
		
		 cy.wait(2000)
		cy.get('#btnSbmt').click({force: true})
		  cy.get(".toast-message").invoke('text').then((text) => {
			if(text.trim()=='Please Enter Achievements')	{
			cy.wait(1000)
			cy.get(".toast-message").eq(0).click({force: true})
				cy.get('#achievements').click({force:true})
				cy.get('#achievements').clear()
				cy.get('#achievements').type('msdn certification')
			}
		 })
		cy.wait(1000)
		cy.get('#btnSbmt').click({force: true})
		cy.wait(2000)
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())	
		   expect(text.trim()).equal('Record Saved Successfully.!')	
	   })
		
	})
	
	
	it('Add Training', function() {
		cy.visit('https://next.pockethrms.com/Settings/Employee/Index?module=Training&submodule=Training')
		cy.wait(2000)
		cy.get('[title="Add New Training"]').eq(0).click({force: true})
		cy.wait(2000)
		
		cy.get('#SubmitBtn').click({force: true})
		cy.wait(1000)
		  cy.get(".toast-message").invoke('text').then((text) => {
			if(text.trim()=='Please Enter Training Name!!!')	{
			cy.wait(1000)
			cy.get(".toast-message").eq(0).click({force: true})
			   cy.get('#Name').click({force:true})
				cy.get('#Name').clear()
				cy.get('#Name').type('dotnetcore')
			}
		 })
		 
		  cy.wait(2000)
		cy.get('#SubmitBtn').click({force: true})
		  cy.get(".toast-message").invoke('text').then((text) => {
			if(text.trim()=='Please Enter Passing Percentage!!!')	{
			cy.wait(1000)
			cy.get(".toast-message").eq(0).click({force: true})
				cy.get('#Passing').click({force:true})
				cy.get('#Passing').clear()
				cy.get('#Passing').type('45')
			}
		 })
		 
		   cy.wait(2000)
		cy.get('#SubmitBtn').click({force: true})
		  cy.get(".toast-message").invoke('text').then((text) => {
			if(text.trim()=='Please Enter Time Limit!!!')	{
			cy.wait(1000)
			cy.get(".toast-message").eq(0).click({force: true})
				cy.get('#TimeLimit').click({force:true})
				cy.get('#TimeLimit').clear()
				cy.get('#TimeLimit').type('180')
			}
		 })
		 
		    cy.wait(2000)
		cy.get('#SubmitBtn').click({force: true})
		  cy.get(".toast-message").invoke('text').then((text) => {
			if(text.trim()=='Please Select Certificate.!')	{
			cy.wait(1000)
			cy.get(".toast-message").eq(0).click({force: true})
				cy.get('#certificate').select('Certificate',{force: true})
			}
		 })
		
		cy.wait(1000)
		cy.get('#Description').click({force:true})
		cy.get('#Description').clear()
		cy.get('#Description').type('AspNetCore')
		
		cy.get('#Cost').click({force:true})
		cy.get('#Cost').clear()
		cy.get('#Cost').type('4500')
		
		cy.wait(1000)
		
		cy.fixture(imagfilePath, 'binary')
		.then(Cypress.Blob.binaryStringToBlob)
		.then(fileContent => {
		cy.get('#imagefile').upload({
		fileContent,
		fileName: imagfilePath,
		mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
		encoding: 'utf8'
		})
		})
		
		cy.get('#SubmitBtn').click({force: true})
		cy.wait(2000)
								
		//cy.get(".toast-message").invoke('text').then((text) => {
			//cy.log(text.trim())	
		   //expect(text.trim()).equal('Records Saved Successfully.!')	
	   //})
	
	}) 
	
	it('Training Details Edit ', function() {
		cy.wait(2000)
		cy.get('.fa-edit').eq(0).click({force: true})
		cy.wait(2000)
		
		cy.get('#NameUP').then($input => {
			expect($input.val()).to.contain('dotnetcore')
		})
		
		cy.get("#DescriptionUP").invoke('text').then((text) => {
				expect(text.trim()).equal('AspNetCore')	
		})
		
		cy.get('#TimeLimitUP').then($input => {
			expect($input.val()).to.contain('180')
		})
		
		cy.get('#PassingUP').then($input => {
			expect($input.val()).to.contain('45')
		})
		
		cy.get('#createdDateUP').then($input => {
			expect($input.val()).to.contain(currentDate)
		})
		
		cy.get('#ExpiryDateUP').then($input => {
			expect($input.val()).to.contain(currentDate)
		})
		
		cy.get('#CostUP').then($input => {
			expect($input.val()).to.contain('4500')
		})
		
	}) 
	
	it('Training Configuration with No Option', function() {
		cy.wait(1000)
		cy.xpath("//a[contains(text(),'Training Configuration')]").click({force:true})
		cy.wait(2000)
		cy.get('#Notification').not('[disabled]').check({force: true}).should('be.checked')
		cy.wait(1000)
		cy.get('#Email').click({force:true})
		cy.get('#Email').clear()
		cy.get('#Email').type('administrator@bhagya.com')
		
		cy.wait(1000)
		
		cy.get('#btnConfigsave').click({force:true})
		cy.wait(1000)
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())	
		   expect(text.trim()).equal('Record Saved Successfully')	
	   })
	
	}) 
	
	it('Training Configuration with yes Option', function() {
		
		cy.wait(2000)
		cy.get('#ReattendTraining').check('True',{force: true})
		cy.wait(1000)
		cy.get('#Notification').not('[disabled]').check({force: true}).should('be.checked')
		cy.wait(1000)
		cy.get('#Email').click({force:true})
		cy.get('#Email').clear()
		cy.get('#Email').type('administrator@bhagya.com')
		cy.wait(1000)
		cy.get('#btnConfigsave').click({force:true})
		cy.wait(1000)
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())	
		   expect(text.trim()).equal('Record Saved Successfully')	
	   })
	
	}) 
	
	it('Referance Material for VideoUrl', function() {
		cy.visit('https://next.pockethrms.com/Settings/Employee/Index?module=Training&submodule=Training')
		cy.wait(2000)
		cy.get('.fa-edit').eq(0).click({force: true})
		cy.wait(2000)
		cy.xpath("//a[contains(text(),'Reference Material')]").click({force:true})
		cy.wait(2000)
		cy.get('#insUp').click({force:true})
		cy.wait(1000)
		  cy.get(".toast-message").invoke('text').then((text) => {
			if(text.trim()=='Please select content')	{
			cy.wait(1000)
			cy.get(".toast-message").eq(0).click({force: true})
			  cy.get('#content').select('VideoUrl',{force: true})
			}
		 })
		
		  cy.wait(2000)
		cy.get('#insUp').click({force:true})
		  cy.get(".toast-message").invoke('text').then((text) => {
			if(text.trim()=='Enter Url')	{
			cy.wait(1000)
			cy.get(".toast-message").eq(0).click({force: true})
				cy.wait(1000)
				cy.get('#urls').click({force:true})
				cy.get('#urls').clear()
				cy.get('#urls').type('https://next.pockethrms.com/')
			}
		 })
		cy.wait(1000)
		cy.get('#insUp').click({force:true})
		//cy.get(".toast-message").invoke('text').then((text) => {
			//cy.log(text.trim())	
		   //expect(text.trim()).equal('Records Saved Successfully.!')	
	   //}
	}) 
	
	
	it('Referance Material Edit for VideoUrl', function() {
		cy.wait(2000)
		cy.get('.fa-edit').eq(0).click({force: true})
		cy.wait(2000)
		cy.xpath("//a[contains(text(),'Reference Material')]").click({force:true})
		cy.wait(2000)
		cy.xpath("//table[@id='tableSorter']//tr[1]//td[4]//button[1]").eq(0).click({force:true})
		
		cy.wait(1000)
		cy.get('#content').then($input => {
			expect($input.val()).to.contain('VideoUrl')
		})
		
		//cy.get('#urls').then($input => {
			//expect($input.val()).to.contain('https://next.pockethrms.com/')
		//})
		
		cy.get('#urls').click({force:true})
		cy.get('#urls').clear()
		cy.get('#urls').type('https://cloud.pockethrms.com/')
		cy.wait(1000)
		cy.get('#insUp').click({force:true})
		//cy.get(".toast-message").invoke('text').then((text) => {
			//cy.log(text.trim())	
		   //expect(text.trim()).equal('Records Saved Successfully.!')	
	   //}
	})
	
	
	
	/*
	it('Referance Material for Files', function() {
		cy.wait(2000)
		cy.get('.fa-edit').eq(0).click({force: true})
		cy.wait(2000)
		cy.xpath("//a[contains(text(),'Reference Material')]").click({force:true})
		cy.wait(2000)
		 cy.get('#content').select('Files',{force: true})
		 cy.wait(2000)
		
		cy.fixture(filepathref, 'binary')
		.then(Cypress.Blob.binaryStringToBlob)
		.then(fileContent => {
		cy.get('#uploadFile').upload({
		fileContent,
		fileName: filepathref,
		mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
		encoding: 'utf8'
		})
		})
		cy.wait(3000)
		cy.get('#fileName').click({force:true})
		cy.get('#fileName').clear()
		cy.get('#fileName').type('https://cloud.pockethrms.com/')
		
		cy.wait(1000)
		cy.get('#insUp').click({force:true})
		//cy.get(".toast-message").invoke('text').then((text) => {
			//cy.log(text.trim())	
		   //expect(text.trim()).equal('Records Saved Successfully.!')	
	   //}
	})	
		
	*/
	
	
	
	
	it('Employee Mapping', function() {
		cy.wait(2000)
		cy.get('.fa-edit').eq(0).click({force: true})
		cy.wait(2000)
		cy.xpath("//a[contains(text(),'Employee Mapping')]").click({force:true})
		cy.wait(2000)
		cy.get('#btnaddEmployee').click({force: true})
		cy.wait(2000)
		
		cy.get('#btnEmpMapsave').click({force: true})
		cy.wait(1000)
		  cy.get(".toast-message").invoke('text').then((text) => {
			if(text.trim()=='Please Select Employee')	{
			cy.wait(1000)
			cy.get(".toast-message").eq(0).click({force: true})
			    cy.get('.select2-selection--multiple').click({force: true})
				cy.wait(2000)
				cy.get('input[type="search"]').eq(0).click({force: true})
				cy.get('input[type="search"]').eq(0).type('CY4')
				cy.wait(2000)
				cy.get('.select2-results__option--highlighted').click({force: true})
			}
		 })
			
		cy.wait(2000)
		cy.get('#btnEmpMapsave').click({force: true})
		  cy.get(".toast-message").invoke('text').then((text) => {
			if(text.trim()=='Select Training.!')	{
			cy.wait(1000)
			cy.get(".toast-message").eq(0).click({force: true})
				cy.wait(1000)
				cy.get('#drptrainingid').select('dotnetcore',{force: true})
			}
		 })
		cy.wait(1000)
		cy.get('#btnEmpMapsave').click({force: true})
		cy.wait(2000)
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())	
		   expect(text.trim()).equal('Record Saved successfully!')	
		   cy.get(".toast-message").click({force: true})
	   })
	
	})
	
	it('Employee already assigned', function() {
		cy.get('.select2-selection__choice__remove').click({force: true})
		cy.wait(2000)
		 cy.get('.select2-selection--multiple').click({force: true})
		cy.wait(2000)
		cy.get('input[type="search"]').eq(0).click({force: true})
		cy.get('input[type="search"]').eq(0).type('CY4')
		cy.wait(2000)
		cy.get('.select2-results__option--highlighted').click({force: true})
		cy.wait(1000)
		cy.get('#drptrainingid').select('dotnetcore',{force: true})
		cy.get('#btnEmpMapsave').click({force: true})
		cy.wait(2000)
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())	
		   expect(text.trim()).equal('Employee already assigned for this training.!')
		   cy.get(".toast-message").click({force: true})
	   })
	
	})
	
	
	it('New Employee Mapping', function() {
		cy.get('.select2-selection__choice__remove').click({force: true})
		cy.wait(2000)
		 cy.get('.select2-selection--multiple').click({force: true})
		cy.wait(2000)
		cy.get('input[type="search"]').eq(0).click({force: true})
		cy.get('input[type="search"]').eq(0).type('CY3')
		cy.wait(2000)
		cy.get('.select2-results__option--highlighted').click({force: true})
		cy.wait(1000)
		cy.get('#drptrainingid').select('dotnetcore',{force: true})
		cy.get('#btnEmpMapsave').click({force: true})
	
		cy.wait(2000)
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())	
		   expect(text.trim()).equal('Record Saved successfully!')
			cy.get(".toast-message").click({force: true})
	   })
	
	})
	
	
	/*
	it('Employee Mapping Edit', function() {
		cy.get('.select2-selection__choice__remove').click({force: true})
		cy.wait(2000)
		cy.xpath("//tbody[@id='UpdateMap']//tr[2]//td[4]//button[1]").click({force: true})
		cy.wait(2000)
		
		cy.get('.select2-selection__choice__remove').click({force: true})
		cy.wait(1000)
		 cy.get('.select2-selection--multiple').click({force: true})
		cy.wait(2000)
		cy.get('input[type="search"]').eq(0).click({force: true})
		cy.get('input[type="search"]').eq(0).type('CY10')
		cy.wait(2000)
		cy.get('.select2-results__option--highlighted').click({force: true})
		cy.get('#btnEmpMapsave').click({force: true})
	
		cy.wait(2000)
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())	
		   expect(text.trim()).equal('Record Saved successfully!')
			cy.get(".toast-message").click({force: true})
	   })
	
	})
	*/
	
	it('Add Sessions', function() {
		cy.wait(1000)
		cy.xpath("//a[contains(text(),'Sessions')]").click({force:true})
		cy.wait(2000)
		
		cy.get('#btnsave').click({force: true})
		cy.wait(1000)
		  cy.get(".toast-message").invoke('text').then((text) => {
			if(text.trim()=='Please Enter Description !!')	{
			cy.wait(1000)
			cy.get(".toast-message").eq(0).click({force: true})
			   cy.get('#description').click({force:true})
				cy.get('#description').clear()
				cy.get('#description').type('dotnetcore structure')
			}
		 })
		 
		   cy.wait(2000)
			cy.get('#select2-multiEmpsess-container').click({force: true})
		    cy.wait(2000)
			cy.get('input[type="search"]').eq(1).click({force: true})
			cy.get('input[type="search"]').eq(1).type('CY1')
			cy.wait(2000)
			cy.get('.select2-results__option--highlighted').click({force: true})
		
		 
		
		  cy.wait(2000)
		cy.get('#btnsave').click({force: true})
		  cy.get(".toast-message").invoke('text').then((text) => {
			if(text.trim()=='Please Enter Start Hour !!')	{
			cy.wait(1000)
			cy.get(".toast-message").eq(0).click({force: true})
				cy.get('#startHour').click({force:true})
				cy.get('#startHour').clear()
				cy.get('#startHour').type('15')
			}
		 })
		 
		 
		   cy.wait(2000)
		cy.get('#btnsave').click({force: true})
		  cy.get(".toast-message").invoke('text').then((text) => {
			if(text.trim()=='Please Enter Start Minutes !!')	{
			cy.wait(1000)
			cy.get(".toast-message").eq(0).click({force: true})
				cy.get('#startMinutes').click({force:true})
				cy.get('#startMinutes').clear()
				cy.get('#startMinutes').type('30')
			}
		 })
		 
		  cy.wait(2000)
		cy.get('#btnsave').click({force: true})
		  cy.get(".toast-message").invoke('text').then((text) => {
			if(text.trim()=='Please Enter End Hour !!')	{
			cy.wait(1000)
			cy.get(".toast-message").eq(0).click({force: true})
				cy.get('#endtHour').click({force:true})
				cy.get('#endtHour').clear()
				cy.get('#endtHour').type('18')
			}
		 })
		 
		 
		   cy.wait(2000)
		cy.get('#btnsave').click({force: true})
		  cy.get(".toast-message").invoke('text').then((text) => {
			if(text.trim()=='Please Enter End Minutes !!')	{
			cy.wait(1000)
			cy.get(".toast-message").eq(0).click({force: true})
				cy.get('#endMinutes').click({force:true})
				cy.get('#endMinutes').clear()
				cy.get('#endMinutes').type('30')
			}
		 })
		 
		    cy.wait(2000)
			cy.get('#btnsave').click({force: true})
		  cy.get(".toast-message").invoke('text').then((text) => {
			if(text.trim()=='Please Select Location')	{
			cy.wait(1000)
			cy.get(".toast-message").eq(0).click({force: true})
				cy.get('#location').select('Mumbai',{force: true})
			}
		 })
		cy.get('#isCompulsory').not('[disabled]').check({force: true}).should('be.checked')
		
		cy.wait(2000)
		cy.get('#btnsave').click({force: true})
		cy.wait(2000)
		cy.get(".toast-message").invoke('text').then((text) => {
		   expect(text.trim()).equal('Session Save Successfully')
	   })
		
	})
	

	it('Session Details', function() {
		cy.wait(1000)
		cy.xpath("//a[contains(text(),'Session Details')]").click({force:true})
		cy.wait(2000)
		cy.get('.btn-dark').eq(0).click({force: true})
		cy.wait(2000)
		
		cy.get('input[name=Date]').eq(0).then($input => {
			expect($input.val()).to.contain(currentDate)
		})
		
		cy.get('#startHour').then($input => {
			expect($input.val()).to.contain('15')
		})
		
		cy.get('#startMinutes').then($input => {
			expect($input.val()).to.contain('30')
		})
		
		cy.get('#endtHour').then($input => {
			expect($input.val()).to.contain('18')
		})
		
		cy.get('#endMinutes').then($input => {
			expect($input.val()).to.contain('30')
		})
		
		cy.wait(2000)
		
		 cy.get('.table-responsive > #tblLoanDeviation > tr > td > #endMinutes').click()
		 cy.get('.table-responsive > #tblLoanDeviation > tr > td > #endMinutes').clear()
		cy.get('.table-responsive > #tblLoanDeviation > tr > td > #endMinutes').type('40')
		cy.wait(1000)
		cy.get('[onclick="SessionRowin()"]').click({force: true})
		
	})
	
	it('Training Quiz', function() {
		cy.wait(4000)
		cy.xpath("//a[contains(text(),'Training Quiz')]").click({force:true})
		cy.wait(2000)
		cy.get('#btnSaveQuiz').click({force: true})
		cy.wait(1000)
		  cy.get(".toast-message").invoke('text').then((text) => {
			if(text.trim()=='Please Enter Title.!')	{
			cy.wait(1000)
			cy.get(".toast-message").eq(0).click({force: true})
			   cy.get('#title').click({force:true})
				cy.get('#title').clear()
				cy.get('#title').type('Online Exam Test')
			}
		 })
		 
		 
		 
		  cy.wait(2000)
			cy.get('#btnSaveQuiz').click({force: true})
		  cy.get(".toast-message").invoke('text').then((text) => {
			if(text.trim()=='Please Enter Instruction.!')	{
			cy.wait(1000)
			cy.get(".toast-message").eq(0).click({force: true})
				cy.get('#instruction').click({force:true})
				cy.get('#instruction').clear()
				cy.get('#instruction').type('Demo Instruction')
			}
		 })
		cy.wait(1000)
		cy.get('#btnSaveQuiz').click({force: true})
		cy.wait(1000)
		cy.get(".toast-message").invoke('text').then((text) => {
		   expect(text.trim()).equal('Data Save Successfully.')
	   })
	}) 
	
	it('Add Multiple Question', function() {
		cy.get('[value="Add Question"]').click({force: true})
		cy.wait(2000)
		cy.get('#questionMain').click({force:true})
		cy.get('#questionMain').clear()
		cy.get('#questionMain').type('What is your Page Life cycle in aspnet?')
		cy.wait(1000)
		//cy.get('#aYes').check({force: true})
		
		cy.get('.correctAns').eq(0).check({force: true})
		
		cy.get('.ansText').click({force:true})
		cy.get('.ansText').clear()
		cy.get('.ansText').type('Test Answer Pgae cycle')
		cy.wait(1000)
		cy.get('#insUpQuestion').click({force:true})
		cy.wait(1000)
		cy.get(".toast-message").invoke('text').then((text) => {
		   expect(text.trim()).equal('Data Save Successfully')
	   })
	   
	   cy.wait(3000)
	   cy.get('#questionMain').click({force:true})
		cy.get('#questionMain').clear()
		cy.get('#questionMain').type('What is your Session Management?')
		
		cy.wait(1000)
		cy.get('.ansText').click({force:true})
		cy.get('.ansText').clear()
		cy.get('.ansText').type('Test Answer Session')
		
		cy.wait(2000)
		cy.get('.correctAns').eq(0).check({force: true})
		cy.wait(2000)
		cy.get('#insUpQuestion').click({force:true})
	})	
	
	
	}) 
	