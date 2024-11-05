export interface Chapter {
    _id: string;  
    title: string; 
    order: number; 
  }
  
  export interface Lesson {
    _id: string;  
    title: string; 
    order: number; 
  }
  
  export interface NoteLesson {
    _id: string;      
    course_id: string; 
    chapter_id: Chapter;  
    lesson_id: Lesson;    
    time: string;      
    content: string;   
    createdAt: string; 
    updatedAt: string | null; 
  }