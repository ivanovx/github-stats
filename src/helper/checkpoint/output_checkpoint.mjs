import CheckpointFile from '../../helper/file/checkpoint_file.mjs';
import CheckpointDataModel from '../../model/data/CheckpointDataModel.mjs';

export default class OutputCheckpoint {
    static async saveCheckpointFile(locationsArray, country, checkpoint) {
        const indexOfTheCountry = locationsArray.findIndex(location => location.country === country);

        if (indexOfTheCountry === checkpoint) {
            console.log("checkpoint updated", country);

            if (indexOfTheCountry >= locationsArray.length - 1) {
                await CheckpointFile.outputCheckpointFile(new CheckpointDataModel(0));
            } else {
                await CheckpointFile.outputCheckpointFile(new CheckpointDataModel(indexOfTheCountry + 1 ))
            }
        }
    }

    static async readCheckpointFile() {
        return await CheckpointFile.readCheckpointFile();
    }
}