// types.ts

export interface Client {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    joining_date: any;
    picture: string;
  }
  
  export interface ApiData {
    code: number;
    message: string;
    success: boolean;
    totalpages: number;
    page: number;
    pageSize: number;
    data: Client[];
  }

  export interface VideoProps {
    id: number;
    code: number,
    data: Video[],
    message: string,
    page: number,
    pageSize:number,
    success: string,    
    totalPages: number,
}


export interface Video {
  id: number;
  carer_id: string;
  created_at: string;
  likes: number;
  uploaded_at:string;
  views: number;
  video_frame:string;
  video_path: string;
  title: string;
  is_attached: boolean;
  path: string;
}