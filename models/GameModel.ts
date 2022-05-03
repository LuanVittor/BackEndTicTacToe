import { Pool, ResultSetHeader, RowDataPacket } from 'mysql2/promise';

interface gameHistory {
    id: number,
    player_one: string,
    player_one_points: string,
    player_two: string,
    player_two_points: string,
    date: Date
}

export default class GameModel {
    public connection: Pool;

    constructor(connection: Pool) {
        this.connection = connection;
    }

    public async gameFinished(player1: string, player2: string, winner: string): Promise<gameHistory[]> {
        const date = new Date();
        const query = 'INSERT INTO AngularTicTAc.Games (player_one, player_two, player_one_points, player_two_points, date) VALUES (?,?,?,?,?)';
        const created = await this.connection.execute<ResultSetHeader>(query, [player1, player2, 0, 0, date]);
        const insertId = created[0].insertId;

        if (winner === player1) {
            const query = 'UPDATE AngularTicTAc.Games SET player_one_points = 1 WHERE id = ?'
            await this.connection.execute<ResultSetHeader>(query, [insertId]);
        }
        if (winner === player2) {
            const query = 'UPDATE AngularTicTAc.Games SET player_two_points =  1 WHERE id = ?'
            await this.connection.execute<ResultSetHeader>(query, [insertId]);
        }
        const getAllGames = 'SELECT * FROM AngularTicTAc.Games ORDER BY id DESC LIMIT 5';
        const [games] = await this.connection.execute<RowDataPacket[]>(getAllGames);
        
        return games as gameHistory[];
    }

    public async getAllGames(): Promise<gameHistory[]> {
        const getAllGames = 'SELECT * FROM AngularTicTAc.Games ORDER BY id DESC LIMIT 5';
        const [games] = await this.connection.execute<RowDataPacket[]>(getAllGames);
        return games as gameHistory[];
    }
}