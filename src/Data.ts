import OPMChapterImagesHandler from "./lib/handlers/OPMChapterImagesHanlder"
import OPMChaptersHandler from "./lib/handlers/OPMChaptersHandler"

export default class Data{
    private chapters: any;

    async process() {     

        let opmHandler              = new OPMChaptersHandler
        let opmChapters             = await opmHandler.fetch() 
        this.chapters               = opmChapters

        return this.chapters
    }

    async getImages(chapterId: any) {  
        const chapters = this.chapters.response         
        
        let chapter = chapters.find((el: any) => el.id === chapterId)
        
        const imageHandler = new OPMChapterImagesHandler(chapter.chapter, chapter.link)
        let images = await imageHandler.fetch() 
        return images
    }

    getChapters() {
        return this.chapters
    }
}