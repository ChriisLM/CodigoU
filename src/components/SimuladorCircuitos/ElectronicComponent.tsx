import "../../assets/css/SimuladorCircuitos/ElectronicComponent.css";

interface Props {
  Component: React.ElementType;
  onclick?: () => void;
  inBoard: boolean;
  style?: React.CSSProperties;
  id?: string;
  boardRef?: React.RefObject<HTMLDivElement>;
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
  boardRef,
  onConnectorClick,
}: Props) {
  const handleConnectorClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    if (boardRef) {
      const spanRect = e.currentTarget.getBoundingClientRect();
      const boardRect = boardRef.current?.getBoundingClientRect();
      if (boardRect) {
        const positionX = (spanRect.x - spanRect.width*6.5) - boardRect.x;
        const positionY = (spanRect.y - (spanRect.height / 2)) - boardRect.y;
        if (onConnectorClick) {
      
          console.log("aqui llegue conecttor", positionX, positionY);
  
          onConnectorClick({
            id,
            positionX,
            positionY,
          });
        }
      }
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
      <div className="conector__line-container" onClick={(e) => handleConnectorClick(e)}>
        <span
          className="conector__line conector__line--left"
        ></span>
      </div>
      <Component />
      <div className="conector__line-container" onClick={(e) => handleConnectorClick(e)}>
        <span
          className="conector__line conector__line--right"
          
        ></span>
      </div>
    </div>
  );
}
