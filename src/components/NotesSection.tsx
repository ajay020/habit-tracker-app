import { Text, TouchableOpacity, View } from "react-native";

export function NotesSection({ notes }: { notes: string[] }) {
    return (
        <View
            style={{
                backgroundColor: "white",
                padding: 16,
                borderRadius: 16,
                marginBottom: 20,
                shadowColor: "#000",
                shadowOpacity: 0.05,
                shadowRadius: 4,
                elevation: 2,
            }}
        >
            <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 10 }}>
                Notes
            </Text>

            <TouchableOpacity
                style={{
                    backgroundColor: "#FFD54F",
                    paddingVertical: 8,
                    paddingHorizontal: 16,
                    borderRadius: 20,
                    alignSelf: "flex-start",
                    marginBottom: 12,
                }}
            >
                <Text style={{ fontWeight: "600" }}>+ Add Note</Text>
            </TouchableOpacity>

            {notes.length === 0 ? (
                <Text style={{ color: "#777" }}>No notes yet.</Text>
            ) : (
                notes.map((note, idx) => (
                    <View
                        key={idx}
                        style={{
                            padding: 12,
                            backgroundColor: "#FAFAFA",
                            borderRadius: 12,
                            marginBottom: 8,
                        }}
                    >
                        <Text>{note}</Text>
                    </View>
                ))
            )}
        </View>
    );
}
