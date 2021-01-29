const { app, BrowserWindow, screen } = require('electron');

let mainWindow;

function createWindow() {

    const { width, height } = screen.getPrimaryDisplay().workAreaSize
    
    mainWindow = new BrowserWindow({
        width: 800,
        height: height,
        webPreferences: {
            nodeIntegration: true
        }
    })

    mainWindow.setMenuBarVisibility(false)
    // and load the index.html of the app.
    mainWindow.loadFile(__dirname + '/dist/public/index.html');
    mainWindow.on('closed', function () {
        mainWindow = null
    })
}
app.on('ready', createWindow)
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})
app.on('activate', function () {
    if (mainWindow === null) createWindow()
})