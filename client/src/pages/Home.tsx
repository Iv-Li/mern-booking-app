import { LatestDestinationCard } from '@/components/ui';
import { hotels } from '@/mockData.ts';
export const Home = () => {

  const topRowHotels = hotels
  const bottomRowHotels = hotels

  return (
    <div className="space-y-3">
      <h2 className="text-3xl font-bold">Latest Destinations</h2>
      <p>Most recent desinations added by our hosts</p>
      <div className="grid gap-4">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          {topRowHotels.map((hotel) => (
            <LatestDestinationCard hotel={hotel}/>
          ))}
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {bottomRowHotels.map((hotel) => (
            <LatestDestinationCard hotel={hotel}/>
          ))}
        </div>
      </div>
    </div>
  )
}