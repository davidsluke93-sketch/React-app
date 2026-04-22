import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const AppContext = createContext(null);

const USERS_KEY = 'event_app_users';
const CURRENT_USER_KEY = 'event_app_current_user';
const EVENTS_KEY = 'event_app_events';

const starterEvents = [
  {
    id: '1',
    userId: 'demo-user',
    name: 'Team Planning Session',
    date: '2026-04-25',
    time: '10:00',
    location: 'Main Office',
    description: 'Monthly planning meeting with the project team.'
  },
  {
    id: '2',
    userId: 'demo-user',
    name: 'Community Workshop',
    date: '2026-04-27',
    time: '14:30',
    location: 'Town Hall',
    description: 'Workshop to introduce the event platform to community members.'
  }
];

const demoUser = {
  id: 'demo-user',
  name: 'Demo User',
  email: 'demo@example.com',
  password: 'Password123'
};

export function AppProvider({ children }) {
  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem(USERS_KEY);
    return savedUsers ? JSON.parse(savedUsers) : [demoUser];
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem(CURRENT_USER_KEY);
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [events, setEvents] = useState(() => {
    const savedEvents = localStorage.getItem(EVENTS_KEY);
    return savedEvents ? JSON.parse(savedEvents) : starterEvents;
  });

  useEffect(() => {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem(EVENTS_KEY, JSON.stringify(events));
  }, [events]);

  const registerUser = (formData) => {
    const emailExists = users.some(
      (user) => user.email.toLowerCase() === formData.email.toLowerCase()
    );

    if (emailExists) {
      return { success: false, message: 'An account with that email already exists.' };
    }

    const newUser = {
      id: crypto.randomUUID(),
      name: formData.name,
      email: formData.email,
      password: formData.password
    };

    setUsers((prevUsers) => [...prevUsers, newUser]);
    setCurrentUser({ id: newUser.id, name: newUser.name, email: newUser.email });

    return { success: true };
  };

  const loginUser = ({ email, password }) => {
    const matchedUser = users.find(
      (user) => user.email.toLowerCase() === email.toLowerCase() && user.password === password
    );

    if (!matchedUser) {
      return { success: false, message: 'Invalid email or password.' };
    }

    setCurrentUser({ id: matchedUser.id, name: matchedUser.name, email: matchedUser.email });
    return { success: true };
  };

  const logoutUser = () => {
    setCurrentUser(null);
  };

  const addEvent = (eventData) => {
    const newEvent = {
      id: crypto.randomUUID(),
      userId: currentUser.id,
      ...eventData
    };

    setEvents((prevEvents) => [...prevEvents, newEvent]);
  };

  const updateEvent = (updatedEvent) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) => (event.id === updatedEvent.id ? updatedEvent : event))
    );
  };

  const deleteEvent = (eventId) => {
    setEvents((prevEvents) => prevEvents.filter((event) => event.id !== eventId));
  };

  const userEvents = useMemo(() => {
    if (!currentUser) return [];
    return events
      .filter((event) => event.userId === currentUser.id)
      .sort((a, b) => `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`));
  }, [currentUser, events]);

  const value = {
    users,
    currentUser,
    isAuthenticated: Boolean(currentUser),
    events: userEvents,
    registerUser,
    loginUser,
    logoutUser,
    addEvent,
    updateEvent,
    deleteEvent
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('useApp must be used inside AppProvider');
  }

  return context;
}
