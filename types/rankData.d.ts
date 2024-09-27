export type RankData =
    {
        rank: string;
        corps: string;
        number: number;
        promotion: boolean;
        currentNumber: number;
        positiveRecommendations: Array<Record<string, string>>;
        negativeRecommendations: Array<Record<string, string>>;
    }
