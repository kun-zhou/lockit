// Using Object destructing to load modules
const {app, shell, BrowserWindow, Notification, Menu} = require('electron')
const path = require('path')
const menu = require('./menus/menu.js')

// Keep a reference to mainWindow to avoid window object being garbadged
// collected
let mainWindow
let willQuitApp = false
/* * * * * * * * * * *
 * * Bootstrapping * *
 * * * * * * * * * * */

// Create main window when ready
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', whenAllWindowsClosed)

// Re-create window on activation (macOS only)
app.on('activate', whenActivated)

app.on('before-quit', () => willQuitApp = true);
/* * * * * * * * * * * *
 * * Define Functions  *
 * * (using hoisting)  *
 * * * * * * * * * * * */
function createWindow() {
  // set menu
  Menu.setApplicationMenu(menu)

  // new Window
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 600,
    titleBarStyle: 'hidden-inset'
  })
  mainWindow.setContentProtection(true)
  // minimize instead of closing
  mainWindow.on('close', (e) => {
    if (!willQuitApp) {
      e.preventDefault()
      mainWindow.hide()
    }
    /* the user only tried to close the window */

  });

  // load loading.html
  mainWindow.loadURL(path.join('file://', __dirname, '/index.html'))

  mainWindow.on('closed', function() {
    mainWindow = null
  })
}

function whenAllWindowsClosed() {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
}

function whenActivated() {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  } else {
    mainWindow.show()
  }
}
