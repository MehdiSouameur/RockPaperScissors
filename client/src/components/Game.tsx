import { useState } from 'react';
import Card from './cards/Front'
import BackCard from './cards/Back';
import Placeholder from './cards/Placeholder';
import './Game.css'
import rockSvg from './cards/images/rock.svg';
import scissorsSvg from './cards/images/scissors.svg';
import paperSvg from './cards/images/paper.svg';
import lizardSvg from './cards/images/lizard.svg';
import spockSvg from './cards/images/spock.svg';

export default function Game({ onReplay }: { onReplay: () => void}) {

    // Game card interface
    interface GameCard {
    title: string;
    imageSrc: string;
    content: React.ReactNode;
    onClick?: () => void;
    }

    
    // Define cards (Would add Lizard and Spock here)
    const rockCard: GameCard = {
    title: 'Rock',
    imageSrc: rockSvg,
    content: (
        <>
        Beats scissors and Lizard.<br />
        Weak against Paper and Spock.
        </>
    ),
    };
    const paperCard: GameCard = {
    title: 'Paper',
    imageSrc: paperSvg,
    content: (
        <>
        Beats Rock and Spock.<br />
        Weak against Scissors and Lizard.
        </>
    ),
    };
    const scissorsCard: GameCard = {
    title: 'Scissors',
    imageSrc: scissorsSvg,
    content: (
        <>
        Beats Paper and Lizard.<br />
        Weak against Rock and Spock.
        </>
    ),
    };
    const lizardCard: GameCard = {
    title: 'Lizard',
    imageSrc: lizardSvg,
    content: (
        <>
        Beats Paper and Spock.<br />
        Weak against Rock and Scissors.
        </>
    ),
    };
    const spockCard: GameCard = {
    title: 'Spock',
    imageSrc: spockSvg,
    content: (
        <>
        Beats Scissors and Rock.<br />
        Weak against Paper and Lizard.
        </>
    ),
    };

    // Player card placeholder
    const [playerCard, setPlayerCard] = useState<{
        title: string;
        imageSrc: string;
        content: React.ReactNode;
    } | null>(null);

    // Add the cards for the player and give function
    const CardPresets = [rockCard, paperCard, scissorsCard, lizardCard, spockCard];
    const playerCards = CardPresets.map((card) => ({...card,
    onClick: () => setPlayerCard(card),
    }));

    
    const [opponentCard, setOpponentCard] = useState<GameCard | null>(null);
    const [revealOpponent, setRevealOpponent] = useState<boolean>(false); // Whether we show opponent card or not
    const [victoryStatus, setVictoryStatus] = useState(<></>);
    const [hasConfirmed, setHasConfirmed] = useState(false); // hide play button
    const [gameResult, setGameResult] = useState<string>('')

    // Set of rules, each key returns the cards that key can defeat
    const cardRules: { [key: string]: string[] } = {
        Rock: ["Scissors", "Lizard"],
        Scissors: ["Paper", "Lizard"],
        Paper: ["Rock", "Spock"],
        Lizard: ["Paper", "Spock"],
        Spock: ["Scissors", "Rock"]
    }

    // Rock, Paper, Scissors countdown
    const countDown = async (): Promise<void> => {
        const words = ['Rock', 'Paper', 'Scissors', 'Go!'];
        setVictoryStatus(<></>);
        for (let i = 0; i < words.length; i++) {
            await new Promise<void>((resolve) => {
            setTimeout(() => {
                setVictoryStatus((prev) => (
                <>
                    {prev}
                    {i > 0 && <br />}
                    {words[i]}
                </>
                ));
                resolve();
            }, 500);
            });
        }
    };

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

    //// HTML ////
    return (
    <div className='Game'>

        {/* Computer set of cards */}
        <div className="cards-row-wrapper">

            <div className='cards-section'>
                <BackCard/>
                <BackCard/>
                <BackCard/>
            </div>

            <div className="side-element"></div>
        </div>
        
        {/* Playing field between players */}
        <div className="playing-row-wrapper">
            <div className="side-element">{victoryStatus}</div>

            <div className="playing-section">

                {/* Enemy played card*/}
                <div className="playing-card-section">
                {!opponentCard ? (
                    <Placeholder />
                ) : revealOpponent ? (
                    <Card
                    title={opponentCard.title}
                    imageSrc={opponentCard.imageSrc}
                    content={opponentCard.content}
                    />
                ) : (
                    <BackCard />
                )}
                </div>

                {/* Player played card*/}
                <div className="playing-card-section mt-1">
                {playerCard ? (
                    <Card
                    title={playerCard.title}
                    imageSrc={playerCard.imageSrc}
                    content={playerCard.content}
                    />
                ) : (
                    <Placeholder />
                )}
                </div>
            </div>

            <div className="side-element">
                <div>{gameResult}</div>
                {gameResult && (
                    <button className="btn btn-secondary mt-2" onClick={onReplay}>
                    Retry
                    </button>
                )}

            </div>
        </div>

        
        {/* Player set of cards */}
        <div className="cards-row-wrapper">

            <div className="cards-section">
                {playerCards.map((card) => (
                    <Card
                        key={card.title}
                        title={card.title}
                        imageSrc={card.imageSrc}
                        content={card.content}
                        onClick={card.onClick}
                    />
                ))}
            </div>

                <div className="side-element">
                    {!hasConfirmed && (
                        <button className='btn btn-primary' onClick={onEvaluate}>
                            Confirm Play
                        </button>
                    )}
                </div>
        </div>

    </div>
    );
}
