import createLolly from './createLolly';
import getLolly from './getLolly';
import Lolly from './lolly';
import deleteLolly from './deleteLolly';

type AppSyncEvent = {
    info: {
        fieldName: string
    },
    arguments: {
        lollyId: string
        lolly: Lolly
    }
}

exports.handler = async (event: AppSyncEvent) => {
    switch (event.info.fieldName) {
        case "createLolly":
            return await createLolly(event.arguments.lolly);
        case "getLollies":
            return await getLolly();
        case "deleteLolly":
            return await deleteLolly(event.arguments.lollyId); 
        default:
            return null;
    }
}