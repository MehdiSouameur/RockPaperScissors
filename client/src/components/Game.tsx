import { useState } from 'react';
import Card from './cards/Front'
import BackCard from './cards/Back';
import Placeholder from './cards/Placeholder';
import './Game.css'
import rockSvg from './cards/images/rock.svg';
import scissorsSvg from './cards/images/scissors.svg';
import paperSvg from './cards/images/paper.svg';

export default function Game() {
const [playerCard, setPlayerCard] = useState<{
    title: string;
    imageSrc: string;
    content: React.ReactNode;
  } | null>(null);

  return (
    <div className='Game'>

        {/* Computer set of cards */}
        <div className="cards-row-wrapper">
            <div className="side-element">0</div>

            <div className='cards-section'>
                <BackCard/>
                <BackCard/>
                <BackCard/>
            </div>

            <div className="side-element"></div>
        </div>
        
        {/* Playing field between players */}
        <div className="playing-row-wrapper">
            <div className="side-element">🤖</div>

            <div className="playing-section">
                <div className="playing-card-section">
                <Placeholder />
                </div>
                <div className="playing-card-section">
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

            <div className="side-element">🧑</div>
        </div>

        
        {/* Player set of cards */}
        <div className="cards-row-wrapper">
            <div className="side-element">0</div>

            <div className="cards-section">
                        <Card
                            title="Rock"
                            imageSrc={rockSvg}
                            content={
                                <>
                                Beats scissors.<br />
                                Weak against Paper.
                                </>
                            }
                            onClick={() =>
                                setPlayerCard({
                                title: 'Rock',
                                imageSrc: rockSvg,
                                content: (
                                    <>
                                    Beats scissors.<br />
                                    Weak against Paper.
                                    </>
                                ),
                                })
                            }
                            />

                        <Card
                            title="Scissors"
                            imageSrc={scissorsSvg}
                            content={
                                <>
                                Beats paper.<br />
                                Weak against Rock.
                                </>
                            }
                            onClick={() =>
                                setPlayerCard({
                                title: 'Scissors',
                                imageSrc: scissorsSvg,
                                content: (
                                    <>
                                    Beats paper.<br />
                                    Weak against Rock.
                                    </>
                                ),
                                })
                            }
                            />

                        <Card
                            title="Paper"
                            imageSrc={paperSvg}
                            content={
                                <>
                                Beats rock.<br />
                                Weak against scissors.
                                </>
                            }
                            onClick={() =>
                                setPlayerCard({
                                title: 'Paper',
                                imageSrc: paperSvg,
                                content: (
                                    <>
                                    Beats rock.<br />
                                    Weak against scissors.
                                    </>
                                ),
                                })
                            }
                            />
            </div>

                <div className="side-element">
                    <button className='btn btn-primary'>Confirm Play</button>
                </div>
        </div>



    </div>
  );
}
