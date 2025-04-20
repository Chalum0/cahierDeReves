import {Button, Dimensions, StyleSheet, View} from "react-native";
import {useState} from "react";

const { width } = Dimensions.get('window');



export default function PageFour() {
    const [ollamaResponse, setOllamaResponse] = useState(null);

    const callOllamaAPI = async () => {
        try {
            const response = await fetch('http://chalumoid.fr:5404/api/generate ', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  model: 'llama3.2',
                  prompt: 'Why is the sky blue?'
                })
            });

            if (!response.ok) {
                // Throw an error if Ollama returns a non-200 status.
                throw new Error(`Ollama API error: ${response.statusText}`);
            }

            const data = await response.json();
            // The actual shape of `data` depends on your Ollama configuration
            // and how the server returns results.
            setOllamaResponse(data);
        } catch (error) {
            console.error('Error calling Ollama:', error);
        }
    }

    return (
        <View style={{ padding: 20 }}>
            <Button onPress={callOllamaAPI} title="Call Ollama" />
            {ollamaResponse && (
                <Text>
                    {JSON.stringify(ollamaResponse, null, 2)}
                </Text>
            )}
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    }
})

