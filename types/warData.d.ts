export type WarData = {
    warId: string;
    warNumber: number;
    winner: 'NONE' | 'WARDENS' | 'COLONIALS';
    conquestStartTime: number;
    conquestEndTime: number;
    resistanceStartTime: number;
    requiredVictoryTowns: number;
}