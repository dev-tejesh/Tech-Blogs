import "./component.css";

function Button(props) {
    return <button className="button" disabled={props.disabled} type={props.type}>{props.text}</button>;
}

export default Button;
