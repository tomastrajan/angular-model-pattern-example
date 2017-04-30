import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ampe-advanced',
  templateUrl: './advanced.component.html',
  styleUrls: ['./advanced.component.scss']
})
export class AdvancedComponent implements OnInit {

  mutableState = `
    import { Injectable } from '@angular/core';
    import { Observable } from 'rxjs/Observable';
    import { ModelFactory, Model } from '../core';
    
    @Injectable()
    export class SomeService {
    
      private model: Model<FrequentlyUpdated>;
    
      data$: Observable<FrequentlyUpdated>;
    
      constructor(private modelFactory: ModelFactory<FrequentlyUpdated>) {
      
        // pass 'immutable = false' flag into object factory
        this.model = this.modelFactory.create({}, false);
      }
      
      /* ... */
    }
    
    export interface FrequentlyUpdated {
      bigNestedObjectWhichIsExpensiveToClone: any;
    }
  `;
  customClone = `
    import myCustomClone from 'my-custom-clone';
    
    import { Injectable } from '@angular/core';
    import { Observable } from 'rxjs/Observable';
    import { ModelFactory, Model } from '../core';
    
    @Injectable()
    export class SomeService {
    
      private model: Model<MyModel>;
    
      data$: Observable<MyModel>;
    
      constructor(private modelFactory: ModelFactory<MyModel>) {
      
        // pass 'immutable = true' flag and custom clone function
        this.model = this.modelFactory.create({}, true, myCustomClone);
      }
      
      /* ... */
    }
    
    export interface MyModel {}
  `;
  resolveData = `
    /* route configuration */ 
    const routes: Routes = [
      {
        path: 'todos',
        component: TodosComponent,
        resolve: {
          todos: TodosService
        }
      }
      /* ... */
    ];
    
    /* business service */
    
    @Injectable()
    export class TodosService implements Resolve<boolean> {
    
      resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
      ): Observable<boolean> { 
        // get data from http, websocket, localstorage, ...
        
        // sync
        const data = storage.get('my-data');
        this.model.set(someData);           // set data in model
        return Observable.of(true);         // to finish navigation to the new route
        
        // or async
        return this.http.get(url)
          .map(res => res.json())           // extract data from response
          .do(data => this.model.set(data)) // set data in model
          .mapTo(true);                     // return true if successful
      }
    }
  `;
  combineData = `
    /* session and clients models in some component or service */
    
    const filteredClients$ = this.sessionService.session$
      .combineLatest(this.clientService.clients$)
      .map(([session, clients]) => clients.filter(client => {
         if (client.vip && session.accessVips) {
           return true;
         } else if (!client.vip) {
           return true;
         } 
         return false;
      }))
  `;

  constructor() { }

  ngOnInit() {}

  scrollTo(anchor: string) {
    (<HTMLScriptElement> document.querySelector(`#${anchor}`)).scrollIntoView();
  }

}
