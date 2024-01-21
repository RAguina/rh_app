const Home = () => {
  return (
    <div className="flex flex-col sm:flex-row">
      <div className="w-full sm:w-1/2">
        <p className='text-5xl text-center mt-10 mb-10 font-bold underline'>Noticias</p>
        <article className="flex flex-col sm:flex-row mx-5 mb-10 gap-5">
          <img src="/news1.jpg" alt="Imagen artículo 1" className="w-full sm:w-1/2 h-64 object-cover rounded-xl"/>
          <div className="w-full sm:w-1/2">
            <h2 className='text-4xl'>Cae la demanda de alquileres por los altos precios</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
          </div>
        </article>
        <article className="flex flex-col-reverse sm:flex-row ml-5 mb-10 gap-5">
          <div className="w-full sm:w-1/2">
            <h2 className='text-4xl'>Visita las Termas del Campo en Necochae</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
          </div>
          <img src="/news2.jpg" alt="Imagen artículo 2" className="w-full sm:w-1/2 h-64 object-cover rounded-xl"/>
        </article>
      </div>
      <div className="w-full sm:w-1/2 border">
        <h1 className='text-5xl text-center mt-10 mb-10 font-bold underline'>Anuncia tu propiedad aqui!</h1>
      </div>
    </div>
  )
}

export default Home;
