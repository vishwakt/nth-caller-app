"use strict"

document.addEventListener("DOMContentLoaded", () => {
    let newGameId = document.getElementById('new-game-id')
    let n = document.getElementById('n')
    let callGameId = document.getElementById('call-game-id')
    let name = document.getElementById('name')
    let resultP = document.getElementById('status')

    document.getElementById('register').addEventListener('click', register)
    document.getElementById('call').addEventListener('click', call)

    function register() {
        if (newGameId.value === "" || n.value === "") {
            console.log("GameId and winning caller are required. No game is registered")
            return
        }

        let body = {
            id: newGameId.value,
            n: parseInt(n.value, 10),
        }

        makePost('/register', body)
        .then(data => {
            console.log(data.message)
        })
        newGameId.value = ""
    }

    function makePost(route, body) {
        let request ={
            method: 'POST', 
            headers: {
                'Accept': 'application/json',
                 'Content-type': 'application/json',
            },
            body:JSON.stringify(body)
        }
        return fetch(route, request)
        .then(res => {return res.json()})
    }

    function call(){
        if (callGameId.value === "") {
            console.log("GameID is is required. No call was made.")
            return
        }

        let body = {
            id: callGameId.value,
            name: name.value,
        }

        makePost('/call', body)
        .then(data => {
            if (!data.success) {
                console.log("No such game found. Enter valid game ID")
            } else {
                resultP.innerHTML = data.message
            }
        })
    }
})