import BaseRequest from "./BaseRequest";

export default class OPMRequest extends BaseRequest {

    getChapters = async (url: string) => {
        const { body } = await this.get(url)
        return body
    }

    getImages = async (url: string) => {
        const { body } = await this.get(url)
        return body
    }

}