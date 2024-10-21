import React, { useState } from 'react';
import { Music } from 'lucide-react';
import MoodSelector from './components/MoodSelector';
import SongList from './components/SongList';
import { Mood, Song } from './types';
import { getSongRecommendations } from './api/geminiApi';

function App() {
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleMoodSelect = async (mood: Mood) => {
    setSelectedMood(mood);
    setLoading(true);
    setError(null);
    try {
      const recommendations = await getSongRecommendations(mood);
      setSongs(recommendations);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
      setError("Şarkı önerileri alınırken bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-green-200 flex flex-col items-center justify-center p-8">
      <header className="mb-8 text-center">
        <Music className="w-16 h-16 text-green-600 mx-auto mb-4" />
        <h1 className="text-4xl font-bold text-green-800">Mood Melodies</h1>
        <p className="text-green-600 mt-2">Ruh halinize göre şarkılar keşfedin</p>
      </header>
      <main className="w-full max-w-2xl">
        <MoodSelector onMoodSelect={handleMoodSelect} />
        {loading ? (
          <div className="text-center mt-8">
            <p className="text-green-600">Şarkılar yükleniyor...</p>
          </div>
        ) : error ? (
          <div className="text-center mt-8">
            <p className="text-red-600">{error}</p>
          </div>
        ) : (
          selectedMood && <SongList mood={selectedMood} songs={songs} />
        )}
      </main>
    </div>
  );
}

export default App;