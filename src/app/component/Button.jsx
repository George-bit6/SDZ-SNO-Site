export default function Button(props) {

  const buttonStyle = {

    color: props.color,
    backgroundColor: props.backgroundColor,
    fontSize: props.fontSize



  }

  return <button style={buttonStyle} >{props.text}</button>;
}
