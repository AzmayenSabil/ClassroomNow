import { ImageBackground, StyleSheet, View, Image, Text } from 'react-native';
import AppButton from '../components/AppText/AppButton';
function WelcomeScreen(props) {
    return (
        <ImageBackground 
        blurRadius={10}
        style={styles.background}
        source={require("../assets/background.jpg")}
        >
            <View style={styles.logoContainer}>
            <Image style={styles.logo}
            source={require('../assets/logo-red.png')} />
            <Text style={styles.tagline} >I AM BATMAN</Text>
            </View>
            <View style={styles.buttonContainer}>
                <AppButton title='Login' /> 
                <AppButton title='Register' color='secondary' />
            </View>
              
            
                
             
        </ImageBackground>
    );
}
const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    buttonContainer: {
        padding: 20,
        width: '100%',
    },
    logo: {
        width: 100,
        height: 100 ,
        position: 'absolute',
        top: 150,
      },
    logoContainer: {
        position: 'absolute',
        top: 150,
        alignItems: 'center',
    },
    tagline: {
        fontSize: 25,
        fontWeight: '600',
        paddingVertical: 20,
        color: '#fff',
    },
    
})

export default WelcomeScreen;