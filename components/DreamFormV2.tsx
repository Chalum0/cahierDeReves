import React, { useEffect, useState } from 'react';
import {
    View,
    ScrollView,
    StyleSheet,
    Text,
} from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

/** ----------------------------------------------------------------
 *  Types
 *  ---------------------------------------------------------------- */
export interface Dream {
    id: string;
    title: string;
    description: string;
    date?: string;
    tonality?: string;
    location?: string;
    tags?: string[];
}

/** Props
 *  – editingDream:  when present, the form loads that dream for editing
 *  – onSaved:       optional callback once the dream has been stored
 */
interface Props {
    editingDream?: Dream | null;
    onSaved?: () => void;
}

/** ----------------------------------------------------------------
 *  Component
 *  ---------------------------------------------------------------- */
export default function DreamForm({ editingDream, onSaved }: Props) {
    /* ──────────────────────── state ──────────────────────── */
    const [title,       setTitle]       = useState('');
    const [description, setDescription] = useState('');
    const [date,        setDate]        = useState('');
    const [tonality,    setTonality]    = useState('');
    const [location,    setLocation]    = useState('');
    const [tags,        setTags]        = useState<string[]>([]);
    const [tagInput,    setTagInput]    = useState('');

    /* ─────────────────── pre‑fill when editing ────────────────── */
    useEffect(() => {
        if (editingDream) {
            setTitle(editingDream.title            ?? '');
            setDescription(editingDream.description ?? '');
            setDate(editingDream.date              ?? '');
            setTonality(editingDream.tonality      ?? '');
            setLocation(editingDream.location      ?? '');
            setTags(editingDream.tags              ?? []);
        } else {
            /* coming back to “new dream” mode – clear everything */
            resetForm();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editingDream]);

    /* ───────────────────── helpers ───────────────────── */
    const resetForm = () => {
        setTitle('');
        setDescription('');
        setDate('');
        setTonality('');
        setLocation('');
        setTags([]);
        setTagInput('');
    };

    const addTag = () => {
        if (tagInput.trim()) {
            setTags(prev => [...prev, tagInput.trim()]);
            setTagInput('');
        }
    };

    /* ───────────────────── save to storage ───────────────────── */
    const saveDream = async () => {
        try {
            const raw   = await AsyncStorage.getItem('dreamFormDataArray');
            const list: Dream[] = raw ? JSON.parse(raw) : [];

            if (editingDream) {
                /* update existing -------------------------------------------------- */
                const idx = list.findIndex(d => d.id === editingDream.id);
                if (idx !== -1) {
                    list[idx] = {
                        ...editingDream,
                        title,
                        description,
                        date,
                        tonality,
                        location,
                        tags,
                    };
                }
            } else {
                /* create new ------------------------------------------------------- */
                list.push({
                    id: uuid.v4().toString(),
                    title,
                    description,
                    date,
                    tonality,
                    location,
                    tags,
                });
            }

            await AsyncStorage.setItem('dreamFormDataArray', JSON.stringify(list));
            onSaved?.();
            if (!editingDream) resetForm();
        } catch (e) {
            console.error('❌  Could not save dream:', e);
        }
    };

    /* ───────────────────── UI ───────────────────── */
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <TextInput
                label="Titre du rêve"
                value={title}
                onChangeText={setTitle}
                mode="outlined"
                style={styles.input}
            />
            <TextInput
                label="Description"
                value={description}
                onChangeText={setDescription}
                mode="outlined"
                multiline
                numberOfLines={6}
                style={[styles.input, { height: 140 }]}
            />
            <TextInput
                label="Date (AAAA-MM-JJ)"
                value={date}
                onChangeText={setDate}
                mode="outlined"
                style={styles.input}
                placeholder="2025‑04‑21"
            />
            <TextInput
                label="Tonalité"
                value={tonality}
                onChangeText={setTonality}
                mode="outlined"
                style={styles.input}
            />
            <TextInput
                label="Lieu"
                value={location}
                onChangeText={setLocation}
                mode="outlined"
                style={styles.input}
            />

            {/* Tags -------------------------------------------------------------- */}
            <View style={styles.tagsRow}>
                {tags.map(tag => (
                    <View key={tag} style={styles.tagChip}>
                        <Text>{tag}</Text>
                    </View>
                ))}
            </View>
            <View style={styles.row}>
                <TextInput
                    label="Ajouter un tag"
                    value={tagInput}
                    onChangeText={setTagInput}
                    mode="outlined"
                    style={[styles.input, { flex: 1 }]}
                />
                <Button onPress={addTag} style={{ marginLeft: 8 }}>
                    +
                </Button>
            </View>

            <Button
                mode="contained"
                onPress={saveDream}
                style={{ marginTop: 24 }}
            >
                {editingDream ? 'Mettre à jour' : 'Enregistrer'}
            </Button>
        </ScrollView>
    );
}

/* ───────────────────── styles ───────────────────── */
const styles = StyleSheet.create({
    container: { padding: 16 },
    input:     { marginBottom: 12 },
    row:       { flexDirection: 'row', alignItems: 'center' },
    tagsRow:   { flexDirection: 'row', flexWrap: 'wrap', marginTop: 12 },
    tagChip:   {
        backgroundColor: '#eee',
        borderRadius:   12,
        paddingHorizontal: 8,
        paddingVertical:   4,
        marginRight:   8,
        marginBottom:  8,
    },
});
