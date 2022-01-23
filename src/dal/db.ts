import { json } from "../custom_types/json";

// firebase app object
const firebaseApp: any = require('./firebaseapp.ts');
// firestore object
const DBFS: any = firebaseApp.app.firestore();

/*
  * Writes/updates one piece of data to a specified collection.
  * @param id - the id of the document to write/update
  * @param data - the data that will be written/updated
  * @param collection - the name of the desired database collection
  * @param callback - callback function to be fired on success
  * @param onError - callback function to be fired on error
  *
**/
const writeOne = (id: string, data: json, collection: string, callback: Function, onError: Function) => {
	try {
		DBFS.collection(collection).doc(id).set(data)
			.then((res: json) => {callback(data)});
	}
	catch(error: any) {
		onError(error);
	}
}

/*
  * Deletes one document within the specified collection.
  * @param id - the id of the document to delete
  * @param collection - the name of the database collection to delete from
  * @param callback - callback function to be fired on success
  * @param onError - callback function to be fired on error
  *
**/
const deleteOne = (id: string, collection: string, callback: Function, onError: Function) => {
	try {
		var doc = DBFS.collection(collection).doc(id);
		doc.delete()
			.then(() => {callback(id)})
			.catch((error: any) => {
				onError(error);
			});
	}
	catch(error) {
		onError(error);
	}
}

const getByDocId = (id: string, collection: string, callback: Function, onError: Function) => {
	try {
		DBFS.collection(collection).doc(id).get()
			.then((doc: json) => {
				callback(doc.data());
			}
		).catch((error: any) => {
			onError(error);
		})
	}
	catch(error: any) {
		onError(error);
	}
}

/*
  * Returns a firebase Query object that can be enabled to listen to changes
    in multiple documents within the specified collection.
  * @param filterName - the field to filter the documents by
  * @param filterValue - the value of the filter; documents containing this
                         value will be queried
  * @param collection - the name of the database collection to query from
  * @param onError - callback function to be fired on error
**/
const getQueryWithFilter = (filterName: string, filterValue: string, collection: string, onError: Function) => {
	try {
		return DBFS.collection(collection).where(filterName, "==", filterValue);
	}
	catch(error) {
		onError(error);
	}
}

/*
  * Returns a firebase Query object that can be enabled to listen to changes
    in multiple documents within the specified collection.
  * @param filterNames - the fields to filter the documents by
  * @param filterConditions - the conditions to filter by
  * @param filterValues - the values of the filter; documents containing this
                         value will be queried
  * @param collection - the name of the database collection to query from
  * @param onError - callback function to be fired on error
**/
const getQueryWithFilters = (filterNames: string[], filterConditions: string[], filterValues: string[], collection: string, onError: Function) => {
	try {
		if(filterNames.length !== filterConditions.length || filterNames.length !== filterValues.length || filterConditions.length !== filterValues.length) {
			onError(new Error("Filter names, conditions, and values must all be of equal length"));
		}
		let collectionRef: any = DBFS.collection(collection);
		let ref: any = collectionRef;
		for(var i: number = 0; i < filterNames.length; i++) {
			ref = ref.where(filterNames[i], filterConditions[i], filterValues[i]);
		}
		return ref;
	}
	catch(error) {
		onError(error);
	}
}


/*
  * Returns a firebase Query object that can be enabled to listen to changes
    in multiple documents within the specified collection.
  * @param collection - the name of the database collection to query from
  * @param onError - callback function to be fired on error
**/
const getQuery = (collection: string, onError: Function) => {
	try {
		return DBFS.collection(collection);
	}
	catch(error) {
		onError(error);
	}
}

/*
	* Returns all documents within the specified collection
	* @param collection - the name of the database collection to query from
	* @param callback - callback function to be fired on success
	* @param onError - callback function to be fired on error
**/
const getAll = (collection: string, callback: Function, onError: Function) => {
	try {
		DBFS.collection(collection).get()
			.then((querySnapshot: json) => {
				let all: json[] = [];
				querySnapshot.forEach((doc: json) => {
					all.push(doc.data());
				})
				callback(all);
			})
			.catch((error: any) => {
				onError(error);
			});
	}
	catch(error) {
		onError(error);
	}
}

export { writeOne, deleteOne, getQuery, getByDocId, getQueryWithFilter, getQueryWithFilters, getAll }