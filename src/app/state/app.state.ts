import { Action, ActionReducer } from '@ngrx/store';

// tslint:disable-next-line:no-empty-interface
export interface State {
}

const LOCAL_STORAGE_KEY = '__angular-raspi-ui__';

const setSavedState = (state: any, localStorageKey: string) => {
  localStorage.setItem(localStorageKey, JSON.stringify(state));
};

const getSavedState = (localStorageKey: string): any => {
  return JSON.parse(localStorage.getItem(localStorageKey));
};

export const stateMetaReducer = <S, A extends Action = Action>(reducer: ActionReducer<any>) => {
  let onInit = true;
  return (state: S, action: A): S => {
    const nextState = reducer(state, action);
    if (onInit) {
      onInit           = false;
      const savedState = getSavedState(LOCAL_STORAGE_KEY);
      return {
        ...savedState,
        ...nextState,
      };
    }
    setSavedState(nextState, LOCAL_STORAGE_KEY);
    return nextState;
  };
};
