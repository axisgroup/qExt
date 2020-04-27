import localCSS from "./style.css"

window.define([], function() {
	const head = document.querySelector("head")
	const style = document.createElement("style")
	style.innerHTML = localCSS.toString()
	head.appendChild(style)

	return {
		paint: () => console.log("paint"),
	}
})
