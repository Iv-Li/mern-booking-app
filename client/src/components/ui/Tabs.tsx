import { twMerge } from 'tailwind-merge';

export type Tab = { title: string, id: number }
interface TabsProps {
  tabsList: Tab[]
  activeTab: Tab
  onChange?: (activeTab: Tab) => void
  className?: string
}
export const Tabs = ({ tabsList, activeTab, onChange, className }: TabsProps) => {
  return (
    <ul className={twMerge(`
      flex pb-2 border-b border-slate-300 ${className}`)}>
      {tabsList.map(tab => (
        <li
          className={`
            text-3xl font-bold transition pr-2 [&:not(:first-of-type)]:pl-2 relative
            last-of-type:after:hidden after:absolute after:w-0.5 after:bg-slate-300 after:h-[80%] after:right-0 after:top-1/2 after:translate-y-[-50%] after:translate-x-1/2`}
          role="button"
          onClick={() => onChange?.(tab)}
        >
          <span className={ `${activeTab.id === tab.id ? '' : 'opacity-35 hover:opacity-65'}`}>
            {tab.title}
          </span>
        </li>
      ))}
    </ul>
  )
}