import { Mood, Song } from '../types';

const mockSongs: Record<Mood, Song[]> = {
  happy: [
    { id: '1', title: 'Happy', artist: 'Pharrell Williams' },
    { id: '2', title: 'Good Vibrations', artist: 'The Beach Boys' },
    { id: '3', title: 'Walking on Sunshine', artist: 'Katrina and The Waves' },
  ],
  sad: [
    { id: '4', title: 'Someone Like You', artist: 'Adele' },
    { id: '5', title: 'Hurt', artist: 'Johnny Cash' },
    { id: '6', title: 'The Sound of Silence', artist: 'Simon & Garfunkel' },
  ],
  chill: [
    { id: '7', title: 'Breathe', artist: 'Télépopmusik' },
    { id: '8', title: 'Porcelain', artist: 'Moby' },
    { id: '9', title: 'Chill Out', artist: 'The KLF' },
  ],
  romantic: [
    { id: '10', title: 'All of Me', artist: 'John Legend' },
    { id: '11', title: 'Can't Help Falling in Love', artist: 'Elvis Presley' },
    { id: '12', title: 'Endless Love', artist: 'Diana Ross & Lionel Richie' },
  ],
  energetic: [
    { id: '13', title: 'Don't Stop Me Now', artist: 'Queen' },
    { id: '14', title: 'Uptown Funk', artist: 'Mark Ronson ft. Bruno Mars' },
    { id: '15', title: 'I Gotta Feeling', artist: 'The Black Eyed Peas' },
  ],
};

export const getSongRecommendations = async (mood: Mood): Promise<Song[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  return mockSongs[mood];
};