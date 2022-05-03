require('dotenv').config();
import * as express from 'express';
import GameController from './controller/GameController';

const gameController = new GameController()

class App {
  public app: express.Express;

  constructor() {
    this.app = express();
    this.config();
    this.app.post('/makeWinner', gameController.gameFinished);
    this.app.get('/getAllGames', gameController.getAllGames);
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(accessControl, express.json());
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`App esta rodando na porta ${PORT}`));
  }
}

const app = new App();
app.start(process.env.PORT || 3000);