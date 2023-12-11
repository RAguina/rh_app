import CardQueHacer from '../components/CardQueHacer';

function QueHacer() {
  return (
    <div>
      <h1 className='text-3xl mt-10 mb-20 text-center font-bold'>QueHacer En Necochea?</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <CardQueHacer imagen="/pesca1.jpg" titulo="Pesca de Mar" descripcion="Descripción de la actividad de pesca." />
        <CardQueHacer imagen="/quehacer3.jpg" titulo="El Point" descripcion="Restaurante bar en el medio del parque Miguel lillo y la playa, ideal para estar en familia y amigos" />
        <CardQueHacer imagen="/quehacer2.jpg" titulo="Playas" descripcion="Las playas mas anchas, las minas mas lindas del mundo, locatti, barreda" />
        <CardQueHacer imagen="/pesca2.jpg" titulo="Pesca de Rio" descripcion="Descripción de la actividad de pesca." />

      </div>
    </div>
  )
}

export default QueHacer;
