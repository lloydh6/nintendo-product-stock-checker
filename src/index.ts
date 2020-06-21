import 'reflect-metadata'
import {App, appContainer} from './app'

const app = appContainer.resolve(App)

app.start()
