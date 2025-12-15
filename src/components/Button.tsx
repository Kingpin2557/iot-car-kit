type Button = {
    text: string,
    icon: string,
}

function Button({text, icon = "gear"} :Button) {
    return (
        <button onClick={() => {console.log('clicked')}}>
            {text}
            <i className={`bi bi-${icon}`}></i>
        </button>
    );
}

export default Button;