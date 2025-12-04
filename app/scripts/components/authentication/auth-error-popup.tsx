import React, { useContext } from 'react'
import { ModalCloseIcon } from '../../../icons/modal-close-icon';
import { ErrorIcon } from '../../../icons/error-icon';
import '../../scss/import/_oz-model-custom-popup.scss';
import '../../scss/import/_buttons.scss'
import { AuthenticationContext } from '../../context/authentication';
import { isUserLoginRequired } from '../../actions/authentication';
import { setProceedToCheckout } from '../../actions/cart';
import { CartContext } from '../../context/cart';
interface IProps {
    setAuthErrorPopup: (authErrorPopup: boolean) => void;
    setHandleLoginModal?: (loginModal: boolean) => void; //In authentication component, to handle login popup hide/show
    shouldRedirect: boolean;
}

const AuthErrorPopup = ({ setAuthErrorPopup, setHandleLoginModal, shouldRedirect }: IProps) => {
    const { state: authenticationState, dispatch: AuthenticationDispatch } = useContext(AuthenticationContext);
    const { dispatch } = useContext(CartContext);

    return (
        <div className='oz-model-custom-popup'>
            <div
                data-ml-modal
                id="applied-cash"
                className="oziva-offer-applied-modal error-modal open-popup auth-error-popup-modal"
                style={{zIndex: 1000000000}}
            >
                <a className="modal-overlay"></a>
                <div className="modal-dialog" style={{ maxWidth: '420px' }}>
                    <div
                        className="modal-content center text-center"
                        style={{ overflow: 'inherit' }}
                    >
                        <div
                            className="modal-close"
                            style={{ top: '-50px', right: '-10px', zIndex: '1111111' }}
                            onClick={() => {
                                setAuthErrorPopup(false);
                                setHandleLoginModal && setHandleLoginModal(false);
                                AuthenticationDispatch && AuthenticationDispatch(isUserLoginRequired(false));
                                dispatch(setProceedToCheckout(false));
                                shouldRedirect && window.history.back();
                            }}
                        >
                            <ModalCloseIcon />
                        </div>
                        <div style={{ marginBottom: "16px" }}>
                            <ErrorIcon />
                        </div>
                        <h2 style={{ textTransform: 'none' }}>Oh snap!</h2>
                        <p className="text-off-gray f-12">
                            We've received too many login requests from you and would be unable to log you in.
                            If this wasn't you or if you require assistance logging in, please contact us on{' '}
                            <a href='#' className='communityLink'>
                                community@oziva.in
                            </a>
                        </p>

                        <button
                            onClick={() => {
                                setAuthErrorPopup(false);
                                setHandleLoginModal && setHandleLoginModal(false);
                                AuthenticationDispatch && AuthenticationDispatch(isUserLoginRequired(false));
                                dispatch(setProceedToCheckout(false));
                                shouldRedirect && window.history.back();
                            }}
                            className="btn btn-primary btn-block"
                            style={{ marginTop: "16px" }}
                        >
                            OKAY!
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthErrorPopup;