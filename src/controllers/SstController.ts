import { json } from "../custom_types/json";
import { ScheduledServiceType as Sst, fromJson } from "../models/ScheduledServiceType";

class SstController {
    private static SST_COLLECTION = "sstV2";
    private db = require("../dal/db.ts");
    private protectedFields: string[] = [
        "id",
        "userCreated",
        "dateCreated"
    ];

    public getAll(userCreated: string, callback: Function, onError: Function): void {
        try {
            this.db.getQueryWithFilter("userCreated", userCreated, SstController.SST_COLLECTION, onError)
                .onSnapshot((querySnapshot: json) => {
                    let ssts: Sst[] = [];
                    for(var i: number = 0; i < querySnapshot.docs.length; i++) {
                        let sstJson: json = querySnapshot.docs[i].data();
                        ssts.push(fromJson(sstJson));
                    }
                    ssts.sort((sst1: Sst, sst2: Sst) => {
                        return sst2.dateCreated - sst1.dateCreated;
                    });
                    callback(ssts);
                }
            );
        }
        catch(error: any) {
            onError(error);
        }
    }

    public get(id: string, userCreated: string, callback: Function, onError: Function): void {
        try {
            this.db.getQueryWithFilters(["id", "userCreated"], ["==", "=="], [id, userCreated], SstController.SST_COLLECTION, onError)
                .onSnapshot((querySnapshot: json) => {
                    let ssts: Sst[] = [];
                    for(var i: number = 0; i < querySnapshot.docs.length; i++) {
                        let sstJson: json = querySnapshot.docs[i].data();
                        ssts.push(fromJson(sstJson));
                    }
                    if(ssts.length !== 1) {
                        callback(null);
                    }
                    else {
                        callback(ssts[0]);
                    }
                }
            );
        }
        catch(error: any) {
            onError(error);
        }
    }

    public create(callback: Function, onError: Function, sst: Sst): void {
        this.db.writeOne(sst.id, sst, SstController.SST_COLLECTION, callback, onError);
    }

    public update(sst: Sst, callback: Function, onError: Function): void {
        this.db.writeOne(sst.id, sst, SstController.SST_COLLECTION, callback, onError);
    }

    public delete(id: string, callback: Function, onError: Function): void {
        this.db.deleteOne(id, SstController.SST_COLLECTION, callback, onError);
    }
}

export { SstController };
