import 'reflect-metadata'
import {StockChecker, stockCheckingContainer} from './stockChecker'

const stockChecker = stockCheckingContainer.resolve(StockChecker)

stockChecker.watch()
