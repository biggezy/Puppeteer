const puppeteer = require('puppeteer');

let scrape = async () => {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
 	await page.goto('https://www.oddsshark.com/nfl/scores');
	await page.waitFor(1000);
	
	// Selects all products on home page and scrapes the titles and prices
	// evaluate() allows use of build in DOM selectors like querySelector()
	const matchup_links = await page.evaluate(()=> {
		let links = []; // Create empty array
		let matchups = document.querySelectorAll('.matchup-container'); // Grab all products

		// Grab each url for every game's matchup
		matchups.forEach(matchup => {
			let url = matchup.querySelector('.base-versus').href;
			links.push(url);
		});		
		
		return links;
	});
	
	// Open first matchup in new tab
	const matchup_page = await browser.newPage();
	await matchup_page.goto(matchup_links.pop());
	await matchup_page.waitFor(1000);
	await matchup_page.close();
	
	// Close browser
	await browser.close()
	return matchup_links;  
};

scrape().then((value) => {
    console.log(value); // Success!
});
