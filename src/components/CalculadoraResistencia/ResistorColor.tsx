

interface Props {
  color: string;
  hex: string;
  onClick: () => void;
}

export function ResistorColor ({ color, hex, onClick }: Props) {
  return (
    <button
      className="resistor-color"
      style={{ backgroundColor: hex }}
      onClick={onClick}
      title={color}
    >
      {color.charAt(0).toUpperCase()}
    </button>
  );
};