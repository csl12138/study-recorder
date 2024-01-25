import { add } from '@/common/utils';
import Input from './components/Input';
import Text from './components/Text';
import style from './index.css';

const App = () => {
    const res = add(1, 2);

    return (
        <>
            <h1>my react-bootstrap 多页面SSR</h1>
            <div className={style.red}>测试css modules {res}</div>
            <Text />
            <Input />
        </>
    );
};

export default App;
