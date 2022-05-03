import GameModel from "../models/GameModel";
import connection from "../models/connection"

export default class GameService {
    private model: GameModel;

    constructor() {
        this.model = new GameModel(connection);
    }

    public async gameFinished(player1: string, player2: string, winner: string): Promise<any> {
        return await this.model.gameFinished(player1, player2, winner);
    }

    public async getAllGames(): Promise<any> {
        return await this.model.getAllGames();
    }
}
