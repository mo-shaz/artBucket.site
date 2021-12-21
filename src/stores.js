import { writable, readable } from 'svelte/store'


// The server url
export const api = readable("http://localhost:8080")

// Some Reactive variables for the Dashboard
export let profileUrl = writable("")
export let reactiveStoreName = writable("")
export let reactiveUserName = writable("")
export let reactiveTitle = writable("")
export let reactiveWhatsapp = writable("")
export let reactiveInstagram = writable("")
export let reactiveId = writable(0)

// The email invite string, used by Join and Register routes
export const emailInvite = writable(sessionStorage.getItem("emailInvite") || "")

emailInvite.subscribe(value => {
    sessionStorage.setItem("emailInvite", value)
})
