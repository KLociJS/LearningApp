import { useContext } from 'react'
import SidebarContext from 'Context/SideBarProvider'

export default function useSidebarContent() {
  return useContext(SidebarContext)
}