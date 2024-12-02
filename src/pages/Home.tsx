import { useState } from "react";
import { MateriaContainer } from "../components/MateriaContainer";
import proyectos from "../data/projectos.json"


export function Home () {
  const [projectoslist,setProjectos] = useState(proyectos)
  return (
    <section>
    </section>
  );
};