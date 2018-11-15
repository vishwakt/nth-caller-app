const { RNode } = require('rchain-api');
const grpc = require('grpc');

const myNode = RNode(grpc, {host: 'localhost', port: 40401});

const deploy1 = {
    term:'@"testchan"!(4)',
    timestamp: (new Date()).valueOf(), 
    phloLimit:{value:999999}, 
    phloPrice:{value:1}
}

main();

async function main() {
    const message1 = await myNode.doDeploy(deploy1);
    console.log("deploy 1 was: " + message1)
    
}
