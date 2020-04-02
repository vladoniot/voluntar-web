import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import {
  catchError,
  switchMap,
  tap,
  flatMap,
  map,
  exhaustMap
} from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { Router } from '@angular/router';
import { RequestsService } from '@services/requests/requests.service';
import {
  getRequestsSuccessAction,
  getRequestsFailureAction,
  getRequestsAction,
  getRequestAction,
  getRequestSuccessAction,
  getRequestFailureAction,
  saveRequestAction,
  saveRequestFailureAction,
  saveRequestSuccessAction,
  updateRequestAction,
  updateRequestSuccessAction,
  updateRequestFailureAction
} from './actions';

@Injectable()
export class RequestsEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
    private requestService: RequestsService
  ) { }

  getRequestsEffect$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(getRequestsAction),
      switchMap(() =>
        this.requestService.getRequests().pipe(
          tap(res => console.log(res)),
          map(res => getRequestsSuccessAction({ payload: res.list })),
          catchError(error => of(getRequestsFailureAction({ error })))
        )
      )
    );
  });

  getRequestDetailsEffect: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(getRequestAction),
      switchMap(({ id }) =>
        this.requestService.getRequstById(id).pipe(
          map(res => getRequestSuccessAction({ payload: res })),
          catchError(error => of(getRequestFailureAction({ error })))
        )
      )
    );
  });

  saveRequestDetailsEffect$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(saveRequestAction),
      exhaustMap(({ payload }) => {
        const { _id, ...withoutId } = payload;
        return this.requestService.saveRequest(withoutId).pipe(
          map(res => {
            this.router.navigate(['/requests/list']);
            return saveRequestSuccessAction({ payload: res });
          }),
          catchError(error => of(saveRequestFailureAction({ error })))
        );
      })
    );
  });

  updateRequestDetailsEffect$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateRequestAction),
      exhaustMap(({ payload }) => {
        return this.requestService.updateRequest(payload).pipe(
          map(res => {
            this.router.navigate(['/requests/list']);
            return updateRequestSuccessAction({ payload: res })
          }),
          catchError(error => of(updateRequestFailureAction({ error })))
        );
      })
    );
  });
}