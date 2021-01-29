import express from 'express';
import Data from "./Data"


const app  = express();
const PORT = 1700;
const path = require("path")
const cors = require("cors")

export default class Server {

    private data: any

    private chapters: any
    
    start() {       
        this.data = new Data
        this.loadConfigs()
        this.loadRoutes()
        this.startServer()
    }

    startServer() {
        app.listen(PORT, () => {
            console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
        });
    }

    loadConfigs() {
        app.use(cors())
        app.use(express.static(path.join(__dirname, 'public/')));
    }

    loadRoutes() {
        app.get('/api/chapters', async (req, res) => {
            await this.data.process()
            let chapters = this.data.getChapters()
            this.chapters = chapters
            res.send(chapters)
        });
        app.get('/api/chapters/:chapterId/images', async (req, res) => {
            // await this.data.process()
            let chapterId = req.params.chapterId
            const images = await this.data.getImages(chapterId)

            res.send(images)
        })
        app.get('*', (req, res) => {
            res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
        });
    }
}