import React, { Component } from "react";
import Modal from "../../components/UI/Modal/Modal";

const error = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      errorObj: null
    };

    componentWillMount() {
      this.requestInterceptor = axios.interceptors.request.use(response => {
        this.setState({ errorObj: null });
        console.log("[error] request response: ", response);
        return response;
      });
      this.responseInterceptor = axios.interceptors.response.use(
        response => {
          console.log("[error] response response: ", response);
          return response;
        },
        err => {
          this.setState({ errorObj: err });
          console.log("[error] err: ", err);
        }
      );
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.requestInterceptor);
      axios.interceptors.response.eject(this.responseInterceptor);
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
