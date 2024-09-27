import {RankData} from "./rankData";

export type User = {
    userID: string;
    discordTag: string;
    accountActive: boolean;
    role: string;
    rankData: RankData;
}