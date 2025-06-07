const TaskSkeleton = () => {
    return (
        <div className="flex bg-gray-200 dark:bg-gray-600 items-center shadow-sm rounded-md p-2 items-stretch [transition:background-color_350ms]">
            <div className="flex flex-1">
                <div className="pr-2 min-w-10 flex justify-center items-center">
                    <div className="bg-gray-100 dark:bg-gray-700 rounded-full size-[40px] lg:size-[46px] animate-pulse transition-[background-color_height_width] duration-350" />
                </div>
                <div className="w-[32px] bg-gray-100 dark:bg-gray-700 -my-2 animate-pulse [transition:background-color_350ms]"/>
                <div className="flex-1 text-start pl-2">
                    <div className="bg-gray-100 dark:bg-gray-700 h-[20px] lg:h-[24px] mb-[8px] animate-pulse mb-2 [transition:background-color_350ms,height_350ms]" />
                    <div className="bg-gray-100 dark:bg-gray-700 h-[16px] lg:h-[20px] animate-pulse mb-1 [transition:background-color_350ms,height_350ms]" />
                    <div className="bg-gray-100 dark:bg-gray-700 h-[16px] lg:h-[20px] animate-pulse mb-1 [transition:background-color_350ms,height_350ms]" />
                    <div className="bg-gray-100 dark:bg-gray-700 h-[0px] lg:h-[20px] animate-pulse mb-1 [transition:background-color_350ms,height_350ms]" />
                    <div className="bg-gray-100 dark:bg-gray-700 h-[16px] lg:h-[20px] animate-pulse [transition:background-color_350ms,height_350ms]" />
                </div>
                <div className="hidden sm:flex border-gray-100 dark:border-gray-700 w-[1px] border-l-1 mx-2 -my-2 animate-pulse [transition:border-color_350ms]" />
                <div className="hidden sm:flex w-[80px] mx-1 justify-center flex-col items-center">
                    <div className="bg-gray-100 dark:bg-gray-700 h-[16px] lg:h-[20px] w-full mb-[8px] animate-pulse [transition:background-color_350ms,height_350ms]" />
                    <div className="bg-gray-100 dark:bg-gray-700 h-[10px] lg:h-[20px] w-full mb-[4px] animate-pulse [transition:background-color_350ms,height_350ms]" />
                    <div className="bg-gray-100 dark:bg-gray-700 h-[10px] lg:h-[20px] w-full animate-pulse [transition:background-color_350ms,height_350ms]" />
                </div>
                <div className="flex items-center pl-2">
                    <div className="bg-gray-100 dark:bg-gray-700 rounded-full size-[20px] lg:size-[24px] animate-pulse m-1 transition-[background-color_height_width] duration-350" />
                    <div className="bg-gray-100 dark:bg-gray-700 rounded-full size-[20px] lg:size-[24px] animate-pulse m-1 transition-[background-color_height_width] duration-350" />
                </div>
            </div>
        </div>
    );
}

export default TaskSkeleton;