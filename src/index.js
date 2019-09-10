import React from 'react';
import { YellowBox } from 'react-native';
import { View, Text, StyleSheet } from 'react-native';

YellowBox.ignoreWarnings([
  'Unrecognized WebSocket',
]);

import Routes from './routes/routes';



export default function App(){
  return (
    <Routes />
  );
}
