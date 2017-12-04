export { Levels }

let Levels = 
[
    // Level 1
    {
        Index: 0,
        Passes: 2,
        BronzeScore: 500,
        SilverScore: 750,
        GoldScore: 1000,
        CraneSpeed: 1,
        CraneLimit: 100,
        BoxTypes:
        [
            {
                Type: "Cardboard",
                Amount: 2
            },
            {
                Type: "Wooden",
                Amount: 10
            }
        ]
    },
    // Level 2
    {
        Index: 1,
        Passes: 3,
        BronzeScore: 1000,
        SilverScore: 1500,
        GoldScore: 2000,
        CraneSpeed: 1,
        CraneLimit: 120,
        BoxTypes:
        [
            {
                Type: "Cardboard",
                Amount: 10
            }
        ]
    }
];