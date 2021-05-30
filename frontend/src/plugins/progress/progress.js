module.exports = {
	position: 0,
	progress: 0,
	interval: null,
	start(document) {
		this.position = 0
		this.progress = 0
		clearInterval(this.interval)
		this.interval = null
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
	},
	stop() {
		if (this.interval) clearInterval(this.interval)
		document.getElementById('nprogress').getElementsByClassName('bar')[0].classList.add('end')
		setTimeout(() => {
			document.getElementById('app-loader').innerHTML = ''
		}, 410)
	},
	pushBar(document, progress) {
		const bar = document.getElementById('nprogress').getElementsByClassName('bar')[0]
		this.position += progress
		bar.style.width = this.position * 100 + '%'
		this.progress += progress
	}
}