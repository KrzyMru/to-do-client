import React, { useCallback, useContext } from 'react';
import { Sidebar } from '../../components/sidebar';
import { Today } from '../../screens/today';
import { Calendar } from '../../screens/calendar';
import { TaskList } from '../../screens/task-list';
import { Profile } from '../../screens/profile';
import { ScreenContext } from '../../contexts';
import type { ListHeaderProps } from '../../screens/task-list/types';

const Home = () => {
    const { screen, setScreen } = useContext(ScreenContext);
    const [listHeaders, setListHeaders] = React.useState<ListHeaderProps[]>([]);

    const handleAddHeader = (listHeader: ListHeaderProps) => {
        setListHeaders(prevHeaders => [...prevHeaders, listHeader]);
    }
    const handleRemoveHeader = (listHeaderId: number) => {
        setListHeaders(prevHeaders => prevHeaders.filter((lh) =>lh.id !== listHeaderId));
        setScreen("Today");
    }
    const handleUpdateHeader = (listHeader: ListHeaderProps) => {
        setListHeaders(prevHeaders => prevHeaders.map(lh => lh.id === listHeader.id ? listHeader : lh));
    }
    const handleLoadHeaders = useCallback((listHeaders: ListHeaderProps[]) => {
        setListHeaders(listHeaders);
    }, []);

    return (
            <div className="flex flex-1 h-full box-border rounded-none overflow-hidden transition-[max-width_max-height_background-color] duration-350
                        shadow-lg flex-col sm:flex-row sm:rounded-lg bg-white dark:bg-gray-800
                        sm:max-w-[640px] md:max-w-[768px] lg:max-w-[1024px] xl:max-w-[1280px]
                        sm:max-h-[680px] md:max-h-[700px] lg:max-h-[820px] xl:max-h-[900px]"
            >
                    <Sidebar
                        listHeaders={listHeaders}
                        onLoadHeaders={handleLoadHeaders}
                        onSaveList={handleAddHeader}
                    />
                    <Today hidden={screen !== "Today"} />
                    <Calendar hidden={screen !== "Calendar"} />
                    <Profile hidden={screen !== "Profile"} />
                    <TaskList
                        hidden={typeof screen !== 'number'}
                        listId={screen as number}
                        onDelete={handleRemoveHeader}
                        onUpdate={handleUpdateHeader}
                    />
            </div>
    );
}

export default Home;