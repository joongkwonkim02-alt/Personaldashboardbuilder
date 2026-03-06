// src/types/widget.ts

// Interfaces for Widget System

// Base interface for all widgets
interface Widget {
    id: string;
    type: string;
    title: string;
    data: any;
}

// Weather Widget Interface
interface WeatherWidget extends Widget {
    type: 'weather';
    data: {
        temperature: number;
        condition: string;
        location: string;
    };
}

// Todo Widget Interface
interface TodoWidget extends Widget {
    type: 'todo';
    data: {
        tasks: Array<{ id: string; task: string; completed: boolean; }>;
    };
}

// Calendar Widget Interface
interface CalendarWidget extends Widget {
    type: 'calendar';
    data: {
        events: Array<{ id: string; title: string; date: string; }>
    };
}

// News Widget Interface
interface NewsWidget extends Widget {
    type: 'news';
    data: {
        articles: Array<{ id: string; title: string; content: string; source: string; }>
    };
}

export { WeatherWidget, TodoWidget, CalendarWidget, NewsWidget };