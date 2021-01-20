import { html } from "cheerio"
import ParseResponse from "./ParseResponse"
import ResponseParser from "./ResponseParser"

export default abstract class BaseResponseParser implements ResponseParser {
    html: string

    abstract parse(): ParseResponse

    constructor(html: string) {
        this.html = html
    }
}