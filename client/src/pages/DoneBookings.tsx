import { Tabs, type Tab } from '@/components/ui';
import { useState } from 'react';
import { GuestBooking, HostBooking } from '@/components/logic';

const tabsList = [
  { title: 'My Bookings', id: 1 },
  { title: 'Guests', id: 2 },
]
export const DoneBookings = () => {
  const [activeTab, setActiveTab] = useState<Tab>(tabsList[0])

  return (
    <>
      <Tabs
        tabsList={tabsList}
        className="mb-2"
        onChange={(tab) => setActiveTab(tab)}
        activeTab={activeTab}
      />

      {activeTab.title === 'Guests' ? <GuestBooking /> : <HostBooking />}
    </>
  )
}