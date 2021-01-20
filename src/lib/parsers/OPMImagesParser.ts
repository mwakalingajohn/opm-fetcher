import BaseResponseParser from "./BaseResponseParser";
import ParseResponse from "./ParseResponse";
import * as cheerio from "cheerio"

export default class OPMImagesParser extends BaseResponseParser {

    parse(): ParseResponse {
        const $ = cheerio.load(this.html)
        const res: any = $(".UploadPost-files>div") 
        let links: any[] = []
        res.each((index:any, div: any) => { 
            links.push($(div).find("img").attr("src"))
        })  
        return { success: true, response: links }
    }

}