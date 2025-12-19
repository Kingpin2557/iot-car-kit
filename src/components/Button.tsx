import {useState} from "react";
import {Form, Modal} from "react-bootstrap";
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
    isNewSensor: boolean
}

function Button({sensor, icon = "gear", isNewSensor} :Button) {
    const [show, setShow] = useState(false);

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
        if (!sensorId) {
            console.error("Sensor ID is missing.");
            return;
        }

        try {
            const response = await fetch(`https://sensor-routes.vercel.app/sensor/${sensorId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userConfig: {
                        name: name,
                        type: type
                    }
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            setShow(false);
            console.info('Sensor updated successfully!');

        } catch (error) {
            console.error("Failed to update sensor:", error);
        }
    }

    return (
        <>
            <button onClick={handleClick}>
                {sensor?.userConfig?.name || sensor?.id}
                <i className={`bi bi-${icon}`}></i>
            </button>

            <Modal
                show={show}
                onHide={() => setShow(false)}
                dialogClassName="modal-90w"
                aria-labelledby="example-custom-modal-styling-title"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title">
                        {sensor?.id}
                    </Modal.Title>
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

                        <button type="submit">
                            Update settings
                        </button>
                    </Form>
                </Modal.Body>
                <Modal.Footer></Modal.Footer>
            </Modal>
        </>
    );
}

export default Button;