type Button = {
    text: string,
    icon: string,
    onClick: () => void
}

function Button({text, icon = "gear", onClick} :Button) {
    return (
        <button onClick={onClick}>
            {text}
            <i className={`bi bi-${icon}`}></i>
        </button>
    );
}

export default Button;