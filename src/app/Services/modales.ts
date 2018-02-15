import * as _ from 'underscore'


export class Modales {
	 public modals: any[] = [];
	

	 open(id: string) {
        // open modal specified by id
        let modal = _.findWhere(this.modals, { id: id });
        modal.open();
    }
    }