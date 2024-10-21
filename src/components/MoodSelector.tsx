import React from 'react';
import { Smile, Frown, Meh, Heart, Zap } from 'lucide-react';
import { Mood } from '../types';

interface MoodSelectorProps {
  onMoodSelect: (mood: Mood) => void;
}

const moods: { mood: Mood; icon: React.ReactNode; label: string }[] = [
  { mood: 'happy', icon: <Smile />, label: 'Mutlu' },
  { mood: 'sad', icon: <Frown />, label: 'Üzgün' },
  { mood: 'chill', icon: <Meh />, label: 'Sakin' },
  { mood: 'romantic', icon: <Heart />, label: 'Romantik' },
  { mood: 'energetic', icon: <Zap />, label: 'Enerjik' },
];

const MoodSelector: React.FC<MoodSelectorProps> = ({ onMoodSelect }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
      {moods.map(({ mood, icon, label }) => (
        <button
          key={mood}
          onClick={() => onMoodSelect(mood)}
          className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 focus:outline-none focus:ring-2 focus:ring-green-400"
        >
          <div className="text-green-500 mb-2">{icon}</div>
          <span className="text-green-700 font-medium">{label}</span>
        </button>
      ))}
    </div>
  );
};

export default MoodSelector;