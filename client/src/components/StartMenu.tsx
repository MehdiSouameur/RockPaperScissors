// StartMenu.tsx

type Props = {
  onPlay?: () => void;
};

export default function StartMenu({ onPlay }: Props) {
  return (
    <div className="Menu">
      <div className="Title">
        Rock Paper Scissors<br />
        (but with cards)
      </div>

      <div className="MenuButtons">
        <button className="btn btn-primary" onClick={onPlay}>
          Play
        </button>
        <button className="btn btn-primary">Settings</button>
      </div>
    </div>
  );
}
