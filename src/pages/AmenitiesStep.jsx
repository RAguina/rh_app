import React, { useState } from 'react';

const AmenitiesStep = () => {
  const [amenities, setAmenities] = useState({
    airConditioning: false,
    heating: false,
    garage: false,
    garden: false,
    grill: false,
    pool: false,
    tv: false,
    wifi: false,
    pets: false,
    youngGroup: false,
    ecoFriendly: false,
    checkIn: '',
    checkOut: '',
  });

  const handleChange = (event) => {
    setAmenities({
      ...amenities,
      [event.target.name]: event.target.type === 'checkbox' ? event.target.checked : event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(amenities);
    // Aquí puedes manejar la lógica para guardar las comodidades seleccionadas
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Aire acondicionado
        <input type="checkbox" name="airConditioning" onChange={handleChange} />
      </label>
      <label>
        Calefacción
        <input type="checkbox" name="heating" onChange={handleChange} />
      </label>
      <label>
        Garage
        <input type="checkbox" name="garage" onChange={handleChange} />
      </label>
      <label>
        Jardin
        <input type="checkbox" name="garden" onChange={handleChange} />
      </label>
      <label>
        Jardin
        <input type="checkbox" name="grill" onChange={handleChange} />
      </label>
      <label>
        Pileta
        <input type="checkbox" name="pool" onChange={handleChange} />
      </label>
      <label>
        TV
        <input type="checkbox" name="tv" onChange={handleChange} />
      </label>
      <label>
        Wifi
        <input type="checkbox" name="wifi" onChange={handleChange} />
      </label>
      <label>
        Mascotas
        <input type="checkbox" name="pets" onChange={handleChange} />
      </label>
      <label>
        Acepta Jovenes
        <input type="checkbox" name="youngGroup" onChange={handleChange} />
      </label>
      <label>
        Eco Friendly
        <input type="checkbox" name="ecoFriendly" onChange={handleChange} />
      </label>
      <label>
        Check in
        <input type="time" name="checkIn" onChange={handleChange} />
      </label>
      <label>
        Check out
        <input type="time" name="checkOut" onChange={handleChange} />
      </label>
      <button type="submit">Guardar</button>
    </form>
  );
};

export default AmenitiesStep;
