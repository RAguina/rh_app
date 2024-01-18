
const Home = () => {
  return (
    <>
    <div className="w-1/2">
      <p className='text-5xl text-center mt-10 mb-10 font-bold underline'>Noticias</p>
      <article className="flex mb-10 gap-5">
        <img src="/news1.jpg" alt="Imagen artículo 1" className="w-1/2 rounded-xl ml-5"/>
        <div className="w-1/2">
          <h2 className='text-4xl'>Cae la demanda de alquileres por los altos precios</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
        </div>
      </article>
      <article className="flex ml-5 mb-10 gap-5 w-1/2">
        <div className="w-1/2">
          <h2 className='text-4xl'>Visita las Termas del Campo en Necochae</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
        </div>
        <img src="/news2.jpg" alt="Imagen artículo 2" className="w-1/2 rounded-xl ml-5"/>
      </article>
    </div>
    <div>
      <h1>Anuncia tu propiedad aqui!</h1>
    </div>
    </>
  )
}

export default Home
