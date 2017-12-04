export { Levels }

let Levels = 
[ 
    // Level 1
    {
        Index: 0,
        Passes: 3,
        BronzeScore: 500,
        SilverScore: 750,
        GoldScore: 1000,
        CraneSpeed: 1,
        CraneLimit: 120,
        BoxTypes:
        [
            {
                Type: "Cardboard",
                Amount: 10
            }
        ]
    },

    // Level 2
    {
        Index: 1,
        Passes: 4,
        BronzeScore: 750,
        SilverScore: 1500,
        GoldScore: 2000,
        CraneSpeed: 3,
        CraneLimit: 300,
        BoxTypes:
        [
            {
                Type: "Cardboard",
                Amount: 2
            },
            {
                Type: "Wooden",
                Amount: 7
            }      
        ]
    },

     // Level 3
     {
        Index: 2,
        Passes: 5,
        BronzeScore: 1200,
        SilverScore: 2500,
        GoldScore: 3000,
        CraneSpeed: 5,
        CraneLimit: 300,
        BoxTypes:
        [
            {
                Type: "Cardboard",
                Amount: 2
            },
            {
                Type: "Wooden",
                Amount: 10
            },
            {
                Type: "Metal",
                Amount: 5
            }
        ]
    },

     // Level 4
     {
        Index: 3,
        Passes: 5,
        BronzeScore: 2700,
        SilverScore: 3200,
        GoldScore: 4000,
        CraneSpeed: 7,
        CraneLimit: 400,
        BoxTypes:
        [
            {
                Type: "Cardboard",
                Amount: 2
            },
            {
                Type: "Wooden",
                Amount: 12
            },
            {
                Type: "Metal",
                Amount: 8
            }
        ]
    },

    // Level 5
    {
        Index: 4,
        Passes: 6,
        BronzeScore: 3200,
        SilverScore: 4400,
        GoldScore: 5000,
        CraneSpeed: 10,
        CraneLimit: 200,
        BoxTypes:
        [
            {
                Type: "Cardboard",
                Amount: 2
            },
            {
                Type: "Wooden",
                Amount: 4
            },
            {
                Type: "Metal",
                Amount: 15
            }
        ]
    }


    
];