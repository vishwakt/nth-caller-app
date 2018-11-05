"use strict"

document.addEventListener("DOMContentLoaded", () => {
    let newGameId = document.getElementById('new-game-id')
    let n = document.getElementById('n')

    document.getElementById('register').addEventListener('click', register)

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
})