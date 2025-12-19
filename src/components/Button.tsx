import { useState } from "react";
import { Form, Modal } from "react-bootstrap";
import { Link } from "react-router-dom"; // Logic: Import Link for routing
import * as React from "react";

type UserConfig = {
    name: string;
    type: string;
}

type Sensor = {
    id: number;
    data: Array<number>;
    userConfig: UserConfig | null;
}

type Button = {
    sensor: Sensor,
    icon: string,
    isNewSensor: boolean,
    onUpdate: () => void
}

function Button({sensor, icon = "gear", isNewSensor, onUpdate} :Button) {
    const [show, setShow] = useState(false);

    const slugify = (text: string) => {
        return text
            .toString()
            .toLowerCase()
            .trim()
            .replace(/\s+/g, '-')
            .replace(/[^\w-]+/g, '')
            .replace(/--+/g, '-');
    };

    const hasConfig = !!sensor?.userConfig?.name;
    const configSlug = hasConfig ? slugify(sensor.userConfig!.name) : "";

    function handleClick() {
        if (isNewSensor) {
            setShow(true);
        }
    }

    async function handleUpdateSensor(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const form = event.currentTarget;
        const formData = new FormData(form);
        const name = formData.get("submitted-name");
        const type = formData.get("submitted-type");

        const sensorId = sensor?.id;
        if (!sensorId) return;

        try {
            const response = await fetch(`https://sensor-routes.vercel.app/sensor/${sensorId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userConfig: { name, type }
                }),
            });

            if (!response.ok) throw new Error(`Error: ${response.status}`);

            setShow(false);
            onUpdate();
        } catch (error) {
            console.error("Failed to update sensor:", error);
        }
    }

    const content = (
        <>
            {sensor?.userConfig?.name || sensor?.id}
            <i className={`bi bi-${icon}`}></i>
        </>
    );

    return (
        <>

            {hasConfig && !isNewSensor ? (
                <Link to={`/${configSlug}`}>
                    {content}
                </Link>
            ) : (
                <button onClick={handleClick}>
                    {content}
                </button>
            )}

            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{sensor?.id}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleUpdateSensor}>
                        <Form.Group className="mb-3">
                            <Form.Label>Component name:</Form.Label>
                            <Form.Control name="submitted-name" placeholder="Enter component name" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Component type:</Form.Label>
                            <Form.Select name="submitted-type" defaultValue="Component type">
                                <option value="Sensor">Sensor</option>
                                <option value="Actuator">Actuator</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Component data: </Form.Label>
                            {sensor.data?.map((item, i) => (
                                <div key={i} className="c-ui">
                                    <p>{String(item)}</p>
                                    <Form.Select name="submitted-ui" defaultValue="Component ui">
                                        <option value="button">Button</option>
                                        <option value="graph">Graph</option>
                                    </Form.Select>
                                </div>
                            ))}
                        </Form.Group>

                        <button type="submit">
                            Update settings
                        </button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default Button;