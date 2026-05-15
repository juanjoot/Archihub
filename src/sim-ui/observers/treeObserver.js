import { BehaviorSubject } from 'rxjs';


const treeWatcher = new BehaviorSubject({});
export const treeWatcher$ = treeWatcher.asObservable();

export const updateTreeWatcher = (list)=> {
    treeWatcher.next(list);
}