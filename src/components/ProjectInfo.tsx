import { useEffect, useState } from "react";
import proyectos from "../data/projectos.json";
import "../assets/css/ProjectInfo.css"

interface Props {
  id: string;
}

interface Proyecto {
  id: string;
  materia: string;
  nombre: string;
  etiquetas: string[];
  descripcion: string;
  imagen: string;
}

export function ProjectInfo({ id }: Props) {
  const [proyectoslist] = useState(proyectos);
  const [project, setProject] = useState<Proyecto | null>();

  useEffect(() => {
    setProject(proyectoslist.find((project) => project.id === id));
  }, []);
  return (
    <section className="projectInfo">
      {project ? (
        <div className="projectInfo__container">
          <div className="projectInfo__data">
            <h1 className="projectInfo__title">{project.nombre}</h1>
            <span className="projectInfo__materia">{project.materia}</span>
          </div>
          <div className="projectInfo__tags">
            {project.etiquetas.map((etiqueta) => (
              <span className="project__tag" key={etiqueta}>{etiqueta}</span>
            ))}
          </div>
          <p className="projectInfo__description">{project.descripcion}</p>
        </div>
      ) : (
        <p>Proyecto no encontrado</p>
      )}
      <hr />
    </section>
  );
}