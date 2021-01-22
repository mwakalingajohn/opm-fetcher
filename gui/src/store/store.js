import { writable } from "svelte/store"
import { readFile } from "./util"
import axios from "axios"

export const ROOT_URL  = ""

export const images = writable([]) 
export const currentImageIndex = writable("")