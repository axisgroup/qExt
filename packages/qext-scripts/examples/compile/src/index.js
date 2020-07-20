// import {
// 	initialProperties,
// 	template,
// 	definition,
// 	controller,
// 	paint,
// 	resize,
// } from "./methods"
import { Subject } from "rxjs/_esm2015"
import { map } from "rxjs/_esm2015/operators"
import "./style.css"

window.define([], function() {
	const element = document.createElement("pre")

	const a$ = new Subject()

	a$.pipe(
		map(a => a)
		// tap(a => a)
	).subscribe(console.log)

	a$.next("webpack")
	// Lodash, currently included via a script, is required for this line to work
	// element.innerHTML = join(["Hello", "webpack"], " ")
	element.innerHTML = ["Hello webpack", "5 cubed is equal to " + 125].join("\n\n")
	element.classList.add("hello")

	return element
	// return {
	// 	initialProperties,
	// 	template,
	// 	definition,
	// 	controller,
	// 	paint,
	// 	resize,
	// }
})
