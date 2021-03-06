import { fstat } from "fs"
import OPMImagesParser from "../parsers/OPMImagesParser"
import OPMRequest from "../requests/OPMRequest"

const fs = require('fs')

export default class OPMChapterImagesHandler {
    private url: string

    private chapter: string

    private opmRequest: OPMRequest

    private imagesStorageDirectory: string = __dirname + "/gui/res/i/"

    constructor(chapter: string, url: string) {
        this.opmRequest = new OPMRequest
        this.url = url
        this.chapter = chapter
    }

    async fetch() {
        let images = await this.getImages()        
        return images
    }

    async getImages() {
        let images: any = this.readImages()

        if (!images) {
            const fd            = await this.opmRequest.getImages(this.url)
            let opmImageParser  = new OPMImagesParser(fd)
            images              = opmImageParser.parse()
            if (images.response)
                this.storeImages(images.response)
        } 

        return images
    }

    storeImages(images: any) {
        return false
        let storeImages = JSON.stringify(images)
        fs.writeFileSync(this.getFilePath(), storeImages)
    }

    readImages() {
        return false
        if (fs.existsSync(this.getFilePath()))
            return JSON.parse(fs.readFileSync(this.getFilePath()))
    }

    getFilePath() {
        this.createDirectoryIfDoesntExist()
        let chapter = this.chapter.replace(" ", "_")
        let file = `${this.imagesStorageDirectory}/${chapter}.json`
        return file
    }

    createDirectoryIfDoesntExist() {
        if (!fs.existsSync(this.imagesStorageDirectory)) {
            fs.mkdirSync(this.imagesStorageDirectory);
        }
    }
}