import 'remoteDesignSystem/DesignSystemRootStyles';
import './index.css';
// import './paperless-style-override-example.css';
import Paperless from '@components/Paperless';

const App = () => {
    return (
        <main>
            <div className='displayContainer'>
                <Paperless />
            </div>
        </main>
    );
};

export default App;
