function replace(data, replaced) {
	if (!data) throw Error(`You must provide a data.`);
	if (!replaced) throw Error(`You must provide a replaced object.`)
	const keys = Object.keys(replaced)
	for (w of keys) {
		data = data.replace(w, replaced[w])
	}
	return data
}

module.exports = replace