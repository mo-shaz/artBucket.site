import { writable, readable } from 'svelte/store'

// The site url
export const url = readable("http://localhost:5000")

// The server url
export const api = readable("http://localhost:8080")

// The email invite string, used by Join and Register routes
export const emailInvite = writable(sessionStorage.getItem("emailInvite") || "")

emailInvite.subscribe(value => {
    sessionStorage.setItem("emailInvite", value)
})
