import got from "got/dist/source";
import Request from "./Request";

export default abstract class BaseRequest implements Request {

    async get(url: any): Promise<any> {
        return await got(url)
    }

}