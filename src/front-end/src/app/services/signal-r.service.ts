import {Injectable} from "@angular/core";
import {HubConnectionBuilder} from "@microsoft/signalr";
import {environment} from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class SignalRService {
    async startConnection() {
        const connection = new HubConnectionBuilder()
            .withUrl(environment.apiUrl)
            .build();

        await connection.start();

        return connection;
    }
}