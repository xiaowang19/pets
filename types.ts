
export enum PetGender {
  MALE = '公',
  FEMALE = '母'
}

export interface Pet {
  id: string;
  name: string;
  breed: string;
  age: string;
  gender: PetGender;
  distance: string;
  timeLabel: string;
  image: string;
  description: string;
  tags: string[];
  healthStatus: string[];
  owner: {
    name: string;
    avatar: string;
    role: string;
    responseRate: string;
  };
  details: {
    size: string;
    energy: string;
    friendliness: string;
    shedding: string;
  };
}

export interface Message {
  id: string;
  sender: string;
  content: string;
  time: string;
  avatar: string;
  isUnread: boolean;
  unreadCount?: number;
  isOfficial?: boolean;
}

export interface Post {
  id: string;
  title: string;
  author: string;
  authorAvatar: string;
  image: string;
  likes: string;
}

export interface AdoptionApplication {
  id: string;
  petName: string;
  petBreed: string;
  petAge: string;
  petGender: PetGender;
  petImage: string;
  status: string;
  currentStep: number;
  totalSteps: number;
  progressLabel: string;
  history: {
    title: string;
    time: string;
    description: string;
    completed: boolean;
    isOngoing?: boolean;
  }[];
}
