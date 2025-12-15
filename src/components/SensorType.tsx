import type {ReactNode} from "react";

type Section = {
    title: string,
    children: ReactNode
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