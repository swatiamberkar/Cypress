
var fs = require('fs');
var Crypto = require('crypto-js')

describe("Dynamically Generated Tests", () => {
	 var loadEvent = "not fired"
	//var company='Test_94';
	window.addEventListener("load", function(event) {
	console.log("load event fired!");
	loadEvent = "fired";
	});
	
	var company='ABC INDIA PVT LTD'
	//var company='Chennai Demo Company'
		
	var module =['Separation', 'Birthday' ]
	
	var current_FilePath = 'D:\\CyPress Demo\\cypress\\ExcelFiles\\Current_Downloads\\';
	var current_File = ['Separation', 'Birthday' ]
		
	var exiting_FilePath = 'D:\\CyPress Demo\\cypress\\ExcelFiles\\Exiting_Downloads\\';
	var exiting_File = ['Separation', 'Birthday' ]
	
	
	var separation = 'Separation'
	var joinedList  = 'Joined List'
	var pendingFnF = 'PendingFnF'
	var release = 'Release'
	var birthday = 'Birthday'
	var marriageAnniversary = 'MarriageAnniversary'
	var age ='AgeReport'
	
	
	function submit() {
    const button = cy.get('input[value="Excel Download"]');
    button.click();
  }
  
	Cypress.Commands.add('downloadFile1',(done)=>{
	cy.task('downloadFile')
	})
	
	function keepCalmAndCarryOn () {
	cy.visit('https://pockethrmsnext.azurewebsites.net/') 
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
	
	it('navigate to HR Reports', function() {
		
	cy.xpath("//i[@class='dripicons-menu nav-icon']").click({force: true})
	
	 cy.xpath("//span[contains(text(),'Analytics')]").click({force: true})
 
	 cy.xpath("//a[@class='nav-link']//span[contains(text(),'Reports')]").click({force: true})
	})	
	


	it('Download Excel File - Separation', function() {
	cy.wait(2000)
	
	//cy.xpath("//li[@class='list-group-item']//span[contains(text(),'Separation')]").click({force: true})
	
	cy.visit("https://pockethrmsnext.azurewebsites.net/Reports/Report/Index?module=hr&submodule=Separation")	
	cy.wait(5000) 
 
    cy.xpath("//select[@name='startMonth']").select('1')
 

    cy.xpath("//select[@name='endMonth']").select('12')
 
	cy.get('#catall').click({force: true})
	
  
	cy.get('input[value="Excel Download"]').click({force: true})
	
	
	cy.log(loadEvent)
		Cypress.on('uncaught:exception', (err,runnable) => {
                        return false;
                });
				cy.wait(5000)
		cy.clearLocalStorage()
	
	})
	
	
/*	it('Convert Excel to Txt File & verify Checksum - Separation', function() {
	cy.wait(2000)
	cy.task('convertExcelToJson_CurrentFile',{file:separation, fileName:current_FilePath + separation +'.xlsx'})
	
	cy.task('convertExcelToJson_ExitingFile',{file:separation, fileName:exiting_FilePath +'HR\\'+ separation +'.xlsx'})
	
	
	
	// Get & Compare Checksum of Download file Json & Exting file Json
	 cy.readFile(exiting_FilePath + separation + '.txt').then((text) =>{
		var existing_TxtChecksum = Crypto.MD5(text).toString().trim()
		 cy.log("existing_TxtChecksum: "+ existing_TxtChecksum)
		 
		  cy.readFile(current_FilePath + separation + '.txt').then((text1) =>{
		var current_TxtChecksum = Crypto.MD5(text1).toString().trim()
		 cy.log("current_TxtChecksum: "+ current_TxtChecksum)
		 
		 expect(existing_TxtChecksum).to.eq(current_TxtChecksum)
		 
		  })
	 })		  
		 // Delete Files
	cy.task('deleteFile',{fileName:exiting_FilePath + separation + '.txt'})
	cy.task('deleteFile',{fileName:current_FilePath + separation + '.txt'})
	cy.task('deleteFile',{fileName:current_FilePath + separation + '.xlsx'})
	
	
})

	it('Download PDF File - Separation', function() {
	cy.wait(2000)
	//cy.xpath("//li[@class='list-group-item']//span[contains(text(),'Separation')]").click({force: true})
	cy.visit("https://pockethrmsnext.azurewebsites.net/Reports/Report/Index?module=hr&submodule=Separation")	
	cy.wait(5000) 
 
    cy.xpath("//select[@name='startMonth']").select('1')
 

    cy.xpath("//select[@name='endMonth']").select('12')
 
	cy.get('#catall').click({force: true})
	
  
	cy.get('input[value="PDF Download"]').click({force: true})
	
	})

	it('Convert PDF Report into Txt file & Verify Checksum of Separation', function() {
		cy.wait(2000)
		cy.task('convertPDFToJson_ExitingFile',{file:separation, fileName:exiting_FilePath +'HR\\'+ separation +'.pdf'})
	
		cy.wait(2000)
		cy.task('convertPDFToJson_CurrentFile',{file:separation, fileName:current_FilePath + separation +'.pdf'})
	
		// Get & Compare Checksum of Download file Json & Exting file Json
		cy.readFile(exiting_FilePath + separation + '.txt').then((text) =>{
		var existing_TxtChecksum = Crypto.MD5(text).toString().trim()
		cy.log("existing_TxtChecksum: "+ existing_TxtChecksum)
		 
		 cy.readFile(current_FilePath + separation + '.txt').then((text1) =>{
		var current_TxtChecksum = Crypto.MD5(text1).toString().trim()
		 cy.log("current_TxtChecksum: "+ current_TxtChecksum)
		 
		 expect(existing_TxtChecksum).to.eq(current_TxtChecksum)
		 
		  })
		})		
	 
	 
		// Delete Files
		cy.task('deleteFile',{fileName:exiting_FilePath + separation + '.txt'})
		cy.task('deleteFile',{fileName:current_FilePath + separation + '.txt'})
		cy.task('deleteFile',{fileName:current_FilePath + separation + '.pdf'})
	
	})		


	
	
	it('Download Excel File - Joined List', function() {
	cy.wait(2000)
	
		
	//cy.xpath("//li[@class='list-group-item']//span[contains(text(),'Joined List')]").click({force: true})
	cy.visit("https://pockethrmsnext.azurewebsites.net/Reports/Report/Index?module=hr&submodule=JoinedList")
		
	cy.wait(5000) 
 
    cy.xpath("//select[@name='startMonth']").select('1')
 

    cy.xpath("//select[@name='endMonth']").select('12')
 
	cy.get('#catall').click({force: true})
	
  
	cy.get('input[value="Excel Download"]').click({force: true})
	
	})
	
	
	it('Convert Excel to Txt File & verify Checksum - Joined List', function() {
	cy.wait(2000)
	cy.task('convertExcelToJson_CurrentFile',{file:joinedList, fileName:current_FilePath + joinedList +'.xlsx'})
	cy.task('convertExcelToJson_ExitingFile',{file:joinedList, fileName:exiting_FilePath +'HR\\'+ joinedList +'.xlsx'})
	
	
	
	// Get & Compare Checksum of Download file Json & Exting file Json
	 cy.readFile(exiting_FilePath + joinedList + '.txt').then((text) =>{
		var existing_TxtChecksum = Crypto.MD5(text).toString().trim()
		 cy.log("existing_TxtChecksum: "+ existing_TxtChecksum)
		 
		  cy.readFile(current_FilePath + joinedList + '.txt').then((text1) =>{
		var current_TxtChecksum = Crypto.MD5(text1).toString().trim()
		 cy.log("current_TxtChecksum: "+ current_TxtChecksum)
		 
		 expect(existing_TxtChecksum).to.eq(current_TxtChecksum)
		 
		  })
	 })		  
		 // Delete Files
	cy.task('deleteFile',{fileName:exiting_FilePath + joinedList + '.txt'})
	cy.task('deleteFile',{fileName:current_FilePath + joinedList + '.txt'})
	cy.task('deleteFile',{fileName:current_FilePath + joinedList + '.xlsx'})
	
	
})



	it('Download PDF File - Joined List', function() {
	cy.wait(2000)
		
	cy.visit("https://pockethrmsnext.azurewebsites.net/Reports/Report/Index?module=hr&submodule=JoinedList")
		
	cy.wait(5000) 
 
    cy.xpath("//select[@name='startMonth']").select('1')
 

    cy.xpath("//select[@name='endMonth']").select('12')
 
	cy.get('#catall').click({force: true})
	
  
	cy.get('input[value="PDF Download"]').click({force: true})
	
	})
	
	
	it('Convert PDF Report into Txt file & Verify Checksum of Joined List', function() {
		cy.wait(2000)
		cy.task('convertPDFToJson_CurrentFile',{file:separation, fileName:current_FilePath + joinedList +'.pdf'})
		
		cy.wait(2000)
		cy.task('convertPDFToJson_ExitingFile',{file:separation, fileName:exiting_FilePath +'HR\\'+ joinedList +'.pdf'})
	
		
	
		// Get & Compare Checksum of Download file Json & Exting file Json
		cy.readFile(exiting_FilePath + joinedList + '.txt').then((text) =>{
		var existing_TxtChecksum = Crypto.MD5(text).toString().trim()
		cy.log("existing_TxtChecksum: "+ existing_TxtChecksum)
		 
		 cy.readFile(current_FilePath + joinedList + '.txt').then((text1) =>{
		var current_TxtChecksum = Crypto.MD5(text1).toString().trim()
		 cy.log("current_TxtChecksum: "+ current_TxtChecksum)
		 
		 expect(existing_TxtChecksum).to.eq(current_TxtChecksum)
		 
		  })
		})		
	 
	 
		// Delete Files
		cy.task('deleteFile',{fileName:exiting_FilePath + joinedList + '.txt'})
		cy.task('deleteFile',{fileName:current_FilePath + joinedList + '.txt'})
		cy.task('deleteFile',{fileName:current_FilePath + joinedList + '.pdf'})
	
	})
	
	
	

	it('Download Excel File - PendingFnF', function() {
	cy.wait(2000)
		
	//cy.xpath("//li[@class='list-group-item']//span[contains(text(),'PendingFnF')]").click({force: true})
	
	cy.visit("https://pockethrmsnext.azurewebsites.net/Reports/Report/Index?module=hr&submodule=PendingFnF")	
	cy.wait(5000) 
 
    cy.xpath("//select[@name='startMonth']").select('1')
 

    cy.xpath("//select[@name='endMonth']").select('12')
 
	cy.get('#catall').click({force: true})
	
  
	cy.get('input[value="Excel Download"]').click({force: true})
	
	})
	
	
	it('Convert Excel to Txt File & verify Checksum - PendingFnF', function() {
	cy.wait(2000)
	cy.task('convertExcelToJson_CurrentFile',{file:pendingFnF, fileName:current_FilePath + pendingFnF +'.xlsx'})
	
	cy.task('convertExcelToJson_ExitingFile',{file:pendingFnF, fileName:exiting_FilePath +'HR\\'+ pendingFnF +'.xlsx'})
	
	// Get & Compare Checksum of Download file Json & Exting file Json
	 cy.readFile(exiting_FilePath + pendingFnF + '.txt').then((text) =>{
		var existing_TxtChecksum = Crypto.MD5(text).toString().trim()
		 cy.log("existing_TxtChecksum: "+ existing_TxtChecksum)
		 
		  cy.readFile(current_FilePath + pendingFnF + '.txt').then((text1) =>{
		var current_TxtChecksum = Crypto.MD5(text1).toString().trim()
		 cy.log("current_TxtChecksum: "+ current_TxtChecksum)
		 
		 expect(existing_TxtChecksum).to.eq(current_TxtChecksum)
		 
		  })
	 })		  
		 // Delete Files
	cy.task('deleteFile',{fileName:exiting_FilePath + pendingFnF + '.txt'})
	cy.task('deleteFile',{fileName:current_FilePath + pendingFnF + '.txt'})
	cy.task('deleteFile',{fileName:current_FilePath + pendingFnF + '.xlsx'})
	
	
})


	it('Download PDF File - PendingFnF', function() {
	cy.wait(2000)
		
	//cy.xpath("//li[@class='list-group-item']//span[contains(text(),'PendingFnF')]").click({force: true})
	
	cy.visit("https://pockethrmsnext.azurewebsites.net/Reports/Report/Index?module=hr&submodule=PendingFnF")	
	cy.wait(5000) 
 
    cy.xpath("//select[@name='startMonth']").select('1')
 

    cy.xpath("//select[@name='endMonth']").select('12')
 
	cy.get('#catall').click({force: true})
	
  
	cy.get('input[value="PDF Download"]').click({force: true})
	
	})


	it('Convert PDF Report into Txt file & Verify Checksum of Pending FnF', function() {
		cy.wait(2000)
		cy.task('convertPDFToJson_CurrentFile',{file:pendingFnF, fileName:current_FilePath + pendingFnF +'.pdf'})
		
		cy.wait(2000)
		cy.task('convertPDFToJson_ExitingFile',{file:pendingFnF, fileName:exiting_FilePath +'HR\\'+ pendingFnF +'.pdf'})
	
		
	
		// Get & Compare Checksum of Download file Json & Exting file Json
		cy.readFile(exiting_FilePath + pendingFnF + '.txt').then((text) =>{
		var existing_TxtChecksum = Crypto.MD5(text).toString().trim()
		cy.log("existing_TxtChecksum: "+ existing_TxtChecksum)
		 
		 cy.readFile(current_FilePath + pendingFnF + '.txt').then((text1) =>{
		var current_TxtChecksum = Crypto.MD5(text1).toString().trim()
		 cy.log("current_TxtChecksum: "+ current_TxtChecksum)
		 
		 expect(existing_TxtChecksum).to.eq(current_TxtChecksum)
		 
		  })
		})		
	 
	 
		// Delete Files
		cy.task('deleteFile',{fileName:exiting_FilePath + pendingFnF + '.txt'})
		cy.task('deleteFile',{fileName:current_FilePath + pendingFnF + '.txt'})
		cy.task('deleteFile',{fileName:current_FilePath + pendingFnF + '.pdf'})
	
	})
	
	

	it('Download Excel File - Release', function() {
	cy.wait(2000)
		
	//cy.xpath("//li[@class='list-group-item']//span[contains(text(),'Release')]").click({force: true})
	cy.visit("https://pockethrmsnext.azurewebsites.net/Reports/Report/Index?module=hr&submodule=Release")	
	
	cy.wait(5000) 
 
    cy.xpath("//select[@name='startMonth']").select('1')
 

    cy.xpath("//select[@name='endMonth']").select('12')
 
	cy.get('#catall').click({force: true})
	
  
	cy.get('input[value="Excel Download"]').click({force: true})
	
	})
	
	
	it('Convert Excel to Txt File & verify Checksum - Release', function() {
	cy.wait(2000)
	cy.task('convertExcelToJson_CurrentFile',{file:release, fileName:current_FilePath + release +'.xlsx'})
	cy.task('convertExcelToJson_ExitingFile',{file:release, fileName:exiting_FilePath +'HR\\'+ release +'.xlsx'})
	// Get & Compare Checksum of Download file Json & Exting file Json
	 cy.readFile(exiting_FilePath + release + '.txt').then((text) =>{
		var existing_TxtChecksum = Crypto.MD5(text).toString().trim()
		 cy.log("existing_TxtChecksum: "+ existing_TxtChecksum)
		 
		  cy.readFile(current_FilePath + release + '.txt').then((text1) =>{
		var current_TxtChecksum = Crypto.MD5(text1).toString().trim()
		 cy.log("current_TxtChecksum: "+ current_TxtChecksum)
		 
		 expect(existing_TxtChecksum).to.eq(current_TxtChecksum)
		 
		  })
	 })		  
		 // Delete Files
	cy.task('deleteFile',{fileName:exiting_FilePath + release + '.txt'})
	cy.task('deleteFile',{fileName:current_FilePath + release + '.txt'})
	cy.task('deleteFile',{fileName:current_FilePath + release + '.xlsx'})
	
	
})

	
	it('Download PDF File - Release', function() {
	cy.wait(2000)
		
	//cy.xpath("//li[@class='list-group-item']//span[contains(text(),'Release')]").click({force: true})
	cy.visit("https://pockethrmsnext.azurewebsites.net/Reports/Report/Index?module=hr&submodule=Release")	
	
	cy.wait(5000) 
 
    cy.xpath("//select[@name='startMonth']").select('1')
 

    cy.xpath("//select[@name='endMonth']").select('12')
 
	cy.get('#catall').click({force: true})
	
  
	cy.get('input[value="PDF Download"]').click({force: true})
	
	})
	
	it('Convert PDF Report into Txt file & Verify Checksum of Release', function() {
		cy.wait(2000)
		cy.task('convertPDFToJson_CurrentFile',{file:release, fileName:current_FilePath + release +'.pdf'})
		
		cy.wait(2000)
		cy.task('convertPDFToJson_ExitingFile',{file:release, fileName:exiting_FilePath +'HR\\'+ release +'.pdf'})
	
		
	
		// Get & Compare Checksum of Download file Json & Exting file Json
		cy.readFile(exiting_FilePath + release + '.txt').then((text) =>{
		var existing_TxtChecksum = Crypto.MD5(text).toString().trim()
		cy.log("existing_TxtChecksum: "+ existing_TxtChecksum)
		 
		 cy.readFile(current_FilePath + release + '.txt').then((text1) =>{
		var current_TxtChecksum = Crypto.MD5(text1).toString().trim()
		 cy.log("current_TxtChecksum: "+ current_TxtChecksum)
		 
		 expect(existing_TxtChecksum).to.eq(current_TxtChecksum)
		 
		  })
		})		
	 
	 
		// Delete Files
		cy.task('deleteFile',{fileName:exiting_FilePath + release + '.txt'})
		cy.task('deleteFile',{fileName:current_FilePath + release + '.txt'})
		cy.task('deleteFile',{fileName:current_FilePath + release + '.pdf'})
	
	})


	it('Download Excel File - Birthday', function() {
	cy.wait(2000)
	
	cy.visit("https://pockethrmsnext.azurewebsites.net/Reports/Report/Index?module=hr&submodule=Birthday")	
	//cy.xpath("//li[@class='list-group-item']//span[contains(text(),'Birthday')]").click({force: true})
		
	cy.wait(5000) 
 
    cy.xpath("//select[@name='startMonth']").select('1')
 

    cy.xpath("//select[@name='endMonth']").select('12')
 
	cy.get('#catall').click({force: true})
	
  
	cy.get('input[value="Excel Download"]').click({force: true})
	
	})
	
	
	it('Convert Excel to Txt File & verify Checksum - Birthday', function() {
	cy.wait(2000)
	cy.task('convertExcelToJson_CurrentFile',{file:birthday, fileName:current_FilePath + birthday +'.xlsx'})
	
	cy.task('convertExcelToJson_ExitingFile',{file:birthday, fileName:exiting_FilePath +'HR\\'+ birthday +'.xlsx'})
	// Get & Compare Checksum of Download file Json & Exting file Json
	 cy.readFile(exiting_FilePath + birthday + '.txt').then((text) =>{
		var existing_TxtChecksum = Crypto.MD5(text).toString().trim()
		 cy.log("existing_TxtChecksum: "+ existing_TxtChecksum)
		 
		  cy.readFile(current_FilePath + birthday + '.txt').then((text1) =>{
		var current_TxtChecksum = Crypto.MD5(text1).toString().trim()
		 cy.log("current_TxtChecksum: "+ current_TxtChecksum)
		 
		 expect(existing_TxtChecksum).to.eq(current_TxtChecksum)
		 
		  })
	 })		  
		 // Delete Files
	cy.task('deleteFile',{fileName:exiting_FilePath + birthday + '.txt'})
	cy.task('deleteFile',{fileName:current_FilePath + birthday + '.txt'})
	cy.task('deleteFile',{fileName:current_FilePath + birthday + '.xlsx'})
})

it('Download PDF File - Birthday', function() {
	cy.wait(2000)
	
	cy.visit("https://pockethrmsnext.azurewebsites.net/Reports/Report/Index?module=hr&submodule=Birthday")	
	//cy.xpath("//li[@class='list-group-item']//span[contains(text(),'Birthday')]").click({force: true})
		
	cy.wait(5000) 
 
    cy.xpath("//select[@name='startMonth']").select('1')
 

    cy.xpath("//select[@name='endMonth']").select('12')
 
	cy.get('#catall').click({force: true})
	
  
	cy.get('input[value="PDF Download"]').click({force: true})
	
	})
	
	it('Convert PDF Report into Txt file & Verify Checksum of Birthday', function() {
		cy.wait(2000)
		cy.task('convertPDFToJson_CurrentFile',{file:birthday, fileName:current_FilePath + birthday +'.pdf'})
		
		cy.wait(2000)
		cy.task('convertPDFToJson_ExitingFile',{file:birthday, fileName:exiting_FilePath +'HR\\'+ birthday +'.pdf'})
	
		
	
		// Get & Compare Checksum of Download file Json & Exting file Json
		cy.readFile(exiting_FilePath + birthday + '.txt').then((text) =>{
		var existing_TxtChecksum = Crypto.MD5(text).toString().trim()
		cy.log("existing_TxtChecksum: "+ existing_TxtChecksum)
		 
		 cy.readFile(current_FilePath + birthday + '.txt').then((text1) =>{
		var current_TxtChecksum = Crypto.MD5(text1).toString().trim()
		 cy.log("current_TxtChecksum: "+ current_TxtChecksum)
		 
		 expect(existing_TxtChecksum).to.eq(current_TxtChecksum)
		 
		  })
		})		
	 
	 
		// Delete Files
		cy.task('deleteFile',{fileName:exiting_FilePath + birthday + '.txt'})
		cy.task('deleteFile',{fileName:current_FilePath + birthday + '.txt'})
		cy.task('deleteFile',{fileName:current_FilePath + birthday + '.pdf'})
	
	})
	
	
	
	
	it('Download Excel File - Marriage Anniversary', function() {
	cy.wait(2000)
	
	cy.visit("https://pockethrmsnext.azurewebsites.net/Reports/Report/Index?module=hr&submodule=MarriageAnniversary")		
	/cy.xpath("//li[@class='list-group-item']//span[contains(text(),'Marriage Anniversary')]").click({force: true})
		
	cy.wait(5000) 
 
    cy.xpath("//select[@name='startMonth']").select('1')
 

    cy.xpath("//select[@name='endMonth']").select('12')
 
	cy.get('#catall').click({force: true})
	
  
	cy.get('input[value="Excel Download"]').click({force: true})
	
	})
	
	
	it('Convert Excel to Txt File & verify Checksum - Marriage Anniversary', function() {
	cy.wait(2000)
	cy.task('convertExcelToJson_CurrentFile',{file:marriageAnniversary, fileName:current_FilePath + marriageAnniversary +'.xlsx'})
	cy.task('convertExcelToJson_ExitingFile',{file:marriageAnniversary, fileName:exiting_FilePath +'HR\\'+ marriageAnniversary +'.xlsx'})
	// Get & Compare Checksum of Download file Json & Exting file Json
	 cy.readFile(exiting_FilePath + marriageAnniversary + '.txt').then((text) =>{
		var existing_TxtChecksum = Crypto.MD5(text).toString().trim()
		 cy.log("existing_TxtChecksum: "+ existing_TxtChecksum)
		 
		  cy.readFile(current_FilePath + marriageAnniversary + '.txt').then((text1) =>{
		var current_TxtChecksum = Crypto.MD5(text1).toString().trim()
		 cy.log("current_TxtChecksum: "+ current_TxtChecksum)
		 
		 expect(existing_TxtChecksum).to.eq(current_TxtChecksum)
		 
		  })
	 })		  
		 // Delete Files
	cy.task('deleteFile',{fileName:exiting_FilePath + marriageAnniversary + '.txt'})
	cy.task('deleteFile',{fileName:current_FilePath + marriageAnniversary + '.txt'})
	cy.task('deleteFile',{fileName:current_FilePath + marriageAnniversary + '.xlsx'})
})

*/
/*	it('Download PDF File - Marriage Anniversary', function() {
	cy.wait(2000)
	
			cy.visit("https://pockethrmsnext.azurewebsites.net/Reports/Report/Index?module=hr&submodule=MarriageAnniversary")		

	cy.xpath("//li[@class='list-group-item']//span[contains(text(),'Marriage Anniversary')]").click({force: true})
		
	cy.wait(5000) 
 
    cy.xpath("//select[@name='startMonth']").select('1')
 

    cy.xpath("//select[@name='endMonth']").select('12')
 
	cy.get('#catall').click({force: true})
  
	//cy.get('input[value="PDF Download"]').click({force: true})
	cy.xpath('//input[@value="PDF Download"]').click({force: true})
	
	})
	
	it('Convert PDF Report into Txt file & Verify Checksum of Marriage Anniversary', function() {
		cy.wait(2000)
		cy.task('convertPDFToJson_CurrentFile',{file:marriageAnniversary, fileName:current_FilePath + marriageAnniversary +'.pdf'})
		
		cy.wait(2000)
		cy.task('convertPDFToJson_ExitingFile',{file:marriageAnniversary, fileName:exiting_FilePath +'HR\\'+ marriageAnniversary +'.pdf'})
	
		
	
		// Get & Compare Checksum of Download file Json & Exting file Json
		cy.readFile(exiting_FilePath + marriageAnniversary + '.txt').then((text) =>{
		var existing_TxtChecksum = Crypto.MD5(text).toString().trim()
		cy.log("existing_TxtChecksum: "+ existing_TxtChecksum)
		 
		 cy.readFile(current_FilePath + marriageAnniversary + '.txt').then((text1) =>{
		var current_TxtChecksum = Crypto.MD5(text1).toString().trim()
		 cy.log("current_TxtChecksum: "+ current_TxtChecksum)
		 
		 expect(existing_TxtChecksum).to.eq(current_TxtChecksum)
		 
		  })
		})		
	 
	 
		// Delete Files
		cy.task('deleteFile',{fileName:exiting_FilePath + marriageAnniversary + '.txt'})
		cy.task('deleteFile',{fileName:current_FilePath + marriageAnniversary + '.txt'})
		cy.task('deleteFile',{fileName:current_FilePath + marriageAnniversary + '.pdf'})
	
	})
	
	

	it('Download File - Age', function() {
	cy.wait(2000)
	
		
	cy.visit("https://pockethrmsnext.azurewebsites.net/Reports/Report/Index?module=hr&submodule=Age")	
	cy.xpath("//li[@class='list-group-item']//span[contains(text(),'Age')]").click({force: true})
		
	cy.wait(5000) 
 cy.xpath(" //input[@name='starting']").click()
 cy.xpath(" //input[@name='starting']").clear()
    cy.xpath(" //input[@name='starting']").type('18')
 
 cy.xpath(" //input[@name='interval']").click()
 cy.xpath(" //input[@name='interval']").clear()
    cy.xpath(" //input[@name='interval']").type('1')
 
	cy.get('#catall').click({force: true})
	
	cy.xpath("//button[@class='btn btn-xs btn-primary pr-btn']").click({force: true})
	
	})
		


it('Convert PDF Report into Txt file & Verify Checksum of Age', function() {
		cy.wait(2000)
		cy.task('convertPDFToJson_ExitingFile',{file:age, fileName:exiting_FilePath +'HR\\'+ age +'.pdf'})
	
		cy.wait(2000)
		cy.task('convertPDFToJson_CurrentFile',{file:age, fileName:current_FilePath + age +'.pdf'})
	
		// Get & Compare Checksum of Download file Json & Exting file Json
		cy.readFile(exiting_FilePath + age + '.txt').then((text) =>{
		var existing_TxtChecksum = Crypto.MD5(text).toString().trim()
		cy.log("existing_TxtChecksum: "+ existing_TxtChecksum)
		 
		 cy.readFile(current_FilePath + age + '.txt').then((text1) =>{
		var current_TxtChecksum = Crypto.MD5(text1).toString().trim()
		 cy.log("current_TxtChecksum: "+ current_TxtChecksum)
		 
		 expect(existing_TxtChecksum).to.eq(current_TxtChecksum)
		 
		  })
		})		
	 
	 
		// Delete Files
		cy.task('deleteFile',{fileName:exiting_FilePath + age + '.txt'})
		cy.task('deleteFile',{fileName:current_FilePath + age + '.txt'})
		cy.task('deleteFile',{fileName:current_FilePath + age + '.pdf'})
	
	})	
	*/

});