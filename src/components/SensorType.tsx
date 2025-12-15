import type {JSX} from "react";

type Section = {
    title: string,
    children: JSX.Element
}

function SensorType({title, children}:Section) {
    return (
        <section>
            <h2>{title}</h2>
            <div>
                {children}
            </div>
        </section>
    );
}

export default SensorType;