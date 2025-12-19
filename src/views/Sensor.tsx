import {useParams } from "react-router-dom";
import Line from "../components/ui/Line.tsx";


function Sensor() {
    // const location = useLocation();
    const { name } = useParams();

    return (
        <div>
            <h1>{name}</h1>
            <Line/>
        </div>
    );
}

export default Sensor;