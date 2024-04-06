import { add } from '@/common/utils';
import Input from './components/Input';
import Text from './components/Text';
import ServerClient from './components/ServerClient';
import style from './index.css';

const App = () => {
    const res = add(1, 2);

    return (
        <>
            <h1>my react-bootstrap 多页面SSR 该页面已按需编译</h1>
            <div className={style.red}>测试css modules {res}</div>
            <Text />
            <Input />
            <ServerClient />
        </>
    );
};

export default App;
