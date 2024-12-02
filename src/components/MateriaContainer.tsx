interface Props{
  nombre: string,
  id: number
}

export function MateriaContainer ({nombre,id}:Props) {
  return (
    <section className="materia__section" key={id}>
      <h2>{nombre}</h2>
    </section>
  );
};