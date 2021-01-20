import OPMChapterImagesHandler from "./lib/handlers/OPMChapterImagesHanlder"
import OPMChaptersHandler from "./lib/handlers/OPMChaptersHandler"

(async () => { 
    let opmHandler              = new OPMChaptersHandler
    let opmChapters             = await opmHandler.fetch() 
    opmChapters.response.forEach(async (chapter: any, i: any) => { 
        let chapterImagesHandler    = new OPMChapterImagesHandler(
            chapter.chapter,
            chapter.link
        )
        let chapterImages = await chapterImagesHandler.fetch()        
    }); 
})()