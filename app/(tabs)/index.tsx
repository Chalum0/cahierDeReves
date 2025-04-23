import { StyleSheet, ScrollView } from 'react-native';
import React, { useRef } from 'react';
import { useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';
import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import DreamForm, { Dream } from '@/components/DreamForm';

type HomeRoute = RouteProp<RootTabParamList, 'Home'>;

export default function TabOneScreen() {
  const { params } = useRoute<HomeRoute>();        // <— params may be undefined
  const formRef = useRef<{ fillForm: (d: Dream) => void }>(null);


  React.useEffect(() => {
    if (params?.dreamToEdit) {
      formRef.current?.fillForm(params.dreamToEdit);
      console.log(params.dreamToEdit);
    }
  }, [params?.dreamToEdit]);

  return (
      <ScrollView style={styles.scrollView}
                  contentContainerStyle={styles.contentContainer}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.container}>
            <Text style={styles.title}>Tab One</Text>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
            <DreamForm/>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  scrollView: {
    flex: 1,
    // Safe to keep typical container styles here, e.g. backgroundColor, padding, etc.
    backgroundColor: '#fff',
    padding: 16,
  },
  contentContainer: {
    // Layout-related styles that apply to children go here
    alignItems: 'center',
    justifyContent: 'center',
  },
});
