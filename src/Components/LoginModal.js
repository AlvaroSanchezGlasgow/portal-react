import React, { useState } from 'react';
import PersonIcon from '@material-ui/icons/Person';
import LockIcon from '@material-ui/icons/Lock';


export const LoginModal = (data) => {

    const [isShowing, setIsShowing] = useState(JSON.stringify(data.showModal));

alert (isShowing);
    return (
        <>

            <div className={'modal '+isShowing}>
                <div className="modal-background"></div>
                <div className="modal-content">
                    <div className='modal-title'>Login</div>
                    <p>
                        {'isShowing -->' + isShowing}
                        {'showModal -->' + JSON.stringify(data)}
                    </p>
                    <p>
                        Add your user password to login
                    </p>

                    <div className="field">
                        <p className="control has-icons-left has-icons-right">
                            <input className="input" type="text" placeholder="user" />
                            <span className="icon is-small is-left">
                                <PersonIcon />
                            </span>
                        </p>
                    </div>
                    <div className="field">
                        <p className="control has-icons-left has-icons-right">
                            <input className="input" type="password" placeholder="password" />
                            <span className="icon is-small is-left">
                                <LockIcon />
                            </span>
                        </p>

                        <p>
                            <button className="button is-white">submit</button>
                        </p>
                    </div>

                </div>
                <button className="modal-close is-large" aria-label="close" onClick={() => setIsShowing('')}>

                </button>
            </div>
        </>
    );
}

export default LoginModal;