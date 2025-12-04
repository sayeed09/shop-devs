import React from 'react'

const Chatnow = ({ phoneNumber }) => {

    const handleChatwoot = () => {
        const event = new CustomEvent('triggerChatWoot', { detail: phoneNumber });
        document.dispatchEvent(event);
    };

    return (
        <>
            <p className="topic-head">Customized diet plan, General consultation, Healthy lifestyle tips & more.</p>
            <div>
                <input
                    type="reset"
                    value="CONSULT"
                    className="btn"
                    style={{ width: '100%' }}
                    onClick={() => handleChatwoot()}
                />
            </div>
        </>
    )
}

export default Chatnow;