import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, Modal, TouchableOpacity, Text } from 'react-native';
import { TextInput, Button, Checkbox, IconButton, ToggleButton } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
/import { Calendar } from 'react-native-calendars';*

const { width } = Dimensions.get('window');

export default function DreamForm() {
  const [dreamIntensity, setDreamIntensity] = useState(5);
  const [sleepQuality, setSleepQuality] = useState(5);
  const [dreamClarity, setDreamClarity] = useState(5);
  const [dreamTitle, setDreamTitle] = useState('');
  const [dreamTime, setDreamTime] = useState('');
  const [dreamType, setDreamType] = useState('Normal');
  const [dreamTonality, setDreamTonality] = useState('Neutre');
  const [moodBefore, setMoodBefore] = useState('');
  const [moodAfter, setMoodAfter] = useState('');
  const [dreamLocation, setDreamLocation] = useState('');
  const [dreamInterpretation, setDreamInterpretation] = useState('');

  const [characterInput, setCharacterInput] = useState('');
  const [characters, setCharacters] = useState([]);

  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState([]);
  const [dreamDate, setDreamDate] = useState('');
  const [calendarVisible, setCalendarVisible] = useState(false);

  const addTag = () => {
    const trimmedTag = tagInput.trim();
    if (trimmedTag) {
      setTags([...tags, trimmedTag]);
      setTagInput('');
    }
  };
  const removeTag = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const addCharacter = () => {
    const trimmedCharacter = characterInput.trim();
    if (trimmedCharacter) {
      setCharacters([...characters, trimmedCharacter]);
      setCharacterInput('');
    }
  };
  const removeCharacter = (index) => {
    setCharacters(characters.filter((_, i) => i !== index));
  }

  const incrementIntensity = () => {
    if (dreamIntensity < 10) {
      setDreamIntensity((prev) => prev + 1);
    }
  };
  const decrementIntensity = () => {
    if (dreamIntensity > 1) {
      setDreamIntensity((prev) => prev - 1);
    }
  };

  const incrementClarity = () => {
    if (dreamClarity < 10) {
      setDreamClarity((prev) => prev + 1);
    }
  };
  const decrementClarity = () => {
    if (dreamClarity > 1) {
      setDreamClarity((prev) => prev - 1);
    }
  };

  const incrementQuality = () => {
    if (sleepQuality < 10) {
      setSleepQuality((prev) => prev + 1);
    }
  };
  const decrementQuality = () => {
    if (sleepQuality > 1) {
      setSleepQuality((prev) => prev - 1);
    }
  };

  const handleDreamSubmission = async () => {
    try {
      const existingData = await AsyncStorage.getItem('dreamFormDataArray');
      const formDataArray = existingData ? JSON.parse(existingData) : [];

      formDataArray.push({ dreamTitle, dreamTime, dreamDate, dreamType, dreamTonality, moodBefore, moodAfter, dreamLocation, dreamIntensity, dreamClarity, sleepQuality, characters, tags, dreamInterpretation });

      await AsyncStorage.setItem('dreamFormDataArray', JSON.stringify(formDataArray));

      console.log('AsyncStorage: ', await AsyncStorage.getItem('dreamFormDataArray'));
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des données:', error);
    }

    // Reset form fields
    setDreamTitle('');
    setDreamTime('');
    setDreamDate('');
    setDreamType('');
    setDreamTonality('');
    setMoodBefore('');
    setMoodAfter('');
    setDreamLocation('');
    setDreamIntensity(5);
    setDreamClarity(5);
    setSleepQuality(5);
    setCharacterInput('');
    setCharacters([])
    setTagInput('');
    setTags([]);
    setDreamInterpretation('');

    // setDreamDate('');
  };

  return (
    <View style={styles.container}>

      {/*Title input*/}
      <TextInput
        label="Titre du Rêve"
        value={dreamTitle}
        onChangeText={setDreamTitle}
        mode="outlined"
        multiline
        numberOfLines={6}
        style={[styles.input]}
      />

      {/*Time input*/}
      <View style={styles.container}>
        <TextInput
            label="Heure:Minute (HH:MM)"
            value={dreamTime}
            onChangeText={setDreamTime}
            mode="outlined"
            style={[styles.input]}
            keyboardType="numeric"
            // maxLength={2}
        />
      </View>


      {/* Date Picker */}
      <TouchableOpacity onPress={() => setCalendarVisible(true)} style={styles.datePickerButton}>
        <Text style={styles.datePickerText}>{dreamDate || 'Sélectionner une date'}</Text>
      </TouchableOpacity>
      <Modal visible={calendarVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Calendar
                onDayPress={(day) => {
                  setDreamDate(day.dateString);
                  setCalendarVisible(false);
                }}
                markedDates={{
                  [dreamDate]: { selected: true, marked: true, selectedColor: 'blue' }
                }}
            />
            <Button onPress={() => setCalendarVisible(false)}>Fermer</Button>
          </View>
        </View>
      </Modal>

      {/*Type selection*/}
      <ToggleButton.Row
          onValueChange={(value) => {
            if (value) {
              setDreamType(value);
            }
          }}
          value={dreamType}
          style={styles.toggleRow}
      >
        <ToggleButton
            style={styles.toggleButton}
            icon="run"
            value="Nightmare"
        />
        <ToggleButton
            style={styles.toggleButton}
            icon="sleep"
            value="Normal"
        />
        <ToggleButton
            style={styles.toggleButton}
            icon="glasses"
            value="Lucid"
        />
      </ToggleButton.Row>
      <Text style={styles.selectedText}>Type de Rêve: {dreamType}</Text>

      {/*tDream tonality*/}
      <ToggleButton.Row
          onValueChange={(value) => {
            if (value) {
              setDreamTonality(value);
            }
          }}
          value={dreamTonality}
          style={styles.toggleRow}
      >
        <ToggleButton
            style={styles.toggleButton}
            icon="check"
            value="Positive"
        />
        <ToggleButton
            style={styles.toggleButton}
            icon="minus"
            value="Neutre"
        />
        <ToggleButton
            style={styles.toggleButton}
            icon="close"
            value="Negative"
        />
      </ToggleButton.Row>
      <Text style={styles.selectedText}>Tonalité du Rêve: {dreamTonality}</Text>


      {/*Emotional state input*/}
      <TextInput
          label="Mood avant le Rêve"
          value={moodBefore}
          onChangeText={setMoodBefore}
          mode="outlined"
          multiline
          numberOfLines={6}
          style={[styles.input]}
      />
      <TextInput
          label="Mood après le Rêve"
          value={moodAfter}
          onChangeText={setMoodAfter}
          mode="outlined"
          multiline
          numberOfLines={6}
          style={[styles.input]}
      />

      {/*Dream location*/}
      <TextInput
          label="Lieu du Rêve"
          value={dreamLocation}
          onChangeText={setDreamLocation}
          mode="outlined"
          multiline
          numberOfLines={6}
          style={[styles.input]}

      />

      {/*Dream Intensity*/}
      <View style={styles.intensityContainer}>
        <Text style={styles.numberText}>Intencité du Rêve:</Text>
      </View>

      <View style={styles.intensityContainer}>
        <IconButton icon="minus" onPress={decrementIntensity} />
        <Text style={styles.numberText}>{dreamIntensity}</Text>
        <IconButton icon="plus" onPress={incrementIntensity} />
      </View>

      {/*Dream clarity*/}
      <View style={styles.intensityContainer}>
        <Text style={styles.numberText}>Claretée du Rêve:</Text>
      </View>

      <View style={styles.intensityContainer}>
        <IconButton icon="minus" onPress={decrementClarity} />
        <Text style={styles.numberText}>{dreamClarity}</Text>
        <IconButton icon="plus" onPress={incrementClarity} />
      </View>

      {/*Sleep quality*/}
      <View style={styles.intensityContainer}>
        <Text style={styles.numberText}>Qualité de sommeil:</Text>
      </View>

      <View style={styles.intensityContainer}>
        <IconButton icon="minus" onPress={decrementQuality} />
        <Text style={styles.numberText}>{sleepQuality}</Text>
        <IconButton icon="plus" onPress={incrementQuality} />
      </View>

      {/*Characters*/}
      <TextInput
          label="Ajouter un Personnage"
          value={characterInput}
          onChangeText={setCharacterInput}
          mode="outlined"
          onSubmitEditing={addCharacter}
          style={[styles.input, { width: width * 0.8, alignSelf: 'center' }]}
      />
      <Button mode="contained" onPress={addCharacter} style={styles.addTagButton}>
        Ajouter le personnage
      </Button>
      <View style={styles.List}>
        {characters.map((character, index) => (
            <View key={index} style={styles.tagItem}>
              <Text style={styles.tagText}>{character}</Text>
              <IconButton icon="close" size={10} onPress={() => removeCharacter(index)} />
            </View>
        ))}
      </View>

      {/*Tags*/}
      <TextInput
        label="Ajouter un tag"
        value={tagInput}
        onChangeText={setTagInput}
        mode="outlined"
        onSubmitEditing={addTag}
        style={[styles.input, { width: width * 0.8, alignSelf: 'center' }]}
      />
      <Button mode="contained" onPress={addTag} style={styles.addTagButton}>
        Ajouter Tag
      </Button>
      <View style={styles.List}>
        {tags.map((tag, index) => (
            <View key={index} style={styles.tagItem}>
              <Text style={styles.tagText}>{tag}</Text>
              <IconButton icon="close" size={10} onPress={() => removeTag(index)} />
            </View>
        ))}
      </View>

      <TextInput
          label="Interpretation du Rêve"
          value={dreamInterpretation}
          onChangeText={setDreamInterpretation}
          mode="outlined"
          multiline
          numberOfLines={6}
          style={[styles.input]}
      />

      <Button mode="contained" onPress={handleDreamSubmission} style={styles.button}>
        Soumettre
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    marginBottom: 16,
    width: width * 0.8,
    alignSelf: 'center'
  },
  addTagButton: {
    marginBottom: 16,
    alignSelf: 'center',
  },
  List: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
    justifyContent: 'center',
  },
  tagItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
    borderRadius: 16,
    paddingHorizontal: 8,
    marginRight: 4,
    marginLeft: 4,
  },
  tagText: {
    marginRight: 4,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  datePickerButton: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 16,
  },
  datePickerText: {
    fontSize: 16,
    color: '#000',
  },
  button: {
    marginTop: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '90%',
    alignItems: 'center',
  },

  timeRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },

  toggleRow: {
    alignSelf: 'center',
  },
  toggleButton: {
    margin: 0,
    paddingHorizontal: 10,
  },
  selectedText: {
    marginTop: 10,
    textAlign: 'center',
  },

  intensityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  numberText: {
    marginHorizontal: 12,
    fontSize: 16,
  },

});