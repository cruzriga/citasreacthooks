import React, {useState, useEffect, Fragment} from 'react'

function Formulario({addCita}){
  const initialCita = {
    mascota: '',
    propietario : '',
    fecha : '',
    hora : '',
    sintomas : ''
  };

  const [cita,setCita] = useState(initialCita);
  const [formError, setFormError] = useState(false);
  const handleChange = e =>{
    setCita({
      ...cita, [e.target.name] : e.target.value
    })
  };
  const saveCita = e =>{
    e.preventDefault();
    if(cita.mascota === '' || cita.propietario ==='' || cita.fecha === '' || cita.hora === '' || cita.sintomas ===''){
      setFormError(true);
      return;
    }
    addCita(cita);
    setCita(initialCita);
    setFormError(false);
  };
  const errorMsg = (formError) ? <p> Los campos son obligatorios </p> : '';
  return(
      <Fragment>
        <h2>Crear Cita</h2>
        {errorMsg}
        <form onSubmit={saveCita}>
          <label>Nombre Mascota</label>
          <input
              type="text"
              name="mascota"
              className="u-full-width"
              placeholder="Nombre Mascota"
              onChange = {handleChange}
              value={cita.mascota}
          />

          <label>Nombre Dueño</label>
          <input
              type="text"
              name="propietario"
              className="u-full-width"
              placeholder="Nombre Dueño de la Mascota"
              onChange = {handleChange}
              value={cita.propietario}
          />

          <label>Fecha</label>
          <input
              type="date"
              className="u-full-width"
              name="fecha"
              onChange = {handleChange}
              value={cita.fecha}
          />

          <label>Hora</label>
          <input
              type="time"
              className="u-full-width"
              name="hora"
              onChange = {handleChange}
              value={cita.hora}
          />

          <label>Sintomas</label>
          <textarea  className="u-full-width" name="sintomas"  onChange = {handleChange} value=  {cita.sintomas} />
          <button type="submit" className="button-primary u-full-width">Agregar</button>
        </form>
      </Fragment>
  );
}
function Cita({cita,index,deleteCita}){
  return (
      <div className="cita">
        <p>Mascota: <span>{cita.mascota}</span></p>
        <p>Propietario: <span>{cita.propietario}</span></p>
        <p>Fecha: <span>{cita.fecha}</span></p>
        <p>Hora: <span>{cita.hora}</span></p>
        <p>Sintomas: <span>{cita.sintomas}</span></p>
        <button
            onClick={()=>deleteCita(index)}
            type="button" className="button eliminar u-full-width">Eliminar X</button>
      </div>
  );
}

// App Component
function App() {
  let citasInit = JSON.parse(localStorage.getItem('citas'));
  if(!citasInit) citasInit = [];
  const [citas, setCitas] = useState(citasInit);
  const addCita = cita =>{
    //tomar una copia del state y agergar el nuevo registro
    let newCitas  = [...citas, cita];
    setCitas(newCitas);
  };

  const deleteCita = index =>{
    const newCitas = [...citas];
    newCitas.splice(index,1);
    setCitas(newCitas);
  };

  useEffect(()=>{
    if(citasInit){
      localStorage.setItem('citas', JSON.stringify(citas))
    }else{
      localStorage.setItem('citas', JSON.stringify([]));
    }
  },[citas]);
  // Render de APP
  const titulo = Object.keys(citas).length === 0 ? 'No hay citas' : 'Listado de citas';
  return (
      <Fragment>
        <h1>Administrador de pacientes</h1>
        <div className="container">
          <div className="row">
            <div className="one-half column">
              <Formulario
                addCita ={addCita}
              />
            </div>
            <div className="one-half column">
              <h2>{titulo}</h2>
              {citas.map((cita,index) =>{
                return <Cita key = {index} index = {index} cita = {cita} deleteCita={deleteCita}/>
              })}
            </div>
          </div>
        </div>
      </Fragment>


  );
}
export default App;
