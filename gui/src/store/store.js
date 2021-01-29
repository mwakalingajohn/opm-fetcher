import { writable } from "svelte/store"
import { readFile } from "./util"
import axios from "axios"

export const ROOT_URL  = "http://localhost:1700"

export const images = writable([]) 
export const currentImageIndex = writable("")
export const imageLoading = writable(false)