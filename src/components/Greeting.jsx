import PropTypes from "prop-types";

function Greeting({ name = "World" }) {
  return <h2>Hello, {name}!</h2>;
}

Greeting.propTypes = {
  name: PropTypes.string,
};

export default Greeting;
