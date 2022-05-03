import { Request, Response } from 'express';
import GameService from '../services/GameService';

export default class GameController {
    constructor(private gameService = new GameService()) { }

    public gameFinished = async (req: Request, res: Response) => {
        const { player1, player2, winner } = req.body;
        const allGames = await this.gameService.gameFinished(player1, player2, winner);
        return res.status(201).json(allGames);
    }

    public getAllGames = async (req: Request, res: Response) => {
        const allGames = await this.gameService.getAllGames();
        return res.status(201).json(allGames);
    }
}