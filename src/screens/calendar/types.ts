import { Dayjs } from "dayjs";

interface CalendarDayProps {
    selected: boolean;
    date: Dayjs;
    taskCounts: TaskCounts;
    loading?: boolean;
    faded?: boolean;
    onClick: (date: Dayjs) => void;
}

interface CalendarWeekProps {
    selectedDate: Dayjs;
    calendarDate: Dayjs;
    dates: Dayjs[];
    taskCounts: Record<string, TaskCounts>;
    loading?: boolean;
    onDateClick: (date: Dayjs) => void;
    onBeforeMonthClick: () => void;
    onAfterMonthClick: () => void;
}

interface TaskCounts {
    ["Overdue"]: number,
    ["Pending"]: number,
    ["Completed"]: number,
}

export type { CalendarDayProps, CalendarWeekProps, TaskCounts }