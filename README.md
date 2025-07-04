# Rock Paper Scissors

Welcome to my Rock, paper, Scissors submission for the True technical assessment!

For this challenge I decided to use **React with Typescript**. I'm aware this is for a .Net C# role, however I code in C# every day and since I have been learning React and Typescript in my free time recently I figured this was a good opportunity to learn React and Typescript whilst delivering the assessment. In C#, I would've either used .Net's WPF (As I've made a few small games on it before) or I would've gone for a command line implementation.

I've hosted the game on Render here: https://mehdi-rockpaperscissors.onrender.com/

I'm aware that what I made is a little over the scope of what was asked, in fact I spent significantly more time working on the Front UI than the core logic itself dealing with html and css problems but it was a great learning experience overall and I feel much more comfortable using React and Typescript after this little project. It's in a great position to be scaled further with additional features. An Express.js backend is linked up (Although unused here) to add things like multiplayer, user auth, scoreboards, more complex rule evaluation and so on.

You can find the core game logic under **client/src/components/Game.tsx** inside the function **onEvaluate()**.

//// GAME LOGIC //// 
    const onEvaluate = async () => {
        
        // If theres no player card, do nothing
        if (!playerCard) {
            return;
        }
        setHasConfirmed(true); // hide play button

        // Generate a random card from our card preset list
        const randomCard: GameCard = CardPresets[Math.floor(Math.random() * CardPresets.length)];
        setOpponentCard(randomCard);

        // UI Rock Paper Scissors countdown
        await countDown();
        setRevealOpponent(true);


        // Retrieve the names of the cards played
        const enemyTitle: string = randomCard.title;
        const playerTitle: string  = playerCard.title;

        // Can ensure it's a tie if they're the same card
        if(enemyTitle == playerTitle){
            setGameResult("Tie")
            return
        }


        // Check the advantage that player and enemy has
        // by checking hashmap
        let enemyAdvantage : boolean = false;
        let playerAdvantage: boolean = false;

        enemyAdvantage = cardRules[enemyTitle].some(
            (rule) => rule.includes(playerTitle)
        );
        playerAdvantage = cardRules[playerTitle].some(
                (rule) => rule.includes(enemyTitle)
            );
        
        // Set result based on who has an advantage
        if(enemyAdvantage){
            setGameResult("Defeat!")
        } else if (playerAdvantage){
            setGameResult("Victory!")
        } else {
            setGameResult("Tie")
        }

    }

