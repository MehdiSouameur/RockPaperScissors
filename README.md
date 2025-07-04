# Rock Paper Scissors

Welcome to my Rock, paper, Scissors submission for the True technical assessment!

For this challenge I decided to use **React with Typescript**. I'm aware this is for a .Net C# role, however I code in C# every day and since I have been learning the React/Typescript/Node tech stack in my free time recently I figured this was a good opportunity to learn React and Typescript whilst delivering the assessment. In C#, I would've either used .Net's WPF (As I've made a few small games on it before) or I would've gone for a command line implementation.

I've hosted the game on Render here: https://mehdi-rockpaperscissors.onrender.com/

I'm aware that what I made is a little over the scope of what was asked, in fact I spent significantly more time working on the Front UI (html, css) than the core logic itself. It certainly would've been much faster and efficient for me to make it in a terminal and still satisfy the assessment. Regardless, I'm satisfied with how it turned out, it was a great learning experience overall and I feel much more comfortable using React and Typescript after this little project. It's in a great position to be scaled further with additional features. An Express.js backend is linked up (Although unused here) to add things like multiplayer (using Websockets), user auth, scoreboards, more complex rule evaluation and so on.

Certainly the styling could use a bit more work and it's not super responsive but, it does the job for desktops.

You can find the core game logic under **client/src/components/Game.tsx** inside the function **onEvaluate()**.

You can also check out that function here:

```ts
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

    };
```

I'm using each card name as a key in a hashmap to determine which cards beat which, I can add any new card and rules here:

```ts
    // Set of rules, each key returns the cards that key can defeat
    const cardRules: { [key: string]: string[] } = {
        Rock: ["Scissors", "Lizard"],
        Scissors: ["Paper", "Lizard"],
        Paper: ["Rock", "Spock"],
        Lizard: ["Paper", "Spock"],
        Spock: ["Scissors", "Rock"]
    }

```

To add new cards I would just need to define a card using the GameCard interface for a react component:

```ts
    interface GameCard {
        title: string;
        imageSrc: string;
        content: React.ReactNode;
        onClick?: () => void;
    }
```

So for example the rock card:

```ts
    const rockCard: GameCard = {
    title: 'Rock',
    imageSrc: rockSvg,
    content: (
        <>
        Beats scissors and Lizard.<br />
        Weak against Paper and Spock.
        </>
    )
```

Then add it to the list of cardPresets:
```ts
   // Add the cards for the player and give function
    const CardPresets = [rockCard, paperCard, scissorsCard, lizardCard, spockCard];
```

After this it should automatically render the additional cards to each player. This way I can easily add or remove cards to expand the game.

I haven't implemented the "Computer plays what the player played last" feature, but to achieve this, when the user clicks on Retry, I would grab the card of the player in the "onReplay" function, then pass it through to the next game render and use that card to be played by the computer.

Thank you for reviewing my submission and I hope you enjoyed the little app!
