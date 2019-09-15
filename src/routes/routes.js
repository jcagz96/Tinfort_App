import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Login from '../pages/Login';
import Main from '../pages/Main';
import Register from '../pages/Register';
import Chat from '../pages/Chat';

export default createAppContainer(
    createSwitchNavigator({
        Login,
        Main,
        Register,
        Chat,
    })
);


