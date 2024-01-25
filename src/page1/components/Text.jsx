const Text = () => {
    const onClick = () => {
        console.log('click click...');
    };

    return (
        <>
            <span>热更新 修改其他组件不会丢失Input组件中的状态</span>
            <button onClick={onClick}>点我测试是否注水成功</button>
        </>
    );
};

export default Text;
