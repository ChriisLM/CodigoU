import { useState } from "react";
import proyectos from "../data/projectos.json"
import "../assets/css/Home.css"
import { CardProyecto } from "../components/CardProyecto";

export function Home () {
  const [proyectoslist] = useState(proyectos)
  return (
    <section className="materias__list">
      {proyectoslist.map((proyecto,index) => 
        <CardProyecto proyecto={proyecto} key={index}/>
      )}
    </section>
  );
};