import ParseResponse from "./ParseResponse";

export default interface ResponseParser{
    parse(): ParseResponse
}