const path = require('path');
const { app, BrowserWindow, Menu, MenuItem } = require('electron');
const express = require('express');
const server = express();
server.listen(3000, () => {
  console.log('Running')
});
server.use(express.static(path.resolve(__dirname, 'build')));
server.get('*', (_, res) => {
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});


const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
    }
  })

  win.loadURL('http://localhost:3000')

  const menu = new Menu();

  menu.append(new MenuItem({
    label: 'View',
    submenu: [
      { role: 'reload' },
      { role: 'forceReload' },
      { role: 'toggleDevTools' },
      { type: 'separator' },
      { role: 'resetZoom' },
      { role: 'zoomIn' },
      { role: 'zoomOut' },
      { type: 'separator' },
      { role: 'togglefullscreen' }
    ]
  }));

  menu.append(new MenuItem({
    label: 'Opções',
    submenu: [
      {
        label: 'Recarregar',
        click: () => {
          win.reload();
        }
      },
      {
        label: 'Forçar chat',
        click: () => {
          win.loadURL('http://localhost:3000/chat');
        }
      },
      {
        label: 'Voltar para login',
        click: () => {
          win.loadURL('http://localhost:3000');
        }
      }
    ]
  }));

  menu.append(new MenuItem({
    label: 'TELA',
    submenu: [
      {
        label: 'Fixar tela',
        click: () => {
          win.setAlwaysOnTop(true, 'screen');
        }
      },
      {
        label: 'Desafixar tela',
        click: () => {
          win.setAlwaysOnTop(false, 'screen');
        }
      }
    ],
  }));

  Menu.setApplicationMenu(menu);

  return win
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})