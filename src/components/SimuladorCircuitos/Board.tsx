import "../../assets/css/SimuladorCircuitos/Board.css"
import { SideBar } from "./Sidebar";


export function Board () {
  return (
    <section className="board">
      <div className="board__rule"></div>
      <div className="board__container">
        <SideBar/>
      </div>
      <aside className="board__aside"></aside>
    </section>
  );
};