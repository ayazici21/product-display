interface SwissQuoteXAUUSD {
    topo: {
        platform: string;
        server: string;
    };
    spreadProfilePrices: {
        spreadProfile: "prime" | "standard" | "premium",
        bidSpread: number;
        askSpread: number;
        bid: number;
        ask: number;
    }[];
    ts: number;
}