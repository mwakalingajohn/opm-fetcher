import OPMRequest from "../requests/OPMRequest";
import OPMChaptersParser from "../parsers/OPMChaptersParser";

const fs = require('fs')

export default class OPMChaptersHandler {

    private url: string = "https://ldkmanga.com/"

    private opmRequest: OPMRequest

    private storageDirectory: string = __dirname + "/gui/res/"

    private chaptersStorage: string = "chptrs.json"

    constructor() {
        this.opmRequest = new OPMRequest
    }

    async fetch() {
        console.log("Fetching chapters..");
        
        return await this.getChapters()
    }

    async getChapters() {

        let chapters: any = this.readChapters()
        
        if (!chapters) {
            console.log("Couldn't read from file, fetching from online..");
            
            const fd        = await this.opmRequest.getChapters(this.url)
            let opmParser   = new OPMChaptersParser(fd)
            chapters        = opmParser.parse()

            if (chapters.response)
                this.storeChapters(chapters)
        }


        return chapters
    }

    storeChapters(chapters: any) {
        return false
        console.log("Storing chapters..");
        
        this.createDirectoryIfDoesntExist()
        let storeChapters   = JSON.stringify(chapters)
        let file            = `${this.storageDirectory}/${this.chaptersStorage}`
        fs.writeFileSync(file, storeChapters)
    }

    readChapters() {
        return false;
        console.log("Reading chapters..")
        let file = `${this.storageDirectory}${this.chaptersStorage}`
        if (fs.existsSync(file))
            return JSON.parse(fs.readFileSync(file))
        else
            console.log(`Directory ${this.chaptersStorage} doesnt exist`);
    }

    createDirectoryIfDoesntExist() {        
        if (!fs.existsSync(this.storageDirectory)) {
            console.log("Directory doesn't exist creating one!");
            fs.mkdirSync(this.storageDirectory);
        }
    }
}