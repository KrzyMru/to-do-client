import type { CalendarWeekProps } from "./types";
import CalendarDay from "./CalendarDay";
import { Dayjs } from "dayjs";

const CalendarWeek = (props: CalendarWeekProps) => {
    const { calendarDate, dates, onAfterMonthClick, onBeforeMonthClick, onDateClick, selectedDate, taskCounts, loading } = { ...props }
    const defaultTaskCounts = { ["Overdue"]: 0, ["Pending"]: 0, ["Completed"]: 0 };

    const getTaskCounts = (date: Dayjs) =>
        taskCounts[date.format('YYYY-MM-DD')] ?? defaultTaskCounts;
    const isSelected = (date: Dayjs) =>
        selectedDate.format('YYYY-MM-DD') === date.format('YYYY-MM-DD');
    const isBeforeMonth = (date: Dayjs) =>
        calendarDate.isAfter(date.endOf('month'));
    const isAfterMonth = (date: Dayjs) =>
        calendarDate.isBefore(date.startOf('month'));

    const handleSelectDate = (date: Dayjs) => {
        if (isBeforeMonth(date))
            onBeforeMonthClick();
        else if (isAfterMonth(date))
            onAfterMonthClick();
        onDateClick(date);
    }

    return (
        <tr>
            {
                dates.map((date, i) => (
                    <CalendarDay
                        key={i}
                        date={date}
                        selected={isSelected(date)}
                        taskCounts={getTaskCounts(date)}
                        faded={isBeforeMonth(date) || isAfterMonth(date)}
                        onClick={handleSelectDate}
                        loading={loading}
                    />
                ))
            }
        </tr>
    );
}

export default CalendarWeek;