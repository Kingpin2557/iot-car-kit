import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css'
import Button from "./components/Button.tsx";
import SensorType from "./components/SensorType.tsx";

function App() {

  return (
      <>
       <SensorType title="Sensor">
           <Button text="120" icon="gear" onClick={() => console.log("clicked")} />
           <Button text="120" icon="gear" onClick={() => console.log("clicked")} />

           <Button text="120" icon="gear" onClick={() => console.log("clicked")} />
           <Button text="120" icon="gear" onClick={() => console.log("clicked")} />
           <Button text="120" icon="gear" onClick={() => console.log("clicked")} />

       </SensorType>

          <SensorType title="Actuators">
              <Button text="120" icon="gear" onClick={() => console.log("clicked")} />
              <Button text="120" icon="gear" onClick={() => console.log("clicked")} />

              <Button text="120" icon="gear" onClick={() => console.log("clicked")} />
              <Button text="120" icon="gear" onClick={() => console.log("clicked")} />
              <Button text="120" icon="gear" onClick={() => console.log("clicked")} />

          </SensorType>
      </>
  )

}

export default App
