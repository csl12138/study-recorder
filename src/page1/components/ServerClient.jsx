const ServerClient = () => {
    const isServer = typeof window === 'undefined';
    const onClickWithServer = () => {
        console.log('onClickWithServer');
    };
    const onClickWithClient = () => {
        console.log('onClickWithClient');
    };
    if (isServer) {
        return <div data-flag='server' data-common='common' onClick={onClickWithServer}>SERVERPLACE_HOLDER</div>;
        // return <div data-flag='server' data-common='common' onClick={onClickWithServer} dangerouslySetInnerHTML={{ __html: '' }} />;
        // return <div data-flag='server' data-common='common' onClick={onClickWithServer}>
        //     <div>
        //         <span>SERVERPLACE_HOLDER</span>
        //     </div>
        // </div>;
    }
    // return <div data-flag='server' data-common='common' dangerouslySetInnerHTML={{ __html: '' }} />;
    return 'CLIENT_HOLDER';
    // return <div data-flag='client' data-common='common' onClick={onClickWithClient}>CLIENT_HOLDER</div>;
    // return <div data-flag='client' data-common='common' onClick={onClickWithClient}>
    //     <div>
    //         <span>CLIENT_HOLDER</span>
    //     </div>
    // </div>;
};

export default ServerClient;
