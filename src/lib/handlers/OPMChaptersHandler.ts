import OPMRequest from "../requests/OPMRequest";
import OPMChaptersParser from "../parsers/OPMChaptersParser";
import ParseResponse from "../parsers/ParseResponse"

const fs = require('fs')

export default class OPMChaptersHandler {

    private url: string = "https://ldkmanga.com/"

    private opmRequest: OPMRequest

    private storageDirectory: string = "./.cache"

    private chaptersStorage: string = "chptrs.json"

    constructor() {
        this.opmRequest = new OPMRequest
    }

    async fetch() {
        return await this.getChapters()
    }

    async getChapters() {

        let chapters: any = this.readChapters()

        if (!chapters) {
            const fd        = await this.opmRequest.getChapters(this.url)
            let opmParser   = new OPMChaptersParser(fd)
            chapters        = opmParser.parse()

            if (chapters.response)
                this.storeChapters(chapters)
        }


        return chapters
    }

    storeChapters(chapters: any) {
        this.createDirectoryIfDoesntExist()
        let storeChapters   = JSON.stringify(chapters)
        let file            = `${this.storageDirectory}/${this.chaptersStorage}`
        fs.writeFileSync(file, storeChapters)
    }

    readChapters() {
        if (fs.existsSync(this.chaptersStorage))
            return JSON.parse(fs.readFileSync(this.chaptersStorage))
    }

    createDirectoryIfDoesntExist() {
        if (!fs.existsSync(this.storageDirectory)) {
            fs.mkdirSync(this.storageDirectory);
        }
    }
}