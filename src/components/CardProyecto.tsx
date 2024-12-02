import "../assets/css/CardProyecto.css"

type Proyectoinfo = {
  id: string,
  materia: string,
  nombre: string,
  etiquetas: string[],
  descripcion: string,
  imagen: string
}

interface Props{
  proyecto: Proyectoinfo
}

export function CardProyecto ({proyecto}:Props) {
  return (
    <article className="project__container">
      <div className="project__image-container">
        <img src={proyecto.imagen} alt={proyecto.nombre} className="proyecto__image"/>
      </div>
      <div className="project__info">
        <h3 className="project__title">{proyecto.nombre}</h3>
        <div className="project__tags-list">
          {proyecto.etiquetas.map((etiqueta) => (
            <span className="project__tag"  key={etiqueta}>{etiqueta}</span>
          ))}
        </div>
        <p className="project__description">{proyecto.descripcion}</p>
      </div>
    </article>
  );
};