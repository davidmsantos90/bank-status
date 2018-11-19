import express from "express"

import dataRoutes from "./endpoints/data"

const SERVER_PORT = 1337
const app = express()

app.use(dataRoutes)

/*
 * ### Start The Server ###
 */
app.listen(SERVER_PORT, () => {
	console.log(`Bank Server started, listenning on ${ 'http://localhost:' + SERVER_PORT }`)
})
