import createLolly from './createLolly';
import getLolly from './getLolly';
import Lolly from './lolly';

type AppSyncEvent = {
    info: {
        fieldName: string
    },
    arguments: {
        lolly: Lolly
    }
}

exports.handler = async (event: AppSyncEvent) => {
    switch (event.info.fieldName) {
        case "createLolly":
            return await createLolly(event.arguments.lolly);
        case "getLollies":
            return await getLolly();
        default:
            return null;
    }
}