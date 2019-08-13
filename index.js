const express = require('express');
const handlebars = require('express-handlebars');

const PORT = 80;
const PAGES = {
	Home: ['home', '/home', true],
	About: ['about', '/about', true],
	Store: ['store', '/store', true],
	Contact: ['contact', '/contact', true]
};

const app = express();

app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.static('public'));

for (let name in PAGES) {
	const file = PAGES[name][0];
	const url = PAGES[name][1];
	app.get(url, (req, res) => {
		let links = '';
		for (let key in PAGES) {
			const page = PAGES[key];
			if (page[2]) {
				const className = key == name ? 'class=current-page' : '';
				links += `<li><a ${className} href="${page[1]}">${key}</a></li>`;
			}
		}
		res.render(file, {
			page: name,
			navigationLinks: links
		});
	});
}

app.listen(PORT, () => {
	console.log(`Generic server now listening on port ${PORT}.`)
});