import "../../assets/css/SimuladorCircuitos/ElectronicComponent.css";

interface Props {
  Component: React.ElementType;
  onclick?: () => void;
  inBoard: boolean;
  style?: React.CSSProperties;
  id?: string;
  onConnectorClick?: (data: {
    id: string;
    positionX: number;
    positionY: number;
  }) => void;
}

export function ElectronicComponent({
  Component,
  onclick,
  inBoard,
  style,
  id = "",
  onConnectorClick,
}: Props) {
  const handleConnectorClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    if (onConnectorClick) {
      // Obtener las coordenadas del conector
      const rect = e.currentTarget.getBoundingClientRect();
      const positionX = rect.x + rect.width / 2; // Centro del conector en X
      const positionY = rect.y + rect.height / 2; // Centro del conector en Y
      console.log("aqui llegue conecttor", positionX, positionY);
      
      // Pasar los datos al callback
      onConnectorClick({
        id,
        positionX,
        positionY,
      });
    }
  };

  return (
    <div
      onClick={onclick}
      style={style}
      className={`electronic-component ${
        inBoard ? "electronic-component--board" : ""
      }`}
    >
      <span
        className="conector__line conector__line--left"
        onClick={(e) => handleConnectorClick(e)}
      ></span>
      <Component />
      <span
        className="conector__line conector__line--right"
        onClick={(e) => handleConnectorClick(e)}
      ></span>
    </div>
  );
}
