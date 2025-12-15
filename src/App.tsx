import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css'
import Button from "./components/Button.tsx";
import SensorType from "./components/SensorType.tsx";
import {Col, Container, Row} from "react-bootstrap";
import {useEffect, useState} from "react";

type Sensor = {
    id: number;
    data: Array<number>;
}

type SensorContainer = {
    sensors: Sensor[];
}

 async function fetchData(url:string): Promise<SensorContainer> {
     const res = await fetch(url);

     if (!res.ok) {
         throw new Error('Something went wrong!');
     }

     return res.json();
 }


function App() {
    const [sensorData, setSensorData] = useState<SensorContainer>({sensors: []});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                const url = `https://sensor-routes.vercel.app/sensors`;

                const data = await fetchData(url);

                setSensorData(data);
            } catch (err) {
                setError(err);
            } finally {
                setIsLoading(false);
            }
        };

        loadData();
    }, [])


    if (isLoading) {
        return <div>Loading sensor data...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }


    const processedIds = new Set<Sensor | number>();

    sensorData.sensors.forEach(sensor => {
        if (!processedIds.has(sensor.id)) {
            processedIds.add(sensor);
        }
    });

    console.log("Unique IDs found:", processedIds);

  return (
      <Container>
          <nav className="navbar navbar-light bg-light">
              <h1>IoT Kit</h1>
          </nav>


          <Row>
              <Col lg={6}>
                  <SensorType title="Sensor">
                      <Button text="120" icon="gear" />
                      <Button text="120" icon="gear" />

                      <Button text="120" icon="gear" />
                      <Button text="120" icon="gear" />
                      <Button text="120" icon="gear" />
                  </SensorType>
              </Col>
          </Row>
      </Container>
  )

}

export default App
