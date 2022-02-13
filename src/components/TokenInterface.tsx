export const MIN_PER_DAY        = 1440
export const MIN_PER_YEAR       = MIN_PER_DAY * 365
export const ANNUAL_INTEREST     = 6.934635; // 6.97515
export const REBASE_FREQ         = 30; // 30 minute
export const NOCP                = (1440 * 365) / REBASE_FREQ;// Number Of Compound Period in the year
export const BSC_CHAIN           = '0x38'
export const RINKEBY_CHAIN       = '0x4'
export const MARKETING_FACTOR   = 0.1047
const RINKEBY_TESTNET           = "https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161";

export function APY()
{
    return ((1 + ANNUAL_INTEREST/NOCP)**NOCP) - 1;
}

export function CalculateAPY(duringAfter) {
    const n = duringAfter / REBASE_FREQ;
    const r = ANNUAL_INTEREST;
    return ((1 + r/NOCP)**n) - 1;
}

export function CalculateRewardsCustom(duringAfter) {
    // T = (1 + a / n)^(n*m)
    const a = 13189284e-12;
    const n = duringAfter / REBASE_FREQ;
    const m = duringAfter;
    
    return (1 + a / n)**(n*m);
}
