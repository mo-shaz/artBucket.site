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

// A reactive variable for the add product image
export let addProductImage = writable("")

// A reactive array of products
export let productsArray = writable([])


// A function to check whitespace
export const checkSpaces = (str) => {

    // Iterate through the string
    const theLength = str.length
    for (let i = 0; i < theLength; i++) {

        // check if the character is a space character
        if (str.charCodeAt(i) == 32) return false
    }

    // if no spaces
    return true
}


// The email invite string, used by Join and Register routes
export const emailInvite = writable(sessionStorage.getItem("emailInvite") || "")

emailInvite.subscribe(value => {
    sessionStorage.setItem("emailInvite", value)
})
