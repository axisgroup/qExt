import { Observable } from "rxjs"
import fs from "fs-extra"

export default config =>
	Observable.create(observer => {
		const { desktopDeploy, extension, output } = config
		const { destination } = desktopDeploy
		const emptyDestination = fs.emptyDir(`${destination}/${extension}`)

		const copyDistribution = emptyDestination.then(() =>
			fs.copy(`${output}/${extension}`, `${destination}/${extension}`)
		)

		copyDistribution
			.then(() => {
				observer.next(`${extension} copied`)
				observer.complete()
			})
			.catch(observer.error)
	})
