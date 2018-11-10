const puppeteer = require('puppeteer');

let scrape = async () => {
	const browser = await puppeteer.launch({headless:false});
	const page = await browser.newPage();
 	await page.goto('http://books.toscrape.com/');
	await page.waitFor(1000);
	
	// Simulate a click. Uses the "selector" of the link
	//await page.click('#default > div > div > div > div > section > div:nth-child(2) > ol > li:nth-child(1) > article > div.image_container > a > img');

	// Selects all products on home page and scrapes the titles and prices
	// evaluate() allows use of build in DOM selectors like querySelector()
	const result = await page.evaluate(()=> {
		let data = []; // Create empty array
		let products = document.querySelectorAll('.product_pod'); // Grab all products

		products.forEach(product => {
			let title = product.querySelector('h3').innerText;
			let price = product.querySelector('.price_color').innerText;
			
			data.push({title,price});
		});		
		
		return data;
	});

	browser.close()
	return result;  
};

scrape().then((value) => {
    console.log(value); // Success!
});
