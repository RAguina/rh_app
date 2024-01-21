
const CardQueHacer = ({ imagen, titulo, descripcion }) => {
  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-3">
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          <img className="mb-10 h-48 w-full object-cover md:w-48" src={imagen} alt={titulo} />
          <a href="#" className='ml-5'>Mas informacion</a>
        </div>
        <div className="p-8 sm:w-full">
          <h2 className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{titulo}</h2>
          <p className="mt-2 text-gray-500">{descripcion}</p>
        </div>
      </div>
    </div>
  );
};

export default CardQueHacer;
