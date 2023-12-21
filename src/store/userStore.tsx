import { create } from 'zustand'

type UserStore = {
	currentUser: string
	setCurrentUser: (user: string) => void
  }
  
  const useUserStore = create<UserStore>()((set) => ({
	currentUser: '',
	setCurrentUser: (user) => set({ currentUser: user }),
  }))
  
export default useUserStore