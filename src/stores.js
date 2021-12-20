import { writable, readable } from 'svelte/store'


// The server url
export const api = readable("http://localhost:8080")

// Dashboard Profile Picture URL
export let profileUrl = writable("")

// The email invite string, used by Join and Register routes
export const emailInvite = writable(sessionStorage.getItem("emailInvite") || "")

emailInvite.subscribe(value => {
    sessionStorage.setItem("emailInvite", value)
})
