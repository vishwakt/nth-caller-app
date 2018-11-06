"use strict"

const express = require('express');
const bodyParser = require('body-parser');
const grpc = require('grpc');
const {RNode, RHOCore} = require('rchain-api');

//Setup host and ports
var host = process.argv[2] ?
process.argv[2] : "localhost"

var port = process.argv[3] ?
process.argv[3] : "40401"

var uiPort = process.argv[4] ?
process.argv[4] : "8080"

//Setup express app and Rnode connection
var myNode = RNode(grpc, {host, port})
var app = express()
app.use(bodyParser.json())
app.use(express.static(__dirname))


//Start express app
app.listen(uiPort, () => {
    console.log("Game dApp started.")
    console.log(`connected to RNode at ${host}:${port}.`)
    console.log(`started on ${uiPort}`)
})

// Handle registration of new games
app.post('/register', (req, res) => {
    let code = `@"nthcallerfactory"!("${req.body.id}", ${req.body.n})`
    let deployData = {term:code, timestamp: new Date(),phloLimit:"1"}
	console.log(deployData);

    myNode.doDeploy(deployData).then(result => {

        //make Rnode create a block
        return myNode.createBlock()
    }).then(result => {

        res.end(JSON.stringify({message:result}))
    }).catch(oops => {
        console.log(oops);
    })
})
