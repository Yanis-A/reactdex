import * as Font from 'expo-font';

const customFonts = {
    'PressStart2P-Regular': require('./PressStart2P-Regular.ttf'),
};

export const loadFonts = async () => {
    await Font.loadAsync(customFonts);
};