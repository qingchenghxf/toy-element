import { makeInstaller} from "@hsy-element/utils"
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import components from "./components"
import '@hsy-element/theme/index.css'

library.add(fas);

const installer = makeInstaller(components)

export * from '@hsy-element/components'
export default installer