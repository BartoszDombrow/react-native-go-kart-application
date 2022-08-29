import React, {createContext, ReactNode, useState} from 'react';

export interface Participants {
  id: string;
  userId: string;
  sessionId: string;
  carNumber?: string;
  tagId?: string;
  isActive?: boolean;
  sessionCode?: string;
  username: string;
}

interface ContextType {
  setParticipants: React.Dispatch<React.SetStateAction<Participants[]>>;
  participants: Participants[];
}
const ParticipantsContext = createContext<ContextType>({
  participants: [],
  setParticipants: () => [],
});

export const ParticipantsProvider = ({children}: {children: ReactNode}) => {
  const [participants, setParticipants] = useState<Participants[]>([]);
  return (
    <ParticipantsContext.Provider value={{participants, setParticipants}}>
      {children}
    </ParticipantsContext.Provider>
  );
};

export default ParticipantsContext;
