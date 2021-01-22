import BaseResponseParser from "./BaseResponseParser";
import ParseResponse from "./ParseResponse";
import * as cheerio from "cheerio"
import { v4 as uuidv4 } from 'uuid'

export default class OPMChaptersParser extends BaseResponseParser {

    parse(): ParseResponse {
        const $ = cheerio.load(this.html)
        const res: any = $("#ceo_latest_comics_widget-3>ul>li")
        let links: any[] = []
        res.each((index: number, element: any) => {
            links.push({
                chapter: $(element).text(),
                link: $(element).find("a").attr("href"),
                id: uuidv4()
            })
        })
        return { success: true, response: links }
    }

}