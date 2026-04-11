import { Component } from "react";

class RemoteErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  handleRetry = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <p>Failed to load remote module. Please try again.</p>
          <button onClick={this.handleRetry}>Retry</button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default RemoteErrorBoundary;
