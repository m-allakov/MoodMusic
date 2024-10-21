import React from 'react';
import { Music } from 'lucide-react';
import { Mood, Song } from '../types';

interface SongListProps {
  mood: Mood;
  songs: Song[];
}

const moodTranslations: Record<Mood, string> = {
  happy: 'Mutlu',
  sad: 'Üzgün',
  chill: 'Sakin',
  romantic: 'Romantik',
  energetic: 'Enerjik',
};

const SongList: React.FC<SongListProps> = ({ mood, songs }) => {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold text-green-800 mb-4">
        {moodTranslations[mood]} Ruh Haliniz İçin Şarkılar
      </h2>
      {songs.length > 0 ? (
        <ul className="space-y-4">
          {songs.map((song) => (
            <li
              key={song.id}
              className="bg-white rounded-lg shadow-md p-4 flex items-center"
            >
              <Music className="w-8 h-8 text-green-500 mr-4" />
              <div>
                <h3 className="font-medium text-green-800">{song.title}</h3>
                <p className="text-green-600">{song.artist}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-green-600">Bu ruh hali için şarkı önerisi bulunamadı.</p>
      )}
    </div>
  );
};

export default SongList;