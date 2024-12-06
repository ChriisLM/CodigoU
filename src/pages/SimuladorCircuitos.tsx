import { Header } from "../components/Header";
import { ProjectInfo } from "../components/ProjectInfo";
import { Board } from "../components/SimuladorCircuitos/Board";
import "../assets/css/SimuladorCircuitos/SimuladorCircuitos.css"


export function SimuladorCicuitos () {
  return (
    <>
      <Header/>
      <main className="simulador">
        <ProjectInfo id="CE-1"/>
        <Board/>
      </main>
    </>
  );
};