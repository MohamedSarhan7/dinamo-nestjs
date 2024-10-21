export interface FindAllOptions<T> {
  searchField?: keyof T; 
  searchValue?: string;   
  limit?: number;        
  page?: number;          
  sortField?: keyof T;    
  sortOrder?: 'asc' | 'desc'; 
}