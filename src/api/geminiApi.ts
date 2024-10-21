import { GoogleGenerativeAI } from "@google/generative-ai";
import { Mood, Song } from '../types';

const API_KEY = "AIzaSyC0NGV6-7jxPXAiKqX1vx6HJR72OyIPxk0";

const genAI = new GoogleGenerativeAI(API_KEY);

export async function getSongRecommendations(mood: Mood): Promise<Song[]> {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `Suggest 3 songs that match the mood: ${mood}. Return the result as a JSON array of objects, each with 'title' and 'artist' properties. Do not include any additional text or explanations.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    console.log("API Response:", text); // Debugging için

    // API yanıtını parse etmeden önce kontrol edelim
    let songs: Song[];
    try {
      // Olası fazladan karakterleri temizleyelim
      const cleanedText = text.replace(/^```json\n?|\n?```$/g, '').trim();
      songs = JSON.parse(cleanedText);
    } catch (parseError) {
      console.error("Error parsing API response:", parseError);
      // Eğer parse edilemezse, manuel olarak ayıklayalım
      const lines = text.split('\n').filter(line => line.trim() !== '' && !line.includes('```'));
      songs = lines.map(line => {
        const match = line.match(/"?(.+)"?\s*-\s*"?(.+)"?/);
        if (match) {
          return { title: match[1].trim(), artist: match[2].trim() };
        }
        return null;
      }).filter((song): song is Song => song !== null);
    }

    // Yanıtın doğru formatta olduğundan emin olalım
    if (!Array.isArray(songs) || songs.length === 0 || !songs.every(song => song.title && song.artist)) {
      throw new Error("Invalid API response format");
    }
    
    // ID'leri ekleyelim
    return songs.map((song, index) => ({
      ...song,
      id: `gemini-${index + 1}`,
    }));
  } catch (error) {
    console.error("Error fetching song recommendations:", error);
    // Hata durumunda varsayılan şarkılar döndürelim
    return [
      { id: 'default-1', title: 'Neşeli Günler', artist: 'Barış Manço' },
      { id: 'default-2', title: 'Yalnızlık Senfonisi', artist: 'Teoman' },
      { id: 'default-3', title: 'Hayat Bayram Olsa', artist: 'Zeki Müren' },
    ];
  }
}