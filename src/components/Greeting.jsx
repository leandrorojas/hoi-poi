/**
 * @param {object} props
 * @param {string} [props.name]
 */
function Greeting({ name = "World" }) {
  return <h2>Hello, {name}!</h2>;
}

export default Greeting;
