class loader {
	constructor() { }
	static start() {
		if (this.position == undefined) this.position = 0
		if (this.progress == undefined) this.progress = 0
		if (this.interval == undefined) this.interval = null
		if (this.active == undefined) this.active = 0
		console.log(this.active);
		this.prepar()
		this.active++;
		document.getElementById('app-loader').innerHTML = '<div id="nprogress"><div class="bar" role="bar"><div class="peg"></div></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div></div>'
		let amount = 0;
		this.interval = setInterval(() => {
			if (this.progress >= 0 && this.progress < 0.2) amount = 0.1;
			else if (this.progress >= 0.2 && this.progress < 0.5) amount = 0.04;
			else if (this.progress >= 0.5 && this.progress < 0.8) amount = 0.02;
			else if (this.progress >= 0.8 && this.progress < 0.99) amount = 0.007;
			else {
				amount = 0
				clearInterval(this.interval)
				this.interval = null
			}
			this.pushBar(document, amount)
		}, 150)
	}
	static stop() {
		this.prepar()
		this.active--;
		if (this.active) return;
		document.getElementById('nprogress').getElementsByClassName('bar')[0].classList.add('loader-end')
		setTimeout(() => {
			document.getElementById('app-loader').innerHTML = ''
		}, 410)
	}
	static pushBar(document, progress) {
		const bar = document.getElementById('nprogress').getElementsByClassName('bar')[0]
		this.position += progress
		bar.style.width = this.position * 100 + '%'
		this.progress += progress
	}
	static prepar() {
		this.position = 0
		this.progress = 0
		if (this.interval) clearInterval(this.interval)
		this.interval = null;
	}
}
const load = new loader()
export { load as loader }

