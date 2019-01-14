import React, { Component } from "react";
import Modal from "../../components/UI/Modal/Modal";

const error = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      errorObj: null
    };

    componentDidMount() {
      axios.interceptors.request.use(response => {
        this.setState({ errorObj: null });
        return response;
      });
      axios.interceptors.response.use(
        response => response,
        err => {
          this.setState({ errorObj: err });
        }
      );
    }

    modalBackdropHandler() {
      this.setState({ errorObj: null });
    }

    render() {
      return (
        <>
          <Modal
            isShow={this.state.errorObj}
            closeModal={this.modalBackdropHandler.bind(this)}
          >
            {this.state.errorObj ? this.state.errorObj.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </>
      );
    }
  };
};

export default error;
