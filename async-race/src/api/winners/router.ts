import { GetWinnersOptions, WinnerType } from "../../types/interfaces";

import createWinner from "./routes/create-winner-controller";
import deleteWinner from "./routes/delete-winner-controller";
import getWinnerByID from "./routes/get-winner-controller";
import updateWinner from "./routes/update-winner-controller";
import getWinners from "./routes/get-winners-controller";

const WinnersRouter = {
  totalCount: 0,
  async getWinners(parameters?: GetWinnersOptions): Promise<WinnerType[]> {
    try {
      const winners = await getWinners(parameters);
      this.totalCount = winners.totalCount;
      return winners.items;
    } catch (error) {
      console.error("Error fetching winners:", error);
      this.totalCount = 0;
      return [];
    }
  },

  async getTotalCount(): Promise<number> {
    try {
      await this.getWinners();
    } catch (error) {
      console.error(`Error fetching total count:`, error);
    }
    return this.totalCount;
  },

  async getWinner(id: number): Promise<WinnerType | undefined> {
    try {
      return await getWinnerByID(id);
    } catch (error) {
      console.error(`Error fetching winner {${id}:`, error);
      return undefined;
    }
  },

  async createWinner(winner: WinnerType): Promise<WinnerType | undefined> {
    try {
      return await createWinner(winner);
    } catch (error) {
      console.error("Error creating winner:", error);
      return undefined;
    }
  },

  async updateWinner(
    id: number,
    winnerParameters: WinnerType,
  ): Promise<WinnerType | undefined> {
    try {
      return await updateWinner(id, winnerParameters);
    } catch (error) {
      console.error("Error updating winner:", error);
      return undefined;
    }
  },

  async deleteWinner(id: number): Promise<boolean> {
    try {
      return await deleteWinner(id);
    } catch (error) {
      console.error("Error deleting winner:", error);
      return false;
    }
  },
};

export default WinnersRouter;
